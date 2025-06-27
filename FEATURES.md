# SkillLink Features Breakdown

## 1. Authentication Feature

### UI Layout
```
┌─────────────────────────────────────┐
│             Auth Pages              │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │        Login Form           │    │
│  │  ┌─────────────────────┐    │    │
│  │  │ Email Input         │    │    │
│  │  ├─────────────────────┤    │    │
│  │  │ Password Input      │    │    │
│  │  ├─────────────────────┤    │    │
│  │  │ Remember Me □       │    │    │
│  │  ├─────────────────────┤    │    │
│  │  │ [Login Button]      │    │    │
│  │  └─────────────────────┘    │    │
│  │                             │    │
│  │  Forgot Password Link       │    │
│  │  Sign Up Link              │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### Required Components
- `LoginForm` - Main login form with validation
- `RegisterForm` - User registration with skill selection
- `ForgotPasswordForm` - Password reset request
- `ResetPasswordForm` - New password form
- `EmailVerification` - Email verification page
- `OnboardingWizard` - Multi-step user setup
- `AuthLayout` - Shared layout for auth pages
- `SocialLoginButtons` - Google/LinkedIn OAuth
- `PasswordStrengthIndicator` - Visual password strength
- `SkillSelector` - Initial skill selection during signup

### State Management Plan
```javascript
// Auth Context/Store
{
  user: {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    avatar: string,
    isVerified: boolean,
    onboardingCompleted: boolean
  },
  isAuthenticated: boolean,
  isLoading: boolean,
  error: string | null,
  
  // Actions
  login: (email, password) => Promise,
  register: (userData) => Promise,
  logout: () => void,
  forgotPassword: (email) => Promise,
  resetPassword: (token, password) => Promise,
  verifyEmail: (token) => Promise,
  updateProfile: (data) => Promise
}
```

### API Structure
```javascript
// Auth endpoints
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
POST /api/auth/refresh
POST /api/auth/forgot-password
POST /api/auth/reset-password
POST /api/auth/verify-email
GET  /api/auth/me

// OAuth endpoints
GET  /api/auth/google
GET  /api/auth/linkedin
POST /api/auth/oauth/callback
```

### Sample Data
```javascript
// Login request
{
  email: "john@example.com",
  password: "SecurePassword123"
}

// Register request
{
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "SecurePassword123",
  skills: ["JavaScript", "React", "Node.js"],
  profession: "Full Stack Developer",
  experience: "3-5 years"
}

// Auth response
{
  user: {
    id: "usr_123",
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
    avatar: "https://example.com/avatar.jpg",
    isVerified: true,
    onboardingCompleted: true
  },
  accessToken: "jwt_token_here",
  refreshToken: "refresh_token_here"
}
```

---

## 2. Dashboard Feature

### UI Layout
```
┌─────────────────────────────────────────────────────────────┐
│                      Dashboard                              │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Stats     │  │ Skill Match │  │ Connections │        │
│  │             │  │             │  │             │        │
│  │ 15 Skills   │  │    85%      │  │     23      │        │
│  │ 8 Projects  │  │  Relevance  │  │  Active     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Recent Activity                        │   │
│  │  • Sarah connected with you                        │   │
│  │  • New project match: React Developer              │   │
│  │  • Mike endorsed your JavaScript skills            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Recommended Connections               │   │
│  │  [Profile Cards with Connect buttons]              │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Required Components
- `DashboardStats` - Overview statistics cards
- `ActivityFeed` - Recent activity list
- `SkillMatchWidget` - Current skill relevance meter
- `RecommendedConnections` - Suggested users to connect
- `ProjectRecommendations` - Matching opportunities
- `NotificationCenter` - In-app notifications
- `QuickActions` - Fast access buttons
- `ProgressTracker` - Profile completion progress
- `TrendingSkills` - Popular skills in network
- `UpcomingEvents` - Skill-related events

