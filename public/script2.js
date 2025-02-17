document.addEventListener('DOMContentLoaded', function() {
    // Next Step Button
    const nextStepBtn = document.getElementById('next-step-btn');
    if (nextStepBtn) {
        nextStepBtn.addEventListener('click', () => {
            window.location.href = 'index3.html'; // Replace with the URL of your next HTML file
        });
    }
    // Previous Step Button
    const previousStepBtn = document.getElementById('previous-step-btn');
    if (previousStepBtn) {
        previousStepBtn.addEventListener('click', () => {
            // Show a confirmation dialog
            const userConfirmed = confirm('Are you sure you want to clear your data and go back?');

            if (userConfirmed) {
                // Clear all data from localStorage
                localStorage.clear();

                // Navigate to the previous page
                window.location.href = 'index.html'; // Replace with the URL of your previous HTML file
            }
            // If the user cancels, do nothing and stay on the current page
        });
    }
});

document.getElementById('dropdown-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const dropdownValue = document.getElementById('variable-dropdown').value;
    const dropdownValue2 = document.getElementById('variable-dropdown2').value;
    const dropdownValue3 = document.getElementById('variable-dropdown3').value;
    let selectedValues = [];

    // Collect selected values from dynamically generated dropdowns
    for (let i = 0; i < dropdownValue; i++) {
        const dropdown = document.getElementById(`dynamic-dropdown-${i+1}`);
        if (dropdown) { // Check if dropdown exists
            const selectedValue = dropdown.options[dropdown.selectedIndex].value;
            selectedValues.push(selectedValue);
        }
    }

    // Create a comma-separated string of selected values
    const selectedValuesString = selectedValues.join(', ');

    // Construct the prompt with the selected values
    const prompt = `Provide 5 chord progression options in ${dropdownValue2} ${dropdownValue3} key for ${dropdownValue} measures, following the tonal functions in the order specified by: ${selectedValuesString}. Please simply suggest the options.`;

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
        console.log('Dropdown-based text generation response:', data);

        if (data.message) {
            appendMessage('user', prompt);
            appendMessage('chatbot', data.message);
        } else {
            appendMessage('chatbot', 'Unexpected response: ' + JSON.stringify(data));
        }
    } catch (error) {
        console.error('Error:', error);
        appendMessage('chatbot', 'Error: ' + error.message, 'text-result-1');
    }
});

document.getElementById('ask-button').addEventListener('click', async (event) => {
    event.preventDefault();

    const inputValue = document.getElementById('notes-output').value;

    // Construct the prompt using the input value
    const prompt = `Provide 5 harmonic note arrangement options (including inversions) for 4 voices based on ${inputValue} with suitable octave numbers. Please simply suggest the options.`;

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

        if (data.message) {
            appendMessage('user', prompt);
            appendMessage('chatbot', data.message);
        } else {
            appendMessage('chatbot', 'Unexpected response: ' + JSON.stringify(data));
        }
    } catch (error) {
        console.error('Error:', error);
        appendMessage('chatbot', 'Error: ' + error.message, 'text-result-1');
    }
});
    
    
    

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('variable-dropdown').addEventListener('change', (event) => {
        const dropdownValue = event.target.value;  // Get the selected value from the dropdown
        const container = document.getElementById('dynamic-dropdown-container');  // Reference the container for the new dropdowns
    
        // Clear any existing dropdowns in the container
        container.innerHTML = '';
    
        // Create the number of dropdowns based on the dropdownValue
        for (let i = 0; i < dropdownValue; i++) {
            const newDropdown = document.createElement('select');
            newDropdown.id = `dynamic-dropdown-${i+1}`;  // Unique ID for each dropdown
    
            // Populate each dropdown with options
            newDropdown.innerHTML = `
                <option value="tonic">Start</option>
                <option value="subdominant">Rising</option>
                <option value="dominant">Peak</option>
                <option value="submediant">Semi-End</option>
                <option value="tonic">End</option>
            `;
    
            // Append the new dropdown to the container
            container.appendChild(newDropdown);
        }
    });    
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

        if (data.message) {
            appendMessage('user', prompt);
            appendMessage('chatbot', data.message);
        } else {
            appendMessage('chatbot', 'Unexpected response: ' + JSON.stringify(data));
        }
    } catch (error) {
        console.error('Error:', error);
        appendMessage('chatbot', 'Error: ' + error.message, 'text-result-1');
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
    
// Example: Update the progress bar to 60%
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
            const isChecked = localStorage.getItem(`storyboardCheckbox-${i}`) === 'true'; // Retrieve checkbox state
            const inputValue = localStorage.getItem(`storyboardInput-${i}`) || ''; // Retrieve input value
    
            const newBox = document.createElement('div');
            newBox.classList.add('storyboard-box');
            newBox.innerHTML = `
                <h3>Phase ${i}</h3>
                <textarea id="text-box-${i}" placeholder="Enter text for Box ${i}" readonly>${phase}</textarea>
                <div class="storyboard-image" id="storyboard-image-${i}">
                    ${imageData ? `<img src="${imageData}" alt="Phase ${i} Image" style="max-width: 100%; height: auto;">` : 'No image'}
                </div>
                <label>
                    <input type="checkbox" class="checkbox" id="checkbox-${i}" ${isChecked ? 'checked' : ''}>
                </label>
                ${isChecked ? `<input type="text" id="input-${i}" value="${inputValue}">` : ''}
            `;
            container.appendChild(newBox);
    
            // Add event listener to handle checkbox changes
            const checkbox = document.getElementById(`checkbox-${i}`);
            if (checkbox) {
                checkbox.addEventListener('change', (event) => {
                    const isChecked = event.target.checked;
                    localStorage.setItem(`storyboardCheckbox-${i}`, isChecked);
    
                    // Toggle text input visibility
                    const inputFieldId = `input-${i}`;
                    let inputField = document.getElementById(inputFieldId);
                    if (isChecked) {
                        if (!inputField) {
                            inputField = document.createElement('input');
                            inputField.type = 'text';
                            inputField.id = inputFieldId;
                            inputField.placeholder = 'Assign a chord';
                            checkbox.parentElement.appendChild(inputField);
                        }
                        inputField.style.display = 'inline-block'; // Show input field
                    } else {
                        if (inputField) {
                            inputField.style.display = 'none'; // Hide input field
                        }
                    }

                    // Toggle completed class
                    if (isChecked) {
                        newBox.classList.add('completed');
                    } else {
                        newBox.classList.remove('completed');
                    }
                });
            }
    
            // Add event listener to handle input field changes
            const inputField = document.getElementById(`input-${i}`);
            if (inputField) {
                inputField.addEventListener('input', (event) => {
                    localStorage.setItem(`storyboardInput-${i}`, event.target.value);
                });
            }
        }
    }
    
    loadPhases();
});

