// import { createContext, useContext, useEffect, useState } from 'react'
// import { useAuth } from './AuthContext'
// import { useConnections } from './ConnectionsContext'

// const MessagingContext = createContext({})

// export const useMessaging = () => {
//   const context = useContext(MessagingContext)
//   if (!context) {
//     throw new Error('useMessaging must be used within a MessagingProvider')
//   }
//   return context
// }

// export const MessagingProvider = ({ children }) => {
//   const { user } = useAuth()
//   const { connections } = useConnections()
//   const [conversations, setConversations] = useState([])
//   const [activeConversation, setActiveConversation] = useState(null)
//   const [messages, setMessages] = useState({})
//   const [isTyping, setIsTyping] = useState({})
//   const [unreadCounts, setUnreadCounts] = useState({})
//   const [onlineUsers, setOnlineUsers] = useState(new Set())
//   const [isLoading, setIsLoading] = useState(false)

//   // Load messaging data when user changes
//   useEffect(() => {
//     if (user) {
//       loadMessagingData()
//       // Simulate real-time updates
//       startRealtimeSimulation()
//     }
//   }, [user])

//   const loadMessagingData = async () => {
//     setIsLoading(true)
//     try {
//       // Mock conversations data
//       const mockConversations = [
//         {
//           id: 'conv_123',
//           participants: [
//             {
//               id: 'usr_456',
//               firstName: 'Sarah',
//               lastName: 'Johnson',
//               title: 'UX Designer',
//               avatar: null,
//               isOnline: true
//             }
//           ],
//           lastMessage: {
//             id: 'msg_789',
//             senderId: 'usr_456',
//             content: 'Thanks for connecting! I\'d love to discuss your React experience.',
//             timestamp: '2024-01-15T10:30:00Z',
//             type: 'text'
//           },
//           unreadCount: 2,
//           updatedAt: '2024-01-15T10:30:00Z'
//         },
//         {
//           id: 'conv_124',
//           participants: [
//             {
//               id: 'usr_789',
//               firstName: 'Mike',
//               lastName: 'Chen',
//               title: 'Product Manager',
//               avatar: null,
//               isOnline: false
//             }
//           ],
//           lastMessage: {
//             id: 'msg_790',
//             senderId: user.id,
//             content: 'Sounds good! Let me know when you\'re free.',
//             timestamp: '2024-01-14T16:45:00Z',
//             type: 'text'
//           },
//           unreadCount: 0,
//           updatedAt: '2024-01-14T16:45:00Z'
//         },
//         {
//           id: 'conv_125',
//           participants: [
//             {
//               id: 'usr_101',
//               firstName: 'Emily',
//               lastName: 'Rodriguez',
//               title: 'Data Scientist',
//               avatar: null,
//               isOnline: true
//             }
//           ],
//           lastMessage: {
//             id: 'msg_791',
//             senderId: 'usr_101',
//             content: 'The Python script you shared was really helpful!',
//             timestamp: '2024-01-14T14:20:00Z',
//             type: 'text'
//           },
//           unreadCount: 1,
//           updatedAt: '2024-01-14T14:20:00Z'
//         }
//       ]

//       // Mock messages for each conversation
//       const mockMessages = {
//         'conv_123': [
//           {
//             id: 'msg_786',
//             conversationId: 'conv_123',
//             senderId: user.id,
//             content: 'Hi Sarah! Thanks for accepting my connection request.',
//             timestamp: '2024-01-15T09:15:00Z',
//             type: 'text',
//             isRead: true
//           },
//           {
//             id: 'msg_787',
//             conversationId: 'conv_123',
//             senderId: 'usr_456',
//             content: 'You\'re welcome! I saw your profile and was impressed by your work.',
//             timestamp: '2024-01-15T09:30:00Z',
//             type: 'text',
//             isRead: true
//           },
//           {
//             id: 'msg_788',
//             conversationId: 'conv_123',
//             senderId: 'usr_456',
//             content: 'I\'m always looking to connect with talented developers.',
//             timestamp: '2024-01-15T09:31:00Z',
//             type: 'text',
//             isRead: true
//           },
//           {
//             id: 'msg_789',
//             conversationId: 'conv_123',
//             senderId: 'usr_456',
//             content: 'Thanks for connecting! I\'d love to discuss your React experience.',
//             timestamp: '2024-01-15T10:30:00Z',
//             type: 'text',
//             isRead: false
//           }
//         ],
//         'conv_124': [
//           {
//             id: 'msg_792',
//             conversationId: 'conv_124',
//             senderId: 'usr_789',
//             content: 'Hey! I saw your post about the new project management tool.',
//             timestamp: '2024-01-14T15:30:00Z',
//             type: 'text',
//             isRead: true
//           },
//           {
//             id: 'msg_793',
//             conversationId: 'conv_124',
//             senderId: user.id,
//             content: 'Yes! It\'s been a game-changer for our team\'s productivity.',
//             timestamp: '2024-01-14T16:00:00Z',
//             type: 'text',
//             isRead: true
//           },
//           {
//             id: 'msg_794',
//             conversationId: 'conv_124',
//             senderId: 'usr_789',
//             content: 'Would love to hear more about your implementation. Free for a call this week?',
//             timestamp: '2024-01-14T16:30:00Z',
//             type: 'text',
//             isRead: true
//           },
//           {
//             id: 'msg_790',
//             conversationId: 'conv_124',
//             senderId: user.id,
//             content: 'Sounds good! Let me know when you\'re free.',
//             timestamp: '2024-01-14T16:45:00Z',
//             type: 'text',
//             isRead: true
//           }
//         ],
//         'conv_125': [
//           {
//             id: 'msg_795',
//             conversationId: 'conv_125',
//             senderId: user.id,
//             content: 'Hey Emily! I saw your data analysis post. Really insightful!',
//             timestamp: '2024-01-14T13:30:00Z',
//             type: 'text',
//             isRead: true
//           },
//           {
//             id: 'msg_796',
//             conversationId: 'conv_125',
//             senderId: 'usr_101',
//             content: 'Thank you! Always happy to share knowledge.',
//             timestamp: '2024-01-14T13:45:00Z',
//             type: 'text',
//             isRead: true
//           },
//           {
//             id: 'msg_797',
//             conversationId: 'conv_125',
//             senderId: user.id,
//             content: 'I have a Python script that might help with your data processing. Want me to share it?',
//             timestamp: '2024-01-14T14:00:00Z',
//             type: 'text',
//             isRead: true
//           },
//           {
//             id: 'msg_791',
//             conversationId: 'conv_125',
//             senderId: 'usr_101',
//             content: 'The Python script you shared was really helpful!',
//             timestamp: '2024-01-14T14:20:00Z',
//             type: 'text',
//             isRead: false
//           }
//         ]
//       }

