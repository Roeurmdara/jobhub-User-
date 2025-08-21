import React from 'react'

function Footer() {
  return (
    <div>
<footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Employee database
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Payroll
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Absences
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Time tracking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Shift planner
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Recruiting
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Employee database
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Payroll
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Absences
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Time tracking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Shift planner
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Recruiting
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Lift Media
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Lift Media
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Information</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="font-semibold mb-2">Subscribe</h3>
                <p className="text-sm text-gray-300 max-w-md">
                  The company's website offers comprehensive job search guides, including effective resumes, successful
                  job interviews.
                </p>
              </div>
              <div className="flex w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">→</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-2xl font-bold text-blue-400 mb-4 md:mb-0">Jobhub</div>
              <div className="flex space-x-6 text-sm text-gray-300">
                <a href="#" className="hover:text-white">
                  Terms
                </a>
                <a href="#" className="hover:text-white">
                  Privacy
                </a>
                <a href="#" className="hover:text-white">
                  Cookies
                </a>
              </div>
              <div className="flex space-x-4 mt-4 md:mt-0">
               
               
              </div>
            </div>
          </div>
        </div>
      </footer>
</div>
  )
}

export default Footer