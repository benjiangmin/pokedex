import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors()); // This allows your Vite app (port 5173) to talk to this server (port 3001)
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/search', async (req, res) => {
  try {
    const { userQuery } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are a Pokemon filter. Return ONLY JSON: { \"types\": [], \"minStats\": { \"Speed\": 0, \"Attack\": 0 }, \"sortBy\": \"\" }" 
        },
        { role: "user", content: userQuery }
      ],
      response_format: { type: "json_object" }
    });

    const filterRules = JSON.parse(completion.choices[0].message.content);
    res.json(filterRules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI failed to process query" });
  }
});

app.listen(3001, () => {
  console.log('AI Server running on http://localhost:3001');
});