//       // Calculate unread counts
//       const unreadCountsMap = {}
//       Object.entries(mockMessages).forEach(([convId, msgs]) => {
//         unreadCountsMap[convId] = msgs.filter(msg => !msg.isRead && msg.senderId !== user.id).length
//       })

//       // Set online users
//       const onlineUserIds = new Set(['usr_456', 'usr_101'])

//       setConversations(mockConversations)
//       setMessages(mockMessages)
//       setUnreadCounts(unreadCountsMap)
//       setOnlineUsers(onlineUserIds)
//     } catch (error) {
//       console.error('Error loading messaging data:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const startRealtimeSimulation = () => {
//     // Simulate real-time message updates
//     const interval = setInterval(() => {
//       // Randomly simulate typing indicators
//       const activeConvId = activeConversation?.id
//       if (activeConvId && Math.random() < 0.1) { // 10% chance every 3 seconds
//         const participant = activeConversation.participants[0]
//         if (participant && onlineUsers.has(participant.id)) {
//           simulateTyping(activeConvId, participant.id)
//         }
//       }

//       // Occasionally simulate new messages
//       if (Math.random() < 0.05) { // 5% chance every 3 seconds
//         simulateIncomingMessage()
//       }
//     }, 3000)

//     return () => clearInterval(interval)
//   }

//   const simulateTyping = (conversationId, userId) => {
//     setIsTyping(prev => ({
//       ...prev,
//       [conversationId]: { [userId]: true }
//     }))

//     setTimeout(() => {
//       setIsTyping(prev => ({
//         ...prev,
//         [conversationId]: { [userId]: false }
//       }))
//     }, 2000 + Math.random() * 3000) // Stop typing after 2-5 seconds
//   }

//   const simulateIncomingMessage = () => {
//     const randomMessages = [
//       "That sounds interesting!",
//       "Let me think about that.",
//       "Thanks for sharing!",
//       "I'll get back to you on this.",
//       "Great idea!",
//       "Looking forward to it."
//     ]

//     const convIds = Object.keys(messages)
//     if (convIds.length === 0) return

//     const randomConvId = convIds[Math.floor(Math.random() * convIds.length)]
//     const conversation = conversations.find(c => c.id === randomConvId)
//     if (!conversation) return

//     const participant = conversation.participants[0]
//     if (!onlineUsers.has(participant.id)) return

//     const newMessage = {
//       id: 'msg_' + Date.now(),
//       conversationId: randomConvId,
//       senderId: participant.id,
//       content: randomMessages[Math.floor(Math.random() * randomMessages.length)],
//       timestamp: new Date().toISOString(),
//       type: 'text',
//       isRead: false
//     }

//     addMessage(newMessage)
//   }

//   const fetchConversations = async () => {
//     // Already loaded in loadMessagingData
//     return conversations
//   }

//   const fetchMessages = async (conversationId) => {
//     if (!messages[conversationId]) {
//       return []
//     }
//     return messages[conversationId]
//   }

//   const sendMessage = async (conversationId, content, type = 'text') => {
//     setIsLoading(true)
//     try {
//       const newMessage = {
//         id: 'msg_' + Date.now(),
//         conversationId,
//         senderId: user.id,
//         content,
//         timestamp: new Date().toISOString(),
//         type,
//         isRead: true // Messages sent by user are automatically read
//       }

//       addMessage(newMessage)

//       // Update conversation's last message
//       setConversations(prev => prev.map(conv =>
//         conv.id === conversationId
//           ? {
//               ...conv,
//               lastMessage: {
//                 id: newMessage.id,
//                 senderId: newMessage.senderId,
//                 content: newMessage.content,
//                 timestamp: newMessage.timestamp,
//                 type: newMessage.type
//               },
//               updatedAt: newMessage.timestamp
//             }
//           : conv
//       ))

//       return newMessage
//     } catch (error) {
//       throw new Error('Failed to send message')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const addMessage = (message) => {
//     setMessages(prev => ({
//       ...prev,
//       [message.conversationId]: [
//         ...(prev[message.conversationId] || []),
//         message
//       ]
//     }))

//     // Update unread count if message is from another user
//     if (message.senderId !== user.id && !message.isRead) {
//       setUnreadCounts(prev => ({
//         ...prev,
//         [message.conversationId]: (prev[message.conversationId] || 0) + 1
//       }))
//     }

//     // Update conversation's last message and timestamp
//     setConversations(prev => prev.map(conv =>
//       conv.id === message.conversationId
//         ? {
//             ...conv,
//             lastMessage: {
//               id: message.id,
//               senderId: message.senderId,
//               content: message.content,
//               timestamp: message.timestamp,
//               type: message.type
//             },
//             updatedAt: message.timestamp
//           }
//         : conv
//     ).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)))
//   }

