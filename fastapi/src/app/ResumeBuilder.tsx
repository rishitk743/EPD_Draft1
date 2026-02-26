import { useState } from 'react';
import { apiClient } from '../api/client';
import type { AnalyzeResponse, OptimizeResponse } from '../api/client';

export function ResumeBuilder() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<AnalyzeResponse | null>(null);
  const [optimized, setOptimized] = useState<OptimizeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const result = await apiClient.uploadResume(file);
      setResumeText(result.resume_text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) {
      setError('Please provide both resume and job description');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await apiClient.analyzeResume({
        resume_text: resumeText,
        job_description: jobDescription,
      });
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOptimize = async () => {
    if (!resumeText || !analysis) {
      setError('Please analyze resume first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await apiClient.optimizeResume({
        resume_text: resumeText,
        job_description: jobDescription,
        missing_keywords: analysis.missing_keywords,
      });
      setOptimized(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Optimization failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!optimized) return;

    setLoading(true);
    setError(null);

    try {
      const blob = await apiClient.generateDocx({
        optimized_resume: optimized.optimized_resume,
      });
      apiClient.downloadResume(blob);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-builder">
      {error && <div className="error-message">{error}</div>}
      
      <section>
        <h2>Upload Resume</h2>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileUpload}
          disabled={loading}
        />
        {resumeText && <p>✓ Resume loaded ({resumeText.length} characters)</p>}
      </section>

      <section>
        <h2>Job Description</h2>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
          rows={6}
        />
      </section>

      <button onClick={handleAnalyze} disabled={loading || !resumeText || !jobDescription}>
        {loading ? 'Analyzing...' : 'Analyze Resume'}
      </button>

      {analysis && (
        <section>
          <h3>Analysis Results</h3>
          <p>ATS Score: <strong>{analysis.ats_score}%</strong></p>
          <p>Matched Keywords: {analysis.matched_keywords.join(', ')}</p>
          <p>Missing Keywords: {analysis.missing_keywords.join(', ')}</p>
          <button onClick={handleOptimize} disabled={loading}>
            {loading ? 'Optimizing...' : 'Optimize Resume'}
          </button>
        </section>
      )}

      {optimized && (
        <section>
          <h3>Optimized Resume</h3>
          <textarea value={optimized.optimized_resume} readOnly rows={10} />
          <button onClick={handleDownload} disabled={loading}>
            {loading ? 'Generating...' : 'Download as DOCX'}
          </button>
        </section>
      )}
    </div>
  );
}