### State Management Plan
```javascript
// Dashboard Store
{
  stats: {
    totalSkills: number,
    totalConnections: number,
    profileViews: number,
    endorsements: number,
    projects: number
  },
  activities: Activity[],
  recommendations: {
    connections: User[],
    projects: Project[],
    skills: Skill[]
  },
  notifications: Notification[],
  isLoading: boolean,
  
  // Actions
  fetchDashboardData: () => Promise,
  markNotificationRead: (id) => Promise,
  dismissRecommendation: (type, id) => Promise
}
```

### API Structure
```javascript
// Dashboard endpoints
GET /api/dashboard/stats
GET /api/dashboard/activities?limit=10
GET /api/dashboard/recommendations/connections
GET /api/dashboard/recommendations/projects
GET /api/dashboard/notifications
PUT /api/dashboard/notifications/:id/read
```

### Sample Data
```javascript
// Dashboard stats
{
  totalSkills: 15,
  totalConnections: 23,
  profileViews: 142,
  endorsements: 31,
  projects: 8,
  skillMatchScore: 85
}

// Activity feed
[
  {
    id: "act_123",
    type: "connection",
    message: "Sarah connected with you",
    timestamp: "2024-01-15T10:30:00Z",
    user: {
      name: "Sarah Johnson",
      avatar: "https://example.com/sarah.jpg"
    }
  },
  {
    id: "act_124",
    type: "endorsement",
    message: "Mike endorsed your JavaScript skills",
    timestamp: "2024-01-15T09:15:00Z",
    skill: "JavaScript"
  }
]
```

---

## 3. Profile Management Feature

### UI Layout
```
┌─────────────────────────────────────────────────────────────┐
│                    Profile Management                       │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────────────────────────┐   │
│  │             │  │           Profile Info              │   │
│  │   Avatar    │  │  Name: John Doe                     │   │
│  │   Upload    │  │  Title: Full Stack Developer       │   │
│  │             │  │  Location: New York, NY            │   │
│  │  [Change]   │  │  Bio: Passionate developer...      │   │
│  └─────────────┘  │  Email: john@example.com           │   │
│                   │  Phone: +1 (555) 123-4567          │   │
│                   └─────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    Skills                           │   │
│  │  [JavaScript] [React] [Node.js] [Python] [+Add]    │   │
│  │  Skill levels and endorsement counts               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 Experience                          │   │
│  │  Company, Role, Duration, Description              │   │
│  │  [+ Add Experience]                                │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Required Components
- `ProfileHeader` - Avatar, name, title display
- `ProfileEditForm` - Editable profile information
- `AvatarUpload` - Image upload with crop/resize
- `SkillsManager` - Add/remove/level skills
- `ExperienceSection` - Work experience CRUD
- `EducationSection` - Educational background
- `PortfolioGallery` - Project showcase
- `ContactInfo` - Contact details management
- `PrivacySettings` - Profile visibility controls
- `ProfileCompletion` - Progress indicator

### State Management Plan
```javascript
// Profile Store
{
  profile: {
    id: string,
    firstName: string,
    lastName: string,
    title: string,
    bio: string,
    avatar: string,
    location: string,
    email: string,
    phone: string,
    website: string,
    linkedin: string,
    github: string
  },
  skills: Skill[],
  experience: Experience[],
  education: Education[],
  portfolio: Project[],
  privacy: PrivacySettings,
  isEditing: boolean,
  isLoading: boolean,
  
  // Actions
  updateProfile: (data) => Promise,
  uploadAvatar: (file) => Promise,
  addSkill: (skill) => Promise,
  removeSkill: (skillId) => Promise,
  addExperience: (experience) => Promise,
  updateExperience: (id, data) => Promise,
  deleteExperience: (id) => Promise
}
```

### API Structure
```javascript
// Profile endpoints
GET    /api/profile/:userId
PUT    /api/profile/:userId
POST   /api/profile/avatar
DELETE /api/profile/avatar

// Skills endpoints
GET    /api/profile/:userId/skills
POST   /api/profile/:userId/skills
DELETE /api/profile/:userId/skills/:skillId
PUT    /api/profile/:userId/skills/:skillId

