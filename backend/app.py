from flask import Flask, request, jsonify
from flask_cors import CORS
from parser import parse_resume
from matcher import match_resume

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_resume():
    file = request.files['resume']
    job_desc = request.form['job_description']
    resume_text = parse_resume(file)
    score, matched_skills = match_resume(resume_text, job_desc)
    return jsonify({
        'score': score,
        'matched_skills': matched_skills
    })

if __name__ == '__main__':
    app.run(debug=True)
