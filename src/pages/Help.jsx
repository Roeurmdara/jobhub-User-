"use client"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Help = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("Most helpful")

  const categories = ["Getting Started", "My Profile", "Applying for a job", "Job Search Tips", "Job Alerts"]

  const faqs = [
    {
      id: 1,
      question: "What is My Applications?",
      answer:
        "My Applications is a way for you to track jobs as you move through the application process. Depending on the job you applied to, you may also receive notifications indicating that an application has been actioned by an employer.",
      helpful: null,
    },
    {
      id: 2,
      question: "How to access my applications history",
      answer:
        "To access applications history, go to your My Applications page on your dashboard profile. You must be signed in to your JobHuntly account to view this page.",
      helpful: null,
    },
    {
      id: 3,
      question: "Not seeing jobs you applied in your my application list?",
      answer:
        "Please note that we are unable to track materials submitted for jobs you apply to via an employer's site. As a result, these applications are not recorded in the My Applications section of your JobHuntly account. We suggest keeping a personal record of all positions you have applied to externally.",
      helpful: null,
    },
  ]

  const [faqData, setFaqData] = useState(faqs)

  const handleFeedback = (faqId, isHelpful) => {
    setFaqData((prev) => prev.map((faq) => (faq.id === faqId ? { ...faq, helpful: isHelpful } : faq)))
  }

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )
    const handleBackToHomepage = () => {
    navigate('/'); 
  }

  return (
    <div className="min-h-screen bg-white sm:ml-64">
      <div className="p-4 sm:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Help Center</h1>
            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors" onClick={handleBackToHomepage}>
              Back to homepage
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type your question or search keyword"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
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

              <nav className="space-y-1">
                {categories.map((category, index) => (
                  <a
                    key={category}
                    href="#"
                    className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      index === 0 ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {category}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 bg-white">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Sort Filter */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <span>Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded px-6 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option>Most relevant</option>
                    <option>Most recent</option>
                    <option>Most helpful</option>
                  </select>
                </div>
              </div>

              {/* FAQ Items */}
              <div className="space-y-6">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">{faq.answer}</p>

                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">Was this article helpful?</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleFeedback(faq.id, true)}
                          className={`flex items-center space-x-1 px-3 py-1 rounded border text-sm transition-colors ${
                            faq.helpful === true
                              ? "bg-blue-50 border-blue-200 text-blue-700"
                              : "border-gray-300 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                          </svg>
                          <span>Yes</span>
                        </button>
                        <button
                          onClick={() => handleFeedback(faq.id, false)}
                          className={`flex items-center space-x-1 px-3 py-1 rounded border text-sm transition-colors ${
                            faq.helpful === false
                              ? "bg-red-50 border-red-200 text-red-700"
                              : "border-gray-300 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                          </svg>
                          <span>No</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Card */}
              <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{"Didn't find what you were looking for?"}</h3>
                <p className="text-blue-100 mb-4">Contact our customer service</p>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help
