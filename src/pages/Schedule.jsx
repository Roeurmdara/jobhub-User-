"use client"

import { useState, useMemo } from "react"
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, Users, CheckSquare, Bell, X, Edit, Trash2, MapPin, Video } from 'lucide-react'

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("week") // day, week, month
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [categories, setCategories] = useState({
    "Interview Schedule": { enabled: true, color: "bg-blue-500" },
    "Internal Meeting": { enabled: true, color: "bg-green-500" },
    "Team Schedule": { enabled: false, color: "bg-purple-500" },
    "My Task": { enabled: false, color: "bg-orange-500" },
    "Reminders": { enabled: false, color: "bg-red-500" }
  })

  // Sample events data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Interview session with Kathryn Murphy",
      category: "Interview Schedule",
      date: "2024-01-24",
      startTime: "02:00",
      endTime: "05:00",
      type: "interview",
      attendees: ["Kathryn Murphy"],
      location: "Conference Room A",
      description: "Technical interview for Senior Developer position"
    },
    {
      id: 2,
      title: "Interview session with John Doe",
      category: "Interview Schedule",
      date: "2024-01-24",
      startTime: "08:00",
      endTime: "09:00",
      type: "interview",
      attendees: ["John Doe"],
      location: "Virtual Meeting",
      description: "Initial screening interview"
    },
    {
      id: 3,
      title: "Meeting with stakeholders",
      category: "Internal Meeting",
      date: "2024-01-26",
      startTime: "09:00",
      endTime: "10:00",
      type: "meeting",
      attendees: ["Team Lead", "Product Manager"],
      location: "Meeting Room B",
      description: "Quarterly review meeting"
    },
    {
      id: 4,
      title: "Team Standup",
      category: "Team Schedule",
      date: "2024-01-25",
      startTime: "09:00",
      endTime: "09:30",
      type: "meeting",
      attendees: ["Development Team"],
      location: "Virtual",
      description: "Daily standup meeting"
    },
    {
      id: 5,
      title: "Review Applications",
      category: "My Task",
      date: "2024-01-25",
      startTime: "14:00",
      endTime: "16:00",
      type: "task",
      attendees: [],
      location: "Office",
      description: "Review pending job applications"
    }
  ])

  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "Interview Schedule",
    date: "",
    startTime: "",
    endTime: "",
    type: "interview",
    attendees: "",
    location: "",
    description: ""
  })

  // Get current week dates
  const getWeekDates = (date) => {
    const week = []
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day
    startOfWeek.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push(day)
    }
    return week
  }

  // Get month calendar
  const getMonthCalendar = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    const endDate = new Date(lastDay)
    
    // Adjust to start from Sunday
    startDate.setDate(startDate.getDate() - startDate.getDay())
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()))
    
    const calendar = []
    const current = new Date(startDate)
    
    while (current <= endDate) {
      calendar.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    
    return calendar
  }

  // Filter events by enabled categories
  const filteredEvents = useMemo(() => {
    return events.filter(event => categories[event.category]?.enabled)
  }, [events, categories])

  // Get events for a specific date
  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    return filteredEvents.filter(event => event.date === dateStr)
  }

  // Time slots for day/week view
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour} ${ampm}`
  })

  const handlePrevious = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setDate(newDate.getDate() - 1)
    }
    setCurrentDate(newDate)
  }

  const handleNext = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() + 1)
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
  }

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.startTime && newEvent.endTime) {
      const event = {
        id: Date.now(),
        ...newEvent,
        attendees: newEvent.attendees.split(',').map(a => a.trim()).filter(a => a)
      }
      setEvents([...events, event])
      setNewEvent({
        title: "",
        category: "Interview Schedule",
        date: "",
        startTime: "",
        endTime: "",
        type: "interview",
        attendees: "",
        location: "",
        description: ""
      })
      setShowCreateEvent(false)
    }
  }

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(e => e.id !== eventId))
    setSelectedEvent(null)
  }

  const toggleCategory = (categoryName) => {
    setCategories(prev => ({
      ...prev,
      [categoryName]: {
        ...prev[categoryName],
        enabled: !prev[categoryName].enabled
      }
    }))
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  const getEventPosition = (event) => {
    const [startHour, startMin] = event.startTime.split(':').map(Number)
    const [endHour, endMin] = event.endTime.split(':').map(Number)
    
    const startMinutes = startHour * 60 + startMin
    const endMinutes = endHour * 60 + endMin
    const duration = endMinutes - startMinutes
    
    return {
      top: `${(startMinutes / 60) * 60}px`,
      height: `${(duration / 60) * 60}px`
    }
  }

  const EventCard = ({ event, style = {} }) => (
    <div
      className={`${categories[event.category]?.color} text-white p-2 rounded-lg text-xs cursor-pointer hover:opacity-90 transition-opacity`}
      style={style}
      onClick={() => setSelectedEvent(event)}
    >
      <div className="font-medium truncate">{event.title}</div>
      <div className="opacity-90">
        {formatTime(event.startTime)} - {formatTime(event.endTime)}
      </div>
      {event.attendees.length > 0 && (
        <div className="opacity-80 truncate">
          {event.attendees.join(', ')}
        </div>
      )}
    </div>
  )

  return (
    <div className="ml-60 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
            <button className="text-blue-600 font-medium">Today</button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-semibold text-gray-900 min-w-[200px] text-center">
                {currentDate.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
              <button
                onClick={handleNext}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              {["Day", "Week", "Month"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode.toLowerCase())}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    viewMode === mode.toLowerCase()
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="flex bo">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 border-2">
          {/* Create Event Button */}
          <button
            onClick={() => setShowCreateEvent(true)}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors mb-6"
          >
            <Plus className="w-5 h-5 " />
            Create Event
          </button>

          {/* Mini Calendar */}
          <div className="mb-6 border-b border-gray-400 ">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex gap-1">
                <button
                  onClick={handlePrevious}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-1">{day}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {getMonthCalendar(currentDate).map((date, index) => {
                const isCurrentMonth = date.getMonth() === currentDate.getMonth()
                const isToday = date.toDateString() === new Date().toDateString()
                const isSelected = date.toDateString() === currentDate.toDateString()
                const hasEvents = getEventsForDate(date).length > 0
                
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentDate(date)}
                    className={`w-8 h-8 text-xs rounded-full flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : isToday
                        ? "bg-blue-100 text-blue-600"
                        : isCurrentMonth
                        ? "text-gray-900 hover:bg-gray-100"
                        : "text-gray-400"
                    }`}
                  >
                    {date.getDate()}
                    {hasEvents && !isSelected && (
                      <div className="absolute w-1 h-1 bg-blue-500 rounded-full mt-6"></div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Categories */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Categories</h3>
              <button className="text-blue-600 text-sm font-medium">
                + Add Category
              </button>
            </div>
            
            <div className="space-y-3">
              {Object.entries(categories).map(([name, config]) => (
                <label key={name} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.enabled}
                    onChange={() => toggleCategory(name)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
                  <span className="text-sm text-gray-700">{name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Main Calendar View */}
        <div className="flex-1 p-6 bg-white">
          {viewMode === "month" && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-7 border-b border-gray-200">
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                  <div key={day} className="p-4 text-center font-medium text-gray-700 border-r border-gray-200 last:border-r-0">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7">
                {getMonthCalendar(currentDate).map((date, index) => {
                  const isCurrentMonth = date.getMonth() === currentDate.getMonth()
                  const isToday = date.toDateString() === new Date().toDateString()
                  const dayEvents = getEventsForDate(date)
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-[120px] p-2 border-r border-b border-gray-200 last:border-r-0 ${
                        !isCurrentMonth ? "bg-gray-50" : ""
                      }`}
                    >
                      <div className={`text-sm font-medium mb-2 ${
                        isToday ? "text-blue-600" : isCurrentMonth ? "text-gray-900" : "text-gray-400"
                      }`}>
                        {date.getDate()}
                      </div>
                      
                      <div className="space-y-1">
                        {dayEvents.slice(0, 3).map(event => (
                          <EventCard key={event.id} event={event} />
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{dayEvents.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {viewMode === "week" && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-8 border-b border-gray-200">
                <div className="p-4 border-r border-gray-200"></div>
                {getWeekDates(currentDate).map((date, index) => {
                  const isToday = date.toDateString() === new Date().toDateString()
                  return (
                    <div key={index} className="p-4 text-center border-r border-gray-200 last:border-r-0">
                      <div className="text-sm text-gray-600">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className={`text-lg font-semibold ${
                        isToday ? "text-blue-600" : "text-gray-900"
                      }`}>
                        {date.getDate()}
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="grid grid-cols-8 relative">
                <div className="border-r border-gray-200">
                  {timeSlots.map((time, index) => (
                    <div key={index} className="h-15 p-2 text-xs text-gray-500 border-b border-gray-100">
                      {time}
                    </div>
                  ))}
                </div>
                
                {getWeekDates(currentDate).map((date, dayIndex) => (
                  <div key={dayIndex} className="relative border-r border-gray-200 last:border-r-0">
                    {timeSlots.map((_, timeIndex) => (
                      <div key={timeIndex} className="h-15 border-b border-gray-100"></div>
                    ))}
                    
                    {getEventsForDate(date).map(event => (
                      <div
                        key={event.id}
                        className="absolute left-1 right-1"
                        style={getEventPosition(event)}
                      >
                        <EventCard event={event} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {viewMode === "day" && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {formatDate(currentDate)}
                </h2>
              </div>
              
              <div className="grid grid-cols-2 relative">
                <div className="border-r border-gray-200">
                  {timeSlots.map((time, index) => (
                    <div key={index} className="h-15 p-4 text-sm text-gray-500 border-b border-gray-100">
                      {time}
                    </div>
                  ))}
                </div>
                
                <div className="relative">
                  {timeSlots.map((_, index) => (
                    <div key={index} className="h-15 border-b border-gray-100"></div>
                  ))}
                  
                  {getEventsForDate(currentDate).map(event => (
                    <div
                      key={event.id}
                      className="absolute left-2 right-2"
                      style={getEventPosition(event)}
                    >
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create Event</h3>
              <button
                onClick={() => setShowCreateEvent(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter event title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.keys(categories).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter location"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attendees (comma separated)
                </label>
                <input
                  type="text"
                  value={newEvent.attendees}
                  onChange={(e) => setNewEvent({...newEvent, attendees: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter attendee names"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Enter event description"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateEvent(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEvent}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDeleteEvent(selectedEvent.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">{selectedEvent.title}</h4>
                <span className={`inline-block px-2 py-1 rounded-full text-xs text-white mt-2 ${categories[selectedEvent.category]?.color}`}>
                  {selectedEvent.category}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>
                  {formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}
                </span>
              </div>
              
              {selectedEvent.location && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedEvent.location}</span>
                </div>
              )}
              
              {selectedEvent.attendees.length > 0 && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{selectedEvent.attendees.join(', ')}</span>
                </div>
              )}
              
              {selectedEvent.description && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-1">Description</h5>
                  <p className="text-gray-600 text-sm">{selectedEvent.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Schedule
