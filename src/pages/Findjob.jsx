"use client"

import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
const Findjob = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState("list")
  const [sortBy, setSortBy] = useState("Most relevant")
  const itemsPerPage = 5

  const [filters, setFilters] = useState({
    employmentType: [],
    categories: [],
    jobLevel: [],
    salaryRange: [],
  })

  const popularSearches = ["UI Designer", "UX Researcher", "Android", "Admin"]

  const locations = [
    "All Locations",
    "Florence, Italy",
    "Paris, France",
    "Berlin, Germany",
    "Madrid, Spain",
    "London, UK",
    "Remote",
    "San Francisco, USA",
    "Hamburg, Germany",
    "Ankara, Turkey",
  ]

  const employmentTypes = [
    { name: "Full-time", count: 45 },
    { name: "Part-Time", count: 12 },
    { name: "Remote", count: 23 },
    { name: "Internship", count: 8 },
    { name: "Contract", count: 15 },
  ]

  const categories = [
    { name: "Design", count: 24 },
    { name: "Sales", count: 8 },
    { name: "Marketing", count: 18 },
    { name: "Business", count: 12 },
    { name: "Human Resource", count: 6 },
    { name: "Finance", count: 9 },
    { name: "Engineering", count: 32 },
    { name: "Technology", count: 28 },
  ]

  const jobLevels = [
    { name: "Entry Level", count: 57 },
    { name: "Mid Level", count: 23 },
    { name: "Senior Level", count: 18 },
    { name: "Director", count: 12 },
    { name: "VP or Above", count: 8 },
  ]

  const salaryRanges = [
    { name: "$700 - $1000", count: 4 },
    { name: "$1000 - $2000", count: 15 },
    { name: "$2000 - $4000", count: 28 },
    { name: "$4000 - $6000", count: 18 },
    { name: "$6000+", count: 12 },
  ]

  // Extended job dataset for better search and pagination demonstration
  const allJobs = [
    {
      id: 1,
      title: "Social Media Assistant",
      company: "Nomad",
      location: "Paris, France",
      logo: "/placeholder.svg?height=48&width=48",
      logoColor: "bg-green-500",
      type: "Full-time",
      category: "Marketing",
      level: "Entry Level",
      salary: 2500,
      salaryRange: "$2000 - $4000",
      tags: ["Marketing", "Design"],
      applied: 5,
      capacity: 10,
      posted: "2 days ago",
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 2,
      title: "Brand Designer",
      company: "Dropbox",
      location: "San Francisco, USA",
      logo: "/placeholder.svg?height=48&width=48",
      logoColor: "bg-blue-500",
      type: "Full-time",
      category: "Design",
      level: "Mid Level",
      salary: 5000,
      salaryRange: "$4000 - $6000",
      tags: ["Marketing", "Design"],
      applied: 2,
      capacity: 10,
      posted: "1 day ago",
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: 3,
      title: "Interactive Developer",
      company: "Terraform",
      location: "Hamburg, Germany",
      logo: "/placeholder.svg?height=48&width=48",
      logoColor: "bg-purple-500",
      type: "Full-time",
      category: "Engineering",
      level: "Senior Level",
      salary: 4200,
      salaryRange: "$4000 - $6000",
      tags: ["Technology", "Engineering"],
      applied: 8,
      capacity: 12,
      posted: "3 days ago",
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: 4,
      title: "Email Marketing Specialist",
      company: "Revolut",
      location: "Madrid, Spain",
      logo: "/placeholder.svg?height=48&width=48",
      logoColor: "bg-red-500",
      type: "Full-time",
      category: "Marketing",
      level: "Mid Level",
      salary: 3500,
      salaryRange: "$2000 - $4000",
      tags: ["Marketing", "Business"],
      applied: 0,
      capacity: 10,
      posted: "1 week ago",
      postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: 5,
      title: "Lead Engineer",
      company: "Canva",
      location: "Remote",
      logo: "/placeholder.svg?height=48&width=48",
      logoColor: "bg-green-400",
      type: "Remote",
      category: "Engineering",
      level: "Director",
      salary: 6200,
      salaryRange: "$6000+",
      tags: ["Technology", "Engineering"],
      applied: 5,
      capacity: 10,
      posted: "4 days ago",
      postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
    {
      id: 6,
      title: "Product Designer",
      company: "ClassPass",
      location: "Berlin, Germany",
      logo: "/placeholder.svg?height=48&width=48",
      logoColor: "bg-red-600",
      type: "Full-time",
      category: "Design",
      level: "Senior Level",
      salary: 5500,
      salaryRange: "$4000 - $6000",
      tags: ["Design", "Technology"],
      applied: 5,
      capacity: 10,
      posted: "5 days ago",
      postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: 7,
      title: "Customer Manager",
      company: "Pitch",
      location: "Berlin, Germany",
      logo: "/placeholder.svg?height=48&width=48",
      logoColor: "bg-green-500",
      type: "Full-time",
      category: "Business",
      level: "Mid Level",
      salary: 4000,
      salaryRange: "$2000 - $4000",
      tags: ["Business", "Sales"],
      applied: 5,
      capacity: 10,
      posted: "1 week ago",
      postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: 8,
      title: "UX Researcher",
      company: "Spotify",
      location: "Remote",
      logo: "/placeholder.svg?height=48&width=48",
      logoColor: "bg-green-600",
      type: "Remote",
      category: "Design",
      level: "Senior Level",
      salary: 5800,
      salaryRange: "$4000 - $6000",
      tags: ["Design", "Research"],
      applied: 12,
      capacity: 15,
      posted: "2 days ago",
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 9,
      title: "Sales Representative",
      company: "Salesforce",
      location: "London, UK",
      logo: "/placeholder.svg?height=48&width=48",
      logoColor: "bg-blue-600",
      type: "Full-time",
      category: "Sales",
      level: "Entry Level",
      salary: 3200,
      salaryRange: "$2000 - $4000",
      tags: ["Sales", "Business"],
      applied: 8,
      capacity: 20,
      posted: "3 days ago",
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: 10,
      title: "DevOps Engineer",
      company: "Netflix",
      location: "Remote",
      logo: "/placeholder.svg?height=48&width=48",
      logoColor: "bg-red-500",
      type: "Remote",
      category: "Engineering",
      level: "Senior Level",
      salary: 7000,
      salaryRange: "$6000+",
      tags: ["Technology", "Engineering"],
      applied: 15,
      capacity: 8,
      posted: "1 day ago",
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: 11,
      title: "Content Marketing Manager",
      company: "HubSpot",
      location: "Florence, Italy",
      logo: "/placeholder.svg?height=48&width=48",
      logoColor: "bg-orange-500",
      type: "Full-time",
      category: "Marketing",
      level: "Mid Level",
      salary: 4500,
      salaryRange: "$4000 - $6000",
      tags: ["Marketing", "Content"],
      applied: 7,
      capacity: 12,
      posted: "6 days ago",
      postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    },
    {
      id: 12,
      title: "Android Developer",
      company: "Google",
      location: "Remote",
      logo: "/placeholder.svg?height=48&width=48",
      logoColor: "bg-green-500",
      type: "Remote",
      category: "Engineering",
      level: "Mid Level",
      salary: 6500,
      salaryRange: "$6000+",
      tags: ["Technology", "Mobile"],
      applied: 25,
      capacity: 5,
      posted: "2 hours ago",
      postedDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: 13,
      title: "HR Business Partner",
      company: "Microsoft",
      location: "Berlin, Germany",
      logo: "/placeholder.svg?height=48&width=48",
      logoColor: "bg-blue-500",
      type: "Full-time",
      category: "Human Resource",
      level: "Senior Level",
      salary: 5200,
      salaryRange: "$4000 - $6000",
      tags: ["HR", "Business"],
      applied: 3,
      capacity: 8,
      posted: "4 days ago",
      postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
    {
      id: 14,
      title: "Financial Analyst",
      company: "Goldman Sachs",
      location: "London, UK",
      logo: "/placeholder.svg?height=48&width=48",
      logoColor: "bg-gray-800",
      type: "Full-time",
      category: "Finance",
      level: "Entry Level",
      salary: 4800,
      salaryRange: "$4000 - $6000",
      tags: ["Finance", "Analysis"],
      applied: 18,
      capacity: 6,
      posted: "1 week ago",
      postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: 15,
      title: "Marketing Intern",
      company: "Adobe",
      location: "San Francisco, USA",
      logo: "/placeholder.svg?height=48&width=48",
      logoColor: "bg-red-600",
      type: "Internship",
      category: "Marketing",
      level: "Entry Level",
      salary: 1500,
      salaryRange: "$1000 - $2000",
      tags: ["Marketing", "Internship"],
      applied: 45,
      capacity: 25,
      posted: "3 days ago",
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  ]

  // Filter and search logic
  const filteredJobs = useMemo(() => {
    let filtered = allJobs

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }


    // Location filter
    if (selectedLocation && selectedLocation !== "All Locations") {
      filtered = filtered.filter((job) => job.location === selectedLocation)
    }

    // Employment type filter
    if (filters.employmentType.length > 0) {
      filtered = filtered.filter((job) => filters.employmentType.includes(job.type))
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((job) => filters.categories.includes(job.category))
    }

    // Job level filter
    if (filters.jobLevel.length > 0) {
      filtered = filtered.filter((job) => filters.jobLevel.includes(job.level))
    }

    // Salary range filter
    if (filters.salaryRange.length > 0) {
      filtered = filtered.filter((job) => filters.salaryRange.includes(job.salaryRange))
    }

    // Sort logic
    switch (sortBy) {
      case "Most recent":
        filtered.sort((a, b) => b.postedDate - a.postedDate)
        break
      case "Salary: High to Low":
        filtered.sort((a, b) => b.salary - a.salary)
        break
      case "Salary: Low to High":
        filtered.sort((a, b) => a.salary - b.salary)
        break
      case "Most relevant":
      default:
        // Keep original order for "most relevant"
        break
    }

    return filtered
  }, [searchQuery, selectedLocation, filters, sortBy])

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentJobs = filteredJobs.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  const resetPagination = () => {
    setCurrentPage(1)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    resetPagination()
    console.log("Searching for:", searchQuery, "in", selectedLocation)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }))
    resetPagination()
  }

  const handleLocationChange = (location) => {
    setSelectedLocation(location)
    resetPagination()
  }

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy)
    resetPagination()
  }

  const handlePopularSearch = (search) => {
    setSearchQuery(search)
    resetPagination()
  }

  const clearAllFilters = () => {
    setFilters({
      employmentType: [],
      categories: [],
      jobLevel: [],
      salaryRange: [],
    })
    setSearchQuery("")
    setSelectedLocation("All Locations")
    resetPagination()
  }

  const handleApplyJob = (jobId) => {
    console.log("Applying to job:", jobId)
  }

  const handleSaveJob = (jobId) => {
    console.log("Saving job:", jobId)
  }

  const handleBackToHomepage = () => {
     navigate('/');
  }
  

  const handleImageError = (e) => {
    const companyName = e.target.alt
    const initial = companyName.charAt(0).toUpperCase()
    const fallbackDiv = document.createElement("div")
    fallbackDiv.className =
      "w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white font-medium text-sm"
    fallbackDiv.textContent = initial
    e.target.parentNode.replaceChild(fallbackDiv, e.target)
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  const FilterSection = ({ title, items, filterKey, isOpen = true }) => {
    const [expanded, setExpanded] = useState(isOpen)

    return (
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button onClick={() => setExpanded(!expanded)} className="flex items-center justify-between w-full text-left">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <svg
            className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expanded && (
          <div className="mt-3 space-y-2">
            {items.map((item) => (
              <label key={item.name} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters[filterKey].includes(item.name)}
                  onChange={() => handleFilterChange(filterKey, item.name)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  {item.name} ({item.count})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 sm:ml-64">
      <div className="p-4 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Find Jobs</h1>
          <button
            onClick={handleBackToHomepage}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Back to homepage
          </button>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <form onSubmit={handleSearch} className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job title or keyword"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <select
                value={selectedLocation}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white min-w-48"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Search
            </button>
          </form>

          {/* Popular Searches */}
          <div className="mt-4">
            <span className="text-sm text-gray-600 mr-2">Popular:</span>
            {popularSearches.map((search, index) => (
              <button
                key={search}
                onClick={() => handlePopularSearch(search)}
                className="text-sm text-blue-600 hover:text-blue-700 mr-3"
              >
                {search}
                {index < popularSearches.length - 1 && <span className="text-gray-400 ml-3">•</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-80 bg-white rounded-lg shadow p-6 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Filters</h2>
              {(filters.employmentType.length > 0 ||
                filters.categories.length > 0 ||
                filters.jobLevel.length > 0 ||
                filters.salaryRange.length > 0) && (
                <button onClick={clearAllFilters} className="text-sm text-blue-600 hover:text-blue-700">
                  Clear All
                </button>
              )}
            </div>

            <FilterSection title="Type of Employment" items={employmentTypes} filterKey="employmentType" />

            <FilterSection title="Categories" items={categories} filterKey="categories" />

            <FilterSection title="Job Level" items={jobLevels} filterKey="jobLevel" />

            <FilterSection title="Salary Range" items={salaryRanges} filterKey="salaryRange" />
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">All Jobs</h2>
                <p className="text-gray-600">
                  Showing {filteredJobs.length} result{filteredJobs.length !== 1 ? "s" : ""}
                  {searchQuery && ` for "${searchQuery}"`}
                  {selectedLocation && selectedLocation !== "All Locations" && ` in ${selectedLocation}`}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option>Most relevant</option>
                    <option>Most recent</option>
                    <option>Salary: High to Low</option>
                    <option>Salary: Low to High</option>
                  </select>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* No Results Message */}
            {filteredJobs.length === 0 && (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Job Cards */}
            {currentJobs.length > 0 && (
              <div className="space-y-4">
                {currentJobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={job.logo || "/placeholder.svg"}
                            alt={job.company}
                            className="w-full h-full object-cover"
                            onError={handleImageError}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                          <p className="text-gray-600 mb-2">
                            {job.company} • {job.location}
                          </p>
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              {job.type}
                            </span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                              {job.category}
                            </span>
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                              {job.level}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>💰 ${job.salary.toLocaleString()}/month</span>
                            <span>📅 {job.posted}</span>
                            <span>
                              👥 {job.applied} applied of {job.capacity} capacity
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleSaveJob(job.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleApplyJob(job.id)}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Apply
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Application Progress</span>
                        <span className="text-gray-900">
                          {job.applied} of {job.capacity} capacity
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.min((job.applied / job.capacity) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === 1}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === "number" && setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : page === "..."
                          ? "text-gray-400 cursor-default"
                          : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                    disabled={page === "..."}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === totalPages}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Pagination Info */}
            {filteredJobs.length > 0 && (
              <div className="text-center mt-4 text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredJobs.length)} of {filteredJobs.length} jobs
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Findjob
