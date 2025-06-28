import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-primary-foreground font-bold text-2xl">SL</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return children
}

// Component to redirect authenticated users away from landing pages
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#191961] rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-2xl">SL</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If user is authenticated and trying to access the landing page, redirect to dashboard
  if (isAuthenticated && window.location.pathname === '/') {
    return <Navigate to="/app/dashboard" replace />
  }

  return children
}

export default ProtectedRoute