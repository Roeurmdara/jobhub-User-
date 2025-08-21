"use client"

import { useState, useMemo } from "react"

const AllApplications = ({ onViewApplication }) => {
  // Sample applicant data with real images
  const [applicants] = useState([
    {
      id: 1,
      fullName: "Jake Gyll",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      score: 0.0,
      hiringStage: "Applied",
      appliedDate: "13 July, 2021",
      jobRole: "Designer",
      email: "jake.gyll@email.com",
      jobTitle: "UI/UX Designer",
      department: "Design",
      jobType: "Full-Time",
      stage: "Applied",
      stageProgress: 20,
      personalInfo: {
        fullName: "Jake Gyll",
        gender: "Male",
        dateOfBirth: "January 15, 1994 (29 y.o)",
        language: "English, Spanish",
        address: "123 Design Street\nNew York, NY 10001",
      },
      contact: {
        email: "jake.gyll@email.com",
        phone: "+1 555 123 4567",
        instagram: "instagram.com/jakegyll",
        twitter: "twitter.com/jakegyll",
        website: "www.jakegyll.com",
      },
      professionalInfo: {
        aboutMe:
          "I'm a passionate UI/UX designer with 5 years of experience creating user-centered digital experiences. I specialize in mobile app design and have worked with various startups and established companies.",
        currentJob: "Senior UI/UX Designer",
        experience: "5 Years",
        qualification: "Bachelor of Fine Arts",
        skills: ["UI Design", "UX Research", "Figma", "Adobe Creative Suite"],
      },
    },
    {
      id: 2,
      fullName: "Guy Hawkins",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      score: 0.0,
      hiringStage: "Applied",
      appliedDate: "13 July, 2021",
      jobRole: "JavaScript Dev",
      email: "guy.hawkins@email.com",
      jobTitle: "Frontend Developer",
      department: "Engineering",
      jobType: "Full-Time",
      stage: "Applied",
      stageProgress: 20,
      personalInfo: {
        fullName: "Guy Hawkins",
        gender: "Male",
        dateOfBirth: "March 8, 1992 (31 y.o)",
        language: "English, French",
        address: "456 Tech Avenue\nSan Francisco, CA 94102",
      },
      contact: {
        email: "guy.hawkins@email.com",
        phone: "+1 555 987 6543",
        instagram: "instagram.com/guyhawkins",
        twitter: "twitter.com/guyhawkins",
        website: "www.guyhawkins.dev",
      },
      professionalInfo: {
        aboutMe:
          "Frontend developer with expertise in React, Vue.js, and modern JavaScript frameworks. I love creating performant and accessible web applications.",
        currentJob: "Frontend Developer",
        experience: "4 Years",
        qualification: "Bachelor of Computer Science",
        skills: ["JavaScript", "React", "Vue.js", "TypeScript", "CSS"],
      },
    },
    {
      id: 3,
      fullName: "Cyndy Lillibridge",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      score: 4.5,
      hiringStage: "Shortlisted",
      appliedDate: "12 July, 2021",
      jobRole: "Golang Dev",
      email: "cyndy.lillibridge@email.com",
      jobTitle: "Backend Developer",
      department: "Engineering",
      jobType: "Full-Time",
      stage: "Shortlisted",
      stageProgress: 40,
      personalInfo: {
        fullName: "Cyndy Lillibridge",
        gender: "Female",
        dateOfBirth: "June 12, 1990 (33 y.o)",
        language: "English, German",
        address: "789 Code Lane\nAustin, TX 78701",
      },
      contact: {
        email: "cyndy.lillibridge@email.com",
        phone: "+1 555 456 7890",
        instagram: "instagram.com/cyndydev",
        twitter: "twitter.com/cyndydev",
        website: "www.cyndylillibridge.com",
      },
      professionalInfo: {
        aboutMe:
          "Backend developer specializing in Go and distributed systems. I have experience building scalable microservices and APIs for high-traffic applications.",
        currentJob: "Senior Backend Developer",
        experience: "6 Years",
        qualification: "Master of Computer Science",
        skills: ["Go", "Docker", "Kubernetes", "PostgreSQL", "Redis"],
      },
    },
    {
      id: 4,
      fullName: "Rodolfo Goode",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      score: 3.75,
      hiringStage: "Shortlisted",
      appliedDate: "11 July, 2021",
      jobRole: ".NET Dev",
      email: "rodolfo.goode@email.com",
      jobTitle: ".NET Developer",
      department: "Engineering",
      jobType: "Full-Time",
      stage: "Shortlisted",
      stageProgress: 40,
      personalInfo: {
        fullName: "Rodolfo Goode",
        gender: "Male",
        dateOfBirth: "September 25, 1988 (35 y.o)",
        language: "English, Portuguese",
        address: "321 Microsoft Way\nSeattle, WA 98109",
      },
      contact: {
        email: "rodolfo.goode@email.com",
        phone: "+1 555 321 9876",
        instagram: "instagram.com/rodolfodev",
        twitter: "twitter.com/rodolfodev",
        website: "www.rodolfogoode.net",
      },
      professionalInfo: {
        aboutMe:
          "Experienced .NET developer with expertise in C#, ASP.NET Core, and Azure cloud services. I enjoy building enterprise-level applications and mentoring junior developers.",
        currentJob: ".NET Developer",
        experience: "8 Years",
        qualification: "Bachelor of Software Engineering",
        skills: ["C#", "ASP.NET Core", "Azure", "SQL Server", "Entity Framework"],
      },
    },
    {
      id: 5,
      fullName: "Leif Floyd",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      score: 4.8,
      hiringStage: "Shortlisted",
      appliedDate: "11 July, 2021",
      jobRole: "Graphic Design",
      email: "leif.floyd@email.com",
      jobTitle: "Graphic Designer",
      department: "Design",
      jobType: "Full-Time",
      stage: "Shortlisted",
      stageProgress: 40,
      personalInfo: {
        fullName: "Leif Floyd",
        gender: "Male",
        dateOfBirth: "November 3, 1993 (30 y.o)",
        language: "English, Swedish",
        address: "654 Creative Blvd\nLos Angeles, CA 90210",
      },
      contact: {
        email: "leif.floyd@email.com",
        phone: "+1 555 654 3210",
        instagram: "instagram.com/leifffloyd",
        twitter: "twitter.com/leifffloyd",
        website: "www.leifffloyd.design",
      },
      professionalInfo: {
        aboutMe:
          "Creative graphic designer with a passion for branding and visual storytelling. I specialize in creating compelling visual identities for startups and established brands.",
        currentJob: "Senior Graphic Designer",
        experience: "7 Years",
        qualification: "Bachelor of Graphic Design",
        skills: ["Adobe Creative Suite", "Branding", "Typography", "Print Design"],
      },
    },
    {
      id: 6,
      fullName: "Jenny Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      score: 4.6,
      hiringStage: "Shortlisted",
      appliedDate: "9 July, 2021",
      jobRole: "Designer",
      email: "jenny.wilson@email.com",
      jobTitle: "Product Designer",
      department: "Design",
      jobType: "Full-Time",
      stage: "Shortlisted",
      stageProgress: 40,
      personalInfo: {
        fullName: "Jenny Wilson",
        gender: "Female",
        dateOfBirth: "April 18, 1991 (32 y.o)",
        language: "English, Italian",
        address: "987 Design District\nMiami, FL 33101",
      },
      contact: {
        email: "jenny.wilson@email.com",
        phone: "+1 555 789 0123",
        instagram: "instagram.com/jennywilsondesign",
        twitter: "twitter.com/jennywilsondesign",
        website: "www.jennywilson.design",
      },
      professionalInfo: {
        aboutMe:
          "Product designer focused on creating intuitive and delightful user experiences. I have experience working with cross-functional teams to bring products from concept to launch.",
        currentJob: "Product Designer",
        experience: "5 Years",
        qualification: "Master of Design",
        skills: ["Product Design", "User Research", "Prototyping", "Design Systems"],
      },
    },
    {
      id: 7,
      fullName: "Jerome Bell",
      avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
      score: 4.0,
      hiringStage: "Shortlisted",
      appliedDate: "5 July, 2021",
      jobRole: "Designer",
      email: "jerome.bell@email.com",
      jobTitle: "Product Designer",
      department: "Marketing",
      jobType: "Full-Time",
      stage: "Interview",
      stageProgress: 60,
      personalInfo: {
        fullName: "Jerome Bell",
        gender: "Male",
        dateOfBirth: "March 23, 1995 (26 y.o)",
        language: "English, French, Bahasa",
        address: "4517 Washington Ave.\nManchester, Kentucky 39495",
      },
      contact: {
        email: "jeromeBell45@email.com",
        phone: "+44 1245 572 135",
        instagram: "instagram.com/jeromebell",
        twitter: "twitter.com/jeromebell",
        website: "www.jeromebell.com",
      },
      professionalInfo: {
        aboutMe:
          "I'm a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.\n\nFor 10 years, I've specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.",
        currentJob: "Product Designer",
        experience: "4 Years",
        qualification: "Bachelors in Engineering",
        skills: ["Project Management", "Copywriting", "English"],
      },
    },
    // Add more applicants with complete data...
  ])

  // State management
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })
  const [filterStage, setFilterStage] = useState("All")
  const [filterRole, setFilterRole] = useState("All")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedApplicants, setSelectedApplicants] = useState([])

  // Get unique values for filters
  const uniqueStages = [...new Set(applicants.map((app) => app.hiringStage))]
  const uniqueRoles = [...new Set(applicants.map((app) => app.jobRole))]

  // Filter and search logic
  const filteredApplicants = useMemo(() => {
    return applicants.filter((applicant) => {
      const matchesSearch =
        applicant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.jobRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStage = filterStage === "All" || applicant.hiringStage === filterStage
      const matchesRole = filterRole === "All" || applicant.jobRole === filterRole

      return matchesSearch && matchesStage && matchesRole
    })
  }, [applicants, searchTerm, filterStage, filterRole])

  // Sorting logic
  const sortedApplicants = useMemo(() => {
    if (!sortConfig.key) return filteredApplicants

    return [...filteredApplicants].sort((a, b) => {
      let aValue = a[sortConfig.key]
      let bValue = b[sortConfig.key]

      // Handle different data types
      if (sortConfig.key === "score") {
        aValue = Number.parseFloat(aValue)
        bValue = Number.parseFloat(bValue)
      } else if (sortConfig.key === "appliedDate") {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      } else if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })
  }, [filteredApplicants, sortConfig])

  // Pagination logic
  const totalPages = Math.ceil(sortedApplicants.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedApplicants = sortedApplicants.slice(startIndex, startIndex + itemsPerPage)

  // Handlers
  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }))
  }

  const handleSelectApplicant = (id) => {
    setSelectedApplicants((prev) =>
      prev.includes(id) ? prev.filter((applicantId) => applicantId !== id) : [...prev, id],
    )
  }

  const handleSelectAll = () => {
    if (selectedApplicants.length === paginatedApplicants.length) {
      setSelectedApplicants([])
    } else {
      setSelectedApplicants(paginatedApplicants.map((app) => app.id))
    }
  }

  const handleViewApplication = (applicantId) => {
    const applicant = applicants.find((app) => app.id === applicantId)
    if (applicant && onViewApplication) {
      onViewApplication(applicant)
    }
  }

  const getStageColor = (stage) => {
    const colors = {
      Applied: "bg-gray-100 text-gray-800",
      Shortlisted: "bg-blue-100 text-blue-800",
      Interview: "bg-yellow-100 text-yellow-800",
      "Final Round": "bg-purple-100 text-purple-800",
      Hired: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
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
          {/* Header with search and filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Total Applicants: {filteredApplicants.length}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=40&h=40&fit=crop"
                alt="Caption"
                className="w-10 h-10 rounded-lg object-cover"
              />
              <span className="text-blue-600 font-medium">Caption</span>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <img
                  src="https://img.icons8.com/fluency-systems-regular/20/000000/search.png"
                  alt="Search"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search Applicants"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <img
                  src="https://img.icons8.com/fluency-systems-regular/20/000000/filter.png"
                  alt="Filter"
                  className="w-5 h-5"
                />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hiring Stage</label>
                  <select
                    value={filterStage}
                    onChange={(e) => setFilterStage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Stages</option>
                    {uniqueStages.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Role</label>
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Roles</option>
                    {uniqueRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setFilterStage("All")
                      setFilterRole("All")
                      setSearchTerm("")
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={
                          selectedApplicants.length === paginatedApplicants.length && paginatedApplicants.length > 0
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("fullName")}
                        className="flex items-center space-x-1 hover:text-gray-700"
                      >
                        <span>Full Name</span>
                        <img
                          src="https://img.icons8.com/fluency-systems-regular/16/000000/sort.png"
                          alt="Sort"
                          className="w-4 h-4"
                        />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("score")}
                        className="flex items-center space-x-1 hover:text-gray-700"
                      >
                        <span>Score</span>
                        <img
                          src="https://img.icons8.com/fluency-systems-regular/16/000000/sort.png"
                          alt="Sort"
                          className="w-4 h-4"
                        />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("hiringStage")}
                        className="flex items-center space-x-1 hover:text-gray-700"
                      >
                        <span>Hiring Stage</span>
                        <img
                          src="https://img.icons8.com/fluency-systems-regular/16/000000/sort.png"
                          alt="Sort"
                          className="w-4 h-4"
                        />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("appliedDate")}
                        className="flex items-center space-x-1 hover:text-gray-700"
                      >
                        <span>Applied Date</span>
                        <img
                          src="https://img.icons8.com/fluency-systems-regular/16/000000/sort.png"
                          alt="Sort"
                          className="w-4 h-4"
                        />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("jobRole")}
                        className="flex items-center space-x-1 hover:text-gray-700"
                      >
                        <span>Job Role</span>
                        <img
                          src="https://img.icons8.com/fluency-systems-regular/16/000000/sort.png"
                          alt="Sort"
                          className="w-4 h-4"
                        />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedApplicants.map((applicant) => (
                    <tr key={applicant.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedApplicants.includes(applicant.id)}
                          onChange={() => handleSelectApplicant(applicant.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <img
                            src={applicant.avatar || "/placeholder.svg"}
                            alt={applicant.fullName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <span className="text-sm font-medium text-gray-900">{applicant.fullName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{renderStars(applicant.score)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(applicant.hiringStage)}`}
                        >
                          {applicant.hiringStage}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{applicant.appliedDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{applicant.jobRole}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewApplication(applicant.id)}
                            className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
                          >
                            See Application
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <img
                              src="https://img.icons8.com/fluency-systems-regular/16/000000/more.png"
                              alt="More"
                              className="w-4 h-4"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-6 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">View</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value))
                      setCurrentPage(1)
                    }}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="text-sm text-gray-700">Applicants per page</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  >
                    <img
                      src="https://img.icons8.com/fluency-systems-regular/16/000000/chevron-left.png"
                      alt="Previous"
                      className="w-4 h-4"
                    />
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber
                    if (totalPages <= 5) {
                      pageNumber = i + 1
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i
                    } else {
                      pageNumber = currentPage - 2 + i
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-3 py-1 text-sm rounded ${
                          currentPage === pageNumber ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  })}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  >
                    <img
                      src="https://img.icons8.com/fluency-systems-regular/16/000000/chevron-right.png"
                      alt="Next"
                      className="w-4 h-4"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllApplications
