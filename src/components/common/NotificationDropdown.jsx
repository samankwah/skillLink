import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Check,
  X,
  Users,
  MessageCircle,
  Award,
  Info,
  Settings,
  Trash2,
  CheckCheck,
} from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";
import { useConnections } from "@/context/ConnectionsContext";

const NotificationDropdown = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
  } = useNotifications();
  const { acceptConnectionRequest, declineConnectionRequest } =
    useConnections();
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "connection_request":
        return <Users className="w-4 h-4" />;
      case "messages":
        return <MessageCircle className="w-4 h-4" />;
      case "achievement":
        return <Award className="w-4 h-4" />;
      case "system":
        return <Info className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "connection_request":
        return "text-blue-500";
      case "messages":
        return "text-green-500";
      case "achievement":
        return "text-yellow-500";
      case "system":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = (now - date) / (1000 * 60);

    if (diffInMinutes < 1) {
      return "now";
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }

    // Handle specific notification types
    if (notification.type === "connection_request") {
      // The notification action buttons will handle this
      return;
    }

    if (notification.type === "messages") {
      // Navigate to messages page
      window.location.href = "/messages";
    }
  };

  const handleAcceptConnection = async (notification) => {
    setIsProcessing(true);
    try {
      await acceptConnectionRequest(notification.data.requestId);
      await deleteNotification(notification.id);
    } catch (error) {
      console.error("Failed to accept connection:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeclineConnection = async (notification) => {
    setIsProcessing(true);
    try {
      await declineConnectionRequest(notification.data.requestId);
      await deleteNotification(notification.id);
    } catch (error) {
      console.error("Failed to decline connection:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const recentNotifications = notifications.slice(0, 8);

  return (
    <div className="relative bg-amber-300">
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
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <Card className="absolute right-0 top-full mt-2 w-80 z-50 max-h-96 overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Notifications</CardTitle>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs"
                    >
                      <CheckCheck className="w-4 h-4 mr-1" />
                      Mark all read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {unreadCount > 0 && (
                <CardDescription>
                  You have {unreadCount} unread notification
                  {unreadCount > 1 ? "s" : ""}
                </CardDescription>
              )}
            </CardHeader>

            <CardContent className="p-0">
              {recentNotifications.length > 0 ? (
                <div className="max-h-64 bg-gray-200 overflow-y-auto">
                  {recentNotifications.map((notification, index) => (
                    <div key={notification.id}>
                      <div
                        className={`p-4 hover:bg-accent/50 cursor-pointer transition-colors ${
                          !notification.isRead ? "bg-accent/20" : ""
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`mt-1 ${getNotificationColor(
                              notification.type
                            )}`}
                          >
                            {getNotificationIcon(notification.type)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4
                                className={`text-sm ${
                                  !notification.isRead
                                    ? "font-semibold"
                                    : "font-medium"
                                }`}
                              >
                                {notification.title}
                              </h4>
                              <span className="text-xs text-muted-foreground">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                            </div>

                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>

                            {/* Connection request actions */}
                            {notification.type === "connection_request" && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAcceptConnection(notification);
                                  }}
                                  disabled={isProcessing}
                                  className="h-7 text-xs"
                                >
                                  <Check className="w-3 h-3 mr-1" />
                                  Accept
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeclineConnection(notification);
                                  }}
                                  disabled={isProcessing}
                                  className="h-7 text-xs"
                                >
                                  <X className="w-3 h-3 mr-1" />
                                  Decline
                                </Button>
                              </div>
                            )}
                          </div>

                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-gray-600 rounded-full mt-2" />
                          )}
                        </div>
                      </div>
                      {index < recentNotifications.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="w-12 h-12 mx-auto mb-4" />
                  <p>No notifications yet</p>
                  <p className="text-sm">
                    We'll notify you when something happens
                  </p>
                </div>
              )}

              {notifications.length > 8 && (
                <div className="p-3 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => {
                      setIsOpen(false);
                      // Navigate to full notifications page
                    }}
                  >
                    View all notifications
                  </Button>
                </div>
              )}

              {notifications.length > 0 && (
                <div className="p-3 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs text-muted-foreground"
                    onClick={clearAllNotifications}
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Clear all notifications
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
