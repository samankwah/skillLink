import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const ProjectsContext = createContext({})

export const useProjects = () => {
  const context = useContext(ProjectsContext)
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider')
  }
  return context
}

export const ProjectsProvider = ({ children }) => {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const [activeProjects, setActiveProjects] = useState([])
  const [projectTasks, setProjectTasks] = useState({})
  const [projectFiles, setProjectFiles] = useState({})
  const [projectTeams, setProjectTeams] = useState({})
  const [projectMessages, setProjectMessages] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      loadProjectsData()
    }
  }, [user])

  const loadProjectsData = async () => {
    setIsLoading(true)
    try {
      // Mock active projects data
      const mockActiveProjects = [
        {
          id: 'proj_active_001',
          title: 'E-commerce Platform Redesign',
          description: 'Complete redesign of the e-commerce platform with modern UI/UX',
          client: {
            id: 'client_001',
            name: 'Sarah Chen',
            company: 'RetailTech Co',
            avatar: null
          },
          status: 'in_progress', // 'planning', 'in_progress', 'review', 'completed', 'on_hold'
          priority: 'high', // 'low', 'medium', 'high', 'urgent'
          budget: {
            total: 8000,
            spent: 3200,
            currency: 'USD'
          },
          timeline: {
            startDate: '2024-01-10T00:00:00Z',
            endDate: '2024-03-15T00:00:00Z',
            progress: 65
          },
          skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
          team: [
            {
              id: user.id,
              role: 'Lead Designer',
              permissions: ['edit', 'manage', 'view'],
              joinedDate: '2024-01-10T00:00:00Z'
            },
            {
              id: 'usr_dev_001',
              name: 'Alex Johnson',
              role: 'Frontend Developer',
              permissions: ['edit', 'view'],
              joinedDate: '2024-01-12T00:00:00Z',
              avatar: null
            }
          ],
          milestones: [
            {
              id: 'milestone_001',
              title: 'Research & Discovery',
              dueDate: '2024-01-25T00:00:00Z',
              status: 'completed',
              progress: 100
            },
            {
              id: 'milestone_002',
              title: 'Design System Creation',
              dueDate: '2024-02-10T00:00:00Z',
              status: 'completed',
              progress: 100
            },
            {
              id: 'milestone_003',
              title: 'High-Fidelity Mockups',
              dueDate: '2024-02-25T00:00:00Z',
              status: 'in_progress',
              progress: 80
            },
            {
              id: 'milestone_004',
              title: 'Prototype & Testing',
              dueDate: '2024-03-10T00:00:00Z',
              status: 'pending',
              progress: 0
            }
          ],
          tags: ['design', 'e-commerce', 'ui-ux'],
          createdAt: '2024-01-10T00:00:00Z',
          updatedAt: '2024-01-16T14:30:00Z'
        },
        {
          id: 'proj_active_002',
          title: 'Mobile App Development',
          description: 'React Native fitness tracking app with social features',
          client: {
            id: 'client_002',
            name: 'Mike Johnson',
            company: 'FitLife Startup',
            avatar: null
          },
          status: 'planning',
          priority: 'medium',
          budget: {
            total: 15000,
            spent: 0,
            currency: 'USD'
          },
          timeline: {
            startDate: '2024-01-20T00:00:00Z',
            endDate: '2024-05-20T00:00:00Z',
            progress: 15
          },
          skills: ['React Native', 'Mobile Development', 'Firebase', 'REST APIs'],
          team: [
            {
              id: user.id,
              role: 'Project Lead',
              permissions: ['edit', 'manage', 'view'],
              joinedDate: '2024-01-15T00:00:00Z'
            }
          ],
          milestones: [
            {
              id: 'milestone_005',
              title: 'Project Setup & Planning',
              dueDate: '2024-02-01T00:00:00Z',
              status: 'in_progress',
              progress: 60
            },
            {
              id: 'milestone_006',
              title: 'Core Features Development',
              dueDate: '2024-03-15T00:00:00Z',
              status: 'pending',
              progress: 0
            },
            {
              id: 'milestone_007',
              title: 'Social Features Integration',
              dueDate: '2024-04-15T00:00:00Z',
              status: 'pending',
              progress: 0
            },
            {
              id: 'milestone_008',
              title: 'Testing & Launch',
              dueDate: '2024-05-15T00:00:00Z',
              status: 'pending',
              progress: 0
            }
          ],
          tags: ['mobile', 'react-native', 'fitness'],
          createdAt: '2024-01-15T00:00:00Z',
          updatedAt: '2024-01-16T10:20:00Z'
        }
      ]

      // Mock project tasks
      const mockProjectTasks = {
        'proj_active_001': [
          {
            id: 'task_001',
            title: 'Create user persona documentation',
            description: 'Document primary user personas based on research findings',
            status: 'completed',
            priority: 'medium',
            assignee: {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`
            },
            dueDate: '2024-01-22T00:00:00Z',
            completedDate: '2024-01-21T16:30:00Z',
            tags: ['research', 'documentation'],
            milestone: 'milestone_001'
          },
          {
            id: 'task_002',
            title: 'Design component library',
            description: 'Create reusable components for the design system',
            status: 'in_progress',
            priority: 'high',
            assignee: {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`
            },
            dueDate: '2024-02-28T00:00:00Z',
            tags: ['design-system', 'components'],
            milestone: 'milestone_003',
            progress: 75
          },
          {
            id: 'task_003',
            title: 'Implement responsive grid system',
            description: 'Code the responsive grid system for the new design',
            status: 'pending',
            priority: 'medium',
            assignee: {
              id: 'usr_dev_001',
              name: 'Alex Johnson'
            },
            dueDate: '2024-03-05T00:00:00Z',
            tags: ['development', 'responsive'],
            milestone: 'milestone_003'
          },
          {
            id: 'task_004',
            title: 'User testing sessions',
            description: 'Conduct user testing with prototype',
            status: 'pending',
            priority: 'high',
            assignee: {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`
            },
            dueDate: '2024-03-08T00:00:00Z',
            tags: ['testing', 'user-research'],
            milestone: 'milestone_004'
          }
        ],
        'proj_active_002': [
          {
            id: 'task_005',
            title: 'Set up development environment',
            description: 'Configure React Native development environment and project structure',
            status: 'completed',
            priority: 'high',
            assignee: {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`
            },
            dueDate: '2024-01-25T00:00:00Z',
            completedDate: '2024-01-24T14:20:00Z',
            tags: ['setup', 'development'],
            milestone: 'milestone_005'
          },
          {
            id: 'task_006',
            title: 'Create project roadmap',
            description: 'Define detailed project roadmap and feature specifications',
            status: 'in_progress',
            priority: 'medium',
            assignee: {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`
            },
            dueDate: '2024-01-30T00:00:00Z',
            tags: ['planning', 'roadmap'],
            milestone: 'milestone_005',
            progress: 60
          }
        ]
      }

      // Mock project files
      const mockProjectFiles = {
        'proj_active_001': [
          {
            id: 'file_001',
            name: 'User Research Report.pdf',
            type: 'document',
            size: '2.4 MB',
            uploadedBy: {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`
            },
            uploadedAt: '2024-01-20T10:30:00Z',
            category: 'research',
            url: '/files/user-research-report.pdf'
          },
          {
            id: 'file_002',
            name: 'Design System.fig',
            type: 'design',
            size: '8.7 MB',
            uploadedBy: {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`
            },
            uploadedAt: '2024-02-05T14:15:00Z',
            category: 'design',
            url: '/files/design-system.fig'
          },
          {
            id: 'file_003',
            name: 'Wireframes_v2.sketch',
            type: 'design',
            size: '12.1 MB',
            uploadedBy: {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`
            },
            uploadedAt: '2024-02-12T16:45:00Z',
            category: 'design',
            url: '/files/wireframes-v2.sketch'
          }
        ],
        'proj_active_002': [
          {
            id: 'file_004',
            name: 'Project Proposal.docx',
            type: 'document',
            size: '1.8 MB',
            uploadedBy: {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`
            },
            uploadedAt: '2024-01-18T09:20:00Z',
            category: 'planning',
            url: '/files/project-proposal.docx'
          }
        ]
      }

      setActiveProjects(mockActiveProjects)
      setProjectTasks(mockProjectTasks)
      setProjectFiles(mockProjectFiles)
    } catch (error) {
      console.error('Error loading projects data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const createTask = async (projectId, taskData) => {
    setIsLoading(true)
    try {
      const newTask = {
        id: 'task_' + Date.now(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        assignee: {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`
        },
        ...taskData
      }

      setProjectTasks(prev => ({
        ...prev,
        [projectId]: [...(prev[projectId] || []), newTask]
      }))

      return newTask
    } catch (error) {
      throw new Error('Failed to create task')
    } finally {
      setIsLoading(false)
    }
  }

  const updateTask = async (projectId, taskId, updates) => {
    setIsLoading(true)
    try {
      setProjectTasks(prev => ({
        ...prev,
        [projectId]: (prev[projectId] || []).map(task =>
          task.id === taskId
            ? { ...task, ...updates, updatedAt: new Date().toISOString() }
            : task
        )
      }))
    } catch (error) {
      throw new Error('Failed to update task')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTask = async (projectId, taskId) => {
    setIsLoading(true)
    try {
      setProjectTasks(prev => ({
        ...prev,
        [projectId]: (prev[projectId] || []).filter(task => task.id !== taskId)
      }))
    } catch (error) {
      throw new Error('Failed to delete task')
    } finally {
      setIsLoading(false)
    }
  }

  const updateProjectProgress = async (projectId, progress) => {
    setActiveProjects(prev => prev.map(project =>
      project.id === projectId
        ? { ...project, timeline: { ...project.timeline, progress } }
        : project
    ))
  }

  const updateMilestone = async (projectId, milestoneId, updates) => {
    setActiveProjects(prev => prev.map(project =>
      project.id === projectId
        ? {
            ...project,
            milestones: project.milestones.map(milestone =>
              milestone.id === milestoneId
                ? { ...milestone, ...updates }
                : milestone
            )
          }
        : project
    ))
  }

  const uploadFile = async (projectId, fileData) => {
    setIsLoading(true)
    try {
      const newFile = {
        id: 'file_' + Date.now(),
        uploadedBy: {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`
        },
        uploadedAt: new Date().toISOString(),
        ...fileData
      }

      setProjectFiles(prev => ({
        ...prev,
        [projectId]: [...(prev[projectId] || []), newFile]
      }))

      return newFile
    } catch (error) {
      throw new Error('Failed to upload file')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteFile = async (projectId, fileId) => {
    setIsLoading(true)
    try {
      setProjectFiles(prev => ({
        ...prev,
        [projectId]: (prev[projectId] || []).filter(file => file.id !== fileId)
      }))
    } catch (error) {
      throw new Error('Failed to delete file')
    } finally {
      setIsLoading(false)
    }
  }

  const addTeamMember = async (projectId, memberData) => {
    setIsLoading(true)
    try {
      setActiveProjects(prev => prev.map(project =>
        project.id === projectId
          ? {
              ...project,
              team: [...project.team, {
                ...memberData,
                joinedDate: new Date().toISOString()
              }]
            }
          : project
      ))
    } catch (error) {
      throw new Error('Failed to add team member')
    } finally {
      setIsLoading(false)
    }
  }

  const removeTeamMember = async (projectId, memberId) => {
    setIsLoading(true)
    try {
      setActiveProjects(prev => prev.map(project =>
        project.id === projectId
          ? {
              ...project,
              team: project.team.filter(member => member.id !== memberId)
            }
          : project
      ))
    } catch (error) {
      throw new Error('Failed to remove team member')
    } finally {
      setIsLoading(false)
    }
  }

  const getProjectById = (projectId) => {
    return activeProjects.find(project => project.id === projectId)
  }

  const getProjectTasks = (projectId) => {
    return projectTasks[projectId] || []
  }

  const getProjectFiles = (projectId) => {
    return projectFiles[projectId] || []
  }

  const getTasksByStatus = (projectId, status) => {
    const tasks = projectTasks[projectId] || []
    return tasks.filter(task => task.status === status)
  }

  const getTasksByMilestone = (projectId, milestoneId) => {
    const tasks = projectTasks[projectId] || []
    return tasks.filter(task => task.milestone === milestoneId)
  }

  const calculateProjectStats = (projectId) => {
    const tasks = projectTasks[projectId] || []
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.status === 'completed').length
    const inProgressTasks = tasks.filter(task => task.status === 'in_progress').length
    const pendingTasks = tasks.filter(task => task.status === 'pending').length

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    }
  }

  const value = {
    projects,
    activeProjects,
    projectTasks,
    projectFiles,
    projectTeams,
    projectMessages,
    isLoading,
    createTask,
    updateTask,
    deleteTask,
    updateProjectProgress,
    updateMilestone,
    uploadFile,
    deleteFile,
    addTeamMember,
    removeTeamMember,
    getProjectById,
    getProjectTasks,
    getProjectFiles,
    getTasksByStatus,
    getTasksByMilestone,
    calculateProjectStats,
    loadProjectsData
  }

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  )
}