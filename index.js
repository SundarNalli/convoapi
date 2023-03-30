// Import required modules
const express = require('express');
//const axios = require('axios');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require("openai");

// Load environment variables
dotenv.config();

// Set up Express app
const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// API route for calling OpenAI API
app.post('/api/convoapi', async (req, res) => {
  const { prompt, maxTokens } = req.body;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: maxTokens,
      temperature: 0.4,
    });
    res.status(200).json(response.data.choices[0].text.trim().replace(/[^a-zA-Z0-9 ]/g, ""));
  } catch (error) {
   console.error(error); 
    res.status(500).json({ message: 'Error calling OpenAI API' });
  }
});

// Start server
const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Server running on ports ${port}`);
});
