"use client"

import { useState, useMemo, useEffect, useRef } from "react"

// Enhanced mock data with more realistic information
const generateJobStatistics = (startDate, endDate) => {
  const days = []
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    const dayName = currentDate.toLocaleDateString("en-US", { weekday: "short" })
    const baseViews = Math.floor(Math.random() * 100) + 80
    const baseApplied = Math.floor(baseViews * (0.4 + Math.random() * 0.3))

    days.push({
      day: dayName,
      date: new Date(currentDate),
      jobView: baseViews,
      jobApplied: baseApplied,
    })
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return days
}

const subDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() - days)
  return result
}

const formatDate = (date, format) => {
  const options = format === "MMM dd" ? { month: "short", day: "2-digit" } : { day: "2-digit" }
  return date.toLocaleDateString("en-US", options)
}

const jobUpdates = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-Time",
    salary: "$120k - $150k",
    logo: "https://i.pinimg.com/736x/55/13/bc/5513bcf739d64e80a9273c74cee7f8a9.jpg",
    tags: ["React", "TypeScript", "Next.js"],
    applied: 23,
    capacity: 50,
    color: "bg-emerald-500",
    postedDate: new Date(),
    status: "Active",
    description: "We're looking for a senior frontend developer to join our growing team.",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "DesignStudio",
    location: "New York, NY",
    type: "Full-Time",
    salary: "$90k - $120k",
    logo: "https://i.pinimg.com/736x/55/13/bc/5513bcf739d64e80a9273c74cee7f8a9.jpg",
    tags: ["Figma", "Design Systems", "User Research"],
    applied: 18,
    capacity: 30,
    color: "bg-blue-500",
    postedDate: subDays(new Date(), 2),
    status: "Active",
    description: "Join our design team to create beautiful and intuitive user experiences.",
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Remote",
    type: "Full-Time",
    salary: "$110k - $140k",
    logo: "https://i.pinimg.com/736x/55/13/bc/5513bcf739d64e80a9273c74cee7f8a9.jpg",
    tags: ["AWS", "Docker", "Kubernetes"],
    applied: 31,
    capacity: 40,
    color: "bg-cyan-500",
    postedDate: subDays(new Date(), 5),
    status: "Active",
    description: "Help us scale our infrastructure and improve deployment processes.",
  },
  {
    id: 4,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Austin, TX",
    type: "Full-Time",
    salary: "$130k - $160k",
    logo: "https://i.pinimg.com/736x/55/13/bc/5513bcf739d64e80a9273c74cee7f8a9.jpg",
    tags: ["Strategy", "Analytics", "Agile"],
    applied: 15,
    capacity: 25,
    color: "bg-purple-500",
    postedDate: subDays(new Date(), 7),
    status: "Active",
    description: "Lead product development and drive strategic initiatives.",
  },
]

const candidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    position: "Senior Frontend Developer",
    status: "New",
    appliedDate: new Date(),
    experience: "5 years",
    skills: ["React", "TypeScript", "Node.js"],
    avatar: "https://i.pinimg.com/736x/eb/76/a4/eb76a46ab920d056b02d203ca95e9a22.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    position: "UX/UI Designer",
    status: "Reviewed",
    appliedDate: subDays(new Date(), 1),
    experience: "3 years",
    skills: ["Figma", "Sketch", "Prototyping"],
    avatar: "https://i.pinimg.com/736x/cf/6e/c4/cf6ec445df41899479978aa16f05c996.jpg",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    position: "DevOps Engineer",
    status: "Interview",
    appliedDate: subDays(new Date(), 3),
    experience: "7 years",
    skills: ["AWS", "Docker", "Python"],
    avatar: "https://i.pinimg.com/1200x/20/ec/44/20ec449b3a7074fc5ea89cc8debcb68d.jpg",
  },
]

