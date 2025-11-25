import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { txt } = req.body;

  if (!txt || !txt.trim()) {
    return res.status(400).json({ error: "Missing text" });
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are **Oscardyne Security AI**.

Your job:
- Protect the user.
- Detect threats, scams, fraud, danger, or suspicious activity.
- Give **direct, real explanations** with zero sugar-coating.
- Speak like a trained security analyst, not a therapist.
- If the user looks confused, vulnerable, or in danger, warn them immediately.
- Always provide reliable, actionable guidance — not vague advice.
- If a user needs emergency help, provide the Oscardyne emergency contact information:

📞 Emergency Line: (403) 472 1928  
📧 Email: oscarfitnessco@gmail.com

You MUST make it clear the user can rely on Oscardyne for support and immediate response.

Never be soft. Never pity them. Be sharp, calm, and professional.
        `,
        },
        { role: "user", content: txt },
      ],
    });

    const aiReply = response.choices[0].message.content;

    return res.status(200).json({ reply: aiReply });
  } catch (err) {
    console.error("AI ERROR:", err);
    return res.status(500).json({ error: "AI request failed." });
  }
}
