#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const quiet = process.argv.includes("--quiet");

function log(message) {
  if (!quiet) {
    console.log(`[appwrite-sync] ${message}`);
  }
}

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  const values = {};

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;

    let key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();

    if (key.startsWith("export ")) {
      key = key.slice("export ".length).trim();
    }

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    values[key] = value;
  }

  return values;
}

function loadEnv() {
  return {
    ...parseEnvFile(path.join(root, ".env")),
    ...parseEnvFile(path.join(root, ".env.local")),
    ...process.env,
  };
}

const env = loadEnv();

if (env.SKIP_APPWRITE_SYNC === "1" || env.SKIP_APPWRITE_SYNC === "true") {
  log("Skipping schema sync because SKIP_APPWRITE_SYNC is enabled.");
  process.exit(0);
}

const endpoint = (
  env.APPWRITE_ENDPOINT ||
  env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
  ""
).replace(/\/$/, "");
const projectId = env.APPWRITE_PROJECT_ID || env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "";
const apiKey = env.APPWRITE_API_KEY || "";
const databaseId = env.APPWRITE_DATABASE_ID || env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";

const collectionIds = {
  contacts:
    env.APPWRITE_CONTACTS_COLLECTION_ID ||
    env.NEXT_PUBLIC_APPWRITE_CONTACTS_COLLECTION_ID ||
    "contacts",
  serviceRequests:
    env.APPWRITE_SERVICE_REQUESTS_COLLECTION_ID ||
    env.NEXT_PUBLIC_APPWRITE_SERVICE_REQUESTS_COLLECTION_ID ||
    "service_requests",
  career:
    env.APPWRITE_CAREER_COLLECTION_ID ||
    env.NEXT_PUBLIC_APPWRITE_CAREER_COLLECTION_ID ||
    "career",
  vendorRegistrations:
    env.APPWRITE_VENDOR_REGISTRATIONS_COLLECTION_ID ||
    env.NEXT_PUBLIC_APPWRITE_VENDOR_REGISTRATIONS_COLLECTION_ID ||
    "vendor_registrations",
  feedback:
    env.APPWRITE_FEEDBACK_COLLECTION_ID ||
    env.NEXT_PUBLIC_APPWRITE_FEEDBACK_COLLECTION_ID ||
    "feedback",
  testimonials:
    env.APPWRITE_TESTIMONIALS_COLLECTION_ID ||
    env.NEXT_PUBLIC_APPWRITE_TESTIMONIALS_COLLECTION_ID ||
    "testimonials",
};

const bucketIds = {
  career:
    env.APPWRITE_CAREER_BUCKET_ID ||
    env.NEXT_PUBLIC_APPWRITE_CAREER_BUCKET_ID ||
    "career_bucket",
};

if (!endpoint || !projectId || !apiKey || !databaseId) {
  log(
    "Missing Appwrite env vars. Required: APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_DATABASE_ID, APPWRITE_API_KEY."
  );
  process.exit(0);
}

