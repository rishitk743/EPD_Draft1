import { User, Bell, Globe, Save } from 'lucide-react';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-semibold text-[#1F2937] mb-2">Settings</h2>
        <p className="text-[#4B5563]">Manage your account preferences and application settings</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 bg-[#F0FDFA] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-[#0F766E]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1F2937]">Profile Settings</h3>
                <p className="text-xs text-[#4B5563]">Update your personal information</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="john.doe@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 bg-[#F0FDFA] rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#0F766E]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1F2937]">Notifications</h3>
                <p className="text-xs text-[#4B5563]">Manage how you receive updates</p>
              </div>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-[#F8F6F2] rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                <div>
                  <span className="text-sm font-medium text-[#1F2937] block">Email notifications</span>
                  <span className="text-xs text-[#4B5563]">Receive updates via email</span>
                </div>
                <input 
                  type="checkbox" 
                  className="w-5 h-5 text-[#0F766E] rounded border-gray-300 focus:ring-[#14B8A6] cursor-pointer" 
                  defaultChecked 
                />
              </label>
              <label className="flex items-center justify-between p-4 bg-[#F8F6F2] rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                <div>
                  <span className="text-sm font-medium text-[#1F2937] block">Analysis completion alerts</span>
                  <span className="text-xs text-[#4B5563]">Get notified when analysis is done</span>
                </div>
                <input 
                  type="checkbox" 
                  className="w-5 h-5 text-[#0F766E] rounded border-gray-300 focus:ring-[#14B8A6] cursor-pointer" 
                  defaultChecked 
                />
              </label>
              <label className="flex items-center justify-between p-4 bg-[#F8F6F2] rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                <div>
                  <span className="text-sm font-medium text-[#1F2937] block">Weekly tips and suggestions</span>
                  <span className="text-xs text-[#4B5563]">Helpful resume writing tips</span>
                </div>
                <input 
                  type="checkbox" 
                  className="w-5 h-5 text-[#0F766E] rounded border-gray-300 focus:ring-[#14B8A6] cursor-pointer" 
                />
              </label>
              <label className="flex items-center justify-between p-4 bg-[#F8F6F2] rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                <div>
                  <span className="text-sm font-medium text-[#1F2937] block">Job alerts</span>
                  <span className="text-xs text-[#4B5563]">Matching job opportunities</span>
                </div>
                <input 
                  type="checkbox" 
                  className="w-5 h-5 text-[#0F766E] rounded border-gray-300 focus:ring-[#14B8A6] cursor-pointer" 
                />
              </label>
            </div>
          </div>

          {/* Language & Region */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 bg-[#F0FDFA] rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#0F766E]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1F2937]">Language & Region</h3>
                <p className="text-xs text-[#4B5563]">Customize your experience</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">Language</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent transition-all duration-200 bg-white">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1F2937] mb-2">Timezone</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent transition-all duration-200 bg-white">
                  <option>Pacific Time (PT)</option>
                  <option>Eastern Time (ET)</option>
                  <option>Central Time (CT)</option>
                  <option>Mountain Time (MT)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Account Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Account Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-[#F0FDFA] rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-[#0F766E]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1F2937]">John Doe</p>
                  <p className="text-xs text-[#4B5563]">Student</p>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-200 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#4B5563]">Member since</span>
                  <span className="font-medium text-[#1F2937]">Feb 2026</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#4B5563]">Total analyses</span>
                  <span className="font-medium text-[#1F2937]">4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 text-left text-sm text-[#1F2937] hover:bg-[#F8F6F2] rounded-lg transition-colors duration-200">
                Export my data
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-[#1F2937] hover:bg-[#F8F6F2] rounded-lg transition-colors duration-200">
                Privacy settings
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-[#DC2626] hover:bg-red-50 rounded-lg transition-colors duration-200">
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button className="px-8 py-3 bg-[#0F766E] text-white rounded-lg font-semibold hover:bg-[#0D6259] transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
