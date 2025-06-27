import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  Search, 
  Filter, 
  Users, 
  UserPlus, 
  MessageCircle, 
  Check, 
  X,
  MapPin,
  Building,
  Clock,
  Star,
  Eye,
  MoreHorizontal,
  Edit,
  Plus
} from 'lucide-react'
import { useConnections } from '@/context/ConnectionsContext'
import { useMessaging } from '@/context/MessagingContext'

const Connections = () => {
  const {
    connections,
    discoveredUsers,
    connectionRequests,
    networkStats,
    searchQuery,
    setSearchQuery,
    isLoading,
    searchUsers,
    sendConnectionRequest,
    acceptConnectionRequest,
    declineConnectionRequest,
    removeConnection
  } = useConnections()
  const { startConversation } = useMessaging()

  const [activeTab, setActiveTab] = useState('network')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showConnectionModal, setShowConnectionModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [connectionMessage, setConnectionMessage] = useState('')
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const results = await searchUsers(searchQuery)
      setSearchResults(results)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSendRequest = async (user) => {
    setSelectedUser(user)
    setShowConnectionModal(true)
  }

  const submitConnectionRequest = async () => {
    if (!selectedUser) return

    try {
      await sendConnectionRequest(selectedUser.id, connectionMessage)
      setShowConnectionModal(false)
      setConnectionMessage('')
      setSelectedUser(null)
      // Refresh search results or update user status
      if (searchQuery) {
        handleSearch()
      }
    } catch (error) {
      console.error('Failed to send connection request:', error)
    }
  }

  const handleAcceptRequest = async (requestId) => {
    try {
      await acceptConnectionRequest(requestId)
    } catch (error) {
      console.error('Failed to accept request:', error)
    }
  }

  const handleDeclineRequest = async (requestId) => {
    try {
      await declineConnectionRequest(requestId)
    } catch (error) {
      console.error('Failed to decline request:', error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleStartConversation = async (userId) => {
    try {
      await startConversation(userId)
      window.location.href = '/messages'
    } catch (error) {
      console.error('Failed to start conversation:', error)
    }
  }

  const handleViewProfile = (user) => {
    setSelectedProfile(user)
    setShowProfileModal(true)
    setIsEditing(false)
  }

  const handleEditProfile = (user) => {
    setSelectedProfile(user)
    setShowProfileModal(true)
    setIsEditing(true)
  }

  const handleSaveProfile = () => {
    // In a real app, this would save to backend
    setIsEditing(false)
    setShowProfileModal(false)
  }

  const getConnectionStatusButton = (user) => {
    switch (user.connectionStatus) {
      case 'connected':
        return (
          <Button variant="outline" size="sm" onClick={() => handleStartConversation(user.id)} className="min-w-0">
            <MessageCircle className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Message</span>
          </Button>
        )
      case 'pending':
        return (
          <Button variant="outline" size="sm" disabled className="min-w-0">
            <Clock className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Pending</span>
          </Button>
        )
      default:
        return (
          <Button size="sm" onClick={() => handleSendRequest(user)} className="min-w-0">
            <UserPlus className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Connect</span>
          </Button>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Connections</h1>
        <p className="text-muted-foreground">Build and manage your professional network</p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search professionals by name, title, company, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSearch} disabled={isSearching} className="flex-1 sm:flex-none">
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none">
                <Filter className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-4 md:space-x-8 overflow-x-auto">
          {[
            { id: 'network', label: 'My Network', count: connections.length },
            { id: 'discover', label: 'Discover', count: searchResults.length || discoveredUsers.length },
            { id: 'requests', label: 'Requests', count: connectionRequests.received.length + connectionRequests.sent.length },
            { id: 'following', label: 'Following', count: 0 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'network' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Network Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Network Overview</CardTitle>
              </CardHeader>
              <CardContent className="">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{networkStats.totalConnections}</div>
                    <div className="text-sm text-muted-foreground">Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{networkStats.networkReach}</div>
                    <div className="text-sm text-muted-foreground">Network Reach</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{networkStats.mutualConnections}</div>
                    <div className="text-sm text-muted-foreground">Mutual Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">4</div>
                    <div className="text-sm text-muted-foreground">Industries</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connections List */}
            <Card>
              <CardHeader>
                <CardTitle>Your Connections</CardTitle>
                <CardDescription>People in your professional network</CardDescription>
              </CardHeader>
              <CardContent className="">
                <div className="space-y-4">
                  {connections.map((connection) => (
                    <div key={connection.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors gap-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          {connection.avatar ? (
                            <AvatarImage src={connection.avatar} alt={`${connection.firstName} ${connection.lastName}`} />
                          ) : (
                            <AvatarFallback>
                              {getInitials(connection.firstName, connection.lastName)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold">
                            {connection.firstName} {connection.lastName}
                            {connection.isOnline && (
                              <span className="ml-2 w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                            )}
                          </h4>
                          <p className="text-sm text-muted-foreground">{connection.title}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            <div className="flex items-center">
                              <Building className="w-3 h-3 mr-1" />
                              {connection.company}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {connection.location}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-3 h-3 mr-1" />
                              {connection.mutualConnections} mutual
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {connection.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {connection.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{connection.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 self-end sm:self-auto">
                        <Button variant="outline" size="sm" onClick={() => handleStartConversation(connection.id)} className="min-w-0">
                          <MessageCircle className="w-4 h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Message</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleViewProfile(connection)} className="min-w-0">
                          <Eye className="w-4 h-4 sm:mr-2" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="min-w-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Industry Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(networkStats.industryBreakdown || {}).map(([industry, count]) => (
                  <div key={industry} className="flex justify-between items-center">
                    <span className="text-sm">{industry}</span>
                    <Badge variant="secondary">{count}%</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Skills in Network</CardTitle>
              </CardHeader>
              <CardContent className="">
                <div className="flex flex-wrap gap-2">
                  {networkStats.topSkillsInNetwork?.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'discover' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Discover Professionals</CardTitle>
              <CardDescription>
                {searchQuery 
                  ? `Search results for "${searchQuery}"` 
                  : 'People you might want to connect with'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(searchResults.length > 0 ? searchResults : discoveredUsers).map((user) => (
                  <div key={user.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col items-center text-center mb-4">
                      <Avatar className="w-16 h-16 mb-3">
                        {user.avatar ? (
                          <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                        ) : (
                          <AvatarFallback className="text-lg">
                            {getInitials(user.firstName, user.lastName)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <h3 className="font-semibold">{user.firstName} {user.lastName}</h3>
                      <p className="text-sm text-muted-foreground">{user.title}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Building className="w-3 h-3 mr-1" />
                        {user.company}
                      </div>
                      {user.matchScore && (
                        <div className="flex items-center mt-2">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{user.matchScore}% match</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1" />
                        {user.location}
                        <span className="mx-2">•</span>
                        <Users className="w-3 h-3 mr-1" />
                        {user.mutualConnections} mutual
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {user.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {user.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{user.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        {getConnectionStatusButton(user)}
                        <Button variant="outline" size="sm" onClick={() => handleViewProfile(user)} className="min-w-0">
                          <Eye className="w-4 h-4 sm:mr-2" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Received Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Received Requests</CardTitle>
              <CardDescription>People who want to connect with you</CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className="space-y-4">
                {connectionRequests.received.length > 0 ? (
                  connectionRequests.received.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>
                              {getInitials(request.from.firstName, request.from.lastName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">
                              {request.from.firstName} {request.from.lastName}
                            </h4>
                            <p className="text-sm text-muted-foreground">{request.from.title}</p>
                            {request.from.company && (
                              <p className="text-xs text-muted-foreground">{request.from.company}</p>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(request.timestamp)}
                        </span>
                      </div>
                      {request.message && (
                        <p className="text-sm mb-3 p-2 bg-accent/50 rounded">
                          "{request.message}"
                        </p>
                      )}
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleAcceptRequest(request.id)} className="min-w-0">
                          <Check className="w-4 h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Accept</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeclineRequest(request.id)} className="min-w-0">
                          <X className="w-4 h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Decline</span>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <UserPlus className="w-12 h-12 mx-auto mb-4" />
                    <p>No pending requests</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Sent Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Sent Requests</CardTitle>
              <CardDescription>Your pending connection requests</CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className="space-y-4">
                {connectionRequests.sent.length > 0 ? (
                  connectionRequests.sent.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>
                              {getInitials(request.to.firstName, request.to.lastName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">
                              {request.to.firstName} {request.to.lastName}
                            </h4>
                            <p className="text-sm text-muted-foreground">{request.to.title}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(request.timestamp)}
                        </span>
                      </div>
                      {request.message && (
                        <p className="text-sm mb-3 p-2 bg-accent/50 rounded">
                          "{request.message}"
                        </p>
                      )}
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2" />
                        Pending response
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="w-12 h-12 mx-auto mb-4" />
                    <p>No pending requests</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Connection Request Modal */}
      {showConnectionModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Send Connection Request</CardTitle>
              <CardDescription>
                Send a personalized message to {selectedUser.firstName} {selectedUser.lastName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>
                    {getInitials(selectedUser.firstName, selectedUser.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{selectedUser.firstName} {selectedUser.lastName}</h4>
                  <p className="text-sm text-muted-foreground">{selectedUser.title}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Personal message (optional)</label>
                <textarea
                  value={connectionMessage}
                  onChange={(e) => setConnectionMessage(e.target.value)}
                  placeholder="Hi! I'd love to connect and..."
                  className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none"
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={submitConnectionRequest} disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Request'}
                </Button>
                <Button variant="outline" onClick={() => setShowConnectionModal(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Profile View/Edit Modal */}
      {showProfileModal && selectedProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{isEditing ? 'Edit Profile' : 'Profile'}</CardTitle>
                <CardDescription>
                  {isEditing ? 'Update profile information' : 'View profile details'}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {!isEditing && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setShowProfileModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Avatar className="w-20 h-20">
                  {selectedProfile.avatar ? (
                    <AvatarImage src={selectedProfile.avatar} alt={`${selectedProfile.firstName} ${selectedProfile.lastName}`} />
                  ) : (
                    <AvatarFallback className="text-2xl">
                      {getInitials(selectedProfile.firstName, selectedProfile.lastName)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="text-center sm:text-left">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input 
                        defaultValue={`${selectedProfile.firstName} ${selectedProfile.lastName}`}
                        className="text-lg font-semibold"
                      />
                      <Input 
                        defaultValue={selectedProfile.title}
                        className="text-sm"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold">
                        {selectedProfile.firstName} {selectedProfile.lastName}
                        {selectedProfile.isOnline && (
                          <span className="ml-2 w-3 h-3 bg-green-500 rounded-full inline-block"></span>
                        )}
                      </h3>
                      <p className="text-muted-foreground">{selectedProfile.title}</p>
                    </>
                  )}
                </div>
              </div>

              {/* Profile Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Company</label>
                    {isEditing ? (
                      <Input defaultValue={selectedProfile.company} />
                    ) : (
                      <p className="text-sm p-2 bg-accent/50 rounded">{selectedProfile.company}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Location</label>
                    {isEditing ? (
                      <Input defaultValue={selectedProfile.location} />
                    ) : (
                      <p className="text-sm p-2 bg-accent/50 rounded">{selectedProfile.location}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Mutual Connections</label>
                    <p className="text-sm p-2 bg-accent/50 rounded">{selectedProfile.mutualConnections} mutual connections</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.skills?.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                          {isEditing && (
                            <X className="w-3 h-3 ml-1 cursor-pointer" />
                          )}
                        </Badge>
                      ))}
                      {isEditing && (
                        <Button variant="outline" size="sm">
                          <Plus className="w-3 h-3 mr-1" />
                          Add Skill
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                {isEditing ? (
                  <>
                    <Button onClick={handleSaveProfile}>
                      <Check className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleStartConversation(selectedProfile.id)}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Connections