#!/usr/bin/env node

import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import crypto from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT_PATH = path.join(ROOT, "lib", "content.ts");
const OUTPUT_DIR = path.join(ROOT, "public", "logos", "brands");
const TEMP_ICON_MODULE = path.join(ROOT, ".tmp-simple-icons-index.js");
const MANIFEST_PATH = path.join(ROOT, "lib", "brand-logo-manifest.ts");

const SIMPLE_ICONS_INDEX_URL = "https://unpkg.com/simple-icons@latest/index.js";
const USE_SIMPLE_ICONS = false;
const BLOCKED_FALLBACK_ICON_SHA1 = new Set([
  // Generic fallback icons returned for domains without real icon.
  "2d7c9b60d1e2b4f4726141de2e4ab738110b9287",
  "980aa215c45dd3b92f40b272234a21f6d850b14a",
]);

const aliasByBrand = {
  "honeywelladi": ["honeywell"],
  "gesecurity": ["ge"],
  "morleyias": ["morley"],
  "siemensfiresafety": ["siemens"],
  "anchorpanasonic": ["panasonic"],
  "systemsensor": ["honeywell"],
  "newagefireprotection": ["newage"],
  "aaagfireprotection": ["aaag"],
  "kartikfireprotection": ["kartik"],
  "lt electrical": ["larsentoubro"],
  "ltelectrical": ["larsentoubro"],
};

const normalize = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "");

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const toDomainRoot = (domain) =>
  String(domain || "")
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0];

