type AppwriteConfig = {
  endpoint: string;
  projectId: string;
  databaseId: string;
  apiKey: string;
  collections: {
    contacts: string;
    serviceRequests: string;
    career: string;
    vendorRegistrations: string;
    feedback: string;
    testimonials: string;
  };
  buckets: {
    career: string;
  };
};

type CreateDocumentOptions = {
  requireApiKey?: boolean;
};

type EnsureStringAttributesOptions = {
  timeoutMs?: number;
  waitForAvailability?: boolean;
};

type AppwriteFile = {
  $id: string;
  name: string;
};

type AppwriteCollectionAttribute = {
  key?: string;
  status?: string;
  error?: string;
};

export type AppwriteStringAttributeSpec = {
  key: string;
  size: number;
  required?: boolean;
  default?: string | null;
  array?: boolean;
};

type ListDocumentsOptions = {
  requireApiKey?: boolean;
  queries?: string[];
  limit?: number;
  offset?: number;
};

export class AppwriteRequestError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AppwriteRequestError";
    this.status = status;
  }
}

const getValue = (
  serverKey: keyof NodeJS.ProcessEnv,
  publicKey: keyof NodeJS.ProcessEnv,
  fallback = ""
) => process.env[serverKey] || process.env[publicKey] || fallback;

export const getAppwriteConfig = (): AppwriteConfig => {
  const endpoint = getValue("APPWRITE_ENDPOINT", "NEXT_PUBLIC_APPWRITE_ENDPOINT");
  const projectId = getValue(
    "APPWRITE_PROJECT_ID",
    "NEXT_PUBLIC_APPWRITE_PROJECT_ID"
  );
  const databaseId = getValue(
    "APPWRITE_DATABASE_ID",
    "NEXT_PUBLIC_APPWRITE_DATABASE_ID"
  );
  const contacts = getValue(
    "APPWRITE_CONTACTS_COLLECTION_ID",
    "NEXT_PUBLIC_APPWRITE_CONTACTS_COLLECTION_ID",
    "contacts"
  );
  const serviceRequests = getValue(
    "APPWRITE_SERVICE_REQUESTS_COLLECTION_ID",
    "NEXT_PUBLIC_APPWRITE_SERVICE_REQUESTS_COLLECTION_ID",
    "service_requests"
  );
  const career = getValue(
    "APPWRITE_CAREER_COLLECTION_ID",
    "NEXT_PUBLIC_APPWRITE_CAREER_COLLECTION_ID",
    "career"
  );
  const vendorRegistrations = getValue(
    "APPWRITE_VENDOR_REGISTRATIONS_COLLECTION_ID",
    "NEXT_PUBLIC_APPWRITE_VENDOR_REGISTRATIONS_COLLECTION_ID",
    "vendor_registrations"
  );
  const feedback = getValue(
    "APPWRITE_FEEDBACK_COLLECTION_ID",
    "NEXT_PUBLIC_APPWRITE_FEEDBACK_COLLECTION_ID",
    "feedback"
  );
  const testimonials = getValue(
    "APPWRITE_TESTIMONIALS_COLLECTION_ID",
    "NEXT_PUBLIC_APPWRITE_TESTIMONIALS_COLLECTION_ID",
    "testimonials"
  );
  const careerBucket = getValue(
    "APPWRITE_CAREER_BUCKET_ID",
    "NEXT_PUBLIC_APPWRITE_CAREER_BUCKET_ID",
    "career_bucket"
  );
  const apiKey = process.env.APPWRITE_API_KEY || "";

  if (!endpoint || !projectId || !databaseId) {
    throw new Error("Missing Appwrite environment configuration.");
  }

  return {
    endpoint,
    projectId,
    databaseId,
    apiKey,
    collections: {
      contacts,
      serviceRequests,
      career,
      vendorRegistrations,
      feedback,
      testimonials,
    },
    buckets: {
      career: careerBucket,
    },
  };
};

const createDocumentId = () => crypto.randomUUID();

