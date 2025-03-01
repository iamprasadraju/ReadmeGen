from flask import Flask, render_template, request, Response, jsonify
import google.generativeai as genai

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_readme():
    try:
        api_key = request.headers.get('X-API-Key')
        text = request.json.get('text', '')

        if not api_key:
            return Response("API key required", status=401)

        if not text.strip():
            return Response("Text input is required", status=400)

        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.0-flash')

        prompt = f"""You are an expert README generator that creates professional, detailed, and Markdown-formatted documentation for software projects. Based on the user-provided project details, please produce a comprehensive README file that includes the following sections:

                    1. Project Title – Clearly state the name of the project.

                    2. Overview/Description – Provide a concise description of what the project does, its purpose, and its key features.
                    3. Installation Instructions – Step-by-step instructions on how to install and set up the project.
                    4.Usage Guidelines – Examples and instructions for how to run and use the project.
                    5. Contributing Guidelines – Information on how others can contribute to the project.
                    6. License – Specify the type of license and any relevant details.
                    7. Additional Sections (optional) – Include any other relevant sections such as FAQ, troubleshooting, or contact information.
                    Ensure that:

                    The text is clear, concise, and professional.
                    Appropriate Markdown formatting is used (headings, bullet points, code blocks where necessary).
                    The tone is friendly yet informative.
                    If any necessary information is missing from the input, clearly ask for clarification or note the missing details.
                    ### Formatting rules: - Use standard markdown syntax - No code block wrappers (```) - Include these sections: **Title, Description, Features, Installation, Usage** - Maintain proper line breaks and spacing - Output ONLY the markdown content {text} Markdown:"""

        response = model.generate_content(prompt)

        # Extract the markdown content safely
        if response and response.candidates:
            markdown_content = response.candidates[0].content.parts[0].text
        else:
            return Response("Error: No response generated", status=500)

        # Return the markdown response
        return Response(markdown_content, mimetype="text/markdown")

    except Exception as e:
        return Response(f"Error: {str(e)}", status=500)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))  # Render assigns this dynamically
    app.run(host='0.0.0.0', port=port)
