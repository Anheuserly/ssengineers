#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const quiet = process.argv.includes("--quiet");

function log(message) {
  if (!quiet) {
    console.log(`[portal-auth-seed] ${message}`);
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

const endpoint = (env.APPWRITE_ENDPOINT || env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "").replace(
  /\/$/,
  ""
);
const projectId = env.APPWRITE_PROJECT_ID || env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "";
const apiKey = env.APPWRITE_API_KEY || "";
const databaseId = env.APPWRITE_DATABASE_ID || env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
const collectionId =
  env.APPWRITE_PORTAL_AUTH_USERS_COLLECTION_ID ||
  env.NEXT_PUBLIC_APPWRITE_PORTAL_AUTH_USERS_COLLECTION_ID ||
  "portal_auth_users";

if (!endpoint || !projectId || !apiKey || !databaseId) {
  log(
    "Missing Appwrite env vars. Required: APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_DATABASE_ID, APPWRITE_API_KEY."
  );
  process.exit(0);
}

function normalizeIdentifier(value) {
  return String(value || "").trim().toLowerCase();
}

function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

function buildSeedUsers() {
  return [
    {
      role: "admin",
      identifier: normalizeIdentifier(env.PORTAL_ADMIN_LOGIN_ID),
      password: String(env.PORTAL_ADMIN_LOGIN_PASSWORD || ""),
      displayName: "Admin User",
    },
  ].filter((item) => item.identifier && item.password);
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

async function listUsers() {
  const data = await appwrite(
    `/databases/${databaseId}/collections/${collectionId}/documents?limit=100`,
    { method: "GET" }
  );
  return Array.isArray(data.documents) ? data.documents : [];
}

async function createUserDocument(data) {
  return appwrite(`/databases/${databaseId}/collections/${collectionId}/documents`, {
    method: "POST",
    body: JSON.stringify({
      documentId: crypto.randomUUID(),
      data,
    }),
  });
}

async function updateUserDocument(documentId, data) {
  return appwrite(
    `/databases/${databaseId}/collections/${collectionId}/documents/${documentId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ data }),
    }
  );
}

async function main() {
  const seedUsers = buildSeedUsers();
  if (seedUsers.length === 0) {
    log("No admin seed credentials found. Set PORTAL_ADMIN_LOGIN_ID and PORTAL_ADMIN_LOGIN_PASSWORD.");
    process.exit(0);
  }

  log(`Seeding portal auth users into collection: ${collectionId}`);
  const existing = await listUsers();

  for (const user of seedUsers) {
    const found = existing.find((doc) => {
      const role = normalizeIdentifier(doc.role);
      const identifier = normalizeIdentifier(doc.identifier);
      return role === user.role && identifier === user.identifier;
    });

    const salt = crypto.randomBytes(16).toString("hex");
    const passwordHash = hashPassword(user.password, salt);

    const payload = {
      role: user.role,
      identifier: user.identifier,
      phone: "",
      email: user.identifier,
      company: "",
      city: "",
      passwordHash,
      passwordSalt: salt,
      displayName: user.displayName,
      isActive: true,
      profileCompleted: true,
      createdAt:
        (typeof found?.createdAt === "string" && found.createdAt) ||
        new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...(typeof found?.lastLoginAt === "string" && found.lastLoginAt
        ? { lastLoginAt: found.lastLoginAt }
        : {}),
    };

    if (found && found.$id) {
      await updateUserDocument(found.$id, payload);
      log(`Updated ${user.role} auth user: ${user.identifier}`);
    } else {
      await createUserDocument(payload);
      log(`Created ${user.role} auth user: ${user.identifier}`);
    }
  }

  log("Portal auth user seed complete.");
}

main().catch((error) => {
  console.error(`[portal-auth-seed] ${error.message || String(error)}`);
  process.exit(1);
});
