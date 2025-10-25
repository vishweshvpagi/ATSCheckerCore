import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, Download, Loader2, Star } from 'lucide-react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const validateFile = (file) => {
    if (!file) return false;
    
    // Check file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      setError('File too large. Maximum size allowed is 2MB.');
      return false;
    }
    
    // Check file type
    const allowedTypes = ['.pdf', '.docx', '.doc'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      setError('Invalid file type. Please upload PDF, DOC, or DOCX files only.');
      return false;
    }
    
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setResume(file);
      setError('');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setResume(file);
        setError('');
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!resume || !jobDesc.trim()) {
      setError('Please upload a resume and provide a job description.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const formData = new FormData();
      formData.append('resume', resume);
      formData.append('job_description', jobDesc);

      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Upload error:', error);
      setError(
        error.message || 
        'Failed to analyze resume. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!result) return;
    
    const reportContent = `
RESUME ANALYSIS REPORT
======================

Overall Score: ${result.score}%

MATCHED SKILLS:
${result.matched_skills?.map(skill => `• ${skill}`).join('\n') || 'None'}

MISSING SKILLS:
${result.missing_skills?.map(skill => `• ${skill}`).join('\n') || 'None'}

RECOMMENDATIONS:
${result.recommendations?.map(rec => `• ${rec}`).join('\n') || 'None'}

KEYWORD ANALYSIS:
${result.keyword_density ? Object.entries(result.keyword_density)
  .map(([keyword, count]) => `• ${keyword}: ${count} occurrences`)
  .join('\n') : 'Not available'}

Generated on: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-analysis-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="App min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="header-title text-4xl font-bold text-gray-900 mb-2">
            AI Resume Screener
          </h1>
          <p className="text-gray-600">
            Upload your resume and job description to get an instant compatibility analysis
          </p>
        </div>

        {/* Upload Form */}
        <div className="card bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Resume
              </label>
              <div
                className={`file-upload-area border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50 drag-active'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="space-y-2">
                  <p className="text-gray-600">
                    Drag and drop your resume here, or{' '}
                    <label className="text-blue-600 cursor-pointer hover:text-blue-800">
                      browse files
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF, DOC, DOCX up to 2MB
                  </p>
                </div>
              </div>
              {resume && (
                <div className="file-upload-success mt-2 flex items-center text-sm text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {resume.name} ({(resume.size / 1024).toFixed(1)} KB)
                </div>
              )}
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                placeholder="Paste the job description here..."
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                rows={8}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                <XCircle className="h-5 w-5 text-red-600 mr-3" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleUpload}
              disabled={loading || !resume || !jobDesc.trim()}
              className="btn-primary w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="loading-spinner animate-spin h-5 w-5 mr-2" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  Analyze Resume
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="results-container card bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
              <button
                onClick={downloadReport}
                className="download-btn flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </button>
            </div>

            {/* Score Display */}
            <div className="score-display mb-8">
              <div className="flex items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mr-4">
                  Compatibility Score
                </h3>
                <span className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                  {result.score}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`score-progress h-4 rounded-full transition-all duration-500 ${getScoreBgColor(result.score)}`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Poor Match</span>
                <span>Excellent Match</span>
              </div>
            </div>

            {/* Matched Skills */}
            {result.matched_skills && result.matched_skills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Matched Skills ({result.matched_skills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.matched_skills.map((skill, index) => (
                    <span
                      key={index}
                      className="skill-tag skill-matched bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Skills */}
            {result.missing_skills && result.missing_skills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                  Missing Skills ({result.missing_skills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.missing_skills.map((skill, index) => (
                    <span
                      key={index}
                      className="skill-tag skill-missing bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Star className="h-5 w-5 text-blue-600 mr-2" />
                  Recommendations
                </h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="recommendation-item flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Keyword Density */}
            {result.keyword_density && Object.keys(result.keyword_density).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Keyword Frequency Analysis
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(result.keyword_density).map(([keyword, count]) => (
                    <div key={keyword} className="keyword-card bg-gray-50 p-3 rounded-lg">
                      <div className="font-medium text-gray-900">{keyword}</div>
                      <div className="text-sm text-gray-600">{count} occurrences</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