async function appwrite(pathname, init = {}) {
  const response = await fetch(`${endpoint}${pathname}`, {
    ...init,
    headers: {
      "X-Appwrite-Project": projectId,
      "X-Appwrite-Key": apiKey,
      ...(init.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(init.headers || {}),
    },
  });

  const text = await response.text();
  let data = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    const statusText = `${response.status} ${response.statusText}`.trim();
    const message =
      typeof data === "object" && data && "message" in data
        ? String(data.message || statusText || `Appwrite request failed: ${response.status}`)
        : statusText || `Appwrite request failed: ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
}

async function getOrNull(pathname) {
  try {
    return await appwrite(pathname, { method: "GET" });
  } catch (error) {
    if (error && typeof error === "object" && error.status === 404) {
      return null;
    }
    throw error;
  }
}

async function ensureCollection(collectionId, name) {
  const existing = await getOrNull(`/databases/${databaseId}/collections/${collectionId}`);
  if (existing) {
    log(`Collection exists: ${collectionId}`);
    return existing;
  }

  log(`Creating collection: ${collectionId}`);
  try {
    return await appwrite(`/databases/${databaseId}/collections`, {
      method: "POST",
      body: JSON.stringify({
        collectionId,
        name,
        permissions: [],
        documentSecurity: false,
        enabled: true,
      }),
    });
  } catch (error) {
    if (error && typeof error === "object" && error.status === 409) {
      return getOrNull(`/databases/${databaseId}/collections/${collectionId}`);
    }
    throw error;
  }
}

async function listAttributes(collectionId) {
  const data = await appwrite(`/databases/${databaseId}/collections/${collectionId}/attributes`, {
    method: "GET",
  });
  return data.attributes || [];
}

async function listIndexes(collectionId) {
  const data = await appwrite(`/databases/${databaseId}/collections/${collectionId}/indexes`, {
    method: "GET",
  });
  return data.indexes || [];
}

async function waitForAttribute(collectionId, key) {
  for (let i = 0; i < 20; i += 1) {
    const attributes = await listAttributes(collectionId);
    const match = attributes.find((attribute) => attribute.key === key);
    if (match && match.status === "available") {
      return;
    }
    if (match && (match.status === "failed" || match.status === "stuck")) {
      throw new Error(
        `Attribute build failed for ${collectionId}.${key}: ${match.error || "unknown error"}`
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 1200));
  }
}

function toComparableDefault(value) {
  return value === undefined ? null : value;
}

async function updateStringAttribute(collectionId, definition, current) {
  const required = Boolean(definition.required);
  const desiredDefault = required
    ? null
    : toComparableDefault(definition.defaultValue);

  const payload = {
    required,
    default: desiredDefault,
    size: definition.size,
  };

  const needsSizeUpdate =
    typeof definition.size === "number" &&
    typeof current.size === "number" &&
    current.size !== definition.size;
  const needsRequiredUpdate = Boolean(current.required) !== required;
  const currentDefault = toComparableDefault(current.default);
  const needsDefaultUpdate = currentDefault !== desiredDefault;

  if (!needsSizeUpdate && !needsRequiredUpdate && !needsDefaultUpdate) {
    log(`Attribute exists: ${collectionId}.${definition.key}`);
    return;
  }

  log(`Updating attribute: ${collectionId}.${definition.key}`);
  await appwrite(
    `/databases/${databaseId}/collections/${collectionId}/attributes/string/${definition.key}`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    }
  );
  await waitForAttribute(collectionId, definition.key);
}

async function ensureAttribute(collectionId, definition) {
  const existing = await listAttributes(collectionId);
  const current = existing.find((attribute) => attribute.key === definition.key);

  if (current) {
    if (current.type !== definition.type) {
      log(
        `Type mismatch for ${collectionId}.${definition.key} (have: ${current.type}, expected: ${definition.type}). Please fix manually in Appwrite console.`
      );
      return;
    }

    if (definition.type === "string") {
      await updateStringAttribute(collectionId, definition, current);
      return;
    }

    log(`Attribute exists: ${collectionId}.${definition.key}`);
    return;
  }

  const basePath = `/databases/${databaseId}/collections/${collectionId}/attributes/${definition.type}`;
  const payload = {
    key: definition.key,
    required: Boolean(definition.required),
    array: Boolean(definition.array),
    ...(definition.type === "string" ? { size: definition.size } : {}),
    ...(definition.defaultValue !== undefined ? { default: definition.defaultValue } : {}),
  };

  log(`Creating attribute: ${collectionId}.${definition.key}`);
  try {
    await appwrite(basePath, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    const errorMessage = (error && error.message) || String(error);

    if (
      payload.default !== undefined &&
      payload.required &&
      String(errorMessage).toLowerCase().includes("cannot set default value for required attribute")
    ) {
      log(
        `Retrying attribute without default: ${collectionId}.${definition.key} (Appwrite restriction)`
      );
      const retryPayload = { ...payload };
      delete retryPayload.default;
      await appwrite(basePath, {
        method: "POST",
        body: JSON.stringify(retryPayload),
      });
      await waitForAttribute(collectionId, definition.key);
      return;
    }

    if (error && typeof error === "object" && error.status === 409) {
      return;
    }
    throw error;
  }

  await waitForAttribute(collectionId, definition.key);
}

async function ensureIndex(collectionId, definition) {
  const existing = await listIndexes(collectionId);
  if (existing.some((index) => index.key === definition.key)) {
    log(`Index exists: ${collectionId}.${definition.key}`);
    return;
  }

  log(`Creating index: ${collectionId}.${definition.key}`);
  try {
    await appwrite(`/databases/${databaseId}/collections/${collectionId}/indexes`, {
      method: "POST",
      body: JSON.stringify(definition),
    });
  } catch (error) {
    const errorMessage = (error && error.message) || String(error);
    if (
      String(errorMessage).includes("already exists") ||
      String(errorMessage).includes("already exists with the same name") ||
      (error && typeof error === "object" && error.status === 409)
    ) {
      return;
    }
    log(`Skipping index ${collectionId}.${definition.key}: ${errorMessage}`);
  }
}

async function ensureBucket(bucketId, name, options = {}) {
  const existing = await getOrNull(`/storage/buckets/${bucketId}`);
  if (existing) {
    log(`Bucket exists: ${bucketId}`);
    return existing;
  }

  log(`Creating bucket: ${bucketId}`);
  return appwrite("/storage/buckets", {
    method: "POST",
    body: JSON.stringify({
      bucketId,
      name,
      permissions: [],
      fileSecurity: false,
      enabled: true,
      maximumFileSize: options.maximumFileSize || 30000000,
      allowedFileExtensions: options.allowedFileExtensions || [],
      compression: options.compression || "gzip",
      encryption: options.encryption ?? true,
      antivirus: options.antivirus ?? true,
    }),
  });
}

const schema = [
  {
    id: collectionIds.contacts,
    name: "Contacts",
    attributes: [
      { key: "name", type: "string", size: 100, required: true },
      { key: "phone", type: "string", size: 32, required: true },
      { key: "email", type: "string", size: 160, required: false },
      { key: "company", type: "string", size: 120, required: false },
      { key: "message", type: "string", size: 3000, required: true },
      { key: "consent", type: "string", size: 12, required: true },
      { key: "source", type: "string", size: 120, required: true },
      { key: "createdAt", type: "datetime", required: true },
      { key: "location", type: "string", size: 180, required: false },
      { key: "requirement", type: "string", size: 2000, required: false },
      { key: "timeline", type: "string", size: 120, required: false },
      { key: "budget", type: "string", size: 120, required: false },
    ],
    indexes: [
      { key: "by_source", type: "key", attributes: ["source"], orders: ["ASC"] },
      { key: "by_createdAt", type: "key", attributes: ["createdAt"], orders: ["DESC"] },
      { key: "by_phone", type: "key", attributes: ["phone"], orders: ["ASC"] },
    ],
  },
  {
    id: collectionIds.serviceRequests,
    name: "Service Requests",
    attributes: [
      { key: "name", type: "string", size: 100, required: true },
      { key: "phone", type: "string", size: 32, required: true },
      { key: "email", type: "string", size: 160, required: false },
      { key: "location", type: "string", size: 180, required: true },
      { key: "company", type: "string", size: 120, required: false },
      { key: "service", type: "string", size: 160, required: true },
      { key: "message", type: "string", size: 3000, required: true },
      { key: "consent", type: "string", size: 12, required: true },
      { key: "source", type: "string", size: 120, required: true },
      { key: "createdAt", type: "datetime", required: true },
    ],
    indexes: [
      { key: "by_service", type: "key", attributes: ["service"], orders: ["ASC"] },
      { key: "by_createdAt", type: "key", attributes: ["createdAt"], orders: ["DESC"] },
    ],
  },
  {
    id: collectionIds.career,
    name: "Career Applications",
    attributes: [
      { key: "name", type: "string", size: 100, required: true },
      { key: "phone", type: "string", size: 32, required: true },
      { key: "email", type: "string", size: 160, required: true },
      { key: "position", type: "string", size: 120, required: true },
      { key: "experience", type: "string", size: 80, required: true },
      { key: "location", type: "string", size: 120, required: false },
      { key: "workDescription", type: "string", size: 4000, required: true },
      { key: "consent", type: "string", size: 12, required: true },
      { key: "source", type: "string", size: 120, required: true },
      { key: "createdAt", type: "string", size: 120, required: true },
      { key: "resumeFileId", type: "string", size: 100, required: true },
      { key: "resumeFileName", type: "string", size: 255, required: true },
    ],
    indexes: [
      { key: "by_position", type: "key", attributes: ["position"], orders: ["ASC"] },
      { key: "by_createdAt", type: "key", attributes: ["createdAt"], orders: ["DESC"] },
    ],
  },
  {
    id: collectionIds.vendorRegistrations,
    name: "Vendor Registrations",
    attributes: [
      { key: "companyName", type: "string", size: 160, required: true },
      { key: "contactPerson", type: "string", size: 100, required: true },
      { key: "phone", type: "string", size: 32, required: true },
      { key: "email", type: "string", size: 160, required: true },
      { key: "website", type: "string", size: 180, required: false },
      { key: "city", type: "string", size: 120, required: true },
      { key: "category", type: "string", size: 120, required: true },
      { key: "gstin", type: "string", size: 32, required: false },
      { key: "pan", type: "string", size: 20, required: false },
      { key: "experienceYears", type: "string", size: 40, required: false },
      { key: "productsServices", type: "string", size: 3000, required: true },
      { key: "certifications", type: "string", size: 1200, required: false },
      { key: "references", type: "string", size: 2200, required: false },
      { key: "documentSharingMode", type: "string", size: 80, required: true },
      { key: "consent", type: "string", size: 12, required: true },
      { key: "source", type: "string", size: 120, required: true },
      { key: "createdAt", type: "string", size: 120, required: true },
    ],
    indexes: [
      { key: "by_category", type: "key", attributes: ["category"], orders: ["ASC"] },
      { key: "by_createdAt", type: "key", attributes: ["createdAt"], orders: ["DESC"] },
      { key: "by_city", type: "key", attributes: ["city"], orders: ["ASC"] },
    ],
  },
  {
    id: collectionIds.feedback,
    name: "Feedback",
    attributes: [
      { key: "name", type: "string", size: 100, required: true },
      { key: "phone", type: "string", size: 32, required: false },
      { key: "email", type: "string", size: 160, required: false },
      { key: "company", type: "string", size: 120, required: false },
      { key: "projectName", type: "string", size: 160, required: false },
      { key: "rating", type: "integer", required: true },
      { key: "message", type: "string", size: 3000, required: true },
      { key: "consent", type: "string", size: 12, required: true },
      { key: "source", type: "string", size: 120, required: true },
      { key: "createdAt", type: "string", size: 120, required: true },
    ],
    indexes: [
      { key: "by_createdAt", type: "key", attributes: ["createdAt"], orders: ["DESC"] },
      { key: "by_rating", type: "key", attributes: ["rating"], orders: ["ASC"] },
    ],
  },
  {
    id: collectionIds.testimonials,
    name: "Testimonials",
    attributes: [
      { key: "authorName", type: "string", size: 100, required: false },
      { key: "authorRole", type: "string", size: 120, required: false },
      { key: "company", type: "string", size: 120, required: false },
      { key: "projectName", type: "string", size: 160, required: false },
      { key: "rating", type: "integer", required: false },
      { key: "testimonial", type: "string", size: 2400, required: true },
      { key: "status", type: "string", size: 24, required: false },
      { key: "displayOrder", type: "integer", required: false },
      { key: "createdAt", type: "string", size: 120, required: false },
    ],
    indexes: [
      { key: "by_status", type: "key", attributes: ["status"], orders: ["ASC"] },
      { key: "by_order", type: "key", attributes: ["displayOrder"], orders: ["ASC"] },
    ],
  },
];

async function main() {
  log("Starting Appwrite schema sync...");

  for (const collection of schema) {
    await ensureCollection(collection.id, collection.name);
    for (const attribute of collection.attributes) {
      await ensureAttribute(collection.id, attribute);
    }
    for (const index of collection.indexes || []) {
      await ensureIndex(collection.id, index);
    }
  }

  await ensureBucket(bucketIds.career, "Career Resumes", {
    maximumFileSize: 5 * 1024 * 1024,
    allowedFileExtensions: ["pdf", "doc", "docx"],
  });

  log("Appwrite schema sync complete.");
}

main().catch((error) => {
  console.error(`[appwrite-sync] ${error.message || String(error)}`);
  process.exit(1);
});
