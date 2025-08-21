const steps = [
    {
      id: 1,
      title: "Create an Account",
      description: "Go to the website's homepage and click on the 'Register' or 'Sign Up' button.",
      icon: (
        <div className="w-full h-32 bg-blue-50 rounded-lg flex flex-col items-center justify-center p-4 step-card-content">
          <div className="w-full h-4 bg-blue-200 rounded mb-4"></div>
          <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
          <div className="w-3/4 h-4 bg-gray-200 rounded mb-4"></div>
          <button className="bg-blue-500 text-white px-6 py-2 rounded text-sm font-medium">Register</button>
        </div>
      ),
    },
    {
      id: 2,
      title: "Search Desired Job",
      description: "Start browsing job listings and applying to positions that interest you.",
      icon: (
        <div className="w-full h-32 bg-blue-50 rounded-lg flex flex-col items-center justify-center p-4 step-card-content">
          <div className="w-full h-4 bg-blue-200 rounded mb-4"></div>
          <div className="flex items-center justify-between w-full mb-2">
            <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between w-full mb-2">
            <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Send Resume",
      description: "Upload your resume and cover letter, if applicable and fill out any required fields.",
      icon: (
        <div className="w-full h-32 bg-blue-50 rounded-lg flex flex-col items-center justify-center p-4 step-card-content">
          <div className="w-full h-4 bg-blue-200 rounded mb-4"></div>
          <div className="flex items-center justify-between w-full mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center mr-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="w-16 h-2 bg-gray-300 rounded mb-1"></div>
                <div className="w-12 h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
            <button className="bg-green-500 text-white px-4 py-1 rounded text-xs font-medium flex items-center">
              Send
              <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      ),
    },
  ]
  export default steps;