//saving theme, phase,
document.addEventListener('DOMContentLoaded', function() {        
    function savePhase() {
        // Use currentBoxCount directly
        const currentBoxCount = parseInt(localStorage.getItem('currentBoxCount') || '4', 10);
    
        for (let i = 1; i <= currentBoxCount; i++) {
            // Get the checkbox element
            const checkbox = document.getElementById(`checkbox-${i}`);
            if (checkbox && checkbox.checked) {
                // Save text data
                const textBox = document.getElementById(`text-box-${i}`);
                if (textBox) {
                    const phase = textBox.value;
                    localStorage.setItem(`storyboardPhase-${i}`, phase);
                }
    
                // Save input data if the checkbox is checked
                const inputField = document.getElementById(`input-${i}`);
                if (inputField) {
                    const inputValue = inputField.value;
                    localStorage.setItem(`storyboardInput-${i}`, inputValue);
                } else {
                    localStorage.removeItem(`storyboardInput-${i}`); // Remove if no input
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
                }
            } else {
                // If checkbox is not checked, remove saved data
                localStorage.removeItem(`storyboardPhase-${i}`);
                localStorage.removeItem(`storyboardInput-${i}`);
                localStorage.removeItem(`storyboardImage-${i}`);
            }
        }
        alert('Phases saved!');
    }
    
    // Make savePhase accessible globally
    window.savePhase = savePhase;
    
});

document.getElementById('play-arpeggio').addEventListener('click', async () => {
    // Get values from the four note inputs
    const note1 = document.getElementById('note1').value.trim();
    const note2 = document.getElementById('note2').value.trim();
    const note3 = document.getElementById('note3').value.trim();
    const note4 = document.getElementById('note4').value.trim();

    // Combine the notes into an array and filter out any empty strings
    const chordNotes = [note1, note2, note3, note4].filter(note => note);

    // If all fields are empty, do nothing
    if (chordNotes.length === 0) return;
    
    // Get the selected pattern from the dropdown
    const pattern = document.getElementById('style-select').value;

    // Define rhythm patterns based on the selected pattern
    const rhythmPatterns = {
        start: [0.5, 0.1, 0.1, 0.1],    // Short, medium, long
        rising: [0.1, 0.2, 0.3, 0.7], // Gradual increase
        peak: [0.7, 0.7, 0.7, 0.7],      // Medium, long, very long
        semiend: [0.1, 0.1, 0.1, 0.3], // Medium to long
        end: [0.1, 0.1, 0.1, 0.5]       // Long to very long
    };

    const rhythmPattern = rhythmPatterns[pattern] || [0.2, 0.4, 0.6]; // Default to 'start'

    // Initialize the Tone.js synth
    const synth = new Tone.PolySynth().toDestination();
    
    // Ensure Tone.js is ready
    await Tone.start();
    
    // Schedule each note with a different rhythm
    chordNotes.forEach((note, index) => {
        // Use the index to select the rhythm duration from the pattern
        const duration = rhythmPattern[index % rhythmPattern.length];
        
        // Play the note with the specified duration and a small delay between each
        synth.triggerAttackRelease(note, duration, Tone.now() + index * 0.3);
    });
});

document.getElementById('play-chord').addEventListener('click', async () => {
    // Get values from the three note inputs
    const note1 = document.getElementById('note1').value.trim();
    const note2 = document.getElementById('note2').value.trim();
    const note3 = document.getElementById('note3').value.trim();
    const note4 = document.getElementById('note4').value.trim();

    // Combine the notes into an array and filter out any empty strings
    const chordNotes = [note1, note2, note3, note4].filter(note => note);

    // If all fields are empty, do nothing
    if (chordNotes.length === 0) return;
    
    // Initialize the Tone.js synth
    const synth = new Tone.PolySynth().toDestination();
    
    // Ensure Tone.js is ready
    await Tone.start();
    
    // Play the chord with a release time of 0.2 seconds
    synth.triggerAttackRelease(chordNotes, 0.2);
});
        
document.getElementById('get-notes-button').addEventListener('click', () => {
    // Get the chord input value
    const chordInput = document.getElementById('chord-input').value.trim();
    
    // Get the notes from the chord using Tonal.js
    const chord = Tonal.Chord.get(chordInput);
    const chordNotes = chord.notes || []; // If chord is invalid, notes will be an empty array
    
    // Display the notes in the output field
    document.getElementById('notes-output').value = chordNotes.join(' ');
});
        
    

        
        
        