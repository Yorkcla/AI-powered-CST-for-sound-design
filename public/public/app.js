document.getElementById('submit').addEventListener('click', async () => {
  const prompt = document.getElementById('prompt').value;
  const responseElement = document.getElementById('response');

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    responseElement.textContent = data.choices[0].text;
  } catch (error) {
    responseElement.textContent = `Error: ${error.toString()}`;
  }
});