//   const markAsRead = async (conversationId) => {
//     setIsLoading(true)
//     try {
//       // Mark all messages in conversation as read
//       setMessages(prev => ({
//         ...prev,
//         [conversationId]: (prev[conversationId] || []).map(msg =>
//           msg.senderId !== user.id ? { ...msg, isRead: true } : msg
//         )
//       }))

//       // Reset unread count
//       setUnreadCounts(prev => ({
//         ...prev,
//         [conversationId]: 0
//       }))
//     } catch (error) {
//       throw new Error('Failed to mark messages as read')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const startConversation = async (userId) => {
//     setIsLoading(true)
//     try {
//       // Check if conversation already exists
//       const existingConv = conversations.find(conv =>
//         conv.participants.some(p => p.id === userId)
//       )

//       if (existingConv) {
//         setActiveConversation(existingConv)
//         return existingConv
//       }

//       // Find user details from connections
//       const connection = connections.find(conn => conn.id === userId)
//       if (!connection) {
//         throw new Error('User not found in connections')
//       }

//       // Create new conversation
//       const newConversation = {
//         id: 'conv_' + Date.now(),
//         participants: [
//           {
//             id: connection.id,
//             firstName: connection.firstName,
//             lastName: connection.lastName,
//             title: connection.title,
//             avatar: connection.avatar,
//             isOnline: onlineUsers.has(connection.id)
//           }
//         ],
//         lastMessage: null,
//         unreadCount: 0,
//         updatedAt: new Date().toISOString()
//       }

//       setConversations(prev => [newConversation, ...prev])
//       setMessages(prev => ({
//         ...prev,
//         [newConversation.id]: []
//       }))
//       setActiveConversation(newConversation)

//       return newConversation
//     } catch (error) {
//       throw new Error('Failed to start conversation')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const deleteConversation = async (conversationId) => {
//     setIsLoading(true)
//     try {
//       setConversations(prev => prev.filter(conv => conv.id !== conversationId))
//       setMessages(prev => {
//         const newMessages = { ...prev }
//         delete newMessages[conversationId]
//         return newMessages
//       })
//       setUnreadCounts(prev => {
//         const newCounts = { ...prev }
//         delete newCounts[conversationId]
//         return newCounts
//       })

//       if (activeConversation?.id === conversationId) {
//         setActiveConversation(null)
//       }
//     } catch (error) {
//       throw new Error('Failed to delete conversation')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const getTotalUnreadCount = () => {
//     return Object.values(unreadCounts).reduce((total, count) => total + count, 0)
//   }

//   const value = {
//     conversations,
//     activeConversation,
//     setActiveConversation,
//     messages,
//     isTyping,
//     unreadCounts,
//     onlineUsers,
//     isLoading,
//     fetchConversations,
//     fetchMessages,
//     sendMessage,
//     markAsRead,
//     startConversation,
//     deleteConversation,
//     getTotalUnreadCount
//   }

//   return (
//     <MessagingContext.Provider value={value}>
//       {children}
//     </MessagingContext.Provider>
//   )
// }

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   useCallback,
// } from "react";
// import { useAuth } from "./AuthContext";
// import { useConnections } from "./ConnectionsContext";

// const MessagingContext = createContext({});

// export const useMessaging = () => {
//   const context = useContext(MessagingContext);
//   if (!context) {
//     throw new Error("useMessaging must be used within a MessagingProvider");
//   }
//   return context;
// };

// export const MessagingProvider = ({ children }) => {
//   const { user } = useAuth();
//   const { connections } = useConnections();
//   const [conversations, setConversations] = useState([]);
//   const [activeConversation, setActiveConversation] = useState(null);
//   const [messages, setMessages] = useState({});
//   const [isTyping, setIsTyping] = useState({});
//   const [unreadCounts, setUnreadCounts] = useState({});
//   const [onlineUsers, setOnlineUsers] = useState(new Set());
//   const [isLoading, setIsLoading] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [showConversationList, setShowConversationList] = useState(true);

//   // Check if device is mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//       // On mobile, show conversation list by default, hide when conversation is active
//       if (window.innerWidth < 768) {
//         setShowConversationList(!activeConversation);
//       } else {
//         setShowConversationList(true);
//       }
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, [activeConversation]);

//   // Load messaging data when user changes
//   useEffect(() => {
//     if (user) {
//       loadMessagingData();
//       // Simulate real-time updates
//       const cleanup = startRealtimeSimulation();
//       return cleanup;
//     }
//   }, [user]);

//   const loadMessagingData = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       // Mock conversations data
//       const mockConversations = [
//         {
//           id: "conv_123",
//           participants: [
//             {
//               id: "usr_456",
//               firstName: "Sarah",
//               lastName: "Johnson",
//               title: "UX Designer",
//               avatar: null,
//               isOnline: true,
//             },
//           ],
//           lastMessage: {
//             id: "msg_789",
//             senderId: "usr_456",
//             content:
//               "Thanks for connecting! I'd love to discuss your React experience.",
//             timestamp: "2024-01-15T10:30:00Z",
//             type: "text",
//           },
//           unreadCount: 2,
//           updatedAt: "2024-01-15T10:30:00Z",
//         },
//         {
//           id: "conv_124",
//           participants: [
//             {
//               id: "usr_789",
//               firstName: "Mike",
//               lastName: "Chen",
//               title: "Product Manager",
//               avatar: null,
//               isOnline: false,
//             },
//           ],
//           lastMessage: {
//             id: "msg_790",
//             senderId: user?.id,
//             content: "Sounds good! Let me know when you're free.",
//             timestamp: "2024-01-14T16:45:00Z",
//             type: "text",
//           },
//           unreadCount: 0,
//           updatedAt: "2024-01-14T16:45:00Z",
//         },
//         {
//           id: "conv_125",
//           participants: [
//             {
//               id: "usr_101",
//               firstName: "Emily",
//               lastName: "Rodriguez",
//               title: "Data Scientist",
//               avatar: null,
//               isOnline: true,
//             },
//           ],
//           lastMessage: {
//             id: "msg_791",
//             senderId: "usr_101",
//             content: "The Python script you shared was really helpful!",
//             timestamp: "2024-01-14T14:20:00Z",
//             type: "text",
//           },
//           unreadCount: 1,
//           updatedAt: "2024-01-14T14:20:00Z",
//         },
//       ];

