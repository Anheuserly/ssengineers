import { NextResponse } from "next/server";

const getServerConfig = () => {
  const endpoint =
    process.env.APPWRITE_ENDPOINT ||
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
    "";
  const projectId =
    process.env.APPWRITE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ||
    "";
  const databaseId =
    process.env.APPWRITE_DATABASE_ID ||
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ||
    "";
  const serviceRequestsCollection =
    process.env.APPWRITE_SERVICE_REQUESTS_COLLECTION_ID ||
    process.env.NEXT_PUBLIC_APPWRITE_SERVICE_REQUESTS_COLLECTION_ID ||
    "service_requests";
  const apiKey = process.env.APPWRITE_API_KEY || "";

  if (!endpoint || !projectId || !databaseId) {
    throw new Error("Missing Appwrite server configuration.");
  }

  return { endpoint, projectId, databaseId, serviceRequestsCollection, apiKey };
};

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { endpoint, projectId, databaseId, serviceRequestsCollection, apiKey } =
      getServerConfig();

    const response = await fetch(
      `${endpoint}/databases/${databaseId}/collections/${serviceRequestsCollection}/documents`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Project": projectId,
          "X-Appwrite-Response-Format": "1.0.0",
          ...(apiKey ? { "X-Appwrite-Key": apiKey } : {}),
        },
        body: JSON.stringify({
          documentId: crypto.randomUUID(),
          data: payload,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { message: errorText || "Appwrite error" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