// Enhanced JavaScript Chart Component
const AdvancedBarChart = ({ data }) => {
  const canvasRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Chart dimensions
    const padding = 40
    const chartWidth = rect.width - padding * 2
    const chartHeight = rect.height - padding * 2
    const barWidth = chartWidth / data.length / 2.5
    const barSpacing = chartWidth / data.length

    // Find max value for scaling
    const maxValue = Math.max(...data.map((d) => Math.max(d.jobView, d.jobApplied)))

    // Draw grid lines
    ctx.strokeStyle = "#f1f5f9"
    ctx.lineWidth = 1
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(rect.width - padding, y)
      ctx.stroke()
    }

    // Draw bars with gradients and animations
    data.forEach((day, index) => {
      const x = padding + index * barSpacing + barSpacing / 2 - barWidth
      const viewHeight = (day.jobView / maxValue) * chartHeight
      const appliedHeight = (day.jobApplied / maxValue) * chartHeight

      // Create gradients
      const viewGradient = ctx.createLinearGradient(0, padding, 0, padding + chartHeight)
      viewGradient.addColorStop(0, "#fbbf24")
      viewGradient.addColorStop(1, "#f59e0b")

      const appliedGradient = ctx.createLinearGradient(0, padding, 0, padding + chartHeight)
      appliedGradient.addColorStop(0, "#6366f1")
      appliedGradient.addColorStop(1, "#4f46e5")

      // Draw Job View bars
      ctx.fillStyle = hoveredIndex === index ? "#f59e0b" : viewGradient
      ctx.fillRect(x, padding + chartHeight - viewHeight, barWidth * 0.8, viewHeight)

      // Draw Job Applied bars
      ctx.fillStyle = hoveredIndex === index ? "#4f46e5" : appliedGradient
      ctx.fillRect(x + barWidth * 0.9, padding + chartHeight - appliedHeight, barWidth * 0.8, appliedHeight)

      // Add subtle shadow
      if (hoveredIndex === index) {
        ctx.shadowColor = "rgba(0, 0, 0, 0.2)"
        ctx.shadowBlur = 8
        ctx.shadowOffsetY = 4
      } else {
        ctx.shadowColor = "transparent"
      }

      // Draw day labels
      ctx.fillStyle = "#64748b"
      ctx.font = "12px Inter, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(day.day, x + barWidth, rect.height - 15)
    })

    // Draw Y-axis labels
    ctx.fillStyle = "#64748b"
    ctx.font = "11px Inter, sans-serif"
    ctx.textAlign = "right"
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxValue / 5) * (5 - i))
      const y = padding + (chartHeight / 5) * i + 4
      ctx.fillText(value.toString(), padding - 10, y)
    }
  }, [data, hoveredIndex])

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left

    setMousePos({ x: e.clientX, y: e.clientY })

    // Calculate which bar is hovered
    const padding = 40
    const chartWidth = rect.width - padding * 2
    const barSpacing = chartWidth / data.length

    const hoveredBar = Math.floor((x - padding) / barSpacing)
    if (hoveredBar >= 0 && hoveredBar < data.length) {
      setHoveredIndex(hoveredBar)
    } else {
      setHoveredIndex(null)
    }
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  return (
    <div className="relative w-full h-64">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      {hoveredIndex !== null && (
        <div
          className="absolute bg-gray-900 text-white text-xs rounded-lg px-3 py-2 pointer-events-none z-10 shadow-lg"
          style={{
            left: mousePos.x - 60,
            top: mousePos.y - 80,
          }}
        >
          <div className="font-semibold">{data[hoveredIndex].day}</div>
          <div className="flex items-center space-x-2 mt-1">
            <div className="w-2 h-2 bg-amber-400 rounded"></div>
            <span>Views: {data[hoveredIndex].jobView}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded"></div>
            <span>Applied: {data[hoveredIndex].jobApplied}</span>
          </div>
        </div>
      )}
    </div>
  )
}

