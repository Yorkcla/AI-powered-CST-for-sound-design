document.getElementById('text-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const prompt = document.getElementById('text-prompt').value;

    try {
        const response = await fetch('http://localhost:3001/generate-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Extract the result sentence
        const resultSentence = data.choices[0].message.content;

        // Append the user and chatbot messages to the chat history
        appendMessage('user', prompt);
        appendMessage('chatbot', resultSentence);

        // Clear the prompt input field
        document.getElementById('text-prompt').value = '';
    } catch (error) {
        console.error('Error:', error);
        appendMessage('chatbot', 'Error: ' + error.message);
    }
});

document.getElementById('image-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const prompt = document.getElementById('image-prompt').value;

    try {
        const response = await fetch('http://localhost:3001/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const imgUrl = data.data[0].url;
        document.getElementById('image-result').innerHTML = `<img src="${imgUrl}" alt="Generated Image" />`;
        
        // Clear the image prompt input field
        document.getElementById('image-prompt').value = '';
    } catch (error) {
        document.getElementById('image-result').textContent = 'Error: ' + error.message;
    }
});

// Function to create and append a new message element
function appendMessage(role, content) {
    const chatHistory = document.getElementById('text-result');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + (role === 'user' ? 'user-message' : 'chatbot-message');
    messageDiv.innerHTML = `<p>${content}</p>`;
    chatHistory.appendChild(messageDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to the bottom
}
