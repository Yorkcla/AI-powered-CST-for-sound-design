# AI-Powered-CST-for-Sound-Design

This prototype is a web application designed for sonic interaction design with a focus on tonal cognition. It integrates interaction design methods, including user scenarios and task analysis, with principles of functional harmony. The development of this prototype will be presented at the Australian Human-Computer Interaction Conference 2024. A link to the publication will be updated soon.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/AI-powered-CST-for-sound-design.git
   cd AI-powered-CST-for-sound-design
   ```

2. **Install Node.js**:
   Download and install Node.js from [nodejs.org](https://nodejs.org/). This will also install npm (Node Package Manager) automatically.

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
   - `tonal`

   Note: `tone.js` is included via the `index2.html` file.

4. **Set up the OpenAI API key**:
   Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

5. **Check the settings**:
   If you are using the Live Server for development, you may want to check the `settings.json` file to ensure your configuration aligns with your project requirements.

After completing these steps, you should be ready to run the application!


## Usage

To start the application, run the following command in your terminal:

```bash
npm start
```

Once the server is running, you can access the application in your web browser at `http://localhost:5501` (check your local settings for the port number).

### First Page
1. Write the theme of your storyboard.
2. Specify each phase with brief explanations and images.
3. Add more phase boxes if needed.
4. Use the GenAI features for ideation based on the number of your storyboard phases.
5. Visualise the ideas for each phase.

### Second Page
6. Select phases to assign sound.
7. Request chord progression options using the GenAI feature and input the chords for the selected phases.
8. Listen to sound assignments with rhythmic examples for each function.

### Third Page
9. Confirm the final inclusive output, including the theme, phase details, and assigned chords.

More details about each feature and overall usage will be explained in the published paper, and the link will be uploaded soon.

## License

This project is licensed under the MIT License, which allows for reuse, modification, and distribution under certain conditions. See the [LICENSE](LICENSE) file for full details.