//       // Mock messages for each conversation
//       const mockMessages = {
//         conv_123: [
//           {
//             id: "msg_786",
//             conversationId: "conv_123",
//             senderId: user?.id,
//             content: "Hi Sarah! Thanks for accepting my connection request.",
//             timestamp: "2024-01-15T09:15:00Z",
//             type: "text",
//             isRead: true,
//           },
//           {
//             id: "msg_787",
//             conversationId: "conv_123",
//             senderId: "usr_456",
//             content:
//               "You're welcome! I saw your profile and was impressed by your work.",
//             timestamp: "2024-01-15T09:30:00Z",
//             type: "text",
//             isRead: true,
//           },
//           {
//             id: "msg_788",
//             conversationId: "conv_123",
//             senderId: "usr_456",
//             content: "I'm always looking to connect with talented developers.",
//             timestamp: "2024-01-15T09:31:00Z",
//             type: "text",
//             isRead: true,
//           },
//           {
//             id: "msg_789",
//             conversationId: "conv_123",
//             senderId: "usr_456",
//             content:
//               "Thanks for connecting! I'd love to discuss your React experience.",
//             timestamp: "2024-01-15T10:30:00Z",
//             type: "text",
//             isRead: false,
//           },
//         ],
//         conv_124: [
//           {
//             id: "msg_792",
//             conversationId: "conv_124",
//             senderId: "usr_789",
//             content:
//               "Hey! I saw your post about the new project management tool.",
//             timestamp: "2024-01-14T15:30:00Z",
//             type: "text",
//             isRead: true,
//           },
//           {
//             id: "msg_793",
//             conversationId: "conv_124",
//             senderId: user?.id,
//             content:
//               "Yes! It's been a game-changer for our team's productivity.",
//             timestamp: "2024-01-14T16:00:00Z",
//             type: "text",
//             isRead: true,
//           },
//           {
//             id: "msg_794",
//             conversationId: "conv_124",
//             senderId: "usr_789",
//             content:
//               "Would love to hear more about your implementation. Free for a call this week?",
//             timestamp: "2024-01-14T16:30:00Z",
//             type: "text",
//             isRead: true,
//           },
//           {
//             id: "msg_790",
//             conversationId: "conv_124",
//             senderId: user?.id,
//             content: "Sounds good! Let me know when you're free.",
//             timestamp: "2024-01-14T16:45:00Z",
//             type: "text",
//             isRead: true,
//           },
//         ],
//         conv_125: [
//           {
//             id: "msg_795",
//             conversationId: "conv_125",
//             senderId: user?.id,
//             content:
//               "Hey Emily! I saw your data analysis post. Really insightful!",
//             timestamp: "2024-01-14T13:30:00Z",
//             type: "text",
//             isRead: true,
//           },
//           {
//             id: "msg_796",
//             conversationId: "conv_125",
//             senderId: "usr_101",
//             content: "Thank you! Always happy to share knowledge.",
//             timestamp: "2024-01-14T13:45:00Z",
//             type: "text",
//             isRead: true,
//           },
//           {
//             id: "msg_797",
//             conversationId: "conv_125",
//             senderId: user?.id,
//             content:
//               "I have a Python script that might help with your data processing. Want me to share it?",
//             timestamp: "2024-01-14T14:00:00Z",
//             type: "text",
//             isRead: true,
//           },
//           {
//             id: "msg_791",
//             conversationId: "conv_125",
//             senderId: "usr_101",
//             content: "The Python script you shared was really helpful!",
//             timestamp: "2024-01-14T14:20:00Z",
//             type: "text",
//             isRead: false,
//           },
//         ],
//       };

//       // Calculate unread counts
//       const unreadCountsMap = {};
//       Object.entries(mockMessages).forEach(([convId, msgs]) => {
//         unreadCountsMap[convId] = msgs.filter(
//           (msg) => !msg.isRead && msg.senderId !== user?.id
//         ).length;
//       });

//       // Set online users
//       const onlineUserIds = new Set(["usr_456", "usr_101"]);

//       setConversations(mockConversations);
//       setMessages(mockMessages);
//       setUnreadCounts(unreadCountsMap);
//       setOnlineUsers(onlineUserIds);
//     } catch (error) {
//       console.error("Error loading messaging data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [user]);

//   const startRealtimeSimulation = useCallback(() => {
//     // Simulate real-time message updates
//     const interval = setInterval(() => {
//       // Randomly simulate typing indicators
//       const activeConvId = activeConversation?.id;
//       if (activeConvId && Math.random() < 0.1) {
//         // 10% chance every 3 seconds
//         const participant = activeConversation.participants[0];
//         if (participant && onlineUsers.has(participant.id)) {
//           simulateTyping(activeConvId, participant.id);
//         }
//       }

//       // Occasionally simulate new messages
//       if (Math.random() < 0.05) {
//         // 5% chance every 3 seconds
//         simulateIncomingMessage();
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [activeConversation, onlineUsers]);

//   const simulateTyping = useCallback((conversationId, userId) => {
//     setIsTyping((prev) => ({
//       ...prev,
//       [conversationId]: { [userId]: true },
//     }));

//     setTimeout(() => {
//       setIsTyping((prev) => ({
//         ...prev,
//         [conversationId]: { [userId]: false },
//       }));
//     }, 2000 + Math.random() * 3000); // Stop typing after 2-5 seconds
//   }, []);

//   const simulateIncomingMessage = useCallback(() => {
//     const randomMessages = [
//       "That sounds interesting!",
//       "Let me think about that.",
//       "Thanks for sharing!",
//       "I'll get back to you on this.",
//       "Great idea!",
//       "Looking forward to it.",
//     ];