// Experience endpoints
GET    /api/profile/:userId/experience
POST   /api/profile/:userId/experience
PUT    /api/profile/:userId/experience/:id
DELETE /api/profile/:userId/experience/:id
```

### Sample Data
```javascript
// Profile data
{
  id: "usr_123",
  firstName: "John",
  lastName: "Doe",
  title: "Full Stack Developer",
  bio: "Passionate developer with 5+ years of experience...",
  avatar: "https://example.com/avatars/john.jpg",
  location: "New York, NY",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  website: "https://johndoe.dev",
  linkedin: "https://linkedin.com/in/johndoe",
  github: "https://github.com/johndoe"
}

// Skills data
[
  {
    id: "skill_1",
    name: "JavaScript",
    level: "Expert",
    endorsements: 15,
    yearsOfExperience: 5
  },
  {
    id: "skill_2",
    name: "React",
    level: "Advanced",
    endorsements: 12,
    yearsOfExperience: 3
  }
]

// Experience data
[
  {
    id: "exp_1",
    company: "Tech Corp",
    position: "Senior Full Stack Developer",
    startDate: "2022-01-01",
    endDate: null, // Current job
    description: "Led development of web applications...",
    skills: ["JavaScript", "React", "Node.js"]
  }
]
```

---

## 4. Skill Discovery Feature

### UI Layout
```
┌─────────────────────────────────────────────────────────────┐
│                   Skill Discovery                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Search & Filters                            │   │
│  │  [Search skills...] [Category ▼] [Level ▼] [Sort]  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │               Skill Categories                      │   │
│  │  [Programming] [Design] [Marketing] [Data Science]  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                Trending Skills                      │   │
│  │  JavaScript ↗ React ↗ Python ↗ AI/ML ↗           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Skill Cards Grid                       │   │
│  │  [Skill Card] [Skill Card] [Skill Card]            │   │
│  │  [Skill Card] [Skill Card] [Skill Card]            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Required Components
- `SkillSearch` - Search with autocomplete
- `SkillFilters` - Category, level, popularity filters
- `SkillCategoryTabs` - Category navigation
- `TrendingSkills` - Popular/growing skills
- `SkillCard` - Individual skill display
- `SkillModal` - Detailed skill information
- `RelatedSkills` - Skill recommendations
- `SkillLearningPaths` - Suggested learning routes
- `ExpertProfiles` - Top users with skill
- `SkillComparison` - Compare similar skills

### State Management Plan
```javascript
// Skills Discovery Store
{
  skills: Skill[],
  categories: Category[],
  trendingSkills: Skill[],
  searchQuery: string,
  filters: {
    category: string,
    level: string,
    popularity: string,
    sortBy: string
  },
  selectedSkill: Skill | null,
  relatedSkills: Skill[],
  learningPaths: LearningPath[],
  isLoading: boolean,
  
  // Actions
  searchSkills: (query) => Promise,
  filterSkills: (filters) => Promise,
  getSkillDetails: (skillId) => Promise,
  getRelatedSkills: (skillId) => Promise,
  getTrendingSkills: () => Promise,
  addToMySkills: (skillId) => Promise
}
```

### API Structure
```javascript
// Skills discovery endpoints
GET /api/skills/search?q=javascript&category=programming
GET /api/skills/categories
GET /api/skills/trending
GET /api/skills/:skillId
GET /api/skills/:skillId/related
GET /api/skills/:skillId/experts
GET /api/skills/:skillId/learning-paths
GET /api/skills/compare?skills=react,vue,angular
```

### Sample Data
```javascript
// Skills search results
[
  {
    id: "skill_1",
    name: "JavaScript",
    category: "Programming",
    description: "Dynamic programming language for web development",
    difficulty: "Intermediate",
    popularity: 95,
    averageSalary: "$75,000",
    totalProfessionals: 1250000,
    growth: "+15%",
    relatedSkills: ["React", "Node.js", "TypeScript"],
    prerequisites: ["HTML", "CSS"],
    learningTime: "3-6 months"
  }
]

// Trending skills
[
  {
    id: "skill_ai",
    name: "Artificial Intelligence",
    growth: "+45%",
    trend: "rising",
    demandScore: 92
  }
]

// Skill categories
[
  {
    id: "programming",
    name: "Programming",
    count: 150,
    icon: "code"
  },
  {
    id: "design",
    name: "Design",
    count: 89,
    icon: "palette"
  }
]
```

