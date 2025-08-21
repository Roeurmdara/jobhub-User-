"use client"

import { useState } from "react"

const ApplicationDetail = ({ applicant, onBack }) => {
  const [activeTab, setActiveTab] = useState("profile")

  // If no applicant data is provided, show a loading or error state
  if (!applicant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Applicant Selected</h2>
          <p className="text-gray-600">Please select an applicant to view their details.</p>
          <button onClick={onBack} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Applications
          </button>
        </div>
      </div>
    )
  }

  // Enhanced applicant data with resume and hiring progress
  const enhancedApplicant = {
    ...applicant,
    resume: {
      education: [
        {
          degree: "Bachelor of Engineering",
          school: "University of Manchester",
          year: "2013-2017",
          description: "Specialized in Computer Science and Software Engineering",
        },
        {
          degree: "Master of Design",
          school: "Royal College of Art",
          year: "2017-2019",
          description: "Focused on Digital Product Design and User Experience",
        },
      ],
      experience: [
        {
          position: "Senior Product Designer",
          company: "Twitter",
          period: "2021 - Present",
          description:
            "Leading design for core product features, managing design system, and mentoring junior designers.",
        },
        {
          position: "Product Designer",
          company: "Spotify",
          period: "2019 - 2021",
          description: "Designed user interfaces for music discovery features and improved user engagement by 25%.",
        },
        {
          position: "UI/UX Designer",
          company: "Freelance",
          period: "2017 - 2019",
          description: "Worked with various startups and agencies on web and mobile applications.",
        },
      ],
      certifications: ["Google UX Design Certificate", "Adobe Certified Expert", "Figma Advanced Certification"],
    },
    hiringProgress: [
      { stage: "Applied", date: applicant.appliedDate, status: "completed" },
      { stage: "Screening", date: "July 3, 2021", status: applicant.stageProgress > 20 ? "completed" : "pending" },
      { stage: "Interview", date: "July 5, 2021", status: applicant.stageProgress > 40 ? "current" : "pending" },
      { stage: "Technical Test", date: "Pending", status: applicant.stageProgress > 60 ? "current" : "pending" },
      { stage: "Final Interview", date: "Pending", status: applicant.stageProgress > 80 ? "current" : "pending" },
      { stage: "Decision", date: "Pending", status: applicant.stageProgress === 100 ? "completed" : "pending" },
    ],
    interviews: [
      {
        id: 1,
        type: "Phone Screening",
        date: "July 5, 2021",
        time: "10:00 AM",
        interviewer: "Sarah Johnson",
        status: "completed",
        notes: "Great communication skills, strong portfolio",
      },
      {
        id: 2,
        type: "Technical Interview",
        date: "July 8, 2021",
        time: "2:00 PM",
        interviewer: "Mike Chen",
        status: applicant.stageProgress > 40 ? "scheduled" : "pending",
        notes: "",
      },
    ],
  }

  const getStageColor = (stage) => {
    const colors = {
      Applied: "bg-gray-100 text-gray-800",
      Screening: "bg-blue-100 text-blue-800",
      Interview: "bg-yellow-100 text-yellow-800",
      "Technical Test": "bg-purple-100 text-purple-800",
      "Final Interview": "bg-orange-100 text-orange-800",
      Decision: "bg-green-100 text-green-800",
    }
    return colors[stage] || "bg-gray-100 text-gray-800"
  }

  const renderStars = (score) => {
    return (
      <div className="flex items-center space-x-1">
        <span className="text-yellow-400">★</span>
        <span className="text-sm font-medium">{score.toFixed(1)}</span>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-8">
            {/* Personal Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  <p className="text-gray-900 font-medium">{enhancedApplicant.personalInfo.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Gender</p>
                  <p className="text-gray-900 font-medium">{enhancedApplicant.personalInfo.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                  <p className="text-gray-900 font-medium">{enhancedApplicant.personalInfo.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Language</p>
                  <p className="text-gray-900 font-medium">{enhancedApplicant.personalInfo.language}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Address</p>
                  <p className="text-gray-900 font-medium whitespace-pre-line">
                    {enhancedApplicant.personalInfo.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Info</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">About Me</p>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {enhancedApplicant.professionalInfo.aboutMe}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Current Job</p>
                    <p className="text-gray-900 font-medium">{enhancedApplicant.professionalInfo.currentJob}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Experience in Years</p>
                    <p className="text-gray-900 font-medium">{enhancedApplicant.professionalInfo.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Highest Qualification Held</p>
                    <p className="text-gray-900 font-medium">{enhancedApplicant.professionalInfo.qualification}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Skill set</p>
                    <div className="flex flex-wrap gap-2">
                      {enhancedApplicant.professionalInfo.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "resume":
        return (
          <div className="space-y-8">
            {/* Education */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
              <div className="space-y-4">
                {enhancedApplicant.resume.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                    <p className="text-blue-600 font-medium">{edu.school}</p>
                    <p className="text-sm text-gray-500 mb-2">{edu.year}</p>
                    <p className="text-gray-700">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h3>
              <div className="space-y-6">
                {enhancedApplicant.resume.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                    <p className="text-green-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                    <p className="text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {enhancedApplicant.resume.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <img
                      src="https://img.icons8.com/fluency-systems-regular/20/4285f4/certificate.png"
                      alt="Certificate"
                      className="w-5 h-5"
                    />
                    <span className="text-gray-900 font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "hiring":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Hiring Progress</h3>
            <div className="space-y-4">
              {enhancedApplicant.hiringProgress.map((stage, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      stage.status === "completed"
                        ? "bg-green-500 text-white"
                        : stage.status === "current"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {stage.status === "completed" ? "✓" : index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                    <p className="text-sm text-gray-500">{stage.date}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      stage.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : stage.status === "current"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {stage.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )

      case "interview":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Interview Schedule</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Schedule New Interview
              </button>
            </div>
            <div className="space-y-4">
              {enhancedApplicant.interviews.map((interview) => (
                <div key={interview.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{interview.type}</h4>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        interview.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : interview.status === "scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {interview.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Date</p>
                      <p className="font-medium">{interview.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Time</p>
                      <p className="font-medium">{interview.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Interviewer</p>
                      <p className="font-medium">{interview.interviewer}</p>
                    </div>
                  </div>
                  {interview.notes && (
                    <div className="mt-3">
                      <p className="text-gray-500 text-sm">Notes</p>
                      <p className="text-gray-700">{interview.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-10">
        {/* Logo */}
        <div className="flex items-center space-x-3 p-6 border-b">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">J</span>
          </div>
          <span className="text-xl font-bold text-gray-900">JobHuntly</span>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <img
              src="https://img.icons8.com/fluency-systems-regular/20/000000/dashboard.png"
              alt="Dashboard"
              className="w-5 h-5"
            />
            <span>Dashboard</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg relative"
          >
            <img
              src="https://img.icons8.com/fluency-systems-regular/20/000000/message.png"
              alt="Messages"
              className="w-5 h-5"
            />
            <span>Messages</span>
            <span className="absolute right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              1
            </span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <img
              src="https://img.icons8.com/fluency-systems-regular/20/000000/building.png"
              alt="Company Profile"
              className="w-5 h-5"
            />
            <span>Company Profile</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg">
            <img
              src="https://img.icons8.com/fluency-systems-regular/20/4285f4/group.png"
              alt="All Applicants"
              className="w-5 h-5"
            />
            <span>All Applicants</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <img
              src="https://img.icons8.com/fluency-systems-regular/20/000000/list.png"
              alt="Job Listing"
              className="w-5 h-5"
            />
            <span>Job Listing</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <img
              src="https://img.icons8.com/fluency-systems-regular/20/000000/calendar.png"
              alt="My Schedule"
              className="w-5 h-5"
            />
            <span>My Schedule</span>
          </a>
        </nav>

        {/* Settings Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="space-y-2 mb-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Settings</p>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <img
                src="https://img.icons8.com/fluency-systems-regular/20/000000/settings.png"
                alt="Settings"
                className="w-5 h-5"
              />
              <span>Settings</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <img
                src="https://img.icons8.com/fluency-systems-regular/20/000000/help.png"
                alt="Help Center"
                className="w-5 h-5"
              />
              <span>Help Center</span>
            </a>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
              alt="Maria Kelly"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Maria Kelly</p>
              <p className="text-xs text-gray-500 truncate">Mariakelly@email.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=40&h=40&fit=crop"
                  alt="Company"
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">Nomad</span>
                    <img
                      src="https://img.icons8.com/fluency-systems-regular/16/000000/expand-arrow.png"
                      alt="Expand"
                      className="w-4 h-4"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <img
                  src="https://img.icons8.com/fluency-systems-regular/24/000000/bell.png"
                  alt="Notifications"
                  className="w-6 h-6"
                />
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <img
                  src="https://img.icons8.com/fluency-systems-regular/16/ffffff/plus.png"
                  alt="Plus"
                  className="w-4 h-4"
                />
                <span>Post a job</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button onClick={onBack} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <img
                  src="https://img.icons8.com/fluency-systems-regular/24/000000/back.png"
                  alt="Back"
                  className="w-6 h-6"
                />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Applicant Details</h1>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
              <img
                src="https://img.icons8.com/fluency-systems-regular/16/4285f4/more.png"
                alt="More"
                className="w-4 h-4"
              />
              <span>More Action</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Applicant Info */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-center mb-6">
                  <img
                    src={enhancedApplicant.avatar || "/placeholder.svg"}
                    alt={enhancedApplicant.fullName}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h2 className="text-xl font-bold text-gray-900">{enhancedApplicant.fullName}</h2>
                  <p className="text-gray-600 mb-2">{enhancedApplicant.jobTitle}</p>
                  {renderStars(enhancedApplicant.score)}
                </div>

                {/* Applied Job Info */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Applied Jobs</span>
                    <span className="text-sm text-gray-500">{enhancedApplicant.appliedDate}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{enhancedApplicant.jobRole}</h3>
                  <p className="text-sm text-gray-600">
                    {enhancedApplicant.department} • {enhancedApplicant.jobType}
                  </p>
                </div>

                {/* Stage Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Stage</span>
                    <span className="text-sm text-blue-600">{enhancedApplicant.stage}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${enhancedApplicant.stageProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Schedule Interview Button */}
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-6">
                  <span>Schedule Interview</span>
                  <img
                    src="https://img.icons8.com/fluency-systems-regular/16/ffffff/arrow-right.png"
                    alt="Arrow"
                    className="w-4 h-4"
                  />
                </button>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://img.icons8.com/fluency-systems-regular/20/000000/email.png"
                      alt="Email"
                      className="w-5 h-5 text-gray-400"
                    />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">{enhancedApplicant.contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://img.icons8.com/fluency-systems-regular/20/000000/phone.png"
                      alt="Phone"
                      className="w-5 h-5 text-gray-400"
                    />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900">{enhancedApplicant.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://img.icons8.com/fluency-systems-regular/20/000000/instagram.png"
                      alt="Instagram"
                      className="w-5 h-5 text-gray-400"
                    />
                    <div>
                      <p className="text-sm text-gray-500">Instagram</p>
                      <a href="#" className="text-blue-600 hover:underline">
                        {enhancedApplicant.contact.instagram}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://img.icons8.com/fluency-systems-regular/20/000000/twitter.png"
                      alt="Twitter"
                      className="w-5 h-5 text-gray-400"
                    />
                    <div>
                      <p className="text-sm text-gray-500">Twitter</p>
                      <a href="#" className="text-blue-600 hover:underline">
                        {enhancedApplicant.contact.twitter}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://img.icons8.com/fluency-systems-regular/20/000000/domain.png"
                      alt="Website"
                      className="w-5 h-5 text-gray-400"
                    />
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a href="#" className="text-blue-600 hover:underline">
                        {enhancedApplicant.contact.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Tabbed Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {[
                      { id: "profile", label: "Applicant Profile" },
                      { id: "resume", label: "Resume" },
                      { id: "hiring", label: "Hiring Progress" },
                      { id: "interview", label: "Interview Schedule" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">{renderTabContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationDetail
