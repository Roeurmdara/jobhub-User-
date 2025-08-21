"use client"

import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronDown, SlidersHorizontal, MoreHorizontal, Building2, X, ChevronLeft, ChevronRight } from "lucide-react"

const JobListing = () => {
  const navigate = useNavigate()
  const [selectedDateRange, setSelectedDateRange] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showFilters, setShowFilters] = useState(false)
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

  const [allJobListings, setAllJobListings] = useState([
    {
      id: 1,
      role: "Social Media Assistant",
      status: "Live",
      datePosted: "2024-01-20",
      dueDate: "2024-01-24",
      jobType: "Fulltime",
      applicants: 19,
      needs: "4 / 11",
    },
    {
      id: 2,
      role: "Senior Designer",
      status: "Live",
      datePosted: "2024-01-16",
      dueDate: "2024-01-24",
      jobType: "Fulltime",
      applicants: 1234,
      needs: "0 / 20",
    },
    {
      id: 3,
      role: "Visual Designer",
      status: "Live",
      datePosted: "2024-01-15",
      dueDate: "2024-01-24",
      jobType: "Contract",
      applicants: 2435,
      needs: "1 / 5",
    },
    {
      id: 4,
      role: "Data Science",
      status: "Closed",
      datePosted: "2024-01-13",
      dueDate: "2024-01-24",
      jobType: "Contract",
      applicants: 6234,
      needs: "10 / 10",
    },
    {
      id: 5,
      role: "Kotlin Developer",
      status: "Live",
      datePosted: "2024-01-12",
      dueDate: "2024-01-24",
      jobType: "Fulltime",
      applicants: 12,
      needs: "20 / 20",
    },
    {
      id: 6,
      role: "React Developer",
      status: "Draft",
      datePosted: "2024-01-11",
      dueDate: "2024-01-24",
      jobType: "Fulltime",
      applicants: 14,
      needs: "10 / 10",
    },
    {
      id: 7,
      role: "UX Researcher",
      status: "Live",
      datePosted: "2024-01-10",
      dueDate: "2024-01-25",
      jobType: "Part-time",
      applicants: 87,
      needs: "3 / 5",
    },
    {
      id: 8,
      role: "Frontend Developer",
      status: "Live",
      datePosted: "2024-01-09",
      dueDate: "2024-01-26",
      jobType: "Contract",
      applicants: 156,
      needs: "2 / 8",
    },
    {
      id: 9,
      role: "Product Manager",
      status: "Closed",
      datePosted: "2024-01-08",
      dueDate: "2024-01-22",
      jobType: "Fulltime",
      applicants: 543,
      needs: "1 / 1",
    },
    {
      id: 10,
      role: "DevOps Engineer",
      status: "Live",
      datePosted: "2024-01-07",
      dueDate: "2024-01-28",
      jobType: "Fulltime",
      applicants: 234,
      needs: "5 / 12",
    },
  ])

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

  const filteredJobs = useMemo(() => {
    let filtered = allJobListings

    // Date range filter
    if (selectedDateRange !== "all") {
      const now = new Date()
      let startDate, endDate

      switch (selectedDateRange) {
        case "today":
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
          endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
          break
        case "week":
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          endDate = now
          break
        case "month":
          startDate = new Date(now.getFullYear(), now.getMonth(), 1)
          endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
          break
        case "custom":
          if (customDateRange.startDate && customDateRange.endDate) {
            startDate = new Date(customDateRange.startDate)
            endDate = new Date(customDateRange.endDate)
          }
          break
      }

      if (startDate && endDate) {
        filtered = filtered.filter((job) => {
          const jobDate = new Date(job.datePosted)
          return jobDate >= startDate && jobDate <= endDate
        })
      }
    }

    // Status filter
    if (filters.status !== "all") {
      filtered = filtered.filter((job) => job.status.toLowerCase() === filters.status.toLowerCase())
    }

    // Job type filter
    if (filters.jobType !== "all") {
      filtered = filtered.filter((job) => job.jobType.toLowerCase() === filters.jobType.toLowerCase())
    }

    // Applicant range filter
    if (filters.applicantRange !== "all") {
      filtered = filtered.filter((job) => {
        const applicants = job.applicants
        switch (filters.applicantRange) {
          case "low":
            return applicants < 50
          case "medium":
            return applicants >= 50 && applicants < 500
          case "high":
            return applicants >= 500
          default:
            return true
        }
      })
    }

    return filtered
  }, [allJobListings, selectedDateRange, filters, customDateRange])

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage)

  const handleJobClick = (job) => {
    navigate(`/job/${job.id}`, { state: { job } })
  }

  const handleDateRangeChange = (e) => {
    setSelectedDateRange(e.target.value)
    setCurrentPage(1)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
    setCurrentPage(1)
  }

  const handleCustomDateChange = (field, value) => {
    setCustomDateRange((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (selectedDateRange === "custom") {
      setCurrentPage(1)
    }
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number.parseInt(e.target.value))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters({
      status: "all",
      jobType: "all",
      applicantRange: "all",
    })
    setSelectedDateRange("all")
    setCustomDateRange({ startDate: "", endDate: "" })
    setCurrentPage(1)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const StatusBadge = ({ status }) => {
    const colors = {
      Live: "bg-green-100 text-green-600 border-green-200",
      Closed: "bg-red-100 text-red-600 border-red-200",
      Draft: "bg-yellow-100 text-yellow-600 border-yellow-200",
    }
    return (
      <span
        className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${colors[status]}`}
      >
        {status}
      </span>
    )
  }

  const JobTypeBadge = ({ type }) => {
    const colors = {
      Fulltime: "bg-blue-100 text-blue-600 border-blue-200",
      "Part-time": "bg-purple-100 text-purple-600 border-purple-200",
      Contract: "bg-orange-100 text-orange-600 border-orange-200",
    }

    if (colors[type]) {
      return (
        <span
          className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${colors[type]}`}
        >
          {type}
        </span>
      )
    }

    return (
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center">
        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-400 rounded-full"></div>
      </div>
    )
  }

  const renderPaginationButtons = () => {
    const buttons = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-8 h-8 text-sm rounded ${
            currentPage === i ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {i}
        </button>,
      )
    }

    return buttons
  }

  return (
    <div className="ml-60 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Company</div>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-900">Nomad</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
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

      {/* Content */}
      <main className="p-4 sm:p-6 lg:p-8 bg-white">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Job Listing</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Here is your jobs listing status. Showing {filteredJobs.length} of {allJobListings.length} jobs.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Job List</h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <select
                value={selectedDateRange}
                onChange={handleDateRangeChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-0"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">This Month</option>
                <option value="custom">Custom Range</option>
              </select>

              {selectedDateRange === "custom" && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="date"
                    value={customDateRange.startDate}
                    onChange={(e) => handleCustomDateChange("startDate", e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="text-gray-500 text-center sm:text-left">to</span>
                  <input
                    type="date"
                    value={customDateRange.endDate}
                    onChange={(e) => handleCustomDateChange("endDate", e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 text-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
                {(filters.status !== "all" || filters.jobType !== "all" || filters.applicantRange !== "all") && (
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                )}
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Status</option>
                    <option value="live">Live</option>
                    <option value="closed">Closed</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <select
                    value={filters.jobType}
                    onChange={(e) => handleFilterChange("jobType", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Types</option>
                    <option value="fulltime">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Applicants</label>
                  <select
                    value={filters.applicantRange}
                    onChange={(e) => handleFilterChange("applicantRange", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Ranges</option>
                    <option value="low">Less than 50</option>
                    <option value="medium">50 - 500</option>
                    <option value="high">500+</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Table - Desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Roles</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Date Posted</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Due Date</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Job Type</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Applicants</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Needs</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {paginatedJobs.length > 0 ? (
                  paginatedJobs.map((job) => (
                    <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleJobClick(job)}
                          className="font-medium text-gray-900 hover:text-indigo-600 text-left"
                        >
                          {job.role}
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={job.status} />
                      </td>
                      <td className="py-4 px-6 text-gray-600">{formatDate(job.datePosted)}</td>
                      <td className="py-4 px-6 text-gray-600">{formatDate(job.dueDate)}</td>
                      <td className="py-4 px-6">
                        <JobTypeBadge type={job.jobType} />
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900">{job.applicants.toLocaleString()}</td>
                      <td className="py-4 px-6 text-gray-600">{job.needs}</td>
                      <td className="py-4 px-6">
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-8 px-6 text-center text-gray-500">
                      No jobs found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Cards - Mobile/Tablet */}
          <div className="lg:hidden">
            {paginatedJobs.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {paginatedJobs.map((job) => (
                  <div key={job.id} className="p-4 hover:bg-gray-50">
                    <button onClick={() => handleJobClick(job)} className="w-full text-left space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-gray-900 text-sm sm:text-base">{job.role}</h3>
                        <button className="p-1 text-gray-400 hover:text-gray-600 ml-2">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge status={job.status} />
                        <JobTypeBadge type={job.jobType} />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Posted:</span> {formatDate(job.datePosted)}
                        </div>
                        <div>
                          <span className="font-medium">Due:</span> {formatDate(job.dueDate)}
                        </div>
                        <div>
                          <span className="font-medium">Applicants:</span> {job.applicants.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Needs:</span> {job.needs}
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 px-4 text-center text-gray-500">No jobs found matching your criteria.</div>
            )}
          </div>

          {/* Pagination */}
          {filteredJobs.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                <span className="text-gray-600">View</span>
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 w-20"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-gray-600">
                  items per page. Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredJobs.length)} of{" "}
                  {filteredJobs.length}
                </span>
              </div>
              <div className="flex items-center justify-center sm:justify-end gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-1">{renderPaginationButtons()}</div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default JobListing
