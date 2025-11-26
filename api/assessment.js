import { db } from "./firebaseAdmin"; // your admin SDK initializer
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const form = req.body;

        // 1. AI generates personalised report
        const ai = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `
You are “Oscardyne Security AI sales Consultant,” a professional security adviser whose job is to produce personalised, realistic, direct, and persuasive security assessments.

Your goals:
1. Analyse the user's answers to identify real vulnerabilities.
2. Recommend exactly ONE service that best solves their problem.
3. Explain the value clearly in simple, direct language.
4. Speak confidently, like a real expert consultant.
5. Never sugar-coat or speak vaguely—be clear and firm.
6. Always close with:
   - an invitation to take action now
   - your official contact details:
     • Email: oscarfitnessco@gmail.com
     • Phone: (403) 472 1928
7. Keep everything personalised. Use the user’s name, property type, weaknesses, threat level, and selected services.

Tone:
- Direct, professional, human.
- No robotic phrases like “As an AI model.”
- No disclaimers.
- Be focused on *closing the sale politely*, not overdoing it.

The final output format MUST follow:

1. **Summary of Risk**
2. **Identified Weak Points**
3. **Recommended Security Solution (ONE clear service)**
4. **Why This Solves Their Problem**
5. **Simple Action Plan**
6. **Professional Closing with contact info**

End of instructions.

`
                },
                {
                    role: "user",
                    content: JSON.stringify(form)
                }
            ]
        });

        const aiReport = ai.choices[0].message.content;

        // 2. Save to Firestore
        await db.collection("assessments").add({
            ...form,
            aiReport,
            createdAt: new Date().toISOString(),
        });

        // 3. Respond to frontend
        return res.status(200).json({
            message: "Assessment generated",
            aiReport,
        });

    } catch (error) {
        console.error("ASSESSMENT ERROR:", error);
        return res.status(500).json({ error: "Server error" });
    }
}
