import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Info,
  MessageCircle,
  Circle,
  Edit,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { useMessaging } from "@/context/MessagingContext";
import { useAuth } from "@/context/AuthContext";

const Messages = () => {
  const { user } = useAuth();
  const {
    conversations,
    activeConversation,
    setActiveConversation,
    messages,
    isTyping,
    unreadCounts,
    onlineUsers,
    isLoading,
    sendMessage,
    markAsRead,
    startConversation,
    deleteConversation,
  } = useMessaging();

  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editText, setEditText] = useState("");
  const [showMessageActions, setShowMessageActions] = useState(null);
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const formatLastMessageTime = (timestamp) => {
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeConversation]);

  useEffect(() => {
    if (activeConversation) {
      markAsRead(activeConversation.id);
    }
  }, [activeConversation, markAsRead]);

  const handleConversationClick = (conversation) => {
    setActiveConversation(conversation);
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !activeConversation || isSending) return;

    setIsSending(true);
    try {
      await sendMessage(activeConversation.id, messageInput.trim());
      setMessageInput("");
      messageInputRef.current?.focus();
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (editingMessage) {
        handleSaveEdit();
      } else {
        handleSendMessage();
      }
    }
  };

  const handleEditMessage = (message) => {
    setEditingMessage(message.id);
    setEditText(message.content);
    setShowMessageActions(null);
  };

  const handleSaveEdit = () => {
    // In a real app, this would update the message in the backend
    console.log("Saving edited message:", editText);
    setEditingMessage(null);
    setEditText("");
  };

  const handleDeleteMessage = (messageId) => {
    // In a real app, this would delete the message from the backend
    console.log("Deleting message:", messageId);
    setShowMessageActions(null);
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);
    setEditText("");
  };

  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery) return true;
    const participant = conv.participants[0];
    const fullName =
      `${participant.firstName} ${participant.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      participant.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const currentMessages = activeConversation
    ? messages[activeConversation.id] || []
    : [];
  const participant = activeConversation?.participants[0];
  const isParticipantOnline = participant
    ? onlineUsers.has(participant.id)
    : false;
  const isParticipantTyping = activeConversation
    ? isTyping[activeConversation.id]?.[participant?.id]
    : false;

  return (
    <div className="h-[calc(100vh-2rem)] flex">
      {/* Conversations Sidebar */}
      <div
        className={`${
          activeConversation ? "hidden lg:flex" : "flex"
        } w-full lg:w-80 border-r bg-background flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b">
          <h1 className="text-lg sm:text-xl font-semibold mb-3">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => {
              const participant = conversation.participants[0];
              const isOnline = onlineUsers.has(participant.id);
              const unreadCount = unreadCounts[conversation.id] || 0;
              const isActive = activeConversation?.id === conversation.id;

              return (
                <div
                  key={conversation.id}
                  onClick={() => handleConversationClick(conversation)}
                  className={`p-4 border-b cursor-pointer hover:bg-accent/50 transition-colors ${
                    isActive ? "bg-accent" : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        {participant.avatar ? (
                          <AvatarImage
                            src={participant.avatar}
                            alt={`${participant.firstName} ${participant.lastName}`}
                          />
                        ) : (
                          <AvatarFallback>
                            {getInitials(
                              participant.firstName,
                              participant.lastName
                            )}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      {isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium truncate">
                          {participant.firstName} {participant.lastName}
                        </h3>
                        {conversation.lastMessage && (
                          <span className="text-xs text-muted-foreground">
                            {formatLastMessageTime(
                              conversation.lastMessage.timestamp
                            )}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground mb-1 truncate">
                        {participant.title}
                      </p>

                      {conversation.lastMessage ? (
                        <div className="flex items-center justify-between">
                          <p
                            className={`text-sm truncate ${
                              unreadCount > 0
                                ? "font-medium"
                                : "text-muted-foreground"
                            }`}
                          >
                            {conversation.lastMessage.senderId === user.id
                              ? "You: "
                              : ""}
                            {conversation.lastMessage.content}
                          </p>
                          {unreadCount > 0 && (
                            <Badge
                              variant="default"
                              className="bg-primary text-primary-foreground text-xs px-2 py-1 min-w-[20px] h-5"
                            >
                              {unreadCount}
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">
                          Start a conversation
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <MessageCircle className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">No conversations</h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? "No conversations match your search"
                  : "Start connecting with people to begin messaging"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      {activeConversation ? (
        <div
          className={`${
            activeConversation ? "flex" : "hidden lg:flex"
          } flex-1 flex-col`}
        >
          {/* Chat Header */}
          <div className="p-4 border-b bg-background">
            <div className="flex items-center justify-between">
              {/* Back button for mobile */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2"
                onClick={() => setActiveConversation(null)}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    {participant.avatar ? (
                      <AvatarImage
                        src={participant.avatar}
                        alt={`${participant.firstName} ${participant.lastName}`}
                      />
                    ) : (
                      <AvatarFallback>
                        {getInitials(
                          participant.firstName,
                          participant.lastName
                        )}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  {isParticipantOnline && (
                    <Circle className="absolute -bottom-1 -right-1 w-3 h-3 fill-green-500 text-green-500" />
                  )}
                </div>
                <div>
                  <h2 className="font-semibold">
                    {participant.firstName} {participant.lastName}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {isParticipantTyping
                      ? "typing..."
                      : isParticipantOnline
                      ? "Online"
                      : "Offline"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Info className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentMessages.length > 0 ? (
              currentMessages.map((message, index) => {
                const isOwnMessage = message.senderId === user.id;
                const showTimestamp =
                  index === 0 ||
                  new Date(message.timestamp) -
                    new Date(currentMessages[index - 1].timestamp) >
                    300000; // 5 minutes

                return (
                  <div key={message.id}>
                    {showTimestamp && (
                      <div className="text-center mb-4">
                        <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded">
                          {formatTimestamp(message.timestamp)}
                        </span>
                      </div>
                    )}

                    <div
                      className={`flex ${
                        isOwnMessage ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] ${
                          isOwnMessage ? "order-2" : "order-1"
                        } group relative`}
                      >
                        <div
                          className={`px-4 py-2 rounded-lg ${
                            isOwnMessage
                              ? "bg-primary text-primary-foreground"
                              : "bg-accent text-accent-foreground"
                          }`}
                          onDoubleClick={() =>
                            isOwnMessage && handleEditMessage(message)
                          }
                        >
                          {editingMessage === message.id ? (
                            <div className="space-y-2">
                              <Input
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="text-sm bg-background"
                                autoFocus
                              />
                              <div className="flex gap-1">
                                <Button size="sm" onClick={handleSaveEdit}>
                                  <Check className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={handleCancelEdit}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm whitespace-pre-wrap">
                              {message.content}
                            </p>
                          )}
                        </div>

                        {/* Message Actions - Only for own messages */}
                        {isOwnMessage && editingMessage !== message.id && (
                          <div
                            className={`absolute ${
                              isOwnMessage ? "left-0" : "right-0"
                            } top-0 opacity-0 group-hover:opacity-100 transition-opacity`}
                          >
                            <div className="flex gap-1 bg-background border rounded p-1 shadow-sm">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEditMessage(message)}
                                className="h-6 w-6 p-0"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteMessage(message.id)}
                                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                        <p
                          className={`text-xs text-muted-foreground mt-1 ${
                            isOwnMessage ? "text-right" : "text-left"
                          }`}
                        >
                          {formatTimestamp(message.timestamp)}
                        </p>
                      </div>

                      {!isOwnMessage && (
                        <Avatar className="w-8 h-8 order-0 mr-2">
                          {participant.avatar ? (
                            <AvatarImage
                              src={participant.avatar}
                              alt={`${participant.firstName} ${participant.lastName}`}
                            />
                          ) : (
                            <AvatarFallback className="text-xs">
                              {getInitials(
                                participant.firstName,
                                participant.lastName
                              )}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageCircle className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">Start the conversation</h3>
                <p className="text-sm text-muted-foreground">
                  Send a message to {participant.firstName} to get started
                </p>
              </div>
            )}

            {/* Typing Indicator */}
            {isParticipantTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2 bg-accent px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-3 sm:p-4 border-t bg-background">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Paperclip className="w-4 h-4" />
              </Button>

              <div className="flex-1 relative">
                <Input
                  ref={messageInputRef}
                  placeholder={
                    editingMessage
                      ? "Edit message..."
                      : `Message ${participant.firstName}...`
                  }
                  value={editingMessage ? editText : messageInput}
                  onChange={(e) =>
                    editingMessage
                      ? setEditText(e.target.value)
                      : setMessageInput(e.target.value)
                  }
                  onKeyPress={handleKeyPress}
                  disabled={isSending}
                  className="pr-12"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 hidden sm:flex"
                >
                  <Smile className="w-4 h-4" />
                </Button>
              </div>

              <Button
                onClick={editingMessage ? handleSaveEdit : handleSendMessage}
                disabled={
                  editingMessage
                    ? !editText.trim()
                    : !messageInput.trim() || isSending
                }
                size="sm"
              >
                {editingMessage ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
              {editingMessage && (
                <Button onClick={handleCancelEdit} variant="outline" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* No Conversation Selected */
        <div className="hidden lg:flex flex-1 items-center justify-center bg-accent/20">
          <div className="text-center">
            <MessageCircle className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-xl lg:text-2xl font-semibold mb-2">
              Select a conversation
            </h2>
            <p className="text-muted-foreground">
              Choose a conversation from the sidebar to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
