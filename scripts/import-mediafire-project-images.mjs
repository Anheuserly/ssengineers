import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DEFAULT_FOLDER_KEY = "j42zcsjfxrc4p";
const API_BASE = "https://www.mediafire.com/api/1.5";

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = "true";
      continue;
    }
    args[key] = next;
    i += 1;
  }
  return args;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .replace(/-{2,}/g, "-");
}

function htmlDecode(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function inferExtension(filename, contentType) {
  const lower = (filename || "").toLowerCase();
  const fileExt = lower.includes(".") ? lower.split(".").pop() : "";
  if (fileExt && /^[a-z0-9]{2,5}$/.test(fileExt)) return fileExt;
  if (!contentType) return "jpg";
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("gif")) return "gif";
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return "jpg";
  return "jpg";
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const data = await res.json();
  const response = data.response || {};
  if (response.result && response.result !== "Success") {
    throw new Error(`MediaFire API error: ${response.message || "Unknown error"}`);
  }
  return data;
}

async function getFolderChildren(folderKey, contentType) {
  const url =
    `${API_BASE}/folder/get_content.php?folder_key=${encodeURIComponent(folderKey)}` +
    `&content_type=${encodeURIComponent(contentType)}&response_format=json`;
  const data = await fetchJson(url);
  return data.response?.folder_content?.[contentType] || [];
}

async function getDownloadUrl(filePageUrl) {
  const res = await fetch(filePageUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });
  if (!res.ok) {
    throw new Error(`Could not load file page: HTTP ${res.status}`);
  }
  const html = await res.text();
  const directHrefMatch = html.match(/id="downloadButton"[^>]*href="([^"]+)"/i);
  if (directHrefMatch?.[1]) {
    return htmlDecode(directHrefMatch[1]);
  }
  const fallbackMatch = html.match(/https:\/\/download[0-9a-z.-]+mediafire\.com\/[^"]+/i);
  if (fallbackMatch?.[0]) {
    return htmlDecode(fallbackMatch[0]);
  }
  throw new Error(`Could not extract direct download URL from ${filePageUrl}`);
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function downloadFile(url, outPath, filenameHint) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
    redirect: "follow",
  });
  if (!res.ok) {
    throw new Error(`Download failed for ${filenameHint}: HTTP ${res.status}`);
  }
  const contentType = res.headers.get("content-type") || "";
  const bytes = await res.arrayBuffer();
  await fs.writeFile(outPath, Buffer.from(bytes));
  return contentType;
}

function toManifestTs(manifest) {
  const json = JSON.stringify(manifest, null, 2);
  return `export type ProjectSiteImageItem = {
  projectName: string;
  projectSlug: string;
  folderKey: string;
  imageCount: number;
  images: string[];
};

export const projectSiteImages: ProjectSiteImageItem[] = ${json};
`;
}

async function removeDirectoryContents(targetDir) {
  await ensureDir(targetDir);
  const entries = await fs.readdir(targetDir, { withFileTypes: true });
  await Promise.all(
    entries.map((entry) =>
      fs.rm(path.join(targetDir, entry.name), { recursive: true, force: true })
    )
  );
}

async function main() {
  const args = parseArgs(process.argv);
  const folderKey = args["folder-key"] || DEFAULT_FOLDER_KEY;
  const outDir = path.resolve(ROOT, args["out-dir"] || "public/images/projects");
  const manifestPath = path.resolve(ROOT, args.manifest || "lib/project-site-images.ts");
  const clean = args.clean === "true" || args.clean === "1";

  if (clean) {
    await removeDirectoryContents(outDir);
  } else {
    await ensureDir(outDir);
  }

  console.log(`[mediafire-import] Reading folders for key ${folderKey}...`);
  const folders = await getFolderChildren(folderKey, "folders");
  console.log(`[mediafire-import] Found ${folders.length} project folders.`);

  const manifest = [];
  for (const folder of folders) {
    const projectName = folder.name.trim();
    const projectSlug = slugify(projectName);
    const projectDir = path.join(outDir, projectSlug);
    await ensureDir(projectDir);

    const files = await getFolderChildren(folder.folderkey, "files");
    const imageFiles = files.filter((item) => String(item.filetype).toLowerCase() === "image");
    imageFiles.sort((a, b) =>
      String(a.filename || "").localeCompare(String(b.filename || ""), undefined, {
        numeric: true,
      })
    );

    const imagePaths = [];
    console.log(
      `[mediafire-import] ${projectName}: ${imageFiles.length} image(s) to download.`
    );

    for (let index = 0; index < imageFiles.length; index += 1) {
      const file = imageFiles[index];
      const pageUrl = file.links?.normal_download || file.links?.view;
      if (!pageUrl) continue;

      let directUrl;
      try {
        directUrl = await getDownloadUrl(pageUrl);
      } catch (error) {
        console.error(
          `[mediafire-import] Could not resolve direct URL for ${projectName}/${file.filename}: ${error.message}`
        );
        continue;
      }

      const tempExt = inferExtension(file.filename, file.mimetype || "");
      const fileBase = String(index + 1).padStart(2, "0");
      const outName = `${fileBase}.${tempExt}`;
      const outPath = path.join(projectDir, outName);

      try {
        const downloadedContentType = await downloadFile(
          directUrl,
          outPath,
          `${projectName}/${file.filename}`
        );
        const finalExt = inferExtension(file.filename, downloadedContentType);
        if (finalExt !== tempExt) {
          const renamedPath = path.join(projectDir, `${fileBase}.${finalExt}`);
          await fs.rename(outPath, renamedPath);
          imagePaths.push(
            `/images/projects/${projectSlug}/${path.basename(renamedPath)}`
          );
        } else {
          imagePaths.push(`/images/projects/${projectSlug}/${outName}`);
        }
      } catch (error) {
        console.error(
          `[mediafire-import] Download failed for ${projectName}/${file.filename}: ${error.message}`
        );
      }
    }

    manifest.push({
      projectName,
      projectSlug,
      folderKey: folder.folderkey,
      imageCount: imagePaths.length,
      images: imagePaths,
    });
  }

  await ensureDir(path.dirname(manifestPath));
  await fs.writeFile(manifestPath, toManifestTs(manifest), "utf8");
  console.log(
    `[mediafire-import] Completed. Downloaded ${manifest.reduce(
      (sum, item) => sum + item.imageCount,
      0
    )} image(s).`
  );
  console.log(`[mediafire-import] Manifest updated: ${manifestPath}`);
}

main().catch((error) => {
  console.error(`[mediafire-import] ${error.message || String(error)}`);
  process.exit(1);
});
