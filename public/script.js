document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('onboarding-modal');
    const closeBtn = document.querySelector('.close-btn');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const finishBtn = document.querySelector('.finish-btn');
    const steps = document.querySelectorAll('.step');
    let currentStep = 0;

    function showStep(step) {
        steps.forEach((el, index) => {
            el.style.display = index === step ? 'block' : 'none';
        });
    }

    function nextStep() {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    }

    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    }

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    nextBtns.forEach(btn => {
        btn.addEventListener('click', nextStep);
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', prevStep);
    });

    finishBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    showStep(currentStep);
    modal.style.display = 'block';

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
            console.log('Text generation response:', data);

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
            console.log('Image generation response:', data);

            const imgUrl = data.data[0].url;
            document.getElementById('image-result').innerHTML = `<img src="${imgUrl}" alt="Generated Image" />`;
            
            // Clear the image prompt input field
            document.getElementById('image-prompt').value = '';
        } catch (error) {
            console.error('Error:', error);
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
});
