import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import BlankLayout from "./layouts/BlankLayout"
import DashboardLayout from "./layouts/DashboardLayout"
import PublicLayout from "./layouts/PublicLayout"
import 'flowbite'
import SidebarOnlyLayout from "./layouts/SidebarOnlyLayout"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Forgetpassword from "./pages/Forgetpassword"
import Donelogin from "./pages/Donelogin"
import Checkemail from "./pages/Checkemail"
import Setdetail from "./pages/Setdetail"
import Messager from "./pages/Messager"
import BrowseCompanies from "./pages/BrowseCompanies"
import CompanyDashboard from "./pages/CompanyDashboard"
import CompanyProfile from "./pages/CompanyProfile"
import AllApplications from "./pages/AllApplications"
import ApplicationDetail from "./pages/ApplicationDetail"
import JobListing from "./pages/JobListing"
import JobListingDetail from "./pages/JobListingDetail"
import Schedule from "./pages/Schedule"
import CompanySetting from "./pages/CompanySetting"
import Help from "./pages/Help"
import Loading from "./pages/Loading"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Public pages wrapped in PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Loading />} />
          {/* Add more public pages here if needed */}
        </Route>

        {/* ✅ Auth pages wrapped in BlankLayout (no nav/header) */}
        <Route element={<BlankLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<Forgetpassword />} />
          <Route path="/done-login" element={<Donelogin />} />
          <Route path="/check-email" element={<Checkemail />} />
        </Route>

        {/* ✅ Protected Dashboard pages with DashboardLayout (includes sidebar) */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
          <Route path="/messager" element={<Messager />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/all-applications" element={<AllApplications />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/company-setting" element={<CompanySetting />} />
          <Route path="/help" element={<Help />} />


          {/* ✅ Individual applicant details */}
          <Route path="/application/:applicantId" element={<ApplicationDetail />} />

          {/* ✅ Job Listing routes - now properly integrated */}
          <Route path="/job-listing" element={<JobListing />} />
          <Route path="/job/:jobId" element={<JobListingDetail />} />
        </Route>

        {/* ✅ Protected pages with SidebarOnlyLayout */}
        <Route
          element={
            <ProtectedRoute>
              <SidebarOnlyLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/browse-companies" element={<BrowseCompanies />} />

          <Route path="/set-detail" element={<Setdetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