---

## 5. Connections Feature

### UI Layout
```
┌─────────────────────────────────────────────────────────────┐
│                     Connections                             │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Connection Tabs                        │   │
│  │  [My Network] [Discover] [Requests] [Following]     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           Search & Filters                          │   │
│  │  [Search people...] [Skills ▼] [Location ▼]        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              People Cards                           │   │
│  │  ┌─────────┐                                        │   │
│  │  │ Avatar  │  John Doe                              │   │
│  │  │         │  Full Stack Developer                  │   │
│  │  │         │  JavaScript, React, Node.js            │   │
│  │  │         │  [Connect] [Message] [View Profile]    │   │
│  │  └─────────┘                                        │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Required Components
- `ConnectionTabs` - Network navigation
- `PeopleSearch` - Search with filters
- `PersonCard` - User profile card
- `ConnectionButton` - Connect/disconnect actions
- `ConnectionModal` - Send connection message
- `NetworkStats` - Connection statistics
- `MutualConnections` - Shared connections
- `RecommendedUsers` - AI-suggested connections
- `ConnectionRequests` - Pending requests management
- `NetworkGraph` - Visual network representation

### State Management Plan
```javascript
// Connections Store
{
  connections: User[],
  discoveredUsers: User[],
  connectionRequests: {
    sent: ConnectionRequest[],
    received: ConnectionRequest[]
  },
  networkStats: {
    totalConnections: number,
    mutualConnections: number,
    networkReach: number
  },
  searchQuery: string,
  filters: {
    skills: string[],
    location: string,
    company: string
  },
  isLoading: boolean,
  
  // Actions
  searchUsers: (query, filters) => Promise,
  sendConnectionRequest: (userId, message) => Promise,
  acceptConnectionRequest: (requestId) => Promise,
  declineConnectionRequest: (requestId) => Promise,
  removeConnection: (userId) => Promise,
  getRecommendations: () => Promise
}
```

### API Structure
```javascript
// Connections endpoints
GET  /api/connections
GET  /api/connections/discover?skills=javascript&location=ny
POST /api/connections/request
PUT  /api/connections/request/:id/accept
PUT  /api/connections/request/:id/decline
DELETE /api/connections/:userId
GET  /api/connections/requests/sent
GET  /api/connections/requests/received
GET  /api/connections/recommendations
GET  /api/connections/mutual/:userId
```

### Sample Data
```javascript
// Connection data
{
  id: "usr_456",
  firstName: "Sarah",
  lastName: "Johnson",
  title: "UX Designer",
  company: "Design Co",
  location: "San Francisco, CA",
  avatar: "https://example.com/sarah.jpg",
  skills: ["UI/UX Design", "Figma", "User Research"],
  mutualConnections: 3,
  connectionStatus: "not_connected", // connected, pending, not_connected
  matchScore: 85
}

// Connection request
{
  id: "req_123",
  from: {
    id: "usr_456",
    name: "Sarah Johnson",
    title: "UX Designer",
    avatar: "https://example.com/sarah.jpg"
  },
  message: "Hi! I'd love to connect and discuss UX strategies.",
  timestamp: "2024-01-15T10:30:00Z",
  status: "pending"
}

