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

const systemPrompt = `
You are a specialized Pokedex Translation Engine. Your sole purpose is to convert natural language into a JSON filter object.

### OUTPUT FORMAT:
Return ONLY a valid JSON object. No preamble, no markdown formatting, no explanations.

### DATA SCHEMA:
- "types": Array of strings. Use capitalized first letter (e.g., ["Fire", "Water"]).
- "minStats": Object with keys: "HP", "Attack", "Defense", "Special Attack", "Special Defense", "Speed". Values must be integers.
- "color": String. Must be lowercase (e.g., "blue", "red", "green").

### LOGIC RULES:
1. Only include fields the user explicitly mentions or implies.
5. If the user mentions a color, map it to the "color" field using lowercase.
6. If the user asks for a specific Pokemon by name, return a "name" key with the name in lowercase.

### EXAMPLES:
User: "fast fire types"
Result: { "types": ["Fire"], "minStats": { "Speed": 90 } }

User: "bulky blue pokemon"
Result: { "color": "blue", "minStats": { "Defense": 80 } }
`;

app.post('/api/search', async (req, res) => {
  try {
    const { userQuery } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
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