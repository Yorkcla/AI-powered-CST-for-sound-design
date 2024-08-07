    document.addEventListener('DOMContentLoaded', function() {
        // Next Step Button
        const nextStepBtn = document.getElementById('next-step-btn');
        if (nextStepBtn) {
            nextStepBtn.addEventListener('click', () => {
                window.location.href = 'index2.html'; // Replace with the URL of your next HTML file
            });
        }

        // Previous Step Button
        const previousStepBtn = document.getElementById('previous-step-btn');
        if (previousStepBtn) {
            previousStepBtn.addEventListener('click', () => {
                window.location.href = 'index.html'; // Replace with the URL of your previous HTML file
            });
        }
    });

    // Text form for the first half
    document.getElementById('text-form-1').addEventListener('submit', async (event) => {
        event.preventDefault();
        const prompt = document.getElementById('text-prompt-1').value;

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

            const resultSentence = data.choices[0].message.content;

            // Append the user and chatbot messages to the chat history
            appendMessage('user', prompt);
            appendMessage('chatbot', resultSentence);

            // Clear the prompt input field
            document.getElementById('text-prompt-1').value = '';
        } catch (error) {
            console.error('Error:', error);
            appendMessage('chatbot', 'Error: ' + error.message);
        }
    });

    // Function to create and append a new message element
    function appendMessage(role, content) {
        const chatHistory = document.getElementById('text-result-1');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ' + (role === 'user' ? 'user-message' : 'chatbot-message');
        messageDiv.innerHTML = `<p>${content}</p>`;
        chatHistory.appendChild(messageDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to the bottom
    }

    function updateProgressBar(percentage) {
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.width = `${percentage}%`;
    }
    
    // Example: Update the progress bar to 50%
    updateProgressBar(60);

    document.addEventListener('DOMContentLoaded', function() {
        // Load and display the theme
        const theme = localStorage.getItem('storyboardTheme');
        if (theme) {
            document.getElementById('text-theme-1').value = theme;
        } else {
            alert('No storyboard theme found');
        }
    
        // Retrieve the current box count from localStorage
        let currentBoxCount = parseInt(localStorage.getItem('currentBoxCount') || '4', 10);
    
        function loadPhases() {
            // Clear existing boxes if needed
            const container = document.querySelector('.storyboard-container');
            container.innerHTML = ''; // Clear old boxes
    
            for (let i = 1; i <= currentBoxCount; i++) {
                const phase = localStorage.getItem(`storyboardPhase-${i}`) || '';
                const imageData = localStorage.getItem(`storyboardImage-${i}`); // Retrieve image data
    
                const newBox = document.createElement('div');
                newBox.classList.add('storyboard-box');
                newBox.innerHTML = `
                    <h3>Phase ${i}</h3>
                    <textarea id="text-box-${i}" placeholder="Enter text for Box ${i}" readonly>${phase}</textarea>
                    <div class="storyboard-image" id="storyboard-image-${i}">
                        ${imageData ? `<img src="${imageData}" alt="Phase ${i} Image" style="max-width: 100%; height: auto;">` : 'No image'}
                    </div>
                `;
                container.appendChild(newBox);
            }
        }
    
        loadPhases();
    });
    
    
    