//     const convIds = Object.keys(messages);
//     if (convIds.length === 0) return;

//     const randomConvId = convIds[Math.floor(Math.random() * convIds.length)];
//     const conversation = conversations.find((c) => c.id === randomConvId);
//     if (!conversation) return;

//     const participant = conversation.participants[0];
//     if (!onlineUsers.has(participant.id)) return;

//     const newMessage = {
//       id: "msg_" + Date.now(),
//       conversationId: randomConvId,
//       senderId: participant.id,
//       content:
//         randomMessages[Math.floor(Math.random() * randomMessages.length)],
//       timestamp: new Date().toISOString(),
//       type: "text",
//       isRead: false,
//     };

//     addMessage(newMessage);
//   }, [messages, conversations, onlineUsers]);

//   const fetchConversations = useCallback(async () => {
//     // Already loaded in loadMessagingData
//     return conversations;
//   }, [conversations]);

//   const fetchMessages = useCallback(
//     async (conversationId) => {
//       if (!messages[conversationId]) {
//         return [];
//       }
//       return messages[conversationId];
//     },
//     [messages]
//   );

//   const sendMessage = useCallback(
//     async (conversationId, content, type = "text") => {
//       setIsLoading(true);
//       try {
//         const newMessage = {
//           id: "msg_" + Date.now(),
//           conversationId,
//           senderId: user?.id,
//           content,
//           timestamp: new Date().toISOString(),
//           type,
//           isRead: true, // Messages sent by user are automatically read
//         };

//         addMessage(newMessage);

//         // Update conversation's last message
//         setConversations((prev) =>
//           prev.map((conv) =>
//             conv.id === conversationId
//               ? {
//                   ...conv,
//                   lastMessage: {
//                     id: newMessage.id,
//                     senderId: newMessage.senderId,
//                     content: newMessage.content,
//                     timestamp: newMessage.timestamp,
//                     type: newMessage.type,
//                   },
//                   updatedAt: newMessage.timestamp,
//                 }
//               : conv
//           )
//         );

//         return newMessage;
//       } catch (error) {
//         throw new Error("Failed to send message");
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [user]
//   );

//   const addMessage = useCallback(
//     (message) => {
//       setMessages((prev) => ({
//         ...prev,
//         [message.conversationId]: [
//           ...(prev[message.conversationId] || []),
//           message,
//         ],
//       }));

//       // Update unread count if message is from another user
//       if (message.senderId !== user?.id && !message.isRead) {
//         setUnreadCounts((prev) => ({
//           ...prev,
//           [message.conversationId]: (prev[message.conversationId] || 0) + 1,
//         }));
//       }

//       // Update conversation's last message and timestamp
//       setConversations((prev) =>
//         prev
//           .map((conv) =>
//             conv.id === message.conversationId
//               ? {
//                   ...conv,
//                   lastMessage: {
//                     id: message.id,
//                     senderId: message.senderId,
//                     content: message.content,
//                     timestamp: message.timestamp,
//                     type: message.type,
//                   },
//                   updatedAt: message.timestamp,
//                 }
//               : conv
//           )
//           .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
//       );
//     },
//     [user]
//   );

//   const markAsRead = useCallback(
//     async (conversationId) => {
//       setIsLoading(true);
//       try {
//         // Mark all messages in conversation as read
//         setMessages((prev) => ({
//           ...prev,
//           [conversationId]: (prev[conversationId] || []).map((msg) =>
//             msg.senderId !== user?.id ? { ...msg, isRead: true } : msg
//           ),
//         }));

//         // Reset unread count
//         setUnreadCounts((prev) => ({
//           ...prev,
//           [conversationId]: 0,
//         }));
//       } catch (error) {
//         throw new Error("Failed to mark messages as read");
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [user]
//   );

//   const startConversation = useCallback(
//     async (userId) => {
//       setIsLoading(true);
//       try {
//         // Check if conversation already exists
//         const existingConv = conversations.find((conv) =>
//           conv.participants.some((p) => p.id === userId)
//         );

//         if (existingConv) {
//           setActiveConversation(existingConv);
//           // On mobile, hide conversation list when selecting a conversation
//           if (isMobile) {
//             setShowConversationList(false);
//           }
//           return existingConv;
//         }

//         // Find user details from connections
//         const connection = connections.find((conn) => conn.id === userId);
//         if (!connection) {
//           throw new Error("User not found in connections");
//         }

//         // Create new conversation
//         const newConversation = {
//           id: "conv_" + Date.now(),
//           participants: [
//             {
//               id: connection.id,
//               firstName: connection.firstName,
//               lastName: connection.lastName,
//               title: connection.title,
//               avatar: connection.avatar,
//               isOnline: onlineUsers.has(connection.id),
//             },
//           ],
//           lastMessage: null,
//           unreadCount: 0,
//           updatedAt: new Date().toISOString(),
//         };

//         setConversations((prev) => [newConversation, ...prev]);
//         setMessages((prev) => ({
//           ...prev,
//           [newConversation.id]: [],
//         }));
//         setActiveConversation(newConversation);

//         // On mobile, hide conversation list when starting a new conversation
//         if (isMobile) {
//           setShowConversationList(false);
//         }

//         return newConversation;
//       } catch (error) {
//         throw new Error("Failed to start conversation");
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [conversations, connections, onlineUsers, isMobile]
//   );

//   const deleteConversation = useCallback(
//     async (conversationId) => {
//       setIsLoading(true);
//       try {
//         setConversations((prev) =>
//           prev.filter((conv) => conv.id !== conversationId)
//         );
//         setMessages((prev) => {
//           const newMessages = { ...prev };
//           delete newMessages[conversationId];
//           return newMessages;
//         });
//         setUnreadCounts((prev) => {
//           const newCounts = { ...prev };
//           delete newCounts[conversationId];
//           return newCounts;
//         });

