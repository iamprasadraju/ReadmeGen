# ReadmeGen

ReadmeGen is a developer-friendly web application that instantly transforms your project descriptions into polished, markdown-formatted README files. Made with ❤️ for developers, it streamlines the process of creating high-quality documentation with just a few clicks.
![Screenshot 2025-03-02 214737](https://github.com/user-attachments/assets/a0261db6-d87d-4171-8ba8-ac42a1121b5a)

## Features

- **Instant README Generation:** Transform plain project descriptions into well-structured, markdown-formatted README files.
- **Live Markdown Preview:** See your README rendered in real time as you type, powered by Marked.js.
- **Dark/Light Mode Toggle:** Seamlessly switch between dark and light themes to match your coding environment.
- **API Key Validation:** Securely validate and store your Google Studio API key to generate content using backend services.
- **Easy Copy & Download:** Copy the generated README to your clipboard or download it as a markdown file with one click.
- **Responsive Design:** Optimized for both desktop and mobile devices using Tailwind CSS.

## Getting Started

### Prerequisites

- **Backend Framework:**  
  The project uses a backend (e.g., Flask) to handle the `/generate` endpoint. Ensure you have Python installed if you’re running a Flask server.
- **API Key:**  
  You will need a Google Studio API key. You can obtain one from [Google MakerSuite](https://makersuite.google.com/app/apikey).

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/readmegen.git
   cd readmegen
   ```

2. **Set Up the Backend:**

   If using Flask, create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

   Install the required packages:

   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Application:**

   Start the Flask server (or your chosen backend):

   ```bash
   flask run
   ```

   Then navigate to `http://localhost:5000` in your browser to access the application.

## Usage

1. **Enter Your API Key:**  
   Input your Google Studio API key in the provided field and click "Activate" to validate and save the key.
2. **Provide Project Details:**  
   Type or paste your project description into the input area.
3. **Generate Your README:**  
   Click the "Generate" button. The app sends your description to the backend and generates a markdown README.
4. **Preview & Adjust:**  
   View the live preview of your README. Use the copy button to save it to your clipboard or download it directly as a `README.md` file.
5. **Toggle Theme:**  
   Use the theme toggle button in the top right corner to switch between dark and light modes.

## Technology Stack

- **Frontend:** HTML, CSS (Tailwind CSS), JavaScript, and Marked.js
- **Backend:** Flask (or your preferred web framework)
- **Storage:** Local storage for saving API keys and theme preferences

## Customization

- **Logo:**  
  Replace the header SVG with your custom logo. Update the favicon by adding the following line in your `<head>` section:

  ```html
  <link rel="icon" type="image/svg+xml" href="{{ url_for('static', filename='logo.svg') }}">
  ```

- **Styling:**  
  Tailwind CSS and custom CSS files allow you to modify the design and layout to match your branding.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or feedback, please reach out at [workspace.iamprasadraju@gmail.com](mailto:workspace.iamprasadraju@gmail.com).

---

ReadmeGen makes it easy to generate professional README files so you can focus on building great projects. Enjoy streamlined documentation creation and happy coding!

