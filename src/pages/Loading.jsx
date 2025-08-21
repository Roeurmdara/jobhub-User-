
import { useState } from "react"
import categories from "../data/Jobcategories"
import companies from "../data/companies"
import steps from "../data/step"
import person from "../images/man.png"
// Custom MapPin icon component to replace Lucide React
const MapPinIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 mr-1 text-blue-400"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
)
export default function Loading() {
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [hoveredCompany, setHoveredCompany] = useState(null)
  const [hoveredStep, setHoveredStep] = useState(null)
  const handleCategoryMouseEnter = (id) => {
    setHoveredCategory(id)
  }
  const handleCategoryMouseLeave = () => {
    setHoveredCategory(null)
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="px-6 py-12 bg-gray-50 relative">
        {/* Floating background elements */}
        <div className="floating-bg-1"></div>
        <div className="floating-bg-2"></div>

        <div className="max-w-6xl mx-auto">
          {/* Trust Badge */}
          <div className="flex justify-end mb-8">
            <div className="bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 flex items-center gap-2 trust-badge">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="hero-content">
              {/* Hero Text */}
              <div className="mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4 hero-title">
                  Your Next <span className="text-blue-500">Career Move Starts</span>
                  <br />
                  Here. Search for Jobs <span className="text-blue-500">Nationwide</span>
                </h1>
              </div>
              {/* Search Form */}
              <div className="bg-white rounded-2xl p-2 shadow-lg mb-8 search-form">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="flex-1 relative w-full">
                    <svg
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
                      placeholder="Search Jobs"
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl outline-none text-base focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <select className="bg-white border border-gray-200 rounded-xl px-6 py-4 outline-none text-base min-w-[120px] focus:border-blue-500 transition-colors">
                    <option>Category</option>
                    <option>Design</option>
                    <option>Development</option>
                    <option>Marketing</option>
                  </select>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold transition-all text-base find-job-btn">
                    Find Job
                  </button>
                </div>
              </div>
              {/* Popular Searches */}
              <div className="mb-8 popular-searches">
                <p className="text-gray-600 font-medium mb-3">Popular Searches:</p>
                <div className="flex flex-wrap gap-4">
                  {["Designer", "Developer", "UX&UI Designer", "Contentwriter"].map((search) => (
                    <span
                      key={search}
                      className="text-gray-700 cursor-pointer transition-colors hover:text-blue-500 popular-tag"
                    >
                      {search}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 stats-container">
                {[
                  { icon: "📄", number: "+200k", label: "Active jobs" },
                  { icon: "🏢", number: "+2k", label: "Companies" },
                  { icon: "👥", number: "+15k", label: "Candidates" },
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className="text-center stat-item"
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-xl">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative  ">
              <div className="w-72 h-72 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full absolute -right-8 opacity-50 z-10"></div>
              <img
                src={person}
                alt="Professional woman with laptop"
                className="relative z-20 w-full max-w-md h-auto mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Job Categories Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-15 categories-header">
            <div className="inline-block bg-blue-50 text-blue-500 px-4 py-2 rounded-full text-sm font-medium mb-4 categories-badge">
              Jobs by Categories
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 categories-title">
              Select the Category of Your Choice
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-15 categories-grid">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="border border-gray-200 rounded-xl p-6 cursor-pointer transition-all duration-300 bg-white category-card"
                style={{ animationDelay: `${0.1 * index}s` }}
                onMouseEnter={() => handleCategoryMouseEnter(category.id)}
                onMouseLeave={handleCategoryMouseLeave}
              >
                <div className="mb-4 category-icon">{category.icon}</div>
                <h3 className="text-lg font-semibold mb-1 text-gray-900 category-title">{category.title}</h3>
                <p className="text-sm text-gray-600 mb-4 category-subtitle">{category.subtitle}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-500 category-jobs">
                    {category.jobs} jobs available
                  </span>
             
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      

      {/* Featured Companies Section */}
      <div className="w-full py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-12 companies-header">
      <div className="inline-block bg-blue-100 text-blue-500 px-4 py-1.5 rounded-full text-sm font-medium mb-4 companies-badge">
        Featured Companies
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 companies-title">
        Get hired in top companies
      </h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 companies-grid">
      {companies.map((company, index) => (
        <div
          key={company.id}
          className={`group relative bg-white rounded-xl p-6 cursor-pointer company-card ${
            company.isSelected ? 'border-2 border-blue-300 shadow-md' : 'border border-gray-200 shadow-sm'
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
          onMouseEnter={() => setHoveredCompany(company.id)}
          onMouseLeave={() => setHoveredCompany(null)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="flex justify-center mb-4 relative z-10">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 logo-container">
              {/* This is the updated code for the logo. We'll use a `picture` element. */}
              <picture>
                {/* Check if an SVG version of the logo exists and use it first */}
                {company.logoSvgUrl && <source srcSet={company.logoSvgUrl} type="image/svg+xml" />}
                {/* This is the default image, providing a high-res PNG for better quality */}
                <img
                  src={company.logoUrl}
                  alt={`${company.name} logo`}
                  className="h-8 w-8 object-contain"
                  // Optional: Use `srcset` for different resolutions, e.g., '1x' and '2x'
                  // If you have `logoUrl_2x` defined in your data
                  // srcset={`${company.logoUrl} 1x, ${company.logoUrl_2x} 2x`}
                />
              </picture>
            </div>
          </div>

          <div className="flex items-center justify-center text-gray-500 text-sm mb-3 relative z-10 company-location">
            <div className="icon-hover mr-1 text-gray-400 group-hover:text-blue-500 transition-colors">
              <MapPinIcon className="w-4 h-4" />
            </div>
            <span>{company.location}</span>
          </div>

          <h3 className="text-center font-medium text-gray-900 text-base mb-4 leading-tight relative z-10 company-name">
            {company.name}
          </h3>

          <div className="text-center relative z-10">
            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium relative overflow-hidden company-button">
              <span className="inline-block button-text">
                Open Jobs {company.openJobs}
              </span>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
      {/* How It Works Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16 how-it-works-header">
            <div className="inline-block bg-blue-100 text-blue-500 px-4 py-2 rounded-full text-sm font-medium mb-4 how-it-works-badge">
              How It Works
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 how-it-works-title">
              Finding Your Next Career Move. A Step-by-Step Process
            </h2>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 steps-container">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="relative step-card"
                style={{ animationDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-6 z-10">
                  <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-bold step-number">
                    {step.id}
                  </div>
                </div>

                {/* Step Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                  {/* Step Icon/Visual */}
                  <div className="mb-6 step-icon">{step.icon}</div>

                  {/* Step Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 step-title">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed step-description">{step.description}</p>
                  </div>
                </div>

                {/* Connection Line (except for last step) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300 connection-line"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Featured Cities Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 cities-header">
            <div className="inline-block bg-blue-100 text-blue-500 px-4 py-2 rounded-full text-sm font-medium mb-4 cities-badge">
              Featured Cities
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Selecting your desired location</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 cities-grid">
            {/* Tokyo - Large Card */}
            <div className="md:col-span-1 row-span-2 relative rounded-xl overflow-hidden h-[400px] md:h-full city-card">
              <img
                src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Tokyo cityscape with busy intersection"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h4 className="text-2xl font-bold mb-1">Tokyo</h4>
                <p className="text-sm font-medium bg-blue-500/80 px-3 py-1 rounded-full inline-block">608 jobs</p>
              </div>
            </div>

            {/* Los Angeles - Large Card */}
            <div className="md:col-span-1 row-span-2 relative rounded-xl overflow-hidden h-[400px] md:h-full city-card">
              <img
                src="https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Los Angeles with palm trees and skyline"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h4 className="text-2xl font-bold mb-1">Los Angeles</h4>
                <p className="text-sm font-medium bg-blue-500/80 px-3 py-1 rounded-full inline-block">247 jobs</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-1">
              {/* California */}
              <div className="relative rounded-xl overflow-hidden h-48 city-card">
                <img
                  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="California Golden Gate Bridge"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h4 className="text-lg font-bold mb-1">California</h4>
                  <p className="text-xs font-medium bg-blue-500/80 px-2 py-0.5 rounded-full inline-block">107 jobs</p>
                </div>
              </div>

              {/* Baku */}
              <div className="relative rounded-xl overflow-hidden h-48 city-card">
                <img
                  src="https://i.pinimg.com/1200x/08/d7/2d/08d72ddc6cb7efec10cfbcc5b2c58206.jpg"
                  alt="Baku architecture"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h4 className="text-lg font-bold mb-1">Baku</h4>
                  <p className="text-xs font-medium bg-blue-500/80 px-2 py-0.5 rounded-full inline-block">77 jobs</p>
                </div>
              </div>

              {/* New York */}
              <div className="relative rounded-xl overflow-hidden h-48 city-card">
                <img
                  src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="New York City skyline"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h4 className="text-lg font-bold mb-1">New York</h4>
                  <p className="text-xs font-medium bg-blue-500/80 px-2 py-0.5 rounded-full inline-block">105 jobs</p>
                </div>
              </div>

              {/* Paris */}
              <div className="relative rounded-xl overflow-hidden h-48 city-card">
                <img
                  src="https://i.pinimg.com/1200x/98/51/0a/98510a0c6013f5913fac4b6d6c3aac12.jpg"
                  alt="Paris with Eiffel Tower"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h4 className="text-lg font-bold mb-1">Paris</h4>
                  <p className="text-xs font-medium bg-blue-500/80 px-2 py-0.5 rounded-full inline-block">408 jobs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Base Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes logoWiggle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.2) rotate(-10deg); }
          75% { transform: scale(1.2) rotate(10deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }

        @keyframes floatReverse {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(20px) scale(0.9); }
        }

        @keyframes particleFloat {
          0% { 
            opacity: 0; 
            transform: translateY(0) scale(1); 
          }
          50% { 
            opacity: 1; 
            transform: translateY(-20px) scale(1.5); 
          }
          100% { 
            opacity: 0; 
            transform: translateY(-40px) scale(1); 
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        /* Hero Section Animations */
        .trust-badge {
          animation: fadeIn 0.5s ease-in-out;
        }

        .hero-content {
          animation: slideInLeft 0.8s ease-out;
        }

        .hero-title {
          animation: fadeIn 0.8s ease-out 0.2s both;
        }

        .search-form {
          animation: fadeIn 0.8s ease-out 0.4s both;
        }

        .popular-searches {
          animation: fadeIn 0.8s ease-out 0.6s both;
        }

        .popular-tag:hover {
          transform: translateY(-2px);
        }

        .stats-container .stat-item {
          opacity: 0;
          animation: fadeIn 0.5s ease-in-out both;
        }

        .hero-image {
          animation: slideInRight 0.8s ease-out;
        }

        .find-job-btn:hover {
          transform: translateY(-2px);
        }

        /* Categories Section Animations */
        .categories-header {
          animation: fadeIn 0.5s ease-in-out;
        }

        .categories-badge {
          animation: scaleIn 0.6s ease-out 0.2s both;
        }

        .categories-title {
          animation: fadeIn 0.8s ease-out 0.4s both;
        }

        .category-card {
          opacity: 0;
          animation: fadeInUp 0.5s ease-in-out both;
          transition: all 0.3s ease;
        }

        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .category-icon {
          transition: transform 0.3s ease;
        }

        .category-card:hover .category-icon {
          transform: scale(1.1);
        }

        /* How It Works Section Animations */
        .how-it-works-header {
          animation: fadeIn 0.8s ease-out;
        }

        .how-it-works-badge {
          animation: scaleIn 0.6s ease-out 0.2s both;
        }

        .how-it-works-title {
          animation: fadeIn 0.8s ease-out 0.4s both;
        }

        .step-card {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out both;
          transition: all 0.3s ease;
        }

        .step-card:hover {
          transform: translateY(-8px);
        }

        .step-number {
          animation: pulse 2s infinite;
        }

        .step-icon {
          transition: transform 0.3s ease;
        }

        .step-card:hover .step-icon {
          transform: scale(1.05);
        }

        .step-card-content {
          transition: all 0.3s ease;
        }

        .step-card:hover .step-card-content {
          transform: scale(1.02);
        }

        .connection-line {
          animation: fadeIn 1s ease-out 1s both;
        }

        /* Companies Section Animations */
        .companies-header {
          animation: fadeIn 0.8s ease-out;
        }

        .companies-badge {
          animation: scaleIn 0.6s ease-out 0.2s both;
        }

        .companies-title {
          animation: fadeIn 0.8s ease-out 0.4s both;
        }

        .company-card {
          opacity: 0;
          animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          transition: all 0.3s ease;
        }

        .company-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .company-card:active {
          transform: translateY(-6px) scale(0.98);
        }

        .logo-container:hover .logo-animation {
          animation: logoWiggle 0.4s ease-in-out;
        }

        .company-location {
          animation: slideInLeft 0.5s ease-out both;
        }

        .company-name {
          animation: fadeIn 0.5s ease-out both;
        }

        .icon-hover {
          transition: all 0.2s ease;
        }

        .icon-hover:hover {
          transform: scale(1.1);
          color: #3B82F6;
        }

        .company-button {
          transition: all 0.2s ease;
        }

        .company-button:hover {
          transform: scale(1.05);
        }

        .company-button:hover .button-text {
          transform: translateY(-2px);
        }

        .button-text {
          transition: transform 0.2s ease;
        }

        .button-underline {
          width: 0;
          transition: width 0.3s ease;
        }

        .company-button:hover .button-underline {
          width: 100%;
        }

        /* Floating Particles */
        .particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
        }

        .particle-1 {
          top: 1rem;
          right: 1rem;
          width: 8px;
          height: 8px;
          background-color: #DBEAFE;
        }

        .particle-2 {
          top: 1.5rem;
          right: 2rem;
          width: 6px;
          height: 6px;
          background-color: #BFDBFE;
        }

        .group:hover .particle-1 {
          animation: particleFloat 2s infinite;
        }

        .group:hover .particle-2 {
          animation: particleFloat 2.5s infinite 0.5s;
        }

        /* Background Elements */
        .floating-bg-1 {
          position: absolute;
          top: 5rem;
          left: 2.5rem;
          width: 5rem;
          height: 5rem;
          background-color: #DBEAFE;
          border-radius: 50%;
          opacity: 0.2;
          animation: float 4s ease-in-out infinite;
        }

        .floating-bg-2 {
          position: absolute;
          bottom: 5rem;
          right: 2.5rem;
          width: 4rem;
          height: 4rem;
          background-color: #E0E7FF;
          border-radius: 50%;
          opacity: 0.2;
          animation: floatReverse 5s ease-in-out infinite 1s;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .hero-content {
            animation-delay: 0.2s;
          }
          
          .category-card {
            animation-delay: 0.3s;
          }
          
          .step-card {
            animation-delay: 0.3s;
          }
          
          .company-card {
            animation-delay: 0.3s;
          }

          .connection-line {
            display: none;
          }
        }

        /* Featured Cities Section */
        .cities-header {
          animation: fadeIn 0.8s ease-out;
        }

        .cities-badge {
          animation: scaleIn 0.6s ease-out 0.2s both;
        }

        .cities-grid {
          position: relative;
        }

        .city-card {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out both;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .city-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .city-card:nth-child(1) {
          animation-delay: 0.1s;
        }

        .city-card:nth-child(2) {
          animation-delay: 0.2s;
        }

        .city-card:nth-child(3) {
          animation-delay: 0.3s;
        }

        .city-card img {
          transition: transform 0.5s ease;
        }

        .city-card:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  )
}
