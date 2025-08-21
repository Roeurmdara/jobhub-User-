"use client"

import { useState, useMemo } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import {
  ArrowLeft,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  Users,
  CheckCircle,
  Clock,
  FileText,
  CheckSquare,
  Check,
  Briefcase,
  Gift,
  Calendar,
  Eye,
  TrendingUp,
  TrendingDown,
  Target,
} from "lucide-react"

const JobListingDetail = () => {
  const navigate = useNavigate()
  const { jobId } = useParams()
  const location = useLocation()
  const job = location.state?.job

  const [activeTab, setActiveTab] = useState("applicants")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    stage: "all",
    scoreRange: "all",
    dateRange: "all",
  })
  const [selectedApplicants, setSelectedApplicants] = useState([])
  const [sortBy, setSortBy] = useState({ field: "appliedDate", direction: "desc" })

  // Simple applicants data
  const applicants = [
    {
      id: 1,
      name: "Jake Gyll",
      score: 0.0,
      stage: "Applied",
      appliedDate: "13 July, 2021",
      email: "jake.gyll@email.com",
      image: "https://i.pinimg.com/1200x/51/4b/cb/514bcbd2d93eaa309cfdc34dd0570a6a.jpg",
    },
    {
      id: 2,
      name: "Guy Hawkins",
      score: 0.0,
      stage: "Applied",
      appliedDate: "13 July, 2021",
      email: "guy.hawkins@email.com",
      image: "https://i.pinimg.com/1200x/ad/c1/94/adc19407c90d23a5179b5a105af56959.jpg",
    },
    {
      id: 3,
      name: "Cyndy Lillibridge",
      score: 4.5,
      stage: "Shortlisted",
      appliedDate: "12 July, 2021",
      email: "cyndy.l@email.com",
      image: "https://i.pinimg.com/1200x/8a/22/16/8a22164928380f57644359cc36fdc836.jpg",
    },
    {
      id: 4,
      name: "Rodolfo Goode",
      score: 3.75,
      stage: "Shortlisted",
      appliedDate: "11 July, 2021",
      email: "rodolfo.goode@email.com",
      image: "https://i.pinimg.com/1200x/68/13/35/681335875265b7a3e62859634d2dcae2.jpg",
    },
    {
      id: 5,
      name: "Leif Floyd",
      score: 4.8,
      stage: "Shortlisted",
      appliedDate: "11 July, 2021",
      email: "leif.floyd@email.com",
      image: "https://i.pinimg.com/1200x/6c/55/52/6c5552f3c7ddb19d9fb78663c9fff987.jpg",
    },
    {
      id: 6,
      name: "Jenny Wilson",
      score: 4.6,
      stage: "Shortlisted",
      appliedDate: "9 July, 2021",
      email: "jenny.wilson@email.com",
      image: "https://i.pinimg.com/736x/06/66/0f/06660f32108900ec006817dcd935ad53.jpg",
    },
    {
      id: 7,
      name: "Jerome Bell",
      score: 4.0,
      stage: "Shortlisted",
      appliedDate: "5 July, 2021",
      email: "jerome.bell@email.com",
      image: "https://i.pinimg.com/736x/4e/5d/84/4e5d84e967cdf19ece54aaa281220669.jpg",
    },
    {
      id: 8,
      name: "Eleanor Pena",
      score: 3.9,
      stage: "Shortlisted",
      appliedDate: "5 July, 2021",
      email: "eleanor.pena@email.com",
      image: "https://i.pinimg.com/736x/0e/bd/b9/0ebdb9f8cb628dc5224bd2f84a2ff9e2.jpg",
    },
    {
      id: 9,
      name: "Darrell Steward",
      score: 4.2,
      stage: "Interview",
      appliedDate: "3 July, 2021",
      email: "darrell.steward@email.com",
      image: "https://i.pinimg.com/736x/37/08/e9/3708e9f6d561643ff83a98fc05d08645.jpg",
    },
    {
      id: 10,
      name: "Floyd Miles",
      score: 4.1,
      stage: "Interview",
      appliedDate: "1 July, 2021",
      email: "floyd.miles@email.com",
      image: "https://i.pinimg.com/736x/9e/e0/12/9ee012294e9e57756412ce5ce81a049e.jpg",
    },
  ]

  // Filter and sort applicants
  const filteredAndSortedApplicants = useMemo(() => {
    let filtered = applicants

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (applicant) =>
          applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          applicant.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Stage filter
    if (filters.stage !== "all") {
      filtered = filtered.filter((applicant) => applicant.stage.toLowerCase() === filters.stage.toLowerCase())
    }

    // Score range filter
    if (filters.scoreRange !== "all") {
      filtered = filtered.filter((applicant) => {
        const score = applicant.score
        switch (filters.scoreRange) {
          case "low":
            return score < 3
          case "medium":
            return score >= 3 && score < 4
          case "high":
            return score >= 4
          default:
            return true
        }
      })
    }

    // Sort applicants
    filtered.sort((a, b) => {
      let aValue, bValue

      switch (sortBy.field) {
        case "name":
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case "score":
          aValue = a.score
          bValue = b.score
          break
        case "appliedDate":
          aValue = a.appliedDate
          bValue = b.appliedDate
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortBy.direction === "asc" ? -1 : 1
      if (aValue > bValue) return sortBy.direction === "asc" ? 1 : -1
      return 0
    })

    return filtered
  }, [applicants, searchTerm, filters, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedApplicants.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedApplicants = filteredAndSortedApplicants.slice(startIndex, startIndex + itemsPerPage)

  const handleBack = () => {
    navigate("/job-listing")
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
    setCurrentPage(1)
  }

  const handleSort = (field) => {
    setSortBy((prev) => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }))
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

  const handleSelectApplicant = (applicantId) => {
    setSelectedApplicants((prev) =>
      prev.includes(applicantId) ? prev.filter((id) => id !== applicantId) : [...prev, applicantId],
    )
  }

  const handleSelectAll = () => {
    if (selectedApplicants.length === paginatedApplicants.length) {
      setSelectedApplicants([])
    } else {
      setSelectedApplicants(paginatedApplicants.map((applicant) => applicant.id))
    }
  }

  const clearFilters = () => {
    setFilters({
      stage: "all",
      scoreRange: "all",
      dateRange: "all",
    })
    setSearchTerm("")
    setCurrentPage(1)
  }

  const StageBadge = ({ stage }) => {
    const colors = {
      Applied: "bg-gray-100 text-gray-600 border-gray-200",
      Shortlisted: "bg-blue-100 text-blue-600 border-blue-200",
      Interview: "bg-yellow-100 text-yellow-600 border-yellow-200",
      Hired: "bg-green-100 text-green-600 border-green-200",
      Rejected: "bg-red-100 text-red-600 border-red-200",
    }

    return (
      <span
        className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${colors[stage]}`}
      >
        {stage}
      </span>
    )
  }

  const StarRating = ({ rating }) => (
    <div className="flex items-center gap-1">
      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      <span className="text-sm font-medium text-gray-900">{rating.toFixed(1)}</span>
    </div>
  )

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
            currentPage === i ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"
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
      <header className="bg-white border-b border-gray-200 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-15 h-8 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{job?.role || "Social Media Assistant"}</h1>
              <p className="text-gray-600 text-sm sm:text-base">Design • Full-Time • 4 / 11 Hired</p>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
          {["applicants", "job-details", "analytics"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "applicants" && "Applicants"}
              {tab === "job-details" && "Job Details"}
              {tab === "analytics" && "Analytics"}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        {activeTab === "applicants" && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* Applicants Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Total Applicants: {filteredAndSortedApplicants.length}
              </h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search Applicants"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 text-sm"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filter</span>
                  {(filters.stage !== "all" || filters.scoreRange !== "all" || filters.dateRange !== "all") && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  Caption
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
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Clear All
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hiring Stage</label>
                    <select
                      value={filters.stage}
                      onChange={(e) => handleFilterChange("stage", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Stages</option>
                      <option value="applied">Applied</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="interview">Interview</option>
                      <option value="hired">Hired</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Score Range</label>
                    <select
                      value={filters.scoreRange}
                      onChange={(e) => handleFilterChange("scoreRange", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Scores</option>
                      <option value="low">Below 3.0</option>
                      <option value="medium">3.0 - 4.0</option>
                      <option value="high">Above 4.0</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Applied Date</label>
                    <select
                      value={filters.dateRange}
                      onChange={(e) => handleFilterChange("dateRange", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Time</option>
                      <option value="week">Last Week</option>
                      <option value="month">Last Month</option>
                      <option value="quarter">Last Quarter</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Bulk Actions */}
            {selectedApplicants.length > 0 && (
              <div className="p-4 bg-blue-50 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <span className="text-sm text-blue-700">
                    {selectedApplicants.length} applicant{selectedApplicants.length > 1 ? "s" : ""} selected
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                      Move to Shortlist
                    </button>
                    <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">Reject</button>
                  </div>
                </div>
              </div>
            )}

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-6">
                      <input
                        type="checkbox"
                        checked={
                          paginatedApplicants.length > 0 && selectedApplicants.length === paginatedApplicants.length
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Full Name</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Score</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Hiring Stage</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Applied Date</th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Action</th>
                    <th className="w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedApplicants.length > 0 ? (
                    paginatedApplicants.map((applicant) => (
                      <tr key={applicant.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <input
                            type="checkbox"
                            checked={selectedApplicants.includes(applicant.id)}
                            onChange={() => handleSelectApplicant(applicant.id)}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={applicant.image || "/placeholder.svg"}
                              alt={applicant.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-medium text-gray-900">{applicant.name}</div>
                              <div className="text-sm text-gray-500">{applicant.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <StarRating rating={applicant.score} />
                        </td>
                        <td className="py-4 px-6">
                          <StageBadge stage={applicant.stage} />
                        </td>
                        <td className="py-4 px-6 text-gray-600">{applicant.appliedDate}</td>
                        <td className="py-4 px-6">
                          <button className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 text-sm">
                            See Application
                          </button>
                        </td>
                        <td className="py-4 px-6">
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-8 px-6 text-center text-gray-500">
                        No applicants found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden">
              {paginatedApplicants.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {paginatedApplicants.map((applicant) => (
                    <div key={applicant.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selectedApplicants.includes(applicant.id)}
                          onChange={() => handleSelectApplicant(applicant.id)}
                          className="rounded border-gray-300 mt-1"
                        />
                        <img
                          src={applicant.image || "/placeholder.svg"}
                          alt={applicant.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-gray-900 text-sm">{applicant.name}</h3>
                              <p className="text-sm text-gray-500 truncate">{applicant.email}</p>
                            </div>
                            <button className="p-1 text-gray-400 hover:text-gray-600 ml-2">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <StarRating rating={applicant.score} />
                            <StageBadge stage={applicant.stage} />
                          </div>

                          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <span className="text-sm text-gray-600">Applied: {applicant.appliedDate}</span>
                            <button className="px-3 py-1 text-blue-600 border border-blue-200 rounded hover:bg-blue-50 text-sm self-start">
                              See Application
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 px-4 text-center text-gray-500">No applicants found matching your criteria.</div>
              )}
            </div>

            {/* Pagination */}
            {filteredAndSortedApplicants.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                  <span className="text-gray-600">View</span>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-20"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="text-gray-600">
                    items per page. Showing {startIndex + 1}-
                    {Math.min(startIndex + itemsPerPage, filteredAndSortedApplicants.length)} of{" "}
                    {filteredAndSortedApplicants.length}
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
        )}

        {activeTab === "job-details" && (
          <div className="space-y-6">
            {/* Job Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Total Applications</h3>
                    <p className="text-2xl font-bold text-blue-600">{applicants.length}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">+12% from last week</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Shortlisted</h3>
                    <p className="text-2xl font-bold text-green-600">
                      {applicants.filter((a) => a.stage === "Shortlisted").length}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Ready for interview</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Days Active</h3>
                    <p className="text-2xl font-bold text-purple-600">12</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Expires in 2 days</p>
              </div>
            </div>

            {/* Job Details Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-600" />
                    Job Description
                  </h3>
                  <div className="prose prose-sm max-w-none text-gray-600">
                    <p className="mb-4">
                      We are looking for a creative and enthusiastic Social Media Assistant to join our marketing team.
                      You will be responsible for creating engaging content, managing social media accounts, and helping
                      to grow our online presence.
                    </p>
                    <p className="mb-4">
                      The ideal candidate should have a passion for social media, excellent communication skills, and
                      the ability to work in a fast-paced environment. You'll work closely with our marketing team to
                      develop and execute social media strategies.
                    </p>
                    <p>
                      This is a great opportunity for someone looking to grow their career in digital marketing and
                      social media management.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-gray-600" />
                    Requirements
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Bachelor's degree in Marketing, Communications, or related field",
                      "2+ years of experience in social media management",
                      "Proficiency in social media platforms (Instagram, Twitter, LinkedIn, TikTok)",
                      "Experience with social media management tools (Hootsuite, Buffer, etc.)",
                      "Strong written and verbal communication skills",
                      "Creative thinking and problem-solving abilities",
                      "Knowledge of social media analytics and reporting",
                    ].map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-600 text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-gray-600" />
                    Job Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Job Type</span>
                      <span className="font-medium text-gray-900">Full-time</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Experience Level</span>
                      <span className="font-medium text-gray-900">Mid-level</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Salary Range</span>
                      <span className="font-medium text-gray-900">$45,000 - $60,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium text-gray-900">Remote / New York</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Department</span>
                      <span className="font-medium text-gray-900">Marketing</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Reports To</span>
                      <span className="font-medium text-gray-900">Marketing Manager</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-gray-600" />
                    Benefits & Perks
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Health Insurance",
                      "Dental Coverage",
                      "401(k) Matching",
                      "Flexible Hours",
                      "Remote Work",
                      "Paid Time Off",
                      "Professional Development",
                      "Team Events",
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    Timeline
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Job Posted</p>
                        <p className="text-xs text-gray-500">January 20, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Applications Close</p>
                        <p className="text-xs text-gray-500">February 24, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Interviews Begin</p>
                        <p className="text-xs text-gray-500">February 26, 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold text-gray-900">2,847</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      +12.5%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Applications</p>
                    <p className="text-2xl font-bold text-gray-900">{applicants.length}</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      +8.2%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">3.2%</p>
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <TrendingDown className="w-3 h-3" />
                      -2.1%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Score</p>
                    <p className="text-2xl font-bold text-gray-900">4.2</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      +0.3
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Applications Over Time */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Applications Over Time</h3>
                  <select className="text-sm border border-gray-300 rounded px-3 py-1">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 3 months</option>
                  </select>
                </div>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[12, 19, 15, 27, 23, 31, 18].map((value, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 flex-1">
                      <div
                        className="w-full bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-600"
                        style={{ height: `${(value / 31) * 200}px` }}
                      ></div>
                      <span className="text-xs text-gray-500">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                  <span>Total: 145 applications</span>
                  <span>Peak: Thursday (31)</span>
                </div>
              </div>

              {/* Application Sources */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Application Sources</h3>
                <div className="space-y-4">
                  {[
                    { source: "LinkedIn", count: 45, percentage: 45, color: "bg-blue-500" },
                    { source: "Indeed", count: 32, percentage: 32, color: "bg-green-500" },
                    { source: "Company Website", count: 18, percentage: 18, color: "bg-purple-500" },
                    { source: "Referrals", count: 12, percentage: 12, color: "bg-orange-500" },
                    { source: "Other", count: 8, percentage: 8, color: "bg-gray-500" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-16 text-sm font-medium text-gray-700">{item.source}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <div className="w-12 text-sm font-medium text-gray-900">{item.count}</div>
                      <div className="w-12 text-sm text-gray-500">{item.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hiring Pipeline & Top Skills */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hiring Pipeline */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Hiring Pipeline</h3>
                <div className="space-y-4">
                  {[
                    {
                      stage: "Applied",
                      count: applicants.filter((a) => a.stage === "Applied").length,
                      total: applicants.length,
                      color: "bg-gray-400",
                    },
                    {
                      stage: "Shortlisted",
                      count: applicants.filter((a) => a.stage === "Shortlisted").length,
                      total: applicants.length,
                      color: "bg-blue-500",
                    },
                    {
                      stage: "Interview",
                      count: applicants.filter((a) => a.stage === "Interview").length,
                      total: applicants.length,
                      color: "bg-yellow-500",
                    },
                    {
                      stage: "Hired",
                      count: applicants.filter((a) => a.stage === "Hired").length,
                      total: applicants.length,
                      color: "bg-green-500",
                    },
                  ].map((stage, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                        <span className="text-sm text-gray-500">{stage.count} candidates</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${stage.color} transition-all duration-500`}
                          style={{ width: `${stage.total > 0 ? (stage.count / stage.total) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Skills */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Most Common Skills</h3>
                <div className="space-y-3">
                  {[
                    { skill: "Social Media Marketing", count: 78 },
                    { skill: "Content Creation", count: 65 },
                    { skill: "Analytics", count: 52 },
                    { skill: "Copywriting", count: 48 },
                    { skill: "Graphic Design", count: 41 },
                    { skill: "Community Management", count: 38 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{item.count} applicants</span>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-green-900 mb-2">High Engagement</h4>
                  <p className="text-sm text-green-700">Your job post is performing 23% better than similar roles</p>
                </div>

                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-blue-900 mb-2">Quality Candidates</h4>
                  <p className="text-sm text-blue-700">Average candidate score is above industry standard</p>
                </div>

                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-orange-900 mb-2">Quick Response</h4>
                  <p className="text-sm text-orange-700">Candidates are applying within 2 days of posting</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default JobListingDetail
