import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { ProfileProvider } from './context/ProfileContext'
import { ConnectionsProvider } from './context/ConnectionsContext'
import { MessagingProvider } from './context/MessagingContext'
import { NotificationProvider } from './context/NotificationContext'
import { JobsProvider } from './context/JobsContext'
import { ProjectsProvider } from './context/ProjectsContext'
import { SearchProvider } from './context/SearchContext'
import { LMSProvider } from './context/LMSContext'
import { ReferralProvider } from './context/ReferralContext'
import Layout from './components/layout/Layout'
import AuthLayout from './components/layout/AuthLayout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Skills from './pages/Skills'
import Connections from './pages/Connections'
import Messages from './pages/Messages'
import Jobs from './pages/Jobs'
import Projects from './pages/Projects'
import Search from './pages/Search'
import Settings from './pages/Settings'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Certificates from './pages/Certificates'
import Referrals from './pages/Referrals'
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <ProfileProvider>
        <ConnectionsProvider>
          <MessagingProvider>
            <NotificationProvider>
              <JobsProvider>
                <ProjectsProvider>
                  <SearchProvider>
                    <LMSProvider>
                      <ReferralProvider>
                        <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route index element={<Navigate to="/auth/login" replace />} />
          </Route>

          {/* Protected App Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:courseId" element={<CourseDetail />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="profile" element={<Profile />} />
            <Route path="skills" element={<Skills />} />
            <Route path="connections" element={<Connections />} />
            <Route path="messages" element={<Messages />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="projects" element={<Projects />} />
            <Route path="referrals" element={<Referrals />} />
            <Route path="search" element={<Search />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
                        </Router>
                      </ReferralProvider>
                    </LMSProvider>
                  </SearchProvider>
                </ProjectsProvider>
              </JobsProvider>
            </NotificationProvider>
          </MessagingProvider>
        </ConnectionsProvider>
      </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App