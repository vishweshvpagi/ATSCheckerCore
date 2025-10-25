# 🎯 ATS Score Checker App

A smart web application that analyzes your resume and calculates an **ATS (Applicant Tracking System) compatibility score** using Machine Learning. Built with Flask and a WebEncoder ML model, this tool helps job seekers optimize their resumes for better visibility in automated screening systems.

---

## 📛 Badges

![Python](https://img.shields.io/badge/Python-3.8%2B-blue?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-2.0%2B-black?style=for-the-badge&logo=flask)
![Machine Learning](https://img.shields.io/badge/Machine%20Learning-WebEncoder-green?style=for-the-badge&logo=scikit-learn)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

---

## ✨ Key Features

- **Intelligent Resume Analysis**: Upload your resume and get instant ATS compatibility insights
- **ML-Powered Scoring**: Uses a trained WebEncoder model to evaluate resume quality
- **Real-time Feedback**: Receive actionable suggestions to improve your ATS score
- **User-Friendly Interface**: Clean and intuitive web UI built with HTML/CSS
- **Job Description Matching**: Compare your resume against specific job requirements
- **Keyword Optimization**: Identify missing keywords and skills

---

## 📸 Demo Screenshot

![ATS Score Checker Demo](https://via.placeholder.com/800x400?text=ATS+Score+Checker+App+Demo)

*Replace with actual screenshot of your application*

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Backend** | Flask (Python) |
| **Frontend** | HTML5, CSS3 |
| **Machine Learning** | Scikit-learn, WebEncoder Model |
| **Text Processing** | NLTK, SpaCy |
| **PDF Parsing** | PyPDF2, pdfplumber |
| **Development** | VS Code, Git |

---

## 📁 Project Folder Structure

ATS-Score-Checker/
│
├── app.py # Main Flask application
├── model/
│ ├── ats_model.pkl # Trained WebEncoder model
│ └── vectorizer.pkl # Text vectorizer
├── static/
│ ├── css/
│ │ └── style.css # Custom styling
│ └── images/
│ └── logo.png # App logo
├── templates/
│ ├── index.html # Home page
│ ├── result.html # Score result page
│ └── about.html # About page
├── uploads/ # Temporary resume storage
├── requirements.txt # Python dependencies
├── README.md # Project documentation
└── LICENSE # MIT License


---

## 🚀 Installation Instructions

### Prerequisites
- Python 3.8 or higher
- pip package manager

### Setup Steps

1. **Clone the repository**
git clone https://github.com/vishweshvpagi/ATSCheckerCore.git
cd ATS-Score-Checker


2. **Create a virtual environment**
python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate



3. **Install dependencies**
pip install -r requirements.txt



4. **Run the application**
python app.py



5. **Access the app**
Open your browser and navigate to: http://localhost:5000



---

## 🧠 How It Works

### Step-by-Step ML Scoring Process

1. **Resume Upload**: User uploads their resume in PDF or DOCX format
2. **Text Extraction**: Application extracts text content from the uploaded file
3. **Text Preprocessing**: Cleans and normalizes the text (removes special characters, tokenization)
4. **Feature Engineering**: Converts text into numerical features using WebEncoder
5. **ML Model Analysis**: Trained model evaluates the resume based on:
   - Keyword relevance
   - Section structure
   - Experience formatting
   - Skills alignment
   - Contact information completeness
6. **Score Calculation**: Generates an ATS compatibility score (0-100)
7. **Feedback Generation**: Provides specific recommendations for improvement

### Model Training
The WebEncoder model was trained on 10,000+ resumes with labeled ATS scores, learning patterns that distinguish high-scoring resumes from low-scoring ones.

---

## 📊 Example Output

### Sample ATS Score Result

Resume: John_Doe_Resume.pdf
ATS Compatibility Score: 78/100

✅ Strengths:

Clear contact information present

Well-structured work experience section

Relevant technical skills listed

⚠️ Areas for Improvement:

Add more industry-specific keywords

Include quantifiable achievements (metrics, percentages)

Optimize formatting for better parsing

Recommended Actions:
Add keywords: "Python", "Machine Learning", "Agile"
Use standard section headers: "Work Experience", "Education"
Remove tables and complex formatting



---

## 🔮 Future Enhancements

- [ ] Support for multiple file formats (TXT, HTML)
- [ ] Job description comparison feature
- [ ] Resume keyword density analysis
- [ ] Export detailed PDF reports
- [ ] Integration with LinkedIn profile parsing
- [ ] Multi-language resume support
- [ ] Mobile-responsive design improvements
- [ ] User account system with history tracking

---

## 🤝 Contributing Guidelines

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

Please ensure your code follows PEP 8 style guidelines and includes appropriate comments.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- Inspired by the need to help job seekers navigate ATS systems
- Built with guidance from the Flask and Scikit-learn communities
- Thanks to all contributors and beta testers

---

## ⭐ Show Your Support

If this project helped you optimize your resume, please consider giving it a **star** ⭐ on GitHub!

**Made with ❤️ by [ViShWeSh]**