//         if (activeConversation?.id === conversationId) {
//           setActiveConversation(null);
//           // On mobile, show conversation list when deleting active conversation
//           if (isMobile) {
//             setShowConversationList(true);
//           }
//         }
//       } catch (error) {
//         throw new Error("Failed to delete conversation");
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [activeConversation, isMobile]
//   );

//   const getTotalUnreadCount = useCallback(() => {
//     return Object.values(unreadCounts).reduce(
//       (total, count) => total + count,
//       0
//     );
//   }, [unreadCounts]);

//   // Mobile-specific function to handle back navigation
//   const handleMobileBack = useCallback(() => {
//     if (isMobile) {
//       setActiveConversation(null);
//       setShowConversationList(true);
//     }
//   }, [isMobile]);

//   // Mobile-specific function to select conversation
//   const selectConversation = useCallback(
//     (conversation) => {
//       setActiveConversation(conversation);
//       if (isMobile) {
//         setShowConversationList(false);
//       }
//     },
//     [isMobile]
//   );

//   const value = {
//     conversations,
//     activeConversation,
//     setActiveConversation,
//     selectConversation,
//     messages,
//     isTyping,
//     unreadCounts,
//     onlineUsers,
//     isLoading,
//     isMobile,
//     showConversationList,
//     setShowConversationList,
//     handleMobileBack,
//     fetchConversations,
//     fetchMessages,
//     sendMessage,
//     markAsRead,
//     startConversation,
//     deleteConversation,
//     getTotalUnreadCount,
//   };

//   return (
//     <MessagingContext.Provider value={value}>
//       {children}
//     </MessagingContext.Provider>
//   );
// };

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useAuth } from "./AuthContext";
import { useConnections } from "./ConnectionsContext";
import debounce from "lodash/debounce"; // Ensure lodash is installed (npm i lodash)

const MessagingContext = createContext({});

const useMessaging = () => {
  const context = useContext(MessagingContext);
  if (!context) {
    throw new Error("useMessaging must be used within a MessagingProvider");
  }
  return context;
};

