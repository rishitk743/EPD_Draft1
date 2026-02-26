import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Upload, FileText, CheckCircle, XCircle, Lightbulb, Sparkles, Target } from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  // Mock analysis results
  const [analysisResults] = useState({
    atsScore: 78,
    matchedKeywords: [
      'React', 'JavaScript', 'TypeScript', 'Node.js', 'Git',
      'HTML/CSS', 'REST APIs', 'MongoDB', 'Express', 'Agile'
    ],
    missingKeywords: [
      'Docker', 'Kubernetes', 'AWS', 'CI/CD', 'GraphQL',
      'Jest', 'Redux', 'Microservices'
    ],
    suggestions: [
      'Add Technical Skills Section: Include a dedicated technical skills section highlighting Docker, Kubernetes, and AWS.',
      'Quantify Your Achievements: Add metrics and numbers to your experience bullets (e.g., "Improved performance by 40%").',
      'Include Relevant Projects: Add projects that demonstrate experience with microservices architecture.',
      'Update Technical Stack: Mention experience with GraphQL and Redux if applicable.'
    ]
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleJobDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setJobDescription(text);
    setCharCount(text.length);
  };

  const handleAnalyze = () => {
    if (!selectedFile || !jobDescription.trim()) {
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-semibold text-[#1F2937] mb-2">Resume Analysis</h2>
        <p className="text-[#4B5563]">Upload your resume and paste the job description to get your ATS compatibility score</p>
      </div>

      {/* Input Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Card 1: Resume Upload */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Resume Upload</h3>
          
          <label className="block">
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileSelect}
              className="hidden"
              id="resume-upload"
            />
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#14B8A6] hover:bg-[#F0FDFA] transition-all duration-200"
              onClick={() => document.getElementById('resume-upload')?.click()}
            >
              {selectedFile ? (
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#E6F7F4] rounded-full flex items-center justify-center mb-3">
                    <FileText className="w-7 h-7 text-[#0F766E]" />
                  </div>
                  <p className="text-sm font-semibold text-[#1F2937]">{selectedFile.name}</p>
                  <p className="text-xs text-[#4B5563] mt-1">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                    className="text-xs text-[#DC2626] mt-2 hover:underline"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <Upload className="w-7 h-7 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-[#1F2937] mb-1">Upload PDF or DOCX</p>
                  <p className="text-xs text-[#4B5563]">or drag and drop</p>
                </div>
              )}
            </div>
          </label>
          
          <p className="text-xs text-[#4B5563] mt-3 flex items-start gap-2">
            <span className="text-[#14B8A6]">•</span>
            Supported formats: PDF, DOCX (max 5MB)
          </p>
        </div>

        {/* Card 2: Job Description */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1F2937]">Job Description</h3>
            <span className="text-xs text-[#4B5563] bg-gray-100 px-2 py-1 rounded">{charCount} characters</span>
          </div>
          
          <textarea
            value={jobDescription}
            onChange={handleJobDescChange}
            placeholder="Paste the complete job description here...

Include:
• Required skills and qualifications
• Job responsibilities  
• Technical requirements
• Preferred experience"
            className="w-full h-56 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent resize-none text-sm text-[#1F2937] placeholder:text-[#9CA3AF] transition-all duration-200"
          />
          
          <p className="text-xs text-[#4B5563] mt-3 flex items-start gap-2">
            <span className="text-[#14B8A6]">•</span>
            Paste the full job posting for accurate keyword matching
          </p>
        </div>
      </div>

      {/* Analyze Button */}
      <div className="flex justify-center">
        <button
          onClick={handleAnalyze}
          disabled={!selectedFile || !jobDescription.trim() || isAnalyzing}
          className="px-8 py-3.5 bg-[#0F766E] text-white rounded-lg font-semibold hover:bg-[#0D6259] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </div>

      {/* Results Section */}
      {hasAnalyzed && (
        <div className="space-y-6 mt-12 animate-in fade-in duration-500">
          {/* ATS Score Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-md">
            <h3 className="text-xl font-semibold text-[#1F2937] mb-6 text-center">ATS Score Overview</h3>
            <div className="flex items-center justify-center flex-col">
              <div className="relative w-40 h-40 mb-4">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#E5E7EB"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#14B8A6"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - analysisResults.atsScore / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl font-bold text-[#1F2937]">{analysisResults.atsScore}%</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#4B5563] font-medium">Keyword Match Score</p>
              <p className="text-xs text-[#6B7280] mt-1">Your resume matches the job requirements</p>
            </div>
          </div>

          {/* Keywords Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Matched Keywords */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#16A34A]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1F2937]">Matched Keywords</h3>
              </div>
              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                {analysisResults.matchedKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-green-50 text-[#16A34A] text-sm font-medium rounded-md border border-green-200 hover:bg-green-100 transition-colors duration-200"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-[#DC2626]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1F2937]">Missing Keywords</h3>
              </div>
              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                {analysisResults.missingKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-red-50 text-[#DC2626] text-sm font-medium rounded-md border border-red-200 hover:bg-red-100 transition-colors duration-200"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Suggestions Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-[#0F766E]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1F2937]">Improvement Suggestions</h3>
            </div>
            <ul className="space-y-4">
              {analysisResults.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3 p-4 bg-[#F0FDFA] rounded-lg border border-[#99F6E4] hover:border-[#5EEAD4] transition-colors duration-200">
                  <span className="w-6 h-6 bg-[#14B8A6] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-sm text-[#1F2937] leading-relaxed">{suggestion}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Next Step Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => navigate('/optimize')}
              className="px-8 py-3.5 bg-[#0F766E] text-white rounded-lg font-semibold hover:bg-[#0D6259] transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Target className="w-5 h-5" />
              Generate Optimized Resume
            </button>
          </div>
        </div>
      )}
    </div>
  );
}