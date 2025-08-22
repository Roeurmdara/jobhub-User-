import { useNavigate } from 'react-router-dom';
import { useState } from "react"

const Messager = () => {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

const conversations = [
    {
      id: 1,
      name: "Jan Mayer",
      title: "Recruiter at Nomad",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "We want to invite you for a qui...",
      timestamp: "12 mins ago",
      unread: true,
      online: true,
    },
    {
      id: 2,
      name: "Joe Bartmann",
      title: "HR Manager at TechCorp",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hey thanks for your interview...",
      timestamp: "3:40 PM",
      unread: false,
      online: false,
    },
    {
      id: 3,
      name: "Ally Wales",
      title: "Talent Acquisition at StartupX",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hey thanks for your interview...",
      timestamp: "3:40 PM",
      unread: false,
      online: false,
    },
    {
      id: 4,
      name: "James Gardner",
      title: "Senior Recruiter at InnovateInc",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hey thanks for your interview...",
      timestamp: "3:40 PM",
      unread: false,
      online: false,
    },
    {
      id: 5,
      name: "Allison Geidt",
      title: "HR Director at GlobalTech",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hey thanks for your interview...",
      timestamp: "3:40 PM",
      unread: false,
      online: false,
    },
    {
      id: 6,
      name: "Ruben Culhane",
      title: "Talent Scout at CreativeAgency",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hey thanks for your interview...",
      timestamp: "3:40 PM",
      unread: false,
      online: false,
    },
    {
      id: 7,
      name: "Lydia Diaz",
      title: "Recruitment Lead at FinanceFirst",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hey thanks for your interview...",
      timestamp: "3:40 PM",
      unread: false,
      online: false,
    },
    {
      id: 8,
      name: "James Dokidis",
      title: "Head of Talent at MediaGroup",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hey thanks for your interview...",
      timestamp: "3:40 PM",
      unread: false,
      online: false,
    },
    {
      id: 9,
      name: "Angelina Swann",
      title: "Senior HR at HealthcarePlus",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hey thanks for your interview...",
      timestamp: "3:40 PM",
      unread: false,
      online: false,
    },
  ]

  const currentConversation = conversations[selectedConversation]

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const handleBackToHomepage = () => {
    navigate('/'); // 👈 goes to the Loading page because '/' maps to <Loading />
  };

  const handleImageError = (e) => {
    const name = e.target.alt
    const initial = name.charAt(0).toUpperCase()
    const fallbackDiv = document.createElement("div")
    fallbackDiv.className =
      "w-full h-full bg-blue-500 flex items-center justify-center text-white font-medium text-sm rounded-full"
    fallbackDiv.textContent = initial
    e.target.parentNode.replaceChild(fallbackDiv, e.target)
  }

  return (
    <div className="min-h-screen bg-gray-50 sm:ml-64">
      <div className="flex h-screen">
        {/* Messages List */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
              <button
                onClick={handleBackToHomepage}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm"
              >
                Back to homepage
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
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
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation, index) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(index)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation === index ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={conversation.avatar || "/placeholder.svg"}
                        alt={conversation.name}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    </div>
                    {conversation.online && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mb-1">{conversation.title}</p>
                    <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                  </div>

                  {conversation.unread && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={currentConversation.avatar || "/placeholder.svg"}
                    alt={currentConversation.name}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">{currentConversation.name}</h2>
                  <p className="text-sm text-gray-600">{currentConversation.title}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {/* Conversation Start */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 mx-auto mb-3">
                <img
                  src={currentConversation.avatar || "/placeholder.svg"}
                  alt={currentConversation.name}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">{currentConversation.name}</h3>
              <p className="text-gray-600 text-sm">{currentConversation.title}</p>
              <p className="text-gray-500 text-sm mt-2">
                This is the very beginning of your direct message with{" "}
                <span className="font-medium">{currentConversation.name}</span>
              </p>
            </div>

            {/* Today Divider */}
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Today</span>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.isOwn ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={message.avatar || "/placeholder.svg"}
                        alt={message.sender}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    </div>
                    <div>
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          message.isOwn ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-900"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-1">{message.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
              <button type="button" className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>

              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Reply message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>

              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messager
