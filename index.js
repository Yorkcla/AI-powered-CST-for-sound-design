// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const OpenAI = require('openai');  // Updated import

const app = express();
const port = process.env.PORT || 3001;

// Set up OpenAI configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // This is the default, can be omitted
});

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
        const response = await openai.chat.completions.create({  // Updated method
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500,
        });

        res.json(response.choices[0].message); // Access message in response
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route for image generation
app.post('/generate-image', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await openai.images.generate({  // Updated method
            prompt: prompt,
            n: 1,
            model: 'dall-e-3',
            quality: 'hd',
            style: 'vivid',
            size: '1024x1024'
        });
        
        res.json(response.data);  // Assuming response structure is the same
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
