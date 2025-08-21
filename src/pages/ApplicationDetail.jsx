"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

const ApplicationDetail = () => {
  const { applicantId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("profile")
  const [applicant, setApplicant] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get applicant data from localStorage
    const storedApplicant = localStorage.getItem("selectedApplicant")
    if (storedApplicant) {
      const parsedApplicant = JSON.parse(storedApplicant)
      if (parsedApplicant.id === Number.parseInt(applicantId)) {
        setApplicant(parsedApplicant)
      }
    }
    setLoading(false)
  }, [applicantId])

  const handleBack = () => {
    navigate("/all-applications")
  }

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applicant details...</p>
        </div>
      </div>
    )
  }

  if (!applicant) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Applicant Not Found</h2>
          <p className="text-gray-600 mb-4">The requested applicant could not be found.</p>
          <button onClick={handleBack} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
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
    <div className="p-6 bg-white min-h-screen sm:ml-64 ">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button onClick={handleBack} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <img
              src="https://img.icons8.com/fluency-systems-regular/24/000000/back.png"
              alt="Back"
              className="w-6 h-6"
            />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Applicant Details</h1>
        </div>
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bo">
        {/* Left Column - Applicant Info */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm border-1">
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
            <div className="mb-6 ">
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
             
            </button>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-lg p-6 shadow-sm border-1">
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
          <div className="bg-white rounded-lg shadow-sm border-1">
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
  )
}

export default ApplicationDetail
