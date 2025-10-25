```markdown
# 🧠 ATS Score Checker App  
**AI-Powered Resume Compatibility Evaluator using Flask + ML WebEncoder**

![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![Flask](https://img.shields.io/badge/Flask-Web%20Framework-lightgrey)
![ML](https://img.shields.io/badge/Machine%20Learning-WebEncoder%20Model-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

A web application that calculates the **ATS (Applicant Tracking System) score** between a user’s resume and a job description using **Machine Learning embeddings**. This tool helps job applicants ensure their resumes are optimized to pass automated screening systems used by recruiters.

---

## 🚀 Features

- 🔍 Upload or Paste Resume and Job Description
- 🤖 ML-Powered Similarity Scoring using WebEncoder model
- 📊 Real-time ATS Score Percentage
- 🔑 Keyword Match & Optimization Suggestions
- 🌐 User-friendly Web Interface (Flask + HTML/CSS)

---

## 🛠 Tech Stack

| Component   | Technology Used         |
|------------|--------------------------|
| Frontend   | HTML5, CSS, Bootstrap(optional), Jinja2 Templates |
| Backend    | Flask (Python)          |
| Machine Learning | WebEncoder / Sentence Embedding Model |
| Deployment | Localhost / Render / Heroku |

---

## 📂 Project Structure

```

ats-score-checker/
│
├── app.py                # Flask application entry point
├── model/                # WebEncoder model files
├── utils.py              # Helper functions for text preprocessing and scoring
├── templates/
│   └── index.html        # Main UI template
├── static/
│   └── style.css         # Optional styling file
├── requirements.txt      # Python dependencies
└── README.md             # Project documentation

````

---

## ⚙️ Installation

### 1️⃣ Clone this Repository
```bash
git clone https://github.com/<your-username>/ats-score-checker.git
cd ats-score-checker
````

### 2️⃣ Create Virtual Environment

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
```

### 3️⃣ Install Requirements

```bash
pip install -r requirements.txt
```

### 4️⃣ Run Application

```bash
python app.py
```

Now open your browser and go to:

```
http://127.0.0.1:5000/
```

---

## 🧠 How It Works

1. User uploads resume or pastes text
2. User pastes job description
3. ML WebEncoder model extracts embeddings
4. Cosine similarity is calculated
5. ATS score is generated (0–100%)
6. Relevant keyword suggestions are shown

---

## 📈 Example Output

| Metric       | Score                                      |
| ------------ | ------------------------------------------ |
| ATS Score    | 78%                                        |
| Match Status | ✅ Good Match                               |
| Suggestions  | Add keywords like `Python`, `API`, `Flask` |

---

## 🔮 Future Enhancements

* 🌐 Job description auto-fetch using URLs
* 🧾 Resume keyword highlighter
* 🤖 AI-powered resume rewriting suggestions
* 📊 Multiple job comparison dashboard

---

## 🤝 Contributing

Contributions are always welcome!

1. Fork the repository
2. Create a new feature branch
3. Submit a pull request 🎉

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🙌 Acknowledgements

* Flask Framework
* HuggingFace WebEncoder Model
* scikit-learn & numpy
* OpenAI & NLP Community

---

### ⭐ If you found this project useful, don't forget to star the repo!

```
```
