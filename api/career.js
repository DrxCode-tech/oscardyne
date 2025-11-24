import { db } from "./firebaseAdmin";
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import fs from "fs";

// Required for file uploads in Next.js 13+
export const runtime = "nodejs";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

form.parse(req, async (err, fields, files) => {
  if (err) {
    console.error("FORM ERROR:", err);
    return res.status(500).json({ success: false, message: "Form parse error" });
  }

  try {
    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    let fileUrl = null;

    if (file) {
      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: "applications",
        resource_type: "auto",
      });

      fileUrl = result.secure_url;
    }

    const docRef = await db.collection("careerApplications").add({
      name: fields.name?.[0] || "",
      email: fields.email?.[0] || "",
      phone: fields.phone?.[0] || "",
      fileUrl,
      submittedAt: new Date(),
    });

    return res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to submit application." });
  }
});
