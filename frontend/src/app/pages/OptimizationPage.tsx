import { useState } from 'react';
import { Download, RefreshCw, CheckCircle } from 'lucide-react';

export function OptimizationPage() {
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleDownload = () => {
    // Mock download functionality
    alert('Downloading optimized resume...');
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => setIsRegenerating(false), 1500);
  };

  // Mock resume content
  const originalResume = {
    name: 'John Doe',
    contact: 'john.doe@email.com | (555) 123-4567',
    summary: 'Software developer with experience in web development.',
    experience: [
      {
        title: 'Software Developer',
        company: 'Tech Company',
        period: 'Jan 2022 - Present',
        bullets: [
          'Worked on web applications',
          'Collaborated with team members',
          'Fixed bugs and improved code'
        ]
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS']
  };

  const optimizedResume = {
    name: 'John Doe',
    contact: 'john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe',
    summary: 'Results-driven Full-Stack Software Developer with 2+ years of experience building scalable web applications using React, Node.js, and modern JavaScript frameworks. Proven track record of improving application performance and delivering high-quality solutions.',
    experience: [
      {
        title: 'Full-Stack Software Developer',
        company: 'Tech Company',
        period: 'Jan 2022 - Present',
        bullets: [
          'Architected and developed 10+ responsive web applications using React, TypeScript, and Node.js, serving 50K+ active users',
          'Collaborated with cross-functional Agile teams to deliver features 25% faster using Git workflows',
          'Optimized application performance by 40% through code refactoring, reducing load time from 3s to 1.8s',
          'Implemented RESTful APIs and integrated MongoDB database, handling 10K+ daily transactions'
        ]
      }
    ],
    skills: [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 
      'MongoDB', 'Git', 'REST APIs', 'HTML/CSS', 'Agile'
    ]
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-[#1F2937] mb-2">Resume Optimization</h2>
          <p className="text-[#4B5563]">Compare your original resume with the AI-optimized version</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="px-5 py-2.5 bg-white border border-gray-300 text-[#1F2937] rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
            {isRegenerating ? 'Regenerating...' : 'Regenerate'}
          </button>
          <button
            onClick={handleDownload}
            className="px-5 py-2.5 bg-[#0F766E] text-white rounded-lg font-medium hover:bg-[#0D6259] flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Download className="w-4 h-4" />
            Download Optimized Resume
          </button>
        </div>
      </div>

      {/* Two-column comparison */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Original Resume */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-[#1F2937]">Original Resume</h3>
            <p className="text-xs text-[#4B5563] mt-1">Your current version</p>
          </div>
          
          <div className="space-y-6 text-sm">
            {/* Header */}
            <div className="pb-4 border-b border-gray-200">
              <h4 className="text-xl font-bold text-[#1F2937]">{originalResume.name}</h4>
              <p className="text-xs text-[#4B5563] mt-1">{originalResume.contact}</p>
            </div>

            {/* Summary */}
            <div>
              <h5 className="font-semibold text-[#1F2937] mb-2 text-sm">Professional Summary</h5>
              <p className="text-[#4B5563] leading-relaxed text-sm">{originalResume.summary}</p>
            </div>

            {/* Experience */}
            <div>
              <h5 className="font-semibold text-[#1F2937] mb-3 text-sm">Experience</h5>
              {originalResume.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-[#1F2937] text-sm">{exp.title}</p>
                      <p className="text-xs text-[#4B5563]">{exp.company}</p>
                    </div>
                    <span className="text-xs text-[#4B5563]">{exp.period}</span>
                  </div>
                  <ul className="space-y-2 ml-4">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="text-[#4B5563] text-sm leading-relaxed list-disc">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <h5 className="font-semibold text-[#1F2937] mb-3 text-sm">Technical Skills</h5>
              <div className="flex flex-wrap gap-2">
                {originalResume.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-[#4B5563] px-3 py-1.5 rounded-md text-xs font-medium border border-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Optimized Resume */}
        <div className="bg-white border-2 border-[#14B8A6] rounded-lg p-6 shadow-lg relative">
          {/* AI Badge */}
          <div className="absolute -top-3 right-6 bg-[#0F766E] text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
            <CheckCircle className="w-3 h-3" />
            AI Optimized
          </div>
          
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-[#1F2937]">Optimized Resume</h3>
            <p className="text-xs text-[#4B5563] mt-1">Enhanced for ATS compatibility</p>
          </div>
          
          <div className="space-y-6 text-sm">
            {/* Header */}
            <div className="pb-4 border-b border-gray-200 bg-[#F0FDFA] -mx-6 px-6 py-4 -mt-2 rounded-t-lg">
              <h4 className="text-xl font-bold text-[#1F2937]">{optimizedResume.name}</h4>
              <p className="text-xs text-[#4B5563] mt-1">{optimizedResume.contact}</p>
            </div>

            {/* Summary */}
            <div className="bg-[#F0FDFA] -mx-6 px-6 py-4 rounded-lg">
              <h5 className="font-semibold text-[#1F2937] mb-2 text-sm">Professional Summary</h5>
              <p className="text-[#1F2937] leading-relaxed text-sm">{optimizedResume.summary}</p>
            </div>

            {/* Experience */}
            <div className="bg-[#F0FDFA] -mx-6 px-6 py-4 rounded-lg">
              <h5 className="font-semibold text-[#1F2937] mb-3 text-sm">Experience</h5>
              {optimizedResume.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-[#1F2937] text-sm">{exp.title}</p>
                      <p className="text-xs text-[#4B5563]">{exp.company}</p>
                    </div>
                    <span className="text-xs text-[#4B5563]">{exp.period}</span>
                  </div>
                  <ul className="space-y-2 ml-4">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="text-[#1F2937] text-sm leading-relaxed list-disc">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="bg-[#F0FDFA] -mx-6 px-6 py-4 rounded-lg">
              <h5 className="font-semibold text-[#1F2937] mb-3 text-sm">Technical Skills</h5>
              <div className="flex flex-wrap gap-2">
                {optimizedResume.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-[#14B8A6] text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Improvements Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold text-[#1F2937] mb-5">Key Improvements Made</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: 'Quantified Achievements',
              description: 'Added specific metrics and numbers to demonstrate measurable impact',
              icon: '📊'
            },
            {
              title: 'Action Verbs',
              description: 'Used strong action verbs like "Architected" and "Optimized"',
              icon: '⚡'
            },
            {
              title: 'Keywords Optimized',
              description: 'Incorporated missing keywords naturally throughout the resume',
              icon: '🎯'
            },
            {
              title: 'Enhanced Summary',
              description: 'Created compelling professional summary with key achievements',
              icon: '✨'
            },
            {
              title: 'Job Title Alignment',
              description: 'Aligned job title with industry standards for better ATS matching',
              icon: '🏆'
            },
            {
              title: 'Professional Links',
              description: 'Added LinkedIn profile to improve professional presence',
              icon: '🔗'
            }
          ].map((improvement, index) => (
            <div key={index} className="p-4 bg-[#F8F6F2] rounded-lg border border-gray-200 hover:border-[#14B8A6] transition-colors duration-200">
              <div className="text-2xl mb-2">{improvement.icon}</div>
              <h4 className="font-semibold text-[#1F2937] mb-1 text-sm">{improvement.title}</h4>
              <p className="text-xs text-[#4B5563] leading-relaxed">{improvement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
