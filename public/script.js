document.getElementById('text-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const prompt = document.getElementById('text-prompt').value;

    try {
        const response = await fetch('http://localhost:5500/generate-text', {
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
        document.getElementById('text-result').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('text-result').textContent = 'Error: ' + error.message;
    }
});

document.getElementById('image-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const prompt = document.getElementById('image-prompt').value;

    try {
        const response = await fetch('http://localhost:5500/generate-image', {
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
    } catch (error) {
        document.getElementById('image-result').textContent = 'Error: ' + error.message;
    }
});
