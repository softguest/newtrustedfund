import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { kyc } from "@/config/schema";
import cloudinary from "@/lib/cloudinary";
import { auth } from "@clerk/nextjs/server";

function uploadToCloudinary(buffer: Buffer, folder: string) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
}

export async function POST(req: Request) {
  const { userId } = await auth(); // <-- FIXED

  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();

  const idDoc = form.get("idDocument") as File | null;
  const addrDoc = form.get("addressProof") as File | null;

  const uploads: any = {};

  if (idDoc) {
    const buffer = Buffer.from(await idDoc.arrayBuffer());
    const upload: any = await uploadToCloudinary(buffer, "kyc");
    uploads.idDocumentUrl = upload.secure_url; // <-- FIXED
  }

  if (addrDoc) {
    const buffer = Buffer.from(await addrDoc.arrayBuffer());
    const upload: any = await uploadToCloudinary(buffer, "kyc");
    uploads.addressProofUrl = upload.secure_url; // <-- FIXED
  }

  await db.insert(kyc).values({
    userId,
    ...uploads,
  });

  return NextResponse.json({ success: true });
}
