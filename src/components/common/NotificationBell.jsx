import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Bell, 
  Check, 
  X, 
  MessageCircle, 
  Users, 
  Eye,
  Trash2,
  CheckCheck
} from 'lucide-react'
import { useNotifications } from '@/context/NotificationContext'

const NotificationBell = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = useNotifications()

  const [isOpen, setIsOpen] = useState(false)

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = (now - date) / (1000 * 60)

    if (diffInMinutes < 1) {
      return 'now'
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'connection_request':
        return <Users className="w-4 h-4 text-blue-500" />
      case 'message':
        return <MessageCircle className="w-4 h-4 text-green-500" />
      case 'connection_accepted':
        return <Check className="w-4 h-4 text-green-500" />
      case 'profile_view':
        return <Eye className="w-4 h-4 text-purple-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification.id)
    }
    
    // Handle navigation based on notification type
    switch (notification.type) {
      case 'connection_request':
        // Navigate to connections page
        window.location.href = '/connections?tab=requests'
        break
      case 'message':
        // Navigate to messages
        window.location.href = '/messages'
        break
      case 'connection_accepted':
        // Navigate to connections
        window.location.href = '/connections'
        break
      case 'profile_view':
        // Navigate to profile
        window.location.href = '/profile'
        break
      default:
        break
    }
    
    setIsOpen(false)
  }

  const handleMarkAllAsRead = async () => {
    await markAllAsRead()
  }

  const handleDeleteNotification = async (e, notificationId) => {
    e.stopPropagation()
    await deleteNotification(notificationId)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Notification Panel */}
          <div className="absolute right-0 mt-2 w-80 bg-background border border-border rounded-lg shadow-lg z-50">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMarkAllAsRead}
                    className="text-xs"
                  >
                    <CheckCheck className="w-4 h-4 mr-1" />
                    Mark all read
                  </Button>
                )}
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.slice(0, 10).map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`p-4 border-b border-border last:border-b-0 cursor-pointer hover:bg-accent/50 transition-colors ${
                      !notification.isRead ? 'bg-accent/20' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={`text-sm ${!notification.isRead ? 'font-medium' : ''}`}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatTimestamp(notification.timestamp)}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-1 ml-2">
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => handleDeleteNotification(e, notification.id)}
                              className="p-1 h-6 w-6"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No notifications yet</p>
                  <p className="text-xs mt-1">We'll notify you when something happens</p>
                </div>
              )}
            </div>

            {notifications.length > 10 && (
              <div className="p-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    window.location.href = '/notifications'
                    setIsOpen(false)
                  }}
                >
                  View all notifications
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default NotificationBell