// Network stats
{
  totalConnections: 156,
  mutualConnections: 23,
  networkReach: 15600,
  topSkillsInNetwork: ["JavaScript", "React", "Python"],
  industryBreakdown: {
    "Technology": 45,
    "Design": 32,
    "Marketing": 28
  }
}
```

---

## 6. Messaging Feature

### UI Layout
```
┌─────────────────────────────────────────────────────────────┐
│                      Messaging                              │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ │ ┌─────────────────────────────────────┐ │
│  │ Conversations│ │ │           Chat Window               │ │
│  │             │ │ │  ┌─────────────────────────────────┐ │ │
│  │ Sarah J.    │ │ │  │         Chat Header             │ │ │
│  │ "Thanks..." │ │ │  │  [Avatar] Sarah Johnson         │ │ │
│  │ 2m ago      │ │ │  │          UX Designer            │ │ │
│  │             │ │ │  └─────────────────────────────────┘ │ │
│  │ Mike Chen   │ │ │                                     │ │
│  │ "Hey there" │ │ │  ┌─────────────────────────────────┐ │ │
│  │ 1h ago      │ │ │  │         Messages                │ │ │
│  │             │ │ │  │  [Received] Hi! Thanks for...   │ │ │
│  │ [+ New]     │ │ │  │  [Sent] You're welcome!         │ │ │
│  │             │ │ │  │  [Received] Are you free...     │ │ │
│  └─────────────┘ │ │  └─────────────────────────────────┘ │ │
│                 │ │                                     │ │
│                 │ │  ┌─────────────────────────────────┐ │ │
│                 │ │  │      Message Input              │ │ │
│                 │ │  │  [Type a message...] [📎] [Send]│ │ │
│                 │ │  └─────────────────────────────────┘ │ │
│                 │ └─────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Required Components
- `MessageLayout` - Split layout with conversations and chat
- `ConversationList` - List of chat conversations
- `ConversationItem` - Individual conversation preview
- `ChatWindow` - Main chat interface
- `ChatHeader` - User info and chat actions
- `MessageList` - Scrollable message history
- `MessageBubble` - Individual message display  
- `MessageInput` - Text input with attachments
- `EmojiPicker` - Emoji selection
- `FileUpload` - File sharing capability
- `TypingIndicator` - Real-time typing status
- `MessageSearch` - Search within conversations

### State Management Plan
```javascript
// Messaging Store
{
  conversations: Conversation[],
  activeConversation: string | null,
  messages: { [conversationId]: Message[] },
  isTyping: { [conversationId]: boolean },
  unreadCounts: { [conversationId]: number },
  onlineUsers: string[],
  isLoading: boolean,
  
  // Actions
  fetchConversations: () => Promise,
  fetchMessages: (conversationId) => Promise,
  sendMessage: (conversationId, content, type) => Promise,
  markAsRead: (conversationId) => Promise,
  startConversation: (userId) => Promise,
  deleteConversation: (conversationId) => Promise,
  setTyping: (conversationId, isTyping) => void
}
```

### API Structure
```javascript
// Messaging endpoints
GET  /api/messages/conversations
GET  /api/messages/conversations/:id/messages
POST /api/messages/conversations/:id/messages
POST /api/messages/conversations
PUT  /api/messages/conversations/:id/read
DELETE /api/messages/conversations/:id

// WebSocket events
message:sent
message:received
typing:start
typing:stop
user:online
user:offline
```

### Sample Data
```javascript
// Conversation data
{
  id: "conv_123",
  participants: [
    {
      id: "usr_456",
      name: "Sarah Johnson",
      avatar: "https://example.com/sarah.jpg",
      isOnline: true
    }
  ],
  lastMessage: {
    content: "Thanks for connecting!",
    timestamp: "2024-01-15T10:30:00Z",
    senderId: "usr_456"
  },
  unreadCount: 2
}

// Message data
{
  id: "msg_789",
  conversationId: "conv_123",
  senderId: "usr_456",
  content: "Hi! I'd love to discuss the React project.",
  type: "text", // text, image, file
  timestamp: "2024-01-15T10:30:00Z",
  isRead: false,
  attachments: []
}
```

---

## 7. Job/Project Board Feature