const appwriteHeaders = ({
  projectId,
  apiKey,
  requireApiKey = false,
  json = true,
}: {
  projectId: string;
  apiKey: string;
  requireApiKey?: boolean;
  json?: boolean;
}) => {
  if (requireApiKey && !apiKey) {
    throw new Error("Missing Appwrite server configuration or APPWRITE_API_KEY.");
  }

  const headers: Record<string, string> = {
    "X-Appwrite-Project": projectId,
    "X-Appwrite-Response-Format": "1.0.0",
  };

  if (json) {
    headers["Content-Type"] = "application/json";
  }

  if (apiKey) {
    headers["X-Appwrite-Key"] = apiKey;
  }

  return headers;
};

const getAppwriteMessage = async (response: Response, fallback: string) => {
  const message = await response.text();
  return message || fallback;
};

const listCollectionAttributes = async ({
  endpoint,
  projectId,
  databaseId,
  collectionId,
  apiKey,
}: {
  endpoint: string;
  projectId: string;
  databaseId: string;
  collectionId: string;
  apiKey: string;
}) => {
  const response = await fetch(
    `${endpoint}/databases/${databaseId}/collections/${collectionId}/attributes`,
    {
      method: "GET",
      headers: appwriteHeaders({
        projectId,
        apiKey,
        requireApiKey: true,
      }),
    }
  );

  if (!response.ok) {
    throw new AppwriteRequestError(
      await getAppwriteMessage(response, "Failed to list Appwrite attributes."),
      response.status
    );
  }

  const body = (await response.json()) as {
    attributes?: AppwriteCollectionAttribute[];
  };
  return Array.isArray(body.attributes) ? body.attributes : [];
};

const createStringAttribute = async ({
  endpoint,
  projectId,
  databaseId,
  collectionId,
  apiKey,
  attribute,
}: {
  endpoint: string;
  projectId: string;
  databaseId: string;
  collectionId: string;
  apiKey: string;
  attribute: AppwriteStringAttributeSpec;
}) => {
  const response = await fetch(
    `${endpoint}/databases/${databaseId}/collections/${collectionId}/attributes/string`,
    {
      method: "POST",
      headers: appwriteHeaders({
        projectId,
        apiKey,
        requireApiKey: true,
      }),
      body: JSON.stringify({
        key: attribute.key,
        size: attribute.size,
        required: Boolean(attribute.required),
        default: attribute.default ?? null,
        array: Boolean(attribute.array),
      }),
    }
  );

  if (response.ok) {
    return;
  }

  const message = await getAppwriteMessage(
    response,
    `Failed to create Appwrite attribute "${attribute.key}".`
  );
  const normalized = message.toLowerCase();

  if (
    response.status === 409 ||
    normalized.includes("already exists") ||
    normalized.includes("attribute already found")
  ) {
    return;
  }

  throw new AppwriteRequestError(message, response.status);
};

const waitFor = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export const ensureAppwriteStringAttributes = async (
  collectionId: string,
  attributes: AppwriteStringAttributeSpec[],
  options: EnsureStringAttributesOptions = {}
) => {
  const normalizedAttributes = attributes
    .map((attribute) => ({
      key: attribute.key.trim(),
      size: Math.max(1, Math.min(attribute.size, 65535)),
      required: Boolean(attribute.required),
      default: attribute.default ?? null,
      array: Boolean(attribute.array),
    }))
    .filter((attribute, index, list) => {
      if (!attribute.key) {
        return false;
      }

      return list.findIndex((item) => item.key === attribute.key) === index;
    });

  if (normalizedAttributes.length === 0) {
    return;
  }

  const {
    endpoint,
    projectId,
    databaseId,
    apiKey,
  } = getAppwriteConfig();

  if (!apiKey) {
    throw new Error(
      "Missing APPWRITE_API_KEY. Required to auto-create new Appwrite attributes."
    );
  }

  const existing = await listCollectionAttributes({
    endpoint,
    projectId,
    databaseId,
    collectionId,
    apiKey,
  });

  const existingKeys = new Set(
    existing.map((attribute) => attribute.key || "").filter(Boolean)
  );
  const missing = normalizedAttributes.filter(
    (attribute) => !existingKeys.has(attribute.key)
  );

  if (missing.length === 0) {
    return;
  }

  for (const attribute of missing) {
    await createStringAttribute({
      endpoint,
      projectId,
      databaseId,
      collectionId,
      apiKey,
      attribute,
    });
  }

  if (options.waitForAvailability === false) {
    return;
  }

  const timeoutMs = options.timeoutMs ?? 15000;
  const pending = new Set(missing.map((attribute) => attribute.key));
  const startedAt = Date.now();

  while (pending.size > 0 && Date.now() - startedAt <= timeoutMs) {
    await waitFor(600);
    const attributesState = await listCollectionAttributes({
      endpoint,
      projectId,
      databaseId,
      collectionId,
      apiKey,
    });
    const map = new Map(
      attributesState
        .filter((attribute) => attribute.key)
        .map((attribute) => [attribute.key as string, attribute])
    );

    for (const key of Array.from(pending)) {
      const attribute = map.get(key);
      if (!attribute) {
        continue;
      }

      const status = (attribute.status || "available").toLowerCase();
      if (status === "available") {
        pending.delete(key);
        continue;
      }

      if (status === "failed" || status === "stuck") {
        throw new AppwriteRequestError(
          `Appwrite attribute "${key}" failed to build. ${attribute.error || ""}`.trim(),
          500
        );
      }
    }
  }

  if (pending.size > 0) {
    throw new AppwriteRequestError(
      `Timed out waiting for Appwrite attributes: ${Array.from(pending).join(", ")}`,
      503
    );
  }
};

