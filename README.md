# AI-Powered-CST-for-Sound-Design


This web application prototype supports sonic interaction design through tonal cognition, integrating user scenarios and task analysis with functional harmony principles. It will be presented at the Australian Computer-Human Interaction Conference 2024, with a publication link forthcoming.


## Installation

To set up the project locally, follow these steps:


1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/AI-powered-CST-for-sound-design.git
   cd AI-powered-CST-for-sound-design
   ```


2. **Install Node.js**:
   Download and install Node.js from [here](https://nodejs.org/). This will also install npm (Node Package Manager) automatically.


3. **Install dependencies**:
   After installing Node.js, ensure that you have npm installed. Then run the following command to install the project dependencies listed in the `package.json` file:
   ```bash
   npm install
   ```


   The required dependencies include:
   - `cors`
   - `dotenv`
   - `express`
   - `openai`


   Note: `tone.js` and `tonal.js` are included via the `index2.html` file. 


4. **Set up the OpenAI API key**:
   Open the `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```


5. **Check the settings**:
   For development with Live Server, check settings.json to ensure it aligns with your project requirements.


After completing these steps, you should be ready to run the application!


## Usage


To start the application, run the following command in your terminal:


```bash
npm start
```


Once the server is running, you can access the application in your web browser at `http://localhost:5501` (check your local settings for the port number).


### First Page
1. Write the theme of your storyboard; should be saved.
2. Specify each phase with brief explanations and images; should be saved.
3. Add more phase boxes if needed.
4. Use the GenAI features for ideation based on the number of your storyboard phases.
5. Visualise the ideas for each phase if needed.


### Second Page
6. Select phases to assign sound.
7. Request chord progression options using the GenAI feature and input the chords for the selected phases.
8. Listen to assigned sounds with rhythmic examples for each function.


### Third Page
9. Confirm the final output, including the theme, phase details, and assigned chords.


More details about the overall usage will be explained in the published paper, and the link will be uploaded soon.


## License


This project is licensed under the MIT License, which allows for reuse, modification, and distribution under certain conditions. See the [LICENSE](LICENSE) file for full details.
