import { Clock, FileText, Download, Eye } from 'lucide-react';

export function HistoryPage() {
  // Mock history data
  const historyItems = [
    {
      id: 1,
      fileName: 'Resume_JohnDoe_v1.pdf',
      jobTitle: 'Senior Frontend Developer',
      company: 'Tech Corp',
      atsScore: 78,
      date: '2026-02-20',
      time: '14:30'
    },
    {
      id: 2,
      fileName: 'Resume_JohnDoe_v2.pdf',
      jobTitle: 'Full Stack Engineer',
      company: 'StartupXYZ',
      atsScore: 85,
      date: '2026-02-18',
      time: '10:15'
    },
    {
      id: 3,
      fileName: 'Resume_JohnDoe.pdf',
      jobTitle: 'React Developer',
      company: 'Digital Agency',
      atsScore: 72,
      date: '2026-02-15',
      time: '16:45'
    },
    {
      id: 4,
      fileName: 'Resume_Updated.pdf',
      jobTitle: 'Software Engineer',
      company: 'Enterprise Inc',
      atsScore: 81,
      date: '2026-02-12',
      time: '09:20'
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[#16A34A]';
    if (score >= 60) return 'text-[#14B8A6]';
    return 'text-[#DC2626]';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50';
    if (score >= 60) return 'bg-teal-50';
    return 'bg-red-50';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-semibold text-[#1F2937] mb-2">Analysis History</h2>
        <p className="text-[#4B5563]">View and download your previous resume analyses</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#4B5563] mb-1">Total Analyses</p>
              <p className="text-3xl font-bold text-[#1F2937]">{historyItems.length}</p>
            </div>
            <div className="w-12 h-12 bg-[#F0FDFA] rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#0F766E]" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#4B5563] mb-1">Average Score</p>
              <p className="text-3xl font-bold text-[#1F2937]">
                {Math.round(historyItems.reduce((sum, item) => sum + item.atsScore, 0) / historyItems.length)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <div className="text-2xl">📊</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#4B5563] mb-1">Best Score</p>
              <p className="text-3xl font-bold text-[#16A34A]">
                {Math.max(...historyItems.map(item => item.atsScore))}%
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <div className="text-2xl">🏆</div>
            </div>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#F8F6F2] px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-[#1F2937]">Recent Analyses</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {historyItems.map((item) => (
            <div key={item.id} className="p-6 hover:bg-[#F8F6F2] transition-all duration-200 group">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-[#F0FDFA] rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-[#0F766E]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#1F2937] mb-1 truncate">{item.fileName}</h4>
                    <p className="text-sm text-[#4B5563] mb-2">
                      {item.jobTitle} at {item.company}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.date} at {item.time}</span>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getScoreBg(item.atsScore)}`}>
                        <span className="text-[#4B5563] font-medium">ATS Score:</span>
                        <span className={`font-bold ${getScoreColor(item.atsScore)}`}>
                          {item.atsScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 text-[#4B5563] hover:text-[#0F766E] hover:bg-[#F0FDFA] rounded-lg transition-all duration-200">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-[#4B5563] hover:text-[#0F766E] hover:bg-[#F0FDFA] rounded-lg transition-all duration-200">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
