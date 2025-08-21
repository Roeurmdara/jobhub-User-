"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Setdetail = () => {
  const [activeTab, setActiveTab] = useState("Login Details")
  const [formData, setFormData] = useState({
    currentEmail: "jakegyll@email.com",
    newEmail: "",
    oldPassword: "",
    newPassword: "",
  })
  const [isEmailVerified, setIsEmailVerified] = useState(true)
  const [showCloseAccountModal, setShowCloseAccountModal] = useState(false)

  const tabs = ["My Profile", "Login Details", "Notifications"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdateEmail = (e) => {
    e.preventDefault()
    console.log("Updating email to:", formData.newEmail)
    // Add email update logic here
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    console.log("Changing password")
    // Add password change logic here
  }

  const handleCloseAccount = () => {
    setShowCloseAccountModal(true)
  }

  const handleBackToHomepage = () => {
    navigate('/')
  }
  const navigate = useNavigate()
  

  return (
    <div className="min-h-screen bg-gray-50 sm:ml-64">
      <div className="p-4 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <button
            onClick={handleBackToHomepage}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Back to homepage
          </button>
        </div>

        {/* Settings Content */}
        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "Login Details" && (
              <div className="space-y-8">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Basic Information</h3>
                  <p className="text-gray-600 text-sm">This is login information that you can update anytime.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Update Email Section */}
                  <div>
                    <div className="mb-6">
                      <h4 className="text-base font-semibold text-gray-900 mb-2">Update Email</h4>
                      <p className="text-gray-600 text-sm mb-4">Update your email address to make sure it is safe</p>

                      {/* Current Email Display */}
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{formData.currentEmail}</span>
                          {isEmailVerified && (
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">Your email address is verified.</p>
                      </div>

                      {/* Update Email Form */}
                      <form onSubmit={handleUpdateEmail}>
                        <div className="mb-4">
                          <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700 mb-2">
                            Update Email
                          </label>
                          <input
                            type="email"
                            id="newEmail"
                            name="newEmail"
                            value={formData.newEmail}
                            onChange={handleInputChange}
                            placeholder="Enter your new email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Update Email
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Change Password Section */}
                  <div>
                    <div className="mb-6">
                      <h4 className="text-base font-semibold text-gray-900 mb-2">New Password</h4>
                      <p className="text-gray-600 text-sm mb-4">Manage your password to make sure it is safe</p>

                      {/* Change Password Form */}
                      <form onSubmit={handleChangePassword} className="space-y-4">
                        <div>
                          <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Old Password
                          </label>
                          <input
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleInputChange}
                            placeholder="Enter your old password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          />
                          <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
                        </div>

                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            placeholder="Enter your new password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          />
                          <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
                        </div>

                        <button
                          type="submit"
                          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Change Password
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "My Profile" && (
              <div className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                  <p className="text-gray-600 text-sm">Update your personal details and profile information.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Profile Picture & Basic Info */}
                  <div className="space-y-6">
                    {/* Profile Picture */}
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-4">Profile Picture</h4>
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                          <img
                            src="/placeholder.svg?height=80&width=80"
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                            Upload New Photo
                          </button>
                          <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB</p>
                        </div>
                      </div>
                    </div>

                    {/* Basic Information Form */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                          <input
                            type="text"
                            defaultValue="Jake"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                          <input
                            type="text"
                            defaultValue="Gyll"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                        <input
                          type="text"
                          defaultValue="Product Designer"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input
                          type="text"
                          defaultValue="Manchester, UK"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          defaultValue="+44 1245 572 135"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* About & Social Links */}
                  <div className="space-y-6">
                    {/* About Me */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">About Me</label>
                      <textarea
                        rows={6}
                        defaultValue="I'm a product designer - filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">Brief description for your profile</p>
                    </div>

                    {/* Social Links */}
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-4">Social Links</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                          <input
                            type="url"
                            placeholder="https://linkedin.com/in/username"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                          <input
                            type="url"
                            defaultValue="https://twitter.com/jakegyll"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Website</label>
                          <input
                            type="url"
                            defaultValue="https://www.jakegyll.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-4">
                      <button className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Notifications" && (
              <div className="space-y-8">
                {/* Notification Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Notification Preferences</h3>
                  <p className="text-gray-600 text-sm">
                    Choose how you want to be notified about job opportunities and updates.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Email Notifications */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-4">Email Notifications</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Job Alerts</p>
                            <p className="text-xs text-gray-500">Get notified about new job opportunities</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Application Updates</p>
                            <p className="text-xs text-gray-500">Updates on your job applications</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Company Messages</p>
                            <p className="text-xs text-gray-500">Messages from potential employers</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Weekly Summary</p>
                            <p className="text-xs text-gray-500">Weekly digest of your activity</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Marketing Emails</p>
                            <p className="text-xs text-gray-500">Tips, news, and product updates</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Email Frequency */}
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-4">Email Frequency</h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="frequency"
                            value="immediate"
                            defaultChecked
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-900">Immediate</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="frequency"
                            value="daily"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-900">Daily digest</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="frequency"
                            value="weekly"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-900">Weekly digest</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Push Notifications & Job Alerts */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-4">Push Notifications</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Browser Notifications</p>
                            <p className="text-xs text-gray-500">Get notified in your browser</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Mobile Push</p>
                            <p className="text-xs text-gray-500">Notifications on mobile app</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Job Alert Preferences */}
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-4">Job Alert Preferences</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Job Categories</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                            <option>Design & Creative</option>
                            <option>Technology</option>
                            <option>Marketing</option>
                            <option>Sales</option>
                            <option>All Categories</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                            <option>Entry Level</option>
                            <option>Mid Level</option>
                            <option>Senior Level</option>
                            <option>Executive</option>
                            <option>All Levels</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Location Radius</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                            <option>Within 10 miles</option>
                            <option>Within 25 miles</option>
                            <option>Within 50 miles</option>
                            <option>Remote only</option>
                            <option>Anywhere</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-4">
                      <button className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User Profile Section */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                <img src="/placeholder.svg?height=48&width=48" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Jake Gyll</h3>
                <p className="text-sm text-gray-600">{formData.currentEmail}</p>
              </div>
            </div>
            <button
              onClick={handleCloseAccount}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <span>Close Account</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Close Account Modal */}
        {showCloseAccountModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Close Account</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to close your account? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCloseAccountModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log("Account closed")
                    setShowCloseAccountModal(false)
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Close Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Setdetail