### UI Layout
```
┌─────────────────────────────────────────────────────────────┐
│                    Job/Project Board                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Search & Filters                       │   │
│  │  [Search jobs...] [Type ▼] [Remote ▼] [Salary ▼]   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                Job Cards                            │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │ React Developer - Tech Corp                 │    │   │
│  │  │ $80k-$120k • Remote • Full-time            │    │   │
│  │  │ React, JavaScript, Node.js                  │    │   │
│  │  │ Posted 2 days ago • 95% skill match         │    │   │
│  │  │ [Save] [Apply] [Share]                      │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Recommended Projects                   │   │
│  │  AI-powered job matching based on skills           │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Required Components
- `JobSearch` - Search with advanced filters
- `JobFilters` - Filter panel (salary, location, type)
- `JobCard` - Job listing display
- `JobModal` - Detailed job view
- `SavedJobs` - Bookmarked opportunities
- `ApplicationTracker` - Applied jobs status
- `SkillMatchIndicator` - Match percentage
- `SalaryInsights` - Market rate data
- `CompanyProfiles` - Employer information
- `ApplicationForm` - Quick apply form
- `RecommendationEngine` - AI job suggestions

### State Management Plan
```javascript
// Jobs Store
{
  jobs: Job[],
  savedJobs: Job[],
  applications: Application[],
  filters: {
    query: string,
    type: string,
    location: string,
    salary: { min: number, max: number },
    remote: boolean,
    skills: string[]
  },
  recommendations: Job[],
  selectedJob: Job | null,
  isLoading: boolean,
  
  // Actions
  searchJobs: (query, filters) => Promise,
  getJobDetails: (jobId) => Promise,
  saveJob: (jobId) => Promise,
  unsaveJob: (jobId) => Promise,
  applyToJob: (jobId, applicationData) => Promise,
  getRecommendations: () => Promise,
  trackApplication: (applicationId) => Promise
}
```

### API Structure
```javascript
// Jobs endpoints
GET  /api/jobs/search?q=react&location=remote&salary_min=80000
GET  /api/jobs/:jobId
POST /api/jobs/:jobId/save
DELETE /api/jobs/:jobId/save
POST /api/jobs/:jobId/apply
GET  /api/jobs/saved
GET  /api/jobs/applications
GET  /api/jobs/recommendations
GET  /api/companies/:companyId
```

### Sample Data
```javascript
// Job listing
{
  id: "job_123",
  title: "Senior React Developer",
  company: {
    id: "comp_456",
    name: "Tech Corp",
    logo: "https://example.com/techcorp-logo.png",
    industry: "Technology"
  },
  location: "Remote",
  type: "Full-time",
  salary: {
    min: 80000,
    max: 120000,
    currency: "USD"
  },
  description: "We're looking for an experienced React developer...",
  requirements: [
    "3+ years React experience",
    "TypeScript proficiency",
    "Testing experience"
  ],
  skills: ["React", "JavaScript", "TypeScript", "Jest"],
  benefits: ["Health insurance", "Remote work", "401k"],
  postedDate: "2024-01-13T00:00:00Z",
  deadline: "2024-02-13T00:00:00Z",
  skillMatchScore: 95,
  applicationsCount: 23,
  isSaved: false,
  hasApplied: false
}

// Application data
{
  id: "app_789",
  jobId: "job_123",
  status: "pending", // pending, reviewing, interview, rejected, accepted
  appliedDate: "2024-01-15T10:30:00Z",
  coverLetter: "I'm excited to apply for this position...",
  resume: "https://example.com/resume.pdf",
  customFields: {
    "portfolioUrl": "https://johndoe.dev",
    "availableStartDate": "2024-02-01"
  }
}
```

---

## 8. Settings Feature

### UI Layout
```
┌─────────────────────────────────────────────────────────────┐
│                       Settings                              │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ │ ┌─────────────────────────────────────┐ │
│  │ Settings    │ │ │           Profile Settings          │ │
│  │ Menu        │ │ │                                     │ │
│  │             │ │ │  ┌─────────────────────────────────┐ │ │
│  │ Profile     │ │ │  │ Personal Information            │ │ │
│  │ Privacy     │ │ │  │ Email: john@example.com         │ │ │
│  │ Notifications│ │ │  │ Phone: +1 (555) 123-4567       │ │ │
│  │ Account     │ │ │  │ [Update]                        │ │ │
│  │ Integrations│ │ │  └─────────────────────────────────┘ │ │
│  │ Help        │ │ │                                     │ │ │
│  │             │ │ │  ┌─────────────────────────────────┐ │ │
│  └─────────────┘ │ │  │ Change Password                 │ │ │
│                 │ │  │ Current: [••••••••]              │ │ │
│                 │ │  │ New: [••••••••]                  │ │ │
│                 │ │  │ Confirm: [••••••••]              │ │ │
│                 │ │  │ [Update Password]                │ │ │
│                 │ │  └─────────────────────────────────┘ │ │
│                 │ └─────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Required Components
- `SettingsLayout` - Sidebar navigation layout
- `SettingsNavigation` - Settings menu
- `ProfileSettings` - Personal info management
- `PrivacySettings` - Visibility and data controls
- `NotificationSettings` - Email/push preferences
- `AccountSettings` - Password, 2FA, deletion
- `IntegrationsPanel` - Third-party connections
- `ThemeSelector` - Dark/light mode toggle
- `LanguageSelector` - Localization options
- `DataExport` - Download user data
- `SecurityLog` - Account activity history

