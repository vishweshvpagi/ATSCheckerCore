import pdfplumber
import docx

def parse_resume(file):
    if file.filename.endswith('.pdf'):
        with pdfplumber.open(file) as pdf:
            return '\n'.join([page.extract_text() or '' for page in pdf.pages])
    elif file.filename.endswith('.docx'):
        doc = docx.Document(file)
        return '\n'.join([para.text for para in doc.paragraphs])
    return ''
