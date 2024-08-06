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

    // Image form for the first half
    document.getElementById('image-form-1').addEventListener('submit', async (event) => {
        event.preventDefault();
        const prompt = document.getElementById('image-prompt-1').value;
    
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
            document.getElementById('image-result-1').innerHTML = `<img src="${imgUrl}" alt="Generated Image" style="width: 100%; height: auto;">`;
            
            // Clear the image prompt input field
            document.getElementById('image-prompt-1').value = '';
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('image-result-1').textContent = 'Error: ' + error.message;
        }
    });

        // Add button to add new storyboard boxes
        const addBoxBtn = document.createElement('button');
        addBoxBtn.textContent = 'Add Storyboard Box';
        addBoxBtn.style.marginBottom = '20px';
        document.getElementById('half-two').insertBefore(addBoxBtn, document.querySelector('.storyboard-container'));
    
        let currentBoxCount = 4;
    
        addBoxBtn.addEventListener('click', () => {
            if (currentBoxCount < 8) {
                currentBoxCount++;
                const newBox = document.createElement('div');
                newBox.classList.add('storyboard-box');
                newBox.innerHTML = `
                    <input type="checkbox" class="phase-checkbox" id="phase${currentBoxCount}-checkbox">
                    <label for="phase${currentBoxCount}-checkbox" class="checkbox-label"></label>
                    <h3>Phase ${currentBoxCount}</h3>
                    <textarea class="storyboard-text" placeholder="Enter text for Box ${currentBoxCount}"></textarea>
                    <div class="storyboard-image" id="storyboard-image-${currentBoxCount}">No image</div>
                `;
                document.querySelector('.storyboard-container').appendChild(newBox);
            }
            if (currentBoxCount >= 8) {
                addBoxBtn.disabled = true; // Disable button if maximum reached
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
    updateProgressBar(30);
    
});