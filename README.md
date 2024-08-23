# TELEDOC

TELEDOC is a React-based application designed to assist in diagnosing patient symptoms using AI technologies, specifically LangChain and Gemini AI. This application allows users to select symptoms from predefined options, add custom symptoms, and receive diagnostic suggestions based on their inputs.

## Features

- **Symptom Selection:** Choose from a list of predefined symptoms using checkboxes.
- **Custom Symptoms:** Add additional symptoms through a text box.
- **Diagnosis:** Submit symptoms to get a diagnosis and medication suggestions.
- **User Interface:** Responsive and user-friendly design with styled components and animations.

## Installation

To get started with TELEDOC, follow these steps:

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/anuran0/TELEDOC.git
    ```

2. **Navigate to the Project Directory:**

    ```bash
    cd TELEDOC
    ```

3. **Install Dependencies:**

    ```bash
    npm install
    ```

4. **Run the Application:**

    ```bash
    npm start
    ```

   This will start the development server and open the application in your default web browser.

## Usage

1. **Select Symptoms:** Use the checkboxes to choose symptoms from the predefined list.
2. **Add Custom Symptoms:** Enter additional symptoms in the text box.
3. **Submit:** Click the submit button to send your symptom data to the backend.
4. **View Results:** The application will display the diagnostic results and medication suggestions.

## API

The application sends a POST request to the following endpoint:

- **Endpoint:** `http://127.0.0.1:8000/diagnose`
- **Method:** POST
- **Payload:** A string containing the selected and custom symptoms.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please create a pull request or open an issue.

1. **Fork the Repository**
2. **Create a New Branch:**

    ```bash
    git checkout -b feature/your-feature
    ```

3. **Make Your Changes**
4. **Commit Your Changes:**

    ```bash
    git commit -m "Add your message here"
    ```

5. **Push to the Branch:**

    ```bash
    git push origin feature/your-feature
    ```

6. **Create a Pull Request**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **LangChain** and **Gemini AI** for their powerful AI capabilities.
- **React** and **Styled-Components** for creating a responsive and stylish UI.

---

For any questions or support, please open an issue on GitHub or contact the repository owner.

