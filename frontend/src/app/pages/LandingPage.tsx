import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { 
  FileCheck, 
  Target, 
  Sparkles, 
  Download,
  ArrowRight
} from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Hero Section */}
      <section className="py-16 border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 bg-blue-50 text-[#2563EB] px-4 py-2 rounded-lg text-sm font-medium border border-blue-200">
              <Sparkles size={16} />
              AI-Powered ATS Optimization
            </span>
          </div>
          
          <h1 className="text-5xl font-bold text-[#111827] mb-6">
            Build ATS-Optimized Resumes in Seconds
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Upload your resume, paste a job description, and get instant ATS score analysis 
            with AI-powered optimization suggestions.
          </p>
          
          <Button 
            size="lg" 
            onClick={() => navigate('/dashboard')}
            className="group"
          >
            Get Started
            <ArrowRight className="ml-2 inline-block group-hover:translate-x-1 transition-transform" size={20} />
          </Button>

          <div className="mt-12 flex justify-center gap-12 text-center">
            <div>
              <p className="text-3xl font-bold text-[#2563EB]">3 Steps</p>
              <p className="text-sm text-gray-600 mt-1">Quick Process</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#2563EB]">AI-Powered</p>
              <p className="text-sm text-gray-600 mt-1">Smart Analysis</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#2563EB]">Instant</p>
              <p className="text-sm text-gray-600 mt-1">Real-time Results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#111827] mb-3">
              Key Features
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need for ATS-optimized resumes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FileCheck,
                title: 'ATS Score Analysis',
                description: 'Instant feedback on resume-job match percentage',
              },
              {
                icon: Target,
                title: 'Keyword Matching',
                description: 'Identify matched and missing keywords',
              },
              {
                icon: Sparkles,
                title: 'AI Optimization',
                description: 'Automated resume content optimization',
              },
              {
                icon: Download,
                title: 'Export Resume',
                description: 'Download optimized resume instantly',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-[#2563EB] transition-colors"
              >
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-[#2563EB]" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#111827] mb-3">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple three-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Upload Resume',
                description: 'Upload your resume in PDF or DOCX format',
              },
              {
                step: '2',
                title: 'Paste Job Description',
                description: 'Copy and paste the target job description',
              },
              {
                step: '3',
                title: 'Get Results',
                description: 'Receive ATS score and optimization suggestions',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center"
              >
                <div className="w-12 h-12 bg-[#2563EB] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-[#111827] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
            >
              Start Analysis
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#111827] mb-6">
            About This Project
          </h2>
          <div className="space-y-4 text-left bg-white border border-gray-200 rounded-lg p-8">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-[#111827]">Project Title:</strong> Smart Resume Builder with ATS Optimization
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-[#111827]">Description:</strong> This application helps students and job seekers optimize their resumes for Applicant Tracking Systems (ATS). It analyzes resumes against job descriptions, calculates match scores, identifies keywords, and generates optimization suggestions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-[#111827]">Technology Stack:</strong> React, TypeScript, Tailwind CSS, AI/NLP for keyword analysis
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-[#111827]">Purpose:</strong> Final-year engineering project demonstrating practical application of web development and AI technologies to solve real-world job market challenges.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}