export const createAppwriteDocument = async (
  collectionId: string,
  data: Record<string, unknown>,
  options: CreateDocumentOptions = {}
) => {
  const { endpoint, projectId, databaseId, apiKey } = getAppwriteConfig();

  const response = await fetch(
    `${endpoint}/databases/${databaseId}/collections/${collectionId}/documents`,
    {
      method: "POST",
      headers: appwriteHeaders({
        projectId,
        apiKey,
        requireApiKey: options.requireApiKey,
      }),
      body: JSON.stringify({
        documentId: createDocumentId(),
        data,
      }),
    }
  );

  if (!response.ok) {
    throw new AppwriteRequestError(
      await getAppwriteMessage(response, "Appwrite request failed."),
      response.status
    );
  }

  return response.json();
};

export const listAppwriteDocuments = async (
  collectionId: string,
  options: ListDocumentsOptions = {}
) => {
  const { endpoint, projectId, databaseId, apiKey } = getAppwriteConfig();
  const url = new URL(
    `${endpoint}/databases/${databaseId}/collections/${collectionId}/documents`
  );

  if (typeof options.limit === "number" && Number.isFinite(options.limit)) {
    url.searchParams.set("limit", String(Math.max(1, Math.min(options.limit, 100))));
  }
  if (typeof options.offset === "number" && Number.isFinite(options.offset)) {
    url.searchParams.set("offset", String(Math.max(0, options.offset)));
  }
  for (const query of options.queries || []) {
    if (typeof query === "string" && query.trim()) {
      url.searchParams.append("queries[]", query.trim());
    }
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: appwriteHeaders({
      projectId,
      apiKey,
      requireApiKey: options.requireApiKey,
      json: false,
    }),
  });

  if (!response.ok) {
    throw new AppwriteRequestError(
      await getAppwriteMessage(response, "Failed to fetch Appwrite documents."),
      response.status
    );
  }

  return response.json() as Promise<{
    total?: number;
    documents?: Array<Record<string, unknown>>;
  }>;
};

export const uploadAppwriteFile = async (
  bucketId: string,
  file: File
): Promise<AppwriteFile> => {
  const { endpoint, projectId, apiKey } = getAppwriteConfig();
  const uploadForm = new FormData();
  uploadForm.set("fileId", createDocumentId());
  uploadForm.set("file", file, file.name);

  const response = await fetch(`${endpoint}/storage/buckets/${bucketId}/files`, {
    method: "POST",
    headers: appwriteHeaders({
      projectId,
      apiKey,
      requireApiKey: true,
      json: false,
    }),
    body: uploadForm,
  });

  if (!response.ok) {
    throw new AppwriteRequestError(
      await getAppwriteMessage(response, "Failed to upload file."),
      response.status
    );
  }

  return response.json();
};