// Enhanced Calendar Component with better styling
const EnhancedCalendar = ({ selectedRange, onRangeChange, isOpen, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [startDate, setStartDate] = useState(selectedRange.from)
  const [endDate, setEndDate] = useState(selectedRange.to)

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const isDateInRange = (date) => {
    if (!startDate || !endDate || !date) return false
    return date >= startDate && date <= endDate
  }

  const isDateSelected = (date) => {
    if (!date) return false
    return (startDate && date.getTime() === startDate.getTime()) || (endDate && date.getTime() === endDate.getTime())
  }

  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date)
      setEndDate(null)
    } else if (date >= startDate) {
      setEndDate(date)
      onRangeChange({ from: startDate, to: date })
      setTimeout(() => onClose(), 300) // Small delay for visual feedback
    } else {
      setStartDate(date)
      setEndDate(null)
    }
  }

  const navigateMonth = (direction) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction))
  }

  if (!isOpen) return null

  return (
    <div className="absolute top-full right-0 mt-2 bg-white  border border-gray-200 rounded-xl shadow-2xl p-6 z-50 min-w-[320px] animate-in slide-in-from-top-2 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
        >
          <svg
            className="w-5 h-5 text-gray-600 group-hover:text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center">
          <h3 className="font-semibold text-lg text-gray-900">
            {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Select date range</p>
        </div>

        <button
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
        >
          <svg
            className="w-5 h-5 text-gray-600 group-hover:text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-500 p-3 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {getDaysInMonth(currentMonth).map((date, index) => {
          const isInRange = date && isDateInRange(date)
          const isSelected = date && isDateSelected(date)
          const isToday = date && date.toDateString() === new Date().toDateString()

          return (
            <button
              key={index}
              onClick={() => date && handleDateClick(date)}
              disabled={!date}
              className={`
                relative p-3 text-sm rounded-lg transition-all duration-200 font-medium
                ${!date ? "invisible" : ""}
                ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : isInRange
                      ? "bg-indigo-100 text-blue-600"
                      : isToday
                        ? "bg-gray-100 text-blue-600 border-2 border-indigo-200"
                        : "text-gray-700 hover:bg-gray-100"
                }
                ${date && !isSelected ? "hover:scale-105 hover:shadow-md" : ""}
              `}
            >
              {date?.getDate()}
              {isToday && !isSelected && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
              )}
            </button>
          )
        })}
      </div>

      {/* Footer with quick actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex space-x-2">
          <button
            onClick={() => {
              const today = new Date()
              const weekAgo = subDays(today, 7)
              setStartDate(weekAgo)
              setEndDate(today)
              onRangeChange({ from: weekAgo, to: today })
              onClose()
            }}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Last 7 days
          </button>
          <button
            onClick={() => {
              const today = new Date()
              const monthAgo = subDays(today, 30)
              setStartDate(monthAgo)
              setEndDate(today)
              onRangeChange({ from: monthAgo, to: today })
              onClose()
            }}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Last 30 days
          </button>
        </div>

        <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
          Close
        </button>
      </div>
    </div>
  )
}

// Sidebar Component
function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

     

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
    </>
  )
}

export default function CompanyDashboard() {
  const [activeTab, setActiveTab] = useState("Overview")
  const [selectedPeriod, setSelectedPeriod] = useState("Week")
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 6),
    to: new Date(),
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [isNewJobDialogOpen, setIsNewJobDialogOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [jobs, setJobs] = useState(jobUpdates)
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-Time",
    salary: "",
    description: "",
    tags: "",
  })

  // Generate statistics based on selected date range
  const jobStatistics = useMemo(() => {
    return generateJobStatistics(dateRange.from, dateRange.to)
  }, [dateRange])

  // Calculate statistics
  const totalJobViews = useMemo(() => {
    return jobStatistics.reduce((sum, day) => sum + day.jobView, 0)
  }, [jobStatistics])

  const totalJobsApplied = useMemo(() => {
    return jobStatistics.reduce((sum, day) => sum + day.jobApplied, 0)
  }, [jobStatistics])

  const weeklyChange = useMemo(() => {
    const thisWeek = totalJobViews
    const lastWeek = 2180
    const change = (((thisWeek - lastWeek) / lastWeek) * 100).toFixed(1)
    return { value: change, isPositive: Number.parseFloat(change) > 0 }
  }, [totalJobViews])

  const appliedChange = useMemo(() => {
    const thisWeek = totalJobsApplied
    const lastWeek = 620
    const change = (((thisWeek - lastWeek) / lastWeek) * 100).toFixed(1)
    return { value: Math.abs(Number.parseFloat(change)).toFixed(1), isPositive: Number.parseFloat(change) > 0 }
  }, [totalJobsApplied])

  // Filter jobs based on search and status
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === "All" || job.status === filterStatus
      return matchesSearch && matchesStatus
    })
  }, [jobs, searchTerm, filterStatus])

  // Handle date range changes
  const handleDateRangeChange = (range) => {
    setDateRange(range)
  }

  // Handle new job creation
  const handleCreateJob = () => {
    const job = {
      id: jobs.length + 1,
      ...newJob,
      logo: "/placeholder.svg?height=48&width=48",
      tags: newJob.tags.split(",").map((tag) => tag.trim()),
      applied: 0,
      capacity: 50,
      color: "bg-indigo-500",
      postedDate: new Date(),
      status: "Active",
    }
    setJobs([...jobs, job])
    setNewJob({
      title: "",
      company: "",
      location: "",
      type: "Full-Time",
      salary: "",
      description: "",
      tags: "",
    })
    setIsNewJobDialogOpen(false)
  }

  // Handle job deletion
  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter((job) => job.id !== jobId))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-0 sm:ml-64">
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
                <span className="font-medium text-gray-900">Nomad</span>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skills/Tags (comma separated)
                    </label>
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

        {/* Dashboard Content */}
        <main className="p-6 bg-white min-h-screen">
          {/* Welcome Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Good morning, Maria</h1>
                <p className="text-gray-600">
                  Here is your job listings statistic report from {formatDate(dateRange.from, "MMM dd")} -{" "}
                  {formatDate(dateRange.to, "MMM dd")}.
                </p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white shadow-sm transition-all duration-200"
                >
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium">
                    {formatDate(dateRange.from, "MMM dd")} - {formatDate(dateRange.to, "MMM dd")}
                  </span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <EnhancedCalendar
                  selectedRange={dateRange}
                  onRangeChange={handleDateRangeChange}
                  isOpen={isCalendarOpen}
                  onClose={() => setIsCalendarOpen(false)}
                />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-600 text-white p-6 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">New candidates to review</p>
                  <p className="text-3xl font-bold">{candidates.filter((c) => c.status === "New").length}</p>
                </div>
                <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            <div className="bg-emerald-500 text-white p-6 rounded-lg cursor-pointer hover:bg-emerald-600 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Schedule for today</p>
                  <p className="text-3xl font-bold">{candidates.filter((c) => c.status === "Interview").length}</p>
                </div>
                <svg className="w-6 h-6 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            <div className="bg-blue-500 text-white p-6 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Messages received</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Job Statistics - Full Width on Large Screens */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">Job statistics</h2>
                      <p className="text-sm text-gray-500">
                        Showing statistics {formatDate(dateRange.from, "MMM dd")}-{formatDate(dateRange.to, "dd")}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      {["Week", "Month", "Year"].map((period) => (
                        <button
                          key={period}
                          onClick={() => {
                            setSelectedPeriod(period)
                            const now = new Date()
                            if (period === "Week") {
                              setDateRange({ from: subDays(now, 6), to: now })
                            } else if (period === "Month") {
                              setDateRange({ from: subDays(now, 29), to: now })
                            } else {
                              setDateRange({ from: subDays(now, 364), to: now })
                            }
                          }}
                          className={`px-3 py-1 text-sm rounded-lg ${
                            selectedPeriod === period ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex space-x-6 mb-4">
                    <button
                      onClick={() => setActiveTab("Overview")}
                      className={`px-3 py-1 text-sm rounded-lg ${
                        activeTab === "Overview" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab("Jobs View")}
                      className={`px-3 py-1 text-sm rounded-lg ${
                        activeTab === "Jobs View" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Jobs View
                    </button>
                    <button
                      onClick={() => setActiveTab("Jobs Applied")}
                      className={`px-3 py-1 text-sm rounded-lg ${
                        activeTab === "Jobs Applied" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Jobs Applied
                    </button>
                  </div>

                  <AdvancedBarChart data={jobStatistics} />

                  <div className="flex items-center space-x-6 mt-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-amber-400 rounded"></div>
                      <span>Job View</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span>Job Applied</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Management */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Job Management</h2>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <svg
                          className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
                          placeholder="Search jobs..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Paused">Paused</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {filteredJobs.map((job) => (
                      <div
                        key={job.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <img
                              src={job.logo || "/placeholder.svg"}
                              alt={`${job.company} logo`}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-gray-900">{job.title}</h3>
                                <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">
                                  {job.type}
                                </span>
                                <span className="border border-gray-300 text-gray-600 text-xs px-2 py-1 rounded">
                                  {job.status}
                                </span>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                                <div className="flex items-center space-x-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                  </svg>
                                  <span>{job.company}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                  <span>{job.location}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                    />
                                  </svg>
                                  <span>{job.salary}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  <span>{formatDate(job.postedDate, "MMM dd")}</span>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {job.tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="border border-gray-300 text-gray-600 text-xs px-2 py-1 rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center space-x-1">
                                  <svg
                                    className="w-4 h-4 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                    />
                                  </svg>
                                  <span className="font-medium text-green-600">{job.applied} applied</span>
                                </div>
                                <span className="text-gray-500">of {job.capacity} capacity</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-gray-100 rounded">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job.id)}
                              className="p-2 hover:bg-gray-100 rounded text-red-600"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Candidates */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Recent Candidates</h2>
                    <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                      <span>View All</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {candidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={candidate.avatar || "/placeholder.svg"}
                            alt={`${candidate.name} avatar`}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{candidate.name}</h4>
                            <p className="text-sm text-gray-500">{candidate.position}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-gray-400">{candidate.experience} experience</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-400">
                                Applied {formatDate(candidate.appliedDate, "MMM dd")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              candidate.status === "New"
                                ? "bg-blue-100 text-blue-800"
                                : candidate.status === "Reviewed"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {candidate.status}
                          </span>
                          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                            View Profile
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Statistics Cards */}
            <div className="lg:col-span-1 space-y-6">
              {/* Job Views */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Job Views</p>
                    <p className="text-2xl font-bold">{totalJobViews.toLocaleString()}</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-500">This {selectedPeriod}</span>
                      <div
                        className={`flex items-center space-x-1 ${weeklyChange.isPositive ? "text-green-600" : "text-red-600"}`}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={
                              weeklyChange.isPositive
                                ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                            }
                          />
                        </svg>
                        <span className="text-xs font-medium">{weeklyChange.value}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Applied */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Job Applied</p>
                    <p className="text-2xl font-bold">{totalJobsApplied}</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-500">This {selectedPeriod}</span>
                      <div
                        className={`flex items-center space-x-1 ${appliedChange.isPositive ? "text-green-600" : "text-red-600"}`}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={
                              appliedChange.isPositive
                                ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                            }
                          />
                        </svg>
                        <span className="text-xs font-medium">{appliedChange.value}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Open */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Job Open</p>
                  <p className="text-4xl font-bold text-gray-900 mb-1">
                    {jobs.filter((j) => j.status === "Active").length}
                  </p>
                  <p className="text-sm text-gray-500">Jobs Opened</p>
                </div>
              </div>

              {/* Applicants Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold mb-4">Applicants Summary</h3>
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-gray-900">{jobs.reduce((sum, job) => sum + job.applied, 0)}</p>
                  <p className="text-sm text-gray-500">Total Applicants</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-indigo-500 rounded"></div>
                      <span className="text-sm">Full Time</span>
                    </div>
                    <span className="text-sm font-medium">
                      {jobs.filter((j) => j.type === "Full-Time").reduce((sum, job) => sum + job.applied, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                      <span className="text-sm">Part-Time</span>
                    </div>
                    <span className="text-sm font-medium">
                      {jobs.filter((j) => j.type === "Part-Time").reduce((sum, job) => sum + job.applied, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="text-sm">Remote</span>
                    </div>
                    <span className="text-sm font-medium">
                      {jobs.filter((j) => j.type === "Remote").reduce((sum, job) => sum + job.applied, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-amber-500 rounded"></div>
                      <span className="text-sm">Contract</span>
                    </div>
                    <span className="text-sm font-medium">
                      {jobs.filter((j) => j.type === "Contract").reduce((sum, job) => sum + job.applied, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
