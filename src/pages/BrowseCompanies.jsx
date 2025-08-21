"use client"

import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"

const BrowseCompanies = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [sortBy, setSortBy] = useState("Most relevant")
  const itemsPerPage = 6

  const [filters, setFilters] = useState({
    industry: [],
    companySize: [],
  })

  const popularCompanies = ["Twitter", "Microsoft", "Apple", "Facebook"]

  const locations = [
    "All Locations",
    "Florence, Italy",
    "San Francisco, USA",
    "New York, USA",
    "London, UK",
    "Berlin, Germany",
    "Paris, France",
    "Remote",
    "Toronto, Canada",
    "Sydney, Australia",
  ]

  const industries = [
    { name: "Advertising", count: 43 },
    { name: "Business Service", count: 4 },
    { name: "Blockchain", count: 5 },
    { name: "Cloud", count: 15 },
    { name: "Consumer Tech", count: 5 },
    { name: "Education", count: 34 },
    { name: "Fintech", count: 45 },
    { name: "Gaming", count: 33 },
    { name: "Food & Beverage", count: 5 },
    { name: "Healthcare", count: 3 },
    { name: "Hostinng", count: 5 },
    { name: "Media", count: 4 },
    { name: "E-commerce", count: 28 },
    { name: "Social Media", count: 12 },
    { name: "Cryptocurrency", count: 18 },
    { name: "Software", count: 67 },
  ]

  const companySizes = [
    { name: "1-50", count: 25 },
    { name: "51-150", count: 57 },
    { name: "151-250", count: 45 },
    { name: "251-500", count: 4 },
    { name: "501-1000", count: 43 },
    { name: "1000 - above", count: 23 },
  ]

  // Extended company dataset with actual image files
  const allCompanies = [
    {
      id: 1,
      name: "Stripe",
      logo: "https://i.pinimg.com/1200x/c7/5c/1b/c75c1bc9beceeb10d8cc7df1514e8b94.jpg",
      logoColor: "bg-blue-500",
      jobCount: 7,
      location: "San Francisco, USA",
      industry: "Fintech",
      size: "501-1000",
      description:
        "Stripe is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe's software tools...",
      tags: ["Business", "Blockchain"],
      founded: 2010,
      employees: "4000+",
      website: "stripe.com",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Truebill",
      logo: "https://i.pinimg.com/736x/d5/d1/7d/d5d17d8e45d14568aec5b6f227ce4f97.jpg",
      logoColor: "bg-green-500",
      jobCount: 7,
      location: "New York, USA",
      industry: "Fintech",
      size: "151-250",
      description:
        "Take control of your money. Truebill develops a mobile app that helps consumers take control of their financial...",
      tags: ["Business"],
      founded: 2015,
      employees: "200+",
      website: "truebill.com",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Square",
      logo: "https://i.pinimg.com/736x/9f/da/4f/9fda4f64137790f50bfb582f3b149895.jpg",
      logoColor: "bg-gray-800",
      jobCount: 7,
      location: "San Francisco, USA",
      industry: "Fintech",
      size: "1000 - above",
      description:
        "Square builds common business tools in unconventional ways so more people can start, run, and grow their businesses.",
      tags: ["Business", "Blockchain"],
      founded: 2009,
      employees: "5000+",
      website: "squareup.com",
      rating: 4.3,
    },
    {
      id: 4,
      name: "Coinbase",
      logo: "https://i.pinimg.com/736x/2d/7a/fa/2d7afafbd9546e2dbd6cc4d304a2895a.jpg",
      logoColor: "bg-blue-600",
      jobCount: 7,
      location: "San Francisco, USA",
      industry: "Cryptocurrency",
      size: "1000 - above",
      description:
        "Coinbase is a digital currency wallet and platform where merchants and consumers can transact with new digital currencies.",
      tags: ["Business", "Blockchain"],
      founded: 2012,
      employees: "3000+",
      website: "coinbase.com",
      rating: 4.1,
    },
    {
      id: 5,
      name: "Robinhood",
      logo: "https://i.pinimg.com/1200x/9f/d5/44/9fd544e45af085251a52674a8b9cfd18.jpg",
      logoColor: "bg-green-600",
      jobCount: 7,
      location: "Menlo Park, USA",
      industry: "Fintech",
      size: "501-1000",
      description:
        "Robinhood is lowering barriers, removing fees, and providing greater access to financial information.",
      tags: ["Business"],
      founded: 2013,
      employees: "2000+",
      website: "robinhood.com",
      rating: 4.0,
    },
    {
      id: 6,
      name: "Kraken",
      logo: "https://i.pinimg.com/1200x/16/8c/7b/168c7b1353e6b4e187b4148271fd0394.jpg",
      logoColor: "bg-purple-600",
      jobCount: 7,
      location: "San Francisco, USA",
      industry: "Cryptocurrency",
      
      description:
        "Based in San Francisco, Kraken is the world's largest global bitcoin exchange in euro volume and liquidity.",
      tags: ["Business", "Blockchain"],
      founded: 2011,
      employees: "2500+",
      website: "kraken.com",
      rating: 4.4,
    },
    {
      id: 7,
      name: "Twitter",
      logo: "https://i.pinimg.com/1200x/58/5b/ba/585bbab4ea70e62d8261d84648d7ef8d.jpg",
      logoColor: "bg-blue-400",
      jobCount: 12,
      location: "San Francisco, USA",
      industry: "Social Media",
      size: "1000 - above",
      description:
        "Twitter is a social networking service where users post and interact with messages known as tweets.",
      tags: ["Social Media", "Technology"],
      founded: 2006,
      employees: "7500+",
      website: "twitter.com",
      rating: 4.2,
    },
    {
      id: 8,
      name: "Microsoft",
      logo: "https://i.pinimg.com/736x/fa/76/9b/fa769ba2fd25c9bdd269a736e0942218.jpg",
      logoColor: "bg-blue-700",
      jobCount: 25,
      location: "Redmond, USA",
      industry: "Software",
      size: "1000 - above",
      description:
        "Microsoft is a multinational technology corporation that develops computer software, consumer electronics, and personal computers.",
      tags: ["Software", "Cloud"],
      founded: 1975,
      employees: "200000+",
      website: "microsoft.com",
      rating: 4.6,
    },
    {
      id: 9,
      name: "Apple",
      logo: "https://i.pinimg.com/736x/dc/4e/2b/dc4e2ba4ea6e1a533369436270edc15c.jpg",
      logoColor: "bg-gray-900",
      jobCount: 18,
      location: "Cupertino, USA",
      industry: "Consumer Tech",
      size: "1000 - above",
      description:
        "Apple designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories.",
      tags: ["Consumer Tech", "Hardware"],
      founded: 1976,
      employees: "150000+",
      website: "apple.com",
      rating: 4.7,
    },
    {
      id: 10,
      name: "Facebook",
      logo: "https://i.pinimg.com/736x/7b/ed/39/7bed398644d61cae7c4dd853b558a1c9.jpg",
      logoColor: "bg-blue-600",
      jobCount: 22,
      location: "Menlo Park, USA",
      industry: "Social Media",
      size: "1000 - above",
      description: "Facebook builds technologies that help people connect, find communities, and grow businesses.",
      tags: ["Social Media", "Advertising"],
      founded: 2004,
      employees: "70000+",
      website: "facebook.com",
      rating: 4.3,
    },
   
  
    {
      id: 11,
      name: "Uber",
      logo: "https://i.pinimg.com/1200x/f3/b7/ac/f3b7acbc81e268b28ffc2371c555c6d4.jpg",
      logoColor: "bg-black",
      jobCount: 16,
      location: "San Francisco, USA",
      industry: "Consumer Tech",
    
      description:
        "Uber develops, markets and operates a ride-sharing mobile application that allows consumers to submit trip requests.",
      tags: ["Consumer Tech", "Transportation"],
      founded: 2009,
      employees: "26000+",
      website: "uber.com",
      rating: 4.1,
    },

    {
      id: 12,
      name: "Zoom",
      logo: "https://i.pinimg.com/1200x/bf/54/a7/bf54a70f234c9bfa60c6040618ac9079.jpg",
      logoColor: "bg-blue-500",
      jobCount: 8,
      location: "San Jose, USA",
      industry: "Software",
      
      description:
        "Zoom is a communications technology company that provides video conferencing and online chat services.",
      tags: ["Software", "Communication"],
      founded: 2011,
      employees: "6800+",
      website: "zoom.us",
      rating: 4.3,
    },
    {
      id: 13,
      name: "Slack",
      logo: "https://i.pinimg.com/736x/c5/f9/56/c5f9567da28c6b923117aa1cc9431603.jpg",
      logoColor: "bg-purple-500",
      jobCount: 6,
      location: "San Francisco, USA",
      industry: "Software",
      size: "501-1000",
      description:
        "Slack is a business communication platform offering many IRC-style features for team collaboration.",
      tags: ["Software", "Communication"],
      founded: 2009,
      employees: "2500+",
      website: "slack.com",
      rating: 4.4,
    },
    {
      id: 14,
      name: "GitHub",
      logo: "https://i.pinimg.com/1200x/66/71/3a/66713a96b9b21dffd3a85a5d748a3171.jpg",
      logoColor: "bg-gray-900",
      jobCount: 5,
      location: "San Francisco, USA",
      industry: "Software",
      size: "501-1000",
      description: "GitHub is a web-based version-control and collaboration platform for software developers.",
      tags: ["Software", "Development"],
      founded: 2008,
      employees: "2000+",
      website: "github.com",
      rating: 4.6,
    },
    {
      id: 15,
      name: "Stripe",
      logo: "https://i.pinimg.com/1200x/55/d7/ab/55d7abe5a1307809787136346bd8495f.jpg",
      logoColor: "bg-blue-500",
      jobCount: 7,
      location: "Florence, Italy",
      industry: "Fintech",
     
      description:
        "Stripe is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe's software tools...",
      tags: ["Business", "Blockchain"],
      founded: 2010,
      employees: "4000+",
      website: "stripe.com",
      rating: 4.5,
    },
 
  ]

  // Filter and search logic
  const filteredCompanies = useMemo(() => {
    let filtered = allCompanies

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (company) =>
          company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Location filter
    if (selectedLocation && selectedLocation !== "All Locations") {
      filtered = filtered.filter((company) => company.location.includes(selectedLocation.split(",")[0]))
    }

    // Industry filter
    if (filters.industry.length > 0) {
      filtered = filtered.filter((company) => filters.industry.includes(company.industry))
    }

    // Company size filter
    if (filters.companySize.length > 0) {
      filtered = filtered.filter((company) => filters.companySize.includes(company.size))
    }
    

    // Sort logic
    switch (sortBy) {
      case "Most jobs":
        filtered.sort((a, b) => b.jobCount - a.jobCount)
        break
      case "Highest rated":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "Recently founded":
        filtered.sort((a, b) => b.founded - a.founded)
        break
      case "Company size":
        filtered.sort(
          (a, b) => Number.parseInt(b.employees.replace(/\D/g, "")) - Number.parseInt(a.employees.replace(/\D/g, "")),
        )
        break
      case "Most relevant":
      default:
        // Keep original order for "most relevant"
        break
    }

    return filtered
  }, [searchQuery, selectedLocation, filters, sortBy])

  // Pagination logic
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCompanies = filteredCompanies.slice(startIndex, endIndex)

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

  const handlePopularSearch = (company) => {
    setSearchQuery(company)
    resetPagination()
  }

  // Enhanced clear functionality
  const clearAllFilters = () => {
    setFilters({
      industry: [],
      companySize: [],
    })
    setSearchQuery("")
    setSelectedLocation("All Locations")
    setSortBy("Most relevant")
    setViewMode("grid")
    resetPagination()
  }

  // Clear individual filter types
  const clearSearchQuery = () => {
    setSearchQuery("")
    resetPagination()
  }

  const clearLocationFilter = () => {
    setSelectedLocation("All Locations")
    resetPagination()
  }

  const clearIndustryFilters = () => {
    setFilters((prev) => ({
      ...prev,
      industry: [],
    }))
    resetPagination()
  }

  const clearCompanySizeFilters = () => {
    setFilters((prev) => ({
      ...prev,
      companySize: [],
    }))
    resetPagination()
  }

  const clearSorting = () => {
    setSortBy("Most relevant")
    resetPagination()
  }

  // Remove individual filter
  const removeFilter = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].filter((item) => item !== value),
    }))
    resetPagination()
  }

  const handleViewCompany = (companyId) => {
    console.log("Viewing company:", companyId)
    // Here you would typically navigate to company details page
  }

  const handleFollowCompany = (companyId) => {
    console.log("Following company:", companyId)
    // Here you would typically save to followed companies
  }

 const handleBackToHomepage = () => {
  navigate('/');
};

  const handleImageError = (e) => {
    const companyName = e.target.alt
    const initial = companyName.charAt(0).toUpperCase()
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-gray-500",
    ]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const fallbackDiv = document.createElement("div")
    fallbackDiv.className = `w-20 h-20 rounded-lg ${randomColor} flex items-center justify-center text-white font-bold text-xl`
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
        <div className="flex items-center justify-between mb-3">
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
          {/* Clear individual filter type */}
          {filters[filterKey].length > 0 && (
            <button
              onClick={filterKey === "industry" ? clearIndustryFilters : clearCompanySizeFilters}
              className="text-xs text-red-600 hover:text-red-700 ml-2"
            >
              Clear
            </button>
          )}
        </div>
        {expanded && (
          <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
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

  // Check if any filters are active
  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedLocation !== "All Locations" ||
    filters.industry.length > 0 ||
    filters.companySize.length > 0 ||
    sortBy !== "Most relevant"

  return (
    <div className="min-h-screen  sm:ml-64">
      <div className="p-4 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Browse Companies</h1>
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
                placeholder="Company title or keyword"
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              {/* Clear search button */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearchQuery}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
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

          {/* Popular Companies */}
          <div className="mt-4">
            <span className="text-sm text-gray-600 mr-2">Popular:</span>
            {popularCompanies.map((company, index) => (
              <button
                key={company}
                onClick={() => handlePopularSearch(company)}
                className="text-sm text-blue-600 hover:text-blue-700 mr-3"
              >
                {company}
                {index < popularCompanies.length - 1 && <span className="text-gray-400 ml-3">•</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Bar */}
        {hasActiveFilters && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-blue-900">Active Filters</h3>
              <button onClick={clearAllFilters} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Clear All Filters
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  Search: "{searchQuery}"
                  <button onClick={clearSearchQuery} className="ml-2 text-blue-600 hover:text-blue-800">
                    ×
                  </button>
                </span>
              )}
              {selectedLocation !== "All Locations" && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  Location: {selectedLocation}
                  <button onClick={clearLocationFilter} className="ml-2 text-blue-600 hover:text-blue-800">
                    ×
                  </button>
                </span>
              )}
              {sortBy !== "Most relevant" && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  Sort: {sortBy}
                  <button onClick={clearSorting} className="ml-2 text-blue-600 hover:text-blue-800">
                    ×
                  </button>
                </span>
              )}
              {[...filters.industry, ...filters.companySize].map((filter) => (
                <span
                  key={filter}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {filter}
                  <button
                    onClick={() => {
                      // Remove this specific filter
                      Object.keys(filters).forEach((key) => {
                        if (filters[key].includes(filter)) {
                          removeFilter(key, filter)
                        }
                      })
                    }}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-80 bg-white rounded-lg shadow p-6 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Filters</h2>
              {hasActiveFilters && (
                <button onClick={clearAllFilters} className="text-sm text-red-600 hover:text-red-700">
                  Clear All
                </button>
              )}
            </div>

            <FilterSection title="Industry" items={industries} filterKey="industry" />

            <FilterSection title="Company Size" items={companySizes} filterKey="companySize" />
          </div>

          {/* Companies Listings */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">All Companies</h2>
                <p className="text-gray-600">
                  Showing {filteredCompanies.length} result{filteredCompanies.length !== 1 ? "s" : ""}
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
                    <option>Most jobs</option>
                    <option>Highest rated</option>
                    <option>Recently founded</option>
                    <option>Company size</option>
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
            {filteredCompanies.length === 0 && (
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No companies found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Company Cards */}
            {currentCompanies.length > 0 && (
              <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "space-y-4"}>
                {currentCompanies.map((company) => (
                  <div key={company.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-white border border-gray-200 flex-shrink-0 p-2">
                          <img
                            src={company.logo || "/placeholder.svg"}
                            alt={company.name}
                            className="w-full h-full object-contain"
                            onError={handleImageError}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{company.name}</h3>
                            <span className="text-blue-600 font-medium">{company.jobCount} Jobs</span>
                          </div>
                          <p className="text-gray-600 mb-2">{company.location}</p>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm text-gray-600">{company.rating}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-600">{company.employees} employees</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-600">Founded {company.founded}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{company.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {company.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleFollowCompany(company.id)}
                          className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                        >
                          Follow
                        </button>
                        <button
                          onClick={() => handleViewCompany(company.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          View Jobs
                        </button>
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
            {filteredCompanies.length > 0 && (
              <div className="text-center mt-4 text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredCompanies.length)} of {filteredCompanies.length}{" "}
                companies
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrowseCompanies
