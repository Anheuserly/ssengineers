import { NextResponse } from "next/server";
import {
  AppwriteRequestError,
  createAppwriteDocument,
  getAppwriteConfig,
  uploadAppwriteFile,
} from "@/functions/appwrite";
import { ValidationError, validateCareerFormData } from "@/lib/server/validation";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const {
      collections: { career },
      buckets: { career: careerBucket },
    } = getAppwriteConfig();
    const formData = await request.formData();
    const { applicationData, resumeFile } = validateCareerFormData(formData);

    const uploadedFile = await uploadAppwriteFile(careerBucket, resumeFile);
    const document = await createAppwriteDocument(
      career,
      {
        ...applicationData,
        resumeFileId: uploadedFile.$id,
        resumeFileName: uploadedFile.name,
      },
      { requireApiKey: true }
    );

    return NextResponse.json(
      {
        message: "Career application submitted successfully.",
        documentId: document.$id,
        resumeFileId: uploadedFile.$id,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    if (error instanceof AppwriteRequestError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    const message =
      error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
