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

});

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
            const imageHtml = `
                <img src="${imgUrl}" alt="Generated Image" style="width: 100%; height: auto;">
                <button id="save-image" data-url="${imgUrl}">Save Image</button>
            `;
            document.getElementById('image-result-1').innerHTML = imageHtml;
            
            // Clear the image prompt input field
            document.getElementById('image-prompt-1').value = '';
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('image-result-1').textContent = 'Error: ' + error.message;
        }
    });
    
    // Event listener for saving the image
    document.getElementById('image-result-1').addEventListener('click', (event) => {
        if (event.target && event.target.id === 'save-image') {
            const imgUrl = event.target.getAttribute('data-url');

            // Create and click a link element to download the image
            const link = document.createElement('a');
            link.href = imgUrl;
            link.download = 'generated-image.png';
            link.target = '_blank'; //opens the image in a new tap
            link.click();
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

    document.addEventListener('DOMContentLoaded', (event) => {
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
                    <h3>Phase ${currentBoxCount}</h3>
                    <textarea id="text-box-${currentBoxCount}" placeholder="Enter text for Box ${currentBoxCount}"></textarea>
                    <div class="storyboard-image" id="image-box-${currentBoxCount}">No image</div>
                    <input type="file" class="file-input" id="file-input-${currentBoxCount}" accept="image/*">
                    <button type="button" class="upload-btn" data-box-id="${currentBoxCount}">Upload Image</button>
                `;
                document.querySelector('.storyboard-container').appendChild(newBox);
                attachUploadEventListener(); // Attach event listeners for the new box
                localStorage.setItem('currentBoxCount', currentBoxCount);
                if (currentBoxCount >= 8) {
                    addBoxBtn.disabled = true;
                }
            }
        });
    
        // Function to handle image uploading
        function handleImageUpload(event) {
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
        }
    
        // Function to attach event listeners for image uploading
        function attachUploadEventListener() {
            document.querySelectorAll('.upload-btn').forEach(button => {
                button.addEventListener('click', handleImageUpload);
            });
        }
    
        // Attach event listeners for initial boxes
        attachUploadEventListener();
    });
    
    //saving theme, phase,
    document.addEventListener('DOMContentLoaded', function() {
        function saveTheme() {
            const theme = document.getElementById('text-theme-1').value;
            localStorage.setItem('storyboardTheme', theme);
            alert('Theme saved!');
        }
    
        function savePhase() {
            // Use currentBoxCount directly
            const currentBoxCount = parseInt(localStorage.getItem('currentBoxCount') || '4', 10);
        
            for (let i = 1; i <= currentBoxCount; i++) {
                // Save text data
                const textBox = document.getElementById(`text-box-${i}`);
                if (textBox) {
                    const phase = textBox.value;
                    localStorage.setItem(`storyboardPhase-${i}`, phase);
                }
        
                // Save image data
                const fileInput = document.getElementById(`file-input-${i}`);
                if (fileInput && fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        localStorage.setItem(`storyboardImage-${i}`, event.target.result);
                    };
                    reader.readAsDataURL(file);
                } else {
                    localStorage.removeItem(`storyboardImage-${i}`); // Remove if no image
                }
            }
            alert('Phases and images saved!');
        }
        
        // Make saveTheme and savePhase accessible globally
        window.saveTheme = saveTheme;
        window.savePhase = savePhase;
        
    });
    