const extractBrands = (sourceText) => {
  const start = sourceText.indexOf("export const brands");
  const end = sourceText.indexOf("export const team");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Unable to locate brands block in lib/content.ts.");
  }

  const block = sourceText.slice(start, end);
  const matches = [];
  const regex = /partnerLogo\(\s*"([^"]+)"\s*,\s*"([^"]+)"/g;
  let match = regex.exec(block);
  while (match) {
    matches.push({
      name: match[1],
      domain: match[2],
    });
    match = regex.exec(block);
  }

  if (matches.length === 0) {
    throw new Error("No brand rows were parsed from brands block.");
  }

  return matches;
};

const fallbackSvg = ({ title, imageBase64, imageMimeType }) => {
  const safeTitle = title.replace(/&/g, "&amp;").replace(/</g, "&lt;");

  return [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img">',
    `  <title>${safeTitle}</title>`,
    '  <rect x="0" y="0" width="120" height="120" rx="20" fill="#ffffff"/>',
    '  <rect x="2" y="2" width="116" height="116" rx="18" fill="none" stroke="#e4e1dc" stroke-width="2"/>',
    `  <image href="data:${imageMimeType};base64,${imageBase64}" x="28" y="28" width="64" height="64"/>`,
    "</svg>",
    "",
  ].join("\n");
};

const fetchText = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url} (${response.status}).`);
  }
  return response.text();
};

const fetchImageBytes = async (url) => {
  const response = await fetch(url);
  const contentType = (response.headers.get("content-type") || "").toLowerCase();
  const bytes = Buffer.from(await response.arrayBuffer());
  const isImage = contentType.includes("image/");

  if (!isImage || bytes.length === 0) {
    throw new Error(`No image payload from ${url} (${response.status}).`);
  }

  const hash = crypto.createHash("sha1").update(bytes).digest("hex");
  if (BLOCKED_FALLBACK_ICON_SHA1.has(hash)) {
    throw new Error(`Blocked generic icon from ${url}.`);
  }

  return {
    bytes,
    mimeType: (contentType.split(";")[0] || "image/png").trim(),
    hash,
  };
};

const buildCandidates = ({ name, domain }) => {
  const domainRoot = toDomainRoot(domain);
  const domainLabel = domainRoot.split(".")[0] || domainRoot;
  const nameNoParen = name.replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim();
  const candidates = new Set();
  const add = (value) => {
    const key = normalize(value);
    if (key) {
      candidates.add(key);
    }
  };

  const alias = aliasByBrand[normalize(name)];
  if (Array.isArray(alias)) {
    alias.forEach(add);
  }

  add(name);
  add(nameNoParen);
  add(domainRoot);
  add(domainLabel);
  add(domainRoot.replace(/\.(co\.uk|com|in|org|net|io|co)$/i, ""));

  return [...candidates];
};

const buildIconLookup = (iconsObject) => {
  const lookup = new Map();
  for (const icon of Object.values(iconsObject)) {
    if (!icon || typeof icon !== "object") {
      continue;
    }

    const titleKey = normalize(icon.title);
    const slugKey = normalize(icon.slug);
    if (titleKey && !lookup.has(titleKey)) {
      lookup.set(titleKey, icon);
    }
    if (slugKey && !lookup.has(slugKey)) {
      lookup.set(slugKey, icon);
    }
  }
  return lookup;
};

const run = async () => {
  const contentText = await readFile(CONTENT_PATH, "utf8");
  const brands = extractBrands(contentText);

  await mkdir(OUTPUT_DIR, { recursive: true });
  const existing = await readdir(OUTPUT_DIR).catch(() => []);
  await Promise.all(
    existing.map((entry) =>
      rm(path.join(OUTPUT_DIR, entry), { recursive: true, force: true })
    )
  );

  let iconLookup = new Map();
  if (USE_SIMPLE_ICONS) {
    const iconModuleSource = await fetchText(SIMPLE_ICONS_INDEX_URL);
    await writeFile(TEMP_ICON_MODULE, iconModuleSource, "utf8");

    const require = createRequire(import.meta.url);
    const icons = require(TEMP_ICON_MODULE);
    iconLookup = buildIconLookup(icons);
  }

  let simpleIconCount = 0;
  let faviconFallbackCount = 0;
  let failureCount = 0;
  let duplicateSkipCount = 0;
  const availableSlugs = [];
  const seenImageHashes = new Set();

  for (const brand of brands) {
    const fileName = `${slugify(brand.name)}.svg`;
    const outPath = path.join(OUTPUT_DIR, fileName);
    const candidates = buildCandidates(brand);

    let selectedIcon = null;
    if (USE_SIMPLE_ICONS) {
      for (const candidate of candidates) {
        if (iconLookup.has(candidate)) {
          selectedIcon = iconLookup.get(candidate);
          break;
        }
      }
    }

    try {
      if (USE_SIMPLE_ICONS && selectedIcon && selectedIcon.svg) {
        await writeFile(outPath, `${selectedIcon.svg}\n`, "utf8");
        availableSlugs.push(slugify(brand.name));
        simpleIconCount += 1;
        console.log(`[simple-icons] ${brand.name} -> ${selectedIcon.slug}`);
        continue;
      }

      const domainRoot = toDomainRoot(brand.domain);
      const iconSources = [
        `https://${domainRoot}/favicon.ico`,
        `https://www.${domainRoot}/favicon.ico`,
        `https://${domainRoot}/apple-touch-icon.png`,
        `https://www.${domainRoot}/apple-touch-icon.png`,
        `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domainRoot)}&sz=64`,
        `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(
          `https://${domainRoot}`
        )}&sz=64`,
        `https://icons.duckduckgo.com/ip3/${encodeURIComponent(domainRoot)}.ico`,
      ];

      let imageAsset = null;
      for (const source of iconSources) {
        try {
          imageAsset = await fetchImageBytes(source);
          break;
        } catch {
          // Try next source.
        }
      }

      if (!imageAsset) {
        throw new Error(`No icon source worked for ${domainRoot}.`);
      }

      if (seenImageHashes.has(imageAsset.hash)) {
        duplicateSkipCount += 1;
        console.log(`[skip-duplicate] ${brand.name} -> duplicate logo`);
        continue;
      }

      seenImageHashes.add(imageAsset.hash);

      const svg = fallbackSvg({
        title: `${brand.name} logo`,
        imageBase64: imageAsset.bytes.toString("base64"),
        imageMimeType: imageAsset.mimeType,
      });
      await writeFile(outPath, svg, "utf8");
      availableSlugs.push(slugify(brand.name));
      faviconFallbackCount += 1;
      console.log(`[favicon] ${brand.name} -> ${brand.domain}`);
    } catch (error) {
      failureCount += 1;
      const message =
        error instanceof Error ? error.message : "Unknown download failure.";
      console.log(`[skip] ${brand.name} -> ${message}`);
    }
  }

  if (USE_SIMPLE_ICONS) {
    await rm(TEMP_ICON_MODULE, { force: true }).catch(() => {});
  }

  const uniqueSortedSlugs = [...new Set(availableSlugs)].sort((a, b) =>
    a.localeCompare(b)
  );
  const manifestSource = [
    "// Auto-generated by scripts/sync-brand-logos.mjs",
    "export const availableBrandLogoSlugs = new Set([",
    ...uniqueSortedSlugs.map((slug) => `  "${slug}",`),
    "]);",
    "",
  ].join("\n");
  await writeFile(MANIFEST_PATH, manifestSource, "utf8");

  console.log("");
  console.log(`Brands parsed: ${brands.length}`);
  console.log(`Simple Icons used: ${simpleIconCount}`);
  console.log(`Favicon fallbacks: ${faviconFallbackCount}`);
  console.log(`Skipped (no reliable logo found): ${failureCount}`);
  console.log(`Skipped (duplicate logo): ${duplicateSkipCount}`);
};

run().catch((error) => {
  const message = error instanceof Error ? error.message : "Unexpected error.";
  console.error(message);
  process.exitCode = 1;
});
