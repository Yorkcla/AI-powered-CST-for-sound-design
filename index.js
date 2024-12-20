// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3001;

// Set up OpenAI configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// CORS middleware
const cors = require('cors');
app.use(cors({
    origin: 'http://127.0.0.1:5501'  // Allow requests from this origin
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Route for text generation
app.post('/generate-text', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500,
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route for image generation
app.post('/generate-image', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            model: 'dall-e-3',
            quality: 'hd',
            style: 'vivid',
            size: '1024x1024'
        });
        
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});