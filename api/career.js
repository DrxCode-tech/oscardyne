import { db } from "./firebaseAdmin";
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parser
  },
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success: false, message: "Method not allowed" });

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Form parse error" });
    }

    try {
      const { name, email, phone } = fields;
      const file = files.file;

      let fileUrl = null;

      if (file) {
        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: "applications",
          resource_type: "auto", // supports images, pdf, doc, etc.
        });
        fileUrl = result.secure_url;
      }

      // Store user data in Firestore
      const docRef = await db.collection("careerApplications").add({
        name: name || "",
        email: email || "",
        phone: phone || "",
        fileUrl: fileUrl || null,
        submittedAt: new Date(),
      });

      return res.status(200).json({ success: true, message: "Application submitted successfully!", id: docRef.id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Failed to submit application." });
    }
  });
}
