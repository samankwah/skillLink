import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { useConnections } from './ConnectionsContext'
import { useMessaging } from './MessagingContext'

const NotificationContext = createContext({})

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth()
  const { connectionRequests } = useConnections() || { connectionRequests: { received: [], sent: [] } }
  const { getTotalUnreadCount } = useMessaging() || { getTotalUnreadCount: () => 0 }
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Load notifications when user changes
  useEffect(() => {
    if (user) {
      loadNotifications()
    }
  }, [user])

  // Monitor connection requests for new notifications
  useEffect(() => {
    if (connectionRequests?.received?.length > 0) {
      // Create notifications for new connection requests
      const connectionNotifications = connectionRequests.received.map(request => ({
        id: `conn_${request.id}`,
        type: 'connection_request',
        title: 'New Connection Request',
        message: `${request.from.firstName} ${request.from.lastName} wants to connect with you`,
        timestamp: request.timestamp,
        isRead: false,
        data: {
          requestId: request.id,
          from: request.from
        }
      }))

      // Update notifications without duplicates
      setNotifications(prev => {
        const existingIds = new Set(prev.map(n => n.id))
        const newNotifications = connectionNotifications.filter(n => !existingIds.has(n.id))
        return [...prev, ...newNotifications].sort((a, b) => 
          new Date(b.timestamp) - new Date(a.timestamp)
        )
      })
    }
  }, [connectionRequests?.received])

  // Monitor messaging for new notifications
  useEffect(() => {
    const messageCount = getTotalUnreadCount ? getTotalUnreadCount() : 0
    if (messageCount > 0) {
      // Create or update message notification
      const messageNotification = {
        id: 'messages_unread',
        type: 'messages',
        title: 'New Messages',
        message: `You have ${messageCount} unread message${messageCount > 1 ? 's' : ''}`,
        timestamp: new Date().toISOString(),
        isRead: false,
        data: {
          count: messageCount
        }
      }

      setNotifications(prev => {
        const filtered = prev.filter(n => n.id !== 'messages_unread')
        return [messageNotification, ...filtered].sort((a, b) => 
          new Date(b.timestamp) - new Date(a.timestamp)
        )
      })
    } else {
      // Remove message notification if no unread messages
      setNotifications(prev => prev.filter(n => n.id !== 'messages_unread'))
    }
  }, [getTotalUnreadCount])

  // Update unread count whenever notifications change
  useEffect(() => {
    const count = notifications.filter(n => !n.isRead).length
    setUnreadCount(count)
  }, [notifications])

  const loadNotifications = async () => {
    setIsLoading(true)
    try {
      // Mock initial notifications
      const mockNotifications = [
        {
          id: 'notif_1',
          type: 'system',
          title: 'Welcome to SkillLink!',
          message: 'Complete your profile to get better connection recommendations',
          timestamp: '2024-01-15T08:00:00Z',
          isRead: false,
          data: {}
        },
        {
          id: 'notif_2',
          type: 'achievement',
          title: 'First Connection!',
          message: 'Congratulations on making your first professional connection',
          timestamp: '2024-01-14T15:30:00Z',
          isRead: true,
          data: {}
        }
      ]

      setNotifications(mockNotifications)
    } catch (error) {
      console.error('Error loading notifications:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (notificationId) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, isRead: true }
        : notification
    ))
  }

  const markAllAsRead = async () => {
    setNotifications(prev => prev.map(notification => ({
      ...notification,
      isRead: true
    })))
  }

  const deleteNotification = async (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
  }

  const clearAllNotifications = async () => {
    setNotifications([])
  }

  const addNotification = (notification) => {
    const newNotification = {
      id: `notif_${Date.now()}`,
      timestamp: new Date().toISOString(),
      isRead: false,
      ...notification
    }

    setNotifications(prev => [newNotification, ...prev].sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    ))
  }

  const getNotificationsByType = (type) => {
    return notifications.filter(n => n.type === type)
  }

  const getUnreadNotifications = () => {
    return notifications.filter(n => !n.isRead)
  }

  const value = {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    addNotification,
    getNotificationsByType,
    getUnreadNotifications
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}