import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const ConnectionsContext = createContext({})

export const useConnections = () => {
  const context = useContext(ConnectionsContext)
  if (!context) {
    throw new Error('useConnections must be used within a ConnectionsProvider')
  }
  return context
}

export const ConnectionsProvider = ({ children }) => {
  const { user } = useAuth()
  const [connections, setConnections] = useState([])
  const [discoveredUsers, setDiscoveredUsers] = useState([])
  const [connectionRequests, setConnectionRequests] = useState({
    sent: [],
    received: []
  })
  const [networkStats, setNetworkStats] = useState({
    totalConnections: 0,
    mutualConnections: 0,
    networkReach: 0
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    skills: [],
    location: '',
    company: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  // Load connections data when user changes
  useEffect(() => {
    if (user) {
      loadConnectionsData()
    }
  }, [user])

  const loadConnectionsData = async () => {
    setIsLoading(true)
    try {
      // Mock connections data
      const mockConnections = [
        {
          id: 'usr_456',
          firstName: 'Sarah',
          lastName: 'Johnson',
          title: 'UX Designer',
          company: 'Design Co',
          location: 'San Francisco, CA',
          avatar: null,
          skills: ['UI/UX Design', 'Figma', 'User Research'],
          mutualConnections: 3,
          connectionDate: '2024-01-10T00:00:00Z',
          isOnline: true
        },
        {
          id: 'usr_789',
          firstName: 'Mike',
          lastName: 'Chen',
          title: 'Product Manager',
          company: 'Tech Corp',
          location: 'New York, NY',
          avatar: null,
          skills: ['Product Strategy', 'Agile', 'Analytics'],
          mutualConnections: 5,
          connectionDate: '2024-01-08T00:00:00Z',
          isOnline: false
        },
        {
          id: 'usr_101',
          firstName: 'Emily',
          lastName: 'Rodriguez',
          title: 'Data Scientist',
          company: 'Analytics Inc',
          location: 'Austin, TX',
          avatar: null,
          skills: ['Python', 'Machine Learning', 'SQL'],
          mutualConnections: 2,
          connectionDate: '2024-01-05T00:00:00Z',
          isOnline: true
        }
      ]

      const mockDiscoveredUsers = [
        {
          id: 'usr_200',
          firstName: 'Alice',
          lastName: 'Miller',
          title: 'UI/UX Designer',
          company: 'Creative Studio',
          location: 'Los Angeles, CA',
          avatar: null,
          skills: ['UI Design', 'Prototyping', 'Adobe XD'],
          mutualConnections: 1,
          matchScore: 92,
          connectionStatus: 'not_connected'
        },
        {
          id: 'usr_201',
          firstName: 'Robert',
          lastName: 'Taylor',
          title: 'Data Scientist',
          company: 'AI Solutions',
          location: 'Seattle, WA',
          avatar: null,
          skills: ['Python', 'TensorFlow', 'Statistics'],
          mutualConnections: 4,
          matchScore: 88,
          connectionStatus: 'not_connected'
        },
        {
          id: 'usr_202',
          firstName: 'Lisa',
          lastName: 'Wong',
          title: 'Product Manager',
          company: 'Growth Co',
          location: 'San Francisco, CA',
          avatar: null,
          skills: ['Strategy', 'Analytics', 'Leadership'],
          mutualConnections: 2,
          matchScore: 85,
          connectionStatus: 'not_connected'
        },
        {
          id: 'usr_203',
          firstName: 'David',
          lastName: 'Kim',
          title: 'Full Stack Developer',
          company: 'Tech Startup',
          location: 'Austin, TX',
          avatar: null,
          skills: ['React', 'Node.js', 'AWS'],
          mutualConnections: 3,
          matchScore: 95,
          connectionStatus: 'not_connected'
        }
      ]

      const mockSentRequests = [
        {
          id: 'req_301',
          to: {
            id: 'usr_301',
            firstName: 'James',
            lastName: 'Wilson',
            title: 'Frontend Developer',
            avatar: null
          },
          message: 'Hi James! I saw your work on React components and would love to connect.',
          timestamp: '2024-01-14T10:30:00Z',
          status: 'pending'
        }
      ]

      const mockReceivedRequests = [
        {
          id: 'req_401',
          from: {
            id: 'usr_401',
            firstName: 'Maria',
            lastName: 'Garcia',
            title: 'Backend Developer',
            company: 'Enterprise Solutions',
            avatar: null
          },
          message: 'Hello! I noticed we both work with Node.js. Would you like to connect?',
          timestamp: '2024-01-15T14:20:00Z',
          status: 'pending'
        },
        {
          id: 'req_402',
          from: {
            id: 'usr_402',
            firstName: 'Alex',
            lastName: 'Thompson',
            title: 'DevOps Engineer',
            company: 'Cloud Systems',
            avatar: null
          },
          message: 'Hi! I saw your profile and would love to connect and share insights about cloud architecture.',
          timestamp: '2024-01-15T16:45:00Z',
          status: 'pending'
        }
      ]

      const mockNetworkStats = {
        totalConnections: mockConnections.length,
        mutualConnections: 15,
        networkReach: mockConnections.length * 150, // Average connections per person
        topSkillsInNetwork: ['JavaScript', 'React', 'Python', 'UI/UX Design'],
        industryBreakdown: {
          'Technology': 45,
          'Design': 32,
          'Marketing': 28,
          'Finance': 15
        }
      }

      setConnections(mockConnections)
      setDiscoveredUsers(mockDiscoveredUsers)
      setConnectionRequests({
        sent: mockSentRequests,
        received: mockReceivedRequests
      })
      setNetworkStats(mockNetworkStats)
    } catch (error) {
      console.error('Error loading connections data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const searchUsers = async (query, searchFilters = {}) => {
    setIsLoading(true)
    try {
      // Mock search implementation
      let filtered = discoveredUsers.filter(user => {
        const matchesQuery = !query || 
          user.firstName.toLowerCase().includes(query.toLowerCase()) ||
          user.lastName.toLowerCase().includes(query.toLowerCase()) ||
          user.title.toLowerCase().includes(query.toLowerCase()) ||
          user.company.toLowerCase().includes(query.toLowerCase()) ||
          user.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))

        const matchesLocation = !searchFilters.location || 
          user.location.toLowerCase().includes(searchFilters.location.toLowerCase())

        const matchesCompany = !searchFilters.company ||
          user.company.toLowerCase().includes(searchFilters.company.toLowerCase())

        const matchesSkills = !searchFilters.skills?.length ||
          searchFilters.skills.some(skill => 
            user.skills.some(userSkill => userSkill.toLowerCase().includes(skill.toLowerCase()))
          )

        return matchesQuery && matchesLocation && matchesCompany && matchesSkills
      })

      // Sort by match score
      filtered.sort((a, b) => b.matchScore - a.matchScore)

      return filtered
    } catch (error) {
      throw new Error('Search failed')
    } finally {
      setIsLoading(false)
    }
  }

  const sendConnectionRequest = async (userId, message) => {
    setIsLoading(true)
    try {
      const targetUser = discoveredUsers.find(user => user.id === userId)
      if (!targetUser) throw new Error('User not found')

      const newRequest = {
        id: 'req_' + Date.now(),
        to: {
          id: targetUser.id,
          firstName: targetUser.firstName,
          lastName: targetUser.lastName,
          title: targetUser.title,
          avatar: targetUser.avatar
        },
        message: message,
        timestamp: new Date().toISOString(),
        status: 'pending'
      }

      setConnectionRequests(prev => ({
        ...prev,
        sent: [...prev.sent, newRequest]
      }))

      // Update user status
      setDiscoveredUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, connectionStatus: 'pending' }
          : user
      ))

      return newRequest
    } catch (error) {
      throw new Error('Failed to send connection request')
    } finally {
      setIsLoading(false)
    }
  }

  const acceptConnectionRequest = async (requestId) => {
    setIsLoading(true)
    try {
      const request = connectionRequests.received.find(req => req.id === requestId)
      if (!request) throw new Error('Request not found')

      // Add to connections
      const newConnection = {
        id: request.from.id,
        firstName: request.from.firstName,
        lastName: request.from.lastName,
        title: request.from.title,
        company: request.from.company,
        avatar: request.from.avatar,
        skills: [], // Would be fetched from user profile
        mutualConnections: 0,
        connectionDate: new Date().toISOString(),
        isOnline: false
      }

      setConnections(prev => [...prev, newConnection])

      // Remove from received requests
      setConnectionRequests(prev => ({
        ...prev,
        received: prev.received.filter(req => req.id !== requestId)
      }))

      // Update network stats
      setNetworkStats(prev => ({
        ...prev,
        totalConnections: prev.totalConnections + 1
      }))

      return newConnection
    } catch (error) {
      throw new Error('Failed to accept connection request')
    } finally {
      setIsLoading(false)
    }
  }

  const declineConnectionRequest = async (requestId) => {
    setIsLoading(true)
    try {
      setConnectionRequests(prev => ({
        ...prev,
        received: prev.received.filter(req => req.id !== requestId)
      }))
    } catch (error) {
      throw new Error('Failed to decline connection request')
    } finally {
      setIsLoading(false)
    }
  }

  const removeConnection = async (userId) => {
    setIsLoading(true)
    try {
      setConnections(prev => prev.filter(conn => conn.id !== userId))
      setNetworkStats(prev => ({
        ...prev,
        totalConnections: prev.totalConnections - 1
      }))
    } catch (error) {
      throw new Error('Failed to remove connection')
    } finally {
      setIsLoading(false)
    }
  }

  const getRecommendations = async () => {
    // Already loaded in discoveredUsers
    return discoveredUsers.slice(0, 10) // Return top 10 recommendations
  }

  const value = {
    connections,
    discoveredUsers,
    connectionRequests,
    networkStats,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    isLoading,
    searchUsers,
    sendConnectionRequest,
    acceptConnectionRequest,
    declineConnectionRequest,
    removeConnection,
    getRecommendations,
    loadConnectionsData
  }

  return (
    <ConnectionsContext.Provider value={value}>
      {children}
    </ConnectionsContext.Provider>
  )
}