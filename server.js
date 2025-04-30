const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Add node-fetch for API calls

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = 'AIzaSyDPLzjJwvtskPkEyP8ob_NOb94Vo6IAChw';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

app.post('/ask', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    });
    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Sorry, no reply generated.';
    res.json({ reply });
  } catch (error) {
    console.error('Gemini Error:', error.message);
    res.status(500).json({ reply: 'Error communicating with the AI model.' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));