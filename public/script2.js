
    // Next Step Button
    const nextStepBtn = document.getElementById('next-step-btn');

    if (nextStepBtn) {
        nextStepBtn.addEventListener('click', () => {
            window.location.href = 'index2.html'; // Replace with the URL of your next HTML file
        });
    }

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
    

    //uploading a file
    document.querySelectorAll('.upload-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const boxId = event.target.getAttribute('data-box-id');
            const fileInput = document.getElementById(`file-input-${boxId}`);
            const file = fileInput.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imgElement = document.createElement('img');
                    imgElement.src = e.target.result;
                    imgElement.style.width = '100%';
                    imgElement.style.height = 'auto';

                    const imageBox = document.getElementById(`image-box-${boxId}`);
                    imageBox.innerHTML = '';
                    imageBox.appendChild(imgElement);
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select an image file first.');
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const theme = localStorage.getItem('storyboardTheme');
        if (theme) {
            document.getElementById('text-theme-1').value = theme;
        } else {
            alert('No storyboard theme found');
        }
    
        let currentBoxCount = parseInt(localStorage.getItem('currentBoxCount') || '4', 10);
    
        function loadPhases() {
            // Clear existing boxes if needed
            const container = document.querySelector('.storyboard-container');
            container.innerHTML = ''; // Clear old boxes
    
            for (let i = 1; i <= currentBoxCount; i++) {
                const phase = localStorage.getItem(`storyboardPhase-${i}`) || '';
                const newBox = document.createElement('div');
                newBox.classList.add('storyboard-box');
                newBox.innerHTML = `
                    <h3>Phase ${i}</h3>
                    <textarea id="text-box-${i}" placeholder="Enter text for Box ${i}" readonly>${phase}</textarea>
                    <div class="storyboard-image" id="storyboard-image-${i}">No image</div>
                    <!-- Image upload functionality can be added if needed -->
                `;
                container.appendChild(newBox);
            }
        }
    
        loadPhases();
    });
    
    