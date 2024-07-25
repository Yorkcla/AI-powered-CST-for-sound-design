document.getElementById('text-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const prompt = document.getElementById('text-prompt').value;

    const response = await fetch(/generate-text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    document.getElementById('text-result').textContent = JSON.stringify(data, null, 2);
});

document.getElementById('image-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const prompt = document.getElementById('image-prompt').value;

    const response = await fetch(/generate-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    const imgUrl = data.data[0].url;
    document.getElementById('image-result').innerHTML = `<img src="${imgUrl}" alt="Generated Image" />`;
});