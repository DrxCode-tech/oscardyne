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
          content: "You are Oscardyne Security AI. You analyze threats, detect fraud, and give direct answers with no sugar-coating.",
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
