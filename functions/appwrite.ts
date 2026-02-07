"use client";

type AppwriteConfig = {
  endpoint: string;
  projectId: string;
  databaseId: string;
};

const getConfig = (): AppwriteConfig => {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "";
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "";
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";

  if (!endpoint || !projectId || !databaseId) {
    throw new Error(
      "Missing Appwrite environment configuration. Please check .env.local."
    );
  }

  return { endpoint, projectId, databaseId };
};

const createDocumentId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `doc_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

export const createAppwriteDocument = async (
  collectionId: string,
  data: Record<string, unknown>
) => {
  const { endpoint, projectId, databaseId } = getConfig();
  const url = `${endpoint}/databases/${databaseId}/collections/${collectionId}/documents`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Appwrite-Project": projectId,
      "X-Appwrite-Response-Format": "1.0.0",
    },
    body: JSON.stringify({
      documentId: createDocumentId(),
      data,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Appwrite request failed.");
  }

  return response.json();
};
