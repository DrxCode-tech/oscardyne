import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import fs from "fs";
import admin from "firebase-admin";

// Disable default body parser
export const config = { api: { bodyParser: false } };

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
  });
}
const db = admin.firestore();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const form = new formidable.IncomingForm();
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const { name = "", email = "", phone = "" } = fields;
    const file = files.file;

    let fileUrl = null;

    if (file) {
      const uploaded = await cloudinary.uploader.upload(file.filepath, {
        folder: "applications",
        resource_type: "auto",
      });
      fileUrl = uploaded.secure_url;
    }

    // Save to Firebase
    await db.collection("job_applications").add({
      name,
      email,
      phone,
      fileUrl,
      date: new Date().toISOString(),
      submittedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({
      success: true,
      message: "Application submitted successfully!",
      fileUrl,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Failed to submit application." });
  }
}
