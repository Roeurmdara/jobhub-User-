"use client"

import { useState } from "react"

export default function CompanyProfile() {
  const [activeTab, setActiveTab] = useState("profile")
    const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isNewJobDialogOpen, setIsNewJobDialogOpen] = useState(false)
   const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-Time",
    tags: "",
    description: "",
  })
  const [filters, setFilters] = useState({
    status: "all",
    jobType: "all",
    applicantRange: "all",
  })
  const [customDateRange, setCustomDateRange] = useState({
    startDate: "",
    endDate: "",
  })
   const handleCreateJob = () => {
    if (!newJob.title || !newJob.company || !newJob.location) {
      alert("Please fill in all required fields (Title, Company, Location)")
      return
    }

    const today = new Date()
    const dueDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000) // 2 weeks from now

    const jobListing = {
      id: Math.max(...allJobListings.map((job) => job.id)) + 1,
      role: newJob.title,
      status: "Live",
      datePosted: today.toISOString().split("T")[0],
      dueDate: dueDate.toISOString().split("T")[0],
      jobType: newJob.type === "Full-Time" ? "Fulltime" : newJob.type,
      applicants: 0,
      needs: "0 / 1",
    }

    setAllJobListings((prev) => [jobListing, ...prev])

    // Reset form and close modal
    setNewJob({
      title: "",
      company: "",
      location: "",
      salary: "",
      type: "Full-Time",
      tags: "",
      description: "",
    })
    setIsNewJobDialogOpen(false)
  }

  // Sample data with real images
  const techStack = [
    {
      name: "HTML 5",
      color: "bg-orange-500",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS 3",
      color: "bg-blue-500",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "JavaScript",
      color: "bg-yellow-500",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "Ruby",
      color: "bg-red-500",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
    },
    {
      name: "React",
      color: "bg-blue-400",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    
  ]

  const officeLocations = [
    { country: "United States", flag: "https://flagcdn.com/w40/us.png", isHQ: true },
    { country: "England", flag: "https://flagcdn.com/w40/gb.png", isHQ: false },
    { country: "Japan", flag: "https://flagcdn.com/w40/jp.png", isHQ: false },
    { country: "Australia", flag: "https://flagcdn.com/w40/au.png", isHQ: false },
    { country: "China", flag: "https://flagcdn.com/w40/cn.png", isHQ: false },
  ]

  const teamMembers = [
    {
      name: "Celestin Gardinier",
      role: "CEO & Co-Founder",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      twitter: "https://twitter.com/celestin",
      linkedin: "https://linkedin.com/in/celestin",
    },
    {
      name: "Reynaud Colbert",
      role: "Co-Founder",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      twitter: "https://twitter.com/reynaud",
      linkedin: "https://linkedin.com/in/reynaud",
    },
    {
      name: "Arienne Lyon",
      role: "Managing Director",
      avatar: "https://i.pinimg.com/736x/f9/60/ed/f960ed9515953ebe379cc05c78c34cac.jpg",
      twitter: "https://twitter.com/arienne",
      linkedin: "https://linkedin.com/in/arienne",
    },
  ]

  const benefits = [
    {
      title: "Full Healthcare",
      description: "We believe in thriving communities and that starts with our team being happy and healthy.",
      icon: "https://i.pinimg.com/736x/7d/0f/70/7d0f701cb5fa74c8374de417455affa6.jpg",
    },
    {
      title: "Unlimited Vacation",
      description: "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
      icon: "https://i.pinimg.com/736x/0c/04/fa/0c04fade221d5aebdfc64d2ecc3d09ef.jpg",
    },
    {
      title: "Skill Development",
      description:
        "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
      icon: "https://i.pinimg.com/736x/64/e4/f6/64e4f60cf2019ad7fb7d44e2bed405ca.jpg",
    },
    {
      title: "Team Summits",
      description:
        "Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter.",
      icon: "https://i.pinimg.com/1200x/0e/28/e4/0e28e437d696ed1e4377d0adae4075e2.jpg",
    },
    {
      title: "Remote Working",
      description: "You know how you perform your best. Work from home, coffee shop or anywhere when you feel like it.",
      icon: "https://i.pinimg.com/1200x/06/b6/e9/06b6e933028bf69475c585c2fe7edbfe.jpg",
    },
    {
      title: "Commuter Benefits",
      description: "We're grateful for all the time and energy each team member puts into getting to work every day.",
      icon: "https://i.pinimg.com/1200x/96/7f/26/967f26555c624d087a437a98b2bddf7d.jpg",
    },
  ]

  const openPositions = [
    {
      title: "Social Media Assistant",
      company: "Nomad",
      location: "Paris, France",
      type: "Full-Time",
      tags: ["Marketing", "Design"],
      logo: "https://i.pinimg.com/1200x/60/80/e1/6080e1843961642ec8aed7b8b3474bac.jpg",
      companyImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop",
    },
    {
      title: "Brand Designer",
      company: "Dropbox",
      location: "San Francisco, USA",
      type: "Full-Time",
      tags: ["Marketing", "Design"],
      logo: "https://i.pinimg.com/474x/02/a4/f9/02a4f9ffae34d91e7924eff172b3a96f.jpg",
      companyImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop",
    },
    {
      title: "Interactive Developer",
      company: "Terraform",
      location: "Hamburg, Germany",
      type: "Full-Time",
      tags: ["Development", "Frontend"],
      logo: "https://i.pinimg.com/1200x/50/6e/f1/506ef1fe3f361297acedb9080b2becd3.jpg",
      companyImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop",
    },
    {
      title: "HR Manager",
      company: "Packer",
      location: "Lucern, Switzerland",
      type: "Full-Time",
      tags: ["HR", "Management"],
      logo: "https://i.pinimg.com/736x/f6/18/46/f61846b26d17f953283801e1fc44a94b.jpg",
      companyImage: "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=300&h=200&fit=crop",
    },
  ]

  const workingImages = [
    {
      url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop",
      caption: "Modern office workspace",
    },
    {
      url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      caption: "Team collaboration",
    },
    {
      url: "https://i.pinimg.com/736x/c8/b6/33/c8b6337757992b2d470611736191923c.jpg",
      caption: "Creative workspace",
    },
    {
      url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop",
      caption: "Team meeting",
    },
  ]

  const socialIcons = {
    twitter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg",
    facebook: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    linkedin: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
    email: "https://img.icons8.com/fluency/48/000000/email.png",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content - Adjusted for sidebar */}
      <div className="sm:ml-64">
         {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img src="https://i.pinimg.com/736x/55/13/bc/5513bcf739d64e80a9273c74cee7f8a9.jpg" alt="JobHuntly Logo" className="w-8 h-8 rounded-lg" />
                <span className="font-semibold text-lg">JobHuntly</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span>Company</span>
                <span className="font-medium text-gray-900">Facebook</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
              
              </button>
              <button
                onClick={() => setIsNewJobDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Post a job</span>
              </button>
            </div>
          </div>
        </header>
         {/* Job Creation Modal */}
      {isNewJobDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Post New Job</h2>
              <button onClick={() => setIsNewJobDialogOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    placeholder="e.g. Senior Frontend Developer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={newJob.company}
                    onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                    placeholder="e.g. TechCorp"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    placeholder="e.g. San Francisco, CA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    placeholder="e.g. $120k - $150k"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                  <select
                    value={newJob.type}
                    onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills/Tags (comma separated)</label>
                  <input
                    type="text"
                    value={newJob.tags}
                    onChange={(e) => setNewJob({ ...newJob, tags: e.target.value })}
                    placeholder="e.g. React, TypeScript, Node.js"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                <textarea
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  placeholder="Describe the role and requirements..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setIsNewJobDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateJob}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Post Job
              </button>
            </div>
          </div>
        </div>
      )}

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Company Header */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start space-x-4">
                  <img
                    src="https://i.pinimg.com/736x/55/13/bc/5513bcf739d64e80a9273c74cee7f8a9.jpg"
                    alt="Nomad Logo"
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">Facebook</h1>
                        <p className="text-blue-600">{"https://facebook.com"}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                          <svg class="w-6 h-6 text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M4.857 3A1.857 1.857 0 0 0 3 4.857v4.286C3 10.169 3.831 11 4.857 11h4.286A1.857 1.857 0 0 0 11 9.143V4.857A1.857 1.857 0 0 0 9.143 3H4.857Zm10 0A1.857 1.857 0 0 0 13 4.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 9.143V4.857A1.857 1.857 0 0 0 19.143 3h-4.286Zm-10 10A1.857 1.857 0 0 0 3 14.857v4.286C3 20.169 3.831 21 4.857 21h4.286A1.857 1.857 0 0 0 11 19.143v-4.286A1.857 1.857 0 0 0 9.143 13H4.857Zm10 0A1.857 1.857 0 0 0 13 14.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 19.143v-4.286A1.857 1.857 0 0 0 19.143 13h-4.286Z" clip-rule="evenodd"/>
</svg>

                          <span>Public View</span>
                        </button>
                        <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                        <svg class="w-6 h-6 text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"/>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
</svg>

                          <span>Profile Settings</span>
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      <div className="flex items-center space-x-2">
                       <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
</svg>

                        <div>
                          <p className="text-sm text-gray-500">Founded</p>
                          <p className="font-semibold">July 31, 2011</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
</svg>

                        <div>
                          <p className="text-sm text-gray-500">Employees</p>
                          <p className="font-semibold">{"4000+"}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
</svg>

                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-semibold">20 countries</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M3 21h18M4 18h16M6 10v8m4-8v8m4-8v8m4-8v8M4 9.5v-.955a1 1 0 0 1 .458-.84l7-4.52a1 1 0 0 1 1.084 0l7 4.52a1 1 0 0 1 .458.84V9.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5Z"/>
</svg>

                        <div>
                          <p className="text-sm text-gray-500">Industry</p>
                          <p className="font-semibold">Social & Non-Profit</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Profile */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Company Profile</h2>
                  <button className="text-blue-600 hover:text-blue-700">
                    <img
                      src="https://img.icons8.com/fluency-systems-regular/20/4285f4/edit.png"
                      alt="Edit"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {
                    "Nomad is built on the belief that work is not a place you go, but something you do. We are starting and running internet businesses. Millions of businesses rely on Stripe's software tools to accept payments, expand globally, and manage their businesses online. Stripe has been at the forefront of expanding internet commerce, powering new business models, and supporting the latest platforms, from marketplaces to mobile commerce sites. We believe that growing the GDP of the internet is a problem rooted in code and design, not finance. Stripe is built for developers, makers, and creators. We work on solving the hard technical problems necessary to build global economic infrastructure—from designing highly reliable systems to developing advanced machine learning algorithms to prevent fraud."
                  }
                </p>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Contact</h2>
                  <button className="text-blue-600 hover:text-blue-700">
                   <svg class="w-6 h-6 text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
</svg>

                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#"
                    className="flex items-center space-x-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100"
                  >
                    <img
                      src={
                        socialIcons.twitter || "/placeholder.svg?height=20&width=20&query=twitter" || "/placeholder.svg"
                      }
                      alt="Twitter"
                      className="w-5 h-5"
                    />
                    <span>twitter.com/nomad</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100"
                  >
                    <img
                      src={
                        socialIcons.facebook ||
                        "/placeholder.svg?height=20&width=20&query=facebook" ||
                        "/placeholder.svg"
                      }
                      alt="Facebook"
                      className="w-5 h-5"
                    />
                    <span>facebook.com/nomadHQ</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100"
                  >
                    <img
                      src={
                        socialIcons.linkedin ||
                        "/placeholder.svg?height=20&width=20&query=linkedin" ||
                        "/placeholder.svg"
                      }
                      alt="LinkedIn"
                      className="w-5 h-5"
                    />
                    <span>linkedin.com/company/nomad</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100"
                  >
                    <img
                      src={socialIcons.email || "/placeholder.svg?height=20&width=20&query=email" || "/placeholder.svg"}
                      alt="Email"
                      className="w-5 h-5"
                    />
                    <span>nomad@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Working at Nomad */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Working at Nomad</h2>
                  <button className="text-blue-600 hover:text-blue-700">
                                     <svg class="w-6 h-6 text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
</svg>
                  </button>
                </div>
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
                    alt="Maria Kelly"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Maria Kelly</p>
                    <p className="text-sm text-gray-500">Marketing Coordinator</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {workingImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.url || "/placeholder.svg?height=128&width=256&query=office"}
                        alt={image.caption}
                        className="w-full h-32 object-cover rounded-lg transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-end">
                        <p className="text-white text-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {image.caption}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Team</h2>
                  <button className="text-blue-600 hover:text-blue-700">
                                    <svg class="w-6 h-6 text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
</svg>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="text-center group">
                      <img
                        src={member.avatar || "/placeholder.svg?height=64&width=64&query=avatar"}
                        alt={member.name}
                        className="w-16 h-16 rounded-full mx-auto mb-3 object-cover transition-transform group-hover:scale-110"
                      />
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.role}</p>
                      <div className="flex justify-center space-x-2 mt-2">
                        <a
                          href={member.twitter}
                          className="text-gray-400 hover:text-blue-500 transition-colors"
                          aria-label={`Open Twitter profile for ${member.name}`}
                        >
                          <img
                            src={
                              socialIcons.twitter ||
                              "/placeholder.svg?height=16&width=16&query=twitter" ||
                              "/placeholder.svg"
                            }
                            alt="Twitter"
                            className="w-4 h-4"
                          />
                        </a>
                        <a
                          href={member.linkedin}
                          className="text-gray-400 hover:text-blue-700 transition-colors"
                          aria-label={`Open LinkedIn profile for ${member.name}`}
                        >
                          <img
                            src={
                              socialIcons.linkedin ||
                              "/placeholder.svg?height=16&width=16&query=linkedin" ||
                              "/placeholder.svg"
                            }
                            alt="LinkedIn"
                            className="w-4 h-4"
                          />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center mx-auto space-x-2">
                    <span>View all core teams</span>
                    <svg className="w-4 h-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Benefits</h2>
                  <button className="text-blue-600 hover:text-blue-700">
                                    <svg class="w-6 h-6 text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
</svg>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="space-y-3 group">
                      <img
                        src={benefit.icon || "/placeholder.svg?height=48&width=48&query=benefit"}
                        alt={benefit.title}
                        className="w-12 h-12 rounded-lg object-cover transition-transform group-hover:scale-110"
                      />
                      <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Open Positions */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Open Positions</h2>
                  <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2">
                    <span>Show all jobs</span>
                   
                  </button>
                </div>
                <div className="space-y-4">
                  {openPositions.map((position, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors group"
                    >
                      <img
                        src={position.logo || "/placeholder.svg?height=48&width=48&query=company"}
                        alt={position.company}
                        className="w-12 h-12 rounded-lg object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{position.title}</h3>
                        <p className="text-sm text-gray-500">
                          {position.company} {"•"} {position.location}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {position.type}
                        </span>
                        {position.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Tech Stack */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Tech Stack</h2>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700">
                    <svg class="w-6 h-6 text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>
                    </button>
                    <button className="text-blue-600 hover:text-blue-700">
                                       <svg class="w-6 h-6 text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
</svg>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {techStack.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors group"
                    >
                      <img
                        src={tech.icon || "/placeholder.svg?height=32&width=32&query=tech"}
                        alt={tech.name}
                        className="w-8 h-8 transition-transform group-hover:scale-110"
                      />
                      <span className="text-sm font-medium text-gray-900">{tech.name}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center justify-center space-x-2">
                  <span>View tech stack</span>
 
                </button>
              </div>

              {/* Office Locations */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Office Locations</h2>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700">
                   <svg class="w-6 h-6 text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>

                    </button>
                    <button className="text-blue-600 hover:text-blue-700">
                                     <svg class="w-6 h-6 text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
</svg>
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  {officeLocations.map((location, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={location.flag || "/placeholder.svg?height=16&width=24&query=flag"}
                          alt={location.country}
                          className="w-6 h-4 object-cover rounded-sm"
                        />
                        <span className="text-sm font-medium text-gray-900">{location.country}</span>
                      </div>
                      {location.isHQ && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Head Quarters</span>
                      )}
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center justify-center space-x-2">
                  <span>View countries</span>
                 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