### State Management Plan
```javascript
// Settings Store
{
  profile: ProfileSettings,
  privacy: PrivacySettings,
  notifications: NotificationSettings,
  account: AccountSettings,
  integrations: Integration[],
  theme: 'light' | 'dark',
  language: string,
  isLoading: boolean,
  
  // Actions
  updateProfileSettings: (data) => Promise,
  updatePrivacySettings: (data) => Promise,
  updateNotificationSettings: (data) => Promise,
  changePassword: (currentPassword, newPassword) => Promise,
  enable2FA: () => Promise,
  disable2FA: () => Promise,
  connectIntegration: (provider) => Promise,
  disconnectIntegration: (provider) => Promise,
  exportData: () => Promise,
  deleteAccount: () => Promise
}
```

### API Structure
```javascript
// Settings endpoints
GET  /api/settings/profile
PUT  /api/settings/profile
GET  /api/settings/privacy
PUT  /api/settings/privacy
GET  /api/settings/notifications
PUT  /api/settings/notifications
POST /api/settings/password/change
POST /api/settings/2fa/enable
DELETE /api/settings/2fa/disable
GET  /api/settings/integrations
POST /api/settings/integrations/:provider/connect
DELETE /api/settings/integrations/:provider/disconnect
GET  /api/settings/security/log
POST /api/settings/data/export
DELETE /api/settings/account
```

### Sample Data
```javascript
// Privacy settings
{
  profileVisibility: "public", // public, connections, private
  showEmail: false,
  showPhone: false,
  allowMessagesFrom: "connections", // everyone, connections, nobody
  showSkillsToRecruiters: true,
  indexInSearchEngines: false,
  dataProcessingConsent: true
}

// Notification settings
{
  email: {
    newConnections: true,
    messages: true,
    jobRecommendations: false,
    skillEndorsements: true,
    weeklyDigest: true
  },
  push: {
    messages: true,
    connectionRequests: true,
    jobAlerts: false
  },
  sms: {
    securityAlerts: true,
    importantUpdates: false
  }
}

// Integrations
[
  {
    id: "linkedin",
    name: "LinkedIn",
    connected: true,
    connectedDate: "2024-01-01T00:00:00Z",
    permissions: ["profile", "connections"]
  },
  {
    id: "github",
    name: "GitHub",
    connected: false,
    permissions: ["repositories", "profile"]
  }
]
```

---

## Development Roadmap

### Phase 1: Foundation (Weeks 1-2)
- ✅ Project setup with Vite, React, Tailwind, shadcn/ui
- ✅ Folder structure and configuration
- Basic routing setup
- Authentication UI components
- Basic layout components

### Phase 2: Core Features (Weeks 3-6)
- Authentication system implementation
- User profile management
- Dashboard with basic stats
- Skill management system

### Phase 3: Social Features (Weeks 7-10)
- Connections system
- Messaging functionality
- Skill discovery and matching
- User recommendations

### Phase 4: Advanced Features (Weeks 11-14)
- Job/project board
- Advanced search and filtering
- Real-time notifications
- Settings and privacy controls

### Phase 5: Polish & Launch (Weeks 15-16)
- Testing and bug fixes
- Performance optimization
- Final UI/UX improvements
- Deployment preparation

This completes the comprehensive breakdown of all major SkillLink features. Each feature includes detailed UI layouts, component requirements, state management plans, API structures, and sample data to guide development.