const MessagingProvider = ({ children }) => {
  const { user } = useAuth();
  const { connections } = useConnections();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState({});
  const [isTyping, setIsTyping] = useState({});
  const [unreadCounts, setUnreadCounts] = useState({});
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showConversationList, setShowConversationList] = useState(true);

  // Debounced resize handler for better performance
  const handleResize = useCallback(
    debounce(() => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width >= 768) {
        setShowConversationList(true); // Always show list on tablet/desktop
      } else if (activeConversation) {
        setShowConversationList(false); // Hide list on mobile when conversation is active
      }
    }, 200),
    [activeConversation]
  );

  // Check device size and set initial layout
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Load messaging data when user changes
  useEffect(() => {
    if (user) {
      loadMessagingData();
      const cleanup = startRealtimeSimulation();
      return () => {
        cleanup();
        setActiveConversation(null); // Reset active conversation on user change
      };
    }
  }, [user]);

  const loadMessagingData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Mock conversations data
      const mockConversations = [
        {
          id: "conv_123",
          participants: [
            {
              id: "usr_456",
              firstName: "Sarah",
              lastName: "Johnson",
              title: "UX Designer",
              avatar: null,
              isOnline: true,
            },
          ],
          lastMessage: {
            id: "msg_789",
            senderId: "usr_456",
            content:
              "Thanks for connecting! I'd love to discuss your React experience.",
            timestamp: "2024-01-15T10:30:00Z",
            type: "text",
            status: "delivered",
          },
          unreadCount: 2,
          updatedAt: "2024-01-15T10:30:00Z",
        },
        {
          id: "conv_124",
          participants: [
            {
              id: "usr_789",
              firstName: "Mike",
              lastName: "Chen",
              title: "Product Manager",
              avatar: null,
              isOnline: false,
            },
          ],
          lastMessage: {
            id: "msg_790",
            senderId: user?.id,
            content: "Sounds good! Let me know when you're free.",
            timestamp: "2024-01-14T16:45:00Z",
            type: "text",
            status: "read",
          },
          unreadCount: 0,
          updatedAt: "2024-01-14T16:45:00Z",
        },
        {
          id: "conv_125",
          participants: [
            {
              id: "usr_101",
              firstName: "Emily",
              lastName: "Rodriguez",
              title: "Data Scientist",
              avatar: null,
              isOnline: true,
            },
          ],
          lastMessage: {
            id: "msg_791",
            senderId: "usr_101",
            content: "The Python script you shared was really helpful!",
            timestamp: "2024-01-14T14:20:00Z",
            type: "text",
            status: "delivered",
          },
          unreadCount: 1,
          updatedAt: "2024-01-14T14:20:00Z",
        },
      ];

      // Mock messages for each conversation
      const mockMessages = {
        conv_123: [
          {
            id: "msg_786",
            conversationId: "conv_123",
            senderId: user?.id,
            content: "Hi Sarah! Thanks for accepting my connection request.",
            timestamp: "2024-01-15T09:15:00Z",
            type: "text",
            isRead: true,
            status: "read",
          },
          {
            id: "msg_787",
            conversationId: "conv_123",
            senderId: "usr_456",
            content:
              "You're welcome! I saw your profile and was impressed by your work.",
            timestamp: "2024-01-15T09:30:00Z",
            type: "text",
            isRead: true,
          },
          {
            id: "msg_788",
            conversationId: "conv_123",
            senderId: "usr_456",
            content: "I'm always looking to connect with talented developers.",
            timestamp: "2024-01-15T09:31:00Z",
            type: "text",
            isRead: true,
          },
          {
            id: "msg_789",
            conversationId: "conv_123",
            senderId: "usr_456",
            content:
              "Thanks for connecting! I'd love to discuss your React experience.",
            timestamp: "2024-01-15T10:30:00Z",
            type: "text",
            isRead: false,
            status: "delivered",
          },
        ],
        conv_124: [
          {
            id: "msg_792",
            conversationId: "conv_124",
            senderId: "usr_789",
            content:
              "Hey! I saw your post about the new project management tool.",
            timestamp: "2024-01-14T15:30:00Z",
            type: "text",
            isRead: true,
          },
          {
            id: "msg_793",
            conversationId: "conv_124",
            senderId: user?.id,
            content:
              "Yes! It's been a game-changer for our team's productivity.",
            timestamp: "2024-01-14T16:00:00Z",
            type: "text",
            isRead: true,
          },
          {
            id: "msg_794",
            conversationId: "conv_124",
            senderId: "usr_789",
            content:
              "Would love to hear more about your implementation. Free for a call this week?",
            timestamp: "2024-01-14T16:30:00Z",
            type: "text",
            isRead: true,
          },
          {
            id: "msg_790",
            conversationId: "conv_124",
            senderId: user?.id,
            content: "Sounds good! Let me know when you're free.",
            timestamp: "2024-01-14T16:45:00Z",
            type: "text",
            isRead: true,
            status: "read",
          },
        ],
        conv_125: [
          {
            id: "msg_795",
            conversationId: "conv_125",
            senderId: user?.id,
            content:
              "Hey Emily! I saw your data analysis post. Really insightful!",
            timestamp: "2024-01-14T13:30:00Z",
            type: "text",
            isRead: true,
          },
          {
            id: "msg_796",
            conversationId: "conv_125",
            senderId: "usr_101",
            content: "Thank you! Always happy to share knowledge.",
            timestamp: "2024-01-14T13:45:00Z",
            type: "text",
            isRead: true,
          },
          {
            id: "msg_797",
            conversationId: "conv_125",
            senderId: user?.id,
            content:
              "I have a Python script that might help with your data processing. Want me to share it?",
            timestamp: "2024-01-14T14:00:00Z",
            type: "text",
            isRead: true,
          },
          {
            id: "msg_791",
            conversationId: "conv_125",
            senderId: "usr_101",
            content: "The Python script you shared was really helpful!",
            timestamp: "2024-01-14T14:20:00Z",
            type: "text",
            isRead: false,
            status: "delivered",
          },
        ],
      };

      // Calculate unread counts
      const unreadCountsMap = {};
      Object.entries(mockMessages).forEach(([convId, msgs]) => {
        unreadCountsMap[convId] = msgs.filter(
          (msg) => !msg.isRead && msg.senderId !== user?.id
        ).length;
      });

      // Set online users
      const onlineUserIds = new Set(["usr_456", "usr_101"]);

      setConversations(mockConversations);
      setMessages(mockMessages);
      setUnreadCounts(unreadCountsMap);
      setOnlineUsers(onlineUserIds);
    } catch (error) {
      console.error("Error loading messaging data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const startRealtimeSimulation = useCallback(() => {
    const interval = setInterval(() => {
      const activeConvId = activeConversation?.id;
      if (activeConvId && Math.random() < 0.1) {
        const participant = activeConversation.participants[0];
        if (participant && onlineUsers.has(participant.id)) {
          simulateTyping(activeConvId, participant.id);
        }
      }
      if (Math.random() < 0.05) {
        simulateIncomingMessage();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeConversation, onlineUsers]);

  const simulateTyping = useCallback((conversationId, userId) => {
    setIsTyping((prev) => ({
      ...prev,
      [conversationId]: { [userId]: true },
    }));
    setTimeout(() => {
      setIsTyping((prev) => ({
        ...prev,
        [conversationId]: { [userId]: false },
      }));
    }, 2000 + Math.random() * 3000);
  }, []);

  const simulateIncomingMessage = useCallback(() => {
    const randomMessages = [
      "That sounds interesting!",
      "Let me think about that.",
      "Thanks for sharing!",
      "I'll get back to you on this.",
      "Great idea!",
      "Looking forward to it.",
    ];
    const convIds = Object.keys(messages);
    if (!convIds.length) return;

    const randomConvId = convIds[Math.floor(Math.random() * convIds.length)];
    const conversation = conversations.find((c) => c.id === randomConvId);
    if (!conversation) return;

    const participant = conversation.participants[0];
    if (!onlineUsers.has(participant.id)) return;

    const newMessage = {
      id: "msg_" + Date.now(),
      conversationId: randomConvId,
      senderId: participant.id,
      content:
        randomMessages[Math.floor(Math.random() * randomMessages.length)],
      timestamp: new Date().toISOString(),
      type: "text",
      isRead: false,
      status: "delivered",
    };
    addMessage(newMessage);
  }, [messages, conversations, onlineUsers]);

  const fetchConversations = useCallback(
    async () => conversations,
    [conversations]
  );

  const fetchMessages = useCallback(
    async (conversationId) => messages[conversationId] || [],
    [messages]
  );

  const sendMessage = useCallback(
    async (conversationId, content, type = "text") => {
      setIsLoading(true);
      try {
        const newMessage = {
          id: "msg_" + Date.now(),
          conversationId,
          senderId: user?.id,
          content,
          timestamp: new Date().toISOString(),
          type,
          isRead: true,
          status: "sent",
        };

        addMessage(newMessage);
        setTimeout(() => {
          updateMessageStatus(newMessage.id, "delivered");
          setTimeout(() => {
            updateMessageStatus(newMessage.id, "read");
          }, 2000);
        }, 1000);

        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  lastMessage: {
                    id: newMessage.id,
                    senderId: newMessage.senderId,
                    content: newMessage.content,
                    timestamp: newMessage.timestamp,
                    type: newMessage.type,
                    status: newMessage.status,
                  },
                  updatedAt: newMessage.timestamp,
                }
              : conv
          )
        );

        return newMessage;
      } catch (error) {
        throw new Error("Failed to send message");
      } finally {
        setIsLoading(false);
      }
    },
    [user]
  );

  const addMessage = useCallback(
    (message) => {
      setMessages((prev) => ({
        ...prev,
        [message.conversationId]: [
          ...(prev[message.conversationId] || []),
          message,
        ],
      }));
      if (message.senderId !== user?.id && !message.isRead) {
        setUnreadCounts((prev) => ({
          ...prev,
          [message.conversationId]: (prev[message.conversationId] || 0) + 1,
        }));
      }
      setConversations((prev) =>
        prev
          .map((conv) =>
            conv.id === message.conversationId
              ? {
                  ...conv,
                  lastMessage: {
                    id: message.id,
                    senderId: message.senderId,
                    content: message.content,
                    timestamp: message.timestamp,
                    type: message.type,
                    status: message.status,
                  },
                  updatedAt: message.timestamp,
                }
              : conv
          )
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      );
    },
    [user]
  );

  const updateMessageStatus = useCallback((messageId, status) => {
    setMessages((prev) => {
      const updatedMessages = { ...prev };
      Object.keys(updatedMessages).forEach((convId) => {
        updatedMessages[convId] = updatedMessages[convId].map((msg) =>
          msg.id === messageId ? { ...msg, status } : msg
        );
      });
      return updatedMessages;
    });
  }, []);

  const markAsRead = useCallback(
    async (conversationId) => {
      setIsLoading(true);
      try {
        setMessages((prev) => ({
          ...prev,
          [conversationId]: (prev[conversationId] || []).map((msg) =>
            msg.senderId !== user?.id ? { ...msg, isRead: true } : msg
          ),
        }));
        setUnreadCounts((prev) => ({
          ...prev,
          [conversationId]: 0,
        }));
      } catch (error) {
        throw new Error("Failed to mark messages as read");
      } finally {
        setIsLoading(false);
      }
    },
    [user]
  );

  const startConversation = useCallback(
    async (userId) => {
      setIsLoading(true);
      try {
        const existingConv = conversations.find((conv) =>
          conv.participants.some((p) => p.id === userId)
        );
        if (existingConv) {
          setActiveConversation(existingConv);
          if (isMobile) setShowConversationList(false);
          return existingConv;
        }

        const connection = connections.find((conn) => conn.id === userId);
        if (!connection) throw new Error("User not found in connections");

        const newConversation = {
          id: "conv_" + Date.now(),
          participants: [
            {
              id: connection.id,
              firstName: connection.firstName,
              lastName: connection.lastName,
              title: connection.title,
              avatar: connection.avatar,
              isOnline: onlineUsers.has(connection.id),
            },
          ],
          lastMessage: null,
          unreadCount: 0,
          updatedAt: new Date().toISOString(),
        };

        setConversations((prev) => [newConversation, ...prev]);
        setMessages((prev) => ({ ...prev, [newConversation.id]: [] }));
        setActiveConversation(newConversation);
        if (isMobile) setShowConversationList(false);
        return newConversation;
      } catch (error) {
        throw new Error("Failed to start conversation");
      } finally {
        setIsLoading(false);
      }
    },
    [conversations, connections, onlineUsers, isMobile]
  );

  const deleteConversation = useCallback(
    async (conversationId) => {
      setIsLoading(true);
      try {
        setConversations((prev) =>
          prev.filter((conv) => conv.id !== conversationId)
        );
        setMessages((prev) => {
          const newMessages = { ...prev };
          delete newMessages[conversationId];
          return newMessages;
        });
        setUnreadCounts((prev) => {
          const newCounts = { ...prev };
          delete newCounts[conversationId];
          return newCounts;
        });
        if (activeConversation?.id === conversationId) {
          setActiveConversation(null);
          if (isMobile) setShowConversationList(true);
        }
      } catch (error) {
        throw new Error("Failed to delete conversation");
      } finally {
        setIsLoading(false);
      }
    },
    [activeConversation, isMobile]
  );

  const getTotalUnreadCount = useCallback(() => {
    return Object.values(unreadCounts).reduce(
      (total, count) => total + count,
      0
    );
  }, [unreadCounts]);

  const handleMobileBack = useCallback(() => {
    if (isMobile) {
      setActiveConversation(null);
      setShowConversationList(true);
    }
  }, [isMobile]);

  const selectConversation = useCallback(
    (conversation) => {
      setActiveConversation(conversation);
      if (isMobile) setShowConversationList(false);
      markAsRead(conversation.id);
    },
    [isMobile, markAsRead]
  );

  const value = useMemo(
    () => ({
      conversations,
      activeConversation,
      setActiveConversation,
      selectConversation,
      messages,
      isTyping,
      unreadCounts,
      onlineUsers,
      isLoading,
      isMobile,
      showConversationList,
      setShowConversationList,
      handleMobileBack,
      fetchConversations,
      fetchMessages,
      sendMessage,
      markAsRead,
      startConversation,
      deleteConversation,
      getTotalUnreadCount,
      updateMessageStatus,
    }),
    [
      conversations,
      activeConversation,
      selectConversation,
      messages,
      isTyping,
      unreadCounts,
      onlineUsers,
      isLoading,
      isMobile,
      showConversationList,
      handleMobileBack,
      fetchConversations,
      fetchMessages,
      sendMessage,
      markAsRead,
      startConversation,
      deleteConversation,
      getTotalUnreadCount,
      updateMessageStatus,
    ]
  );

  return (
    <MessagingContext.Provider value={value}>
      {isLoading ? (
        <div
          className="flex items-center justify-center h-screen bg-gray-100"
          role="status"
          aria-label="Loading messaging data"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        children
      )}
    </MessagingContext.Provider>
  );
};

// Explicitly export the context, provider, and hook
export { MessagingContext, MessagingProvider, useMessaging };
