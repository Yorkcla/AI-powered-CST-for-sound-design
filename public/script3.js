document.addEventListener('DOMContentLoaded', function() {
    // Previous Step Button
    const previousStepBtn = document.getElementById('previous-step-btn');
    if (previousStepBtn) {
        previousStepBtn.addEventListener('click', () => {

                // Navigate to the previous page
                window.location.href = 'index2.html'; // Replace with the URL of your previous HTML file
            // If the user cancels, do nothing and stay on the current page
        });
    }
});

function updateProgressBar(percentage) {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${percentage}%`;
}

// Example: Update the progress bar to 100%
updateProgressBar(100);

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
            const isChecked = localStorage.getItem(`storyboardCheckbox-${i}`) === 'true'; // Retrieve checkbox state
            if (isChecked) { // Only create boxes for checked items
                const phase = localStorage.getItem(`storyboardPhase-${i}`) || '';
                const imageData = localStorage.getItem(`storyboardImage-${i}`); // Retrieve image data
                const inputValue = localStorage.getItem(`storyboardInput-${i}`) || ''; // Retrieve input value

                const newBox = document.createElement('div');
                newBox.classList.add('storyboard-box');
                newBox.innerHTML = `
                    <h3>Phase ${i}</h3>
                    <textarea id="text-box-${i}" placeholder="Enter text for Box ${i}" readonly>${phase}</textarea>
                    <div class="storyboard-image" id="storyboard-image-${i}">
                        ${imageData ? `<img src="${imageData}" alt="Phase ${i} Image" style="max-width: 100%; height: auto;">` : 'No image'}
                    </div>
                    <p>${inputValue}</p> <!-- Display input value as text -->
                `;
                container.appendChild(newBox);
            }
        }
    }

    loadPhases();
});



