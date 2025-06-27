import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on app load
  useEffect(() => {
    const token = localStorage.getItem('skilllink_token')
    const userData = localStorage.getItem('skilllink_user')
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('skilllink_token')
        localStorage.removeItem('skilllink_user')
      }
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    setIsLoading(true)
    
    try {
      // Simulate API call - replace with actual API integration
      const mockUser = {
        id: 'usr_123',
        email: email,
        firstName: 'John',
        lastName: 'Doe',
        title: 'Full Stack Developer',
        avatar: null,
        isVerified: true,
        onboardingCompleted: true
      }
      
      const mockToken = 'mock_jwt_token_here'
      
      // Store in localStorage
      localStorage.setItem('skilllink_token', mockToken)
      localStorage.setItem('skilllink_user', JSON.stringify(mockUser))
      
      setUser(mockUser)
      setIsAuthenticated(true)
      
      return { user: mockUser, token: mockToken }
    } catch (error) {
      throw new Error('Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData) => {
    setIsLoading(true)
    
    try {
      // Simulate API call - replace with actual API integration
      const mockUser = {
        id: 'usr_' + Date.now(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        title: null,
        avatar: null,
        isVerified: false,
        onboardingCompleted: false
      }
      
      const mockToken = 'mock_jwt_token_here'
      
      // Store in localStorage
      localStorage.setItem('skilllink_token', mockToken)
      localStorage.setItem('skilllink_user', JSON.stringify(mockUser))
      
      setUser(mockUser)
      setIsAuthenticated(true)
      
      return { user: mockUser, token: mockToken }
    } catch (error) {
      throw new Error('Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('skilllink_token')
    localStorage.removeItem('skilllink_user')
    setUser(null)
    setIsAuthenticated(false)
  }

  const updateProfile = async (profileData) => {
    setIsLoading(true)
    
    try {
      // Simulate API call - replace with actual API integration
      const updatedUser = { ...user, ...profileData }
      
      localStorage.setItem('skilllink_user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      
      return updatedUser
    } catch (error) {
      throw new Error('Profile update failed')
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}