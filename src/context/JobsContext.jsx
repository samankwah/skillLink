import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const JobsContext = createContext({})

export const useJobs = () => {
  const context = useContext(JobsContext)
  if (!context) {
    throw new Error('useJobs must be used within a JobsProvider')
  }
  return context
}

export const JobsProvider = ({ children }) => {
  const { user } = useAuth()
  const [jobs, setJobs] = useState([])
  const [projects, setProjects] = useState([])
  const [applications, setApplications] = useState([])
  const [savedJobs, setSavedJobs] = useState([])
  const [userPostedJobs, setUserPostedJobs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    jobType: 'all', // 'full-time', 'part-time', 'contract', 'internship'
    experienceLevel: 'all', // 'entry', 'mid', 'senior', 'executive'
    location: '',
    salaryRange: 'all',
    remote: false,
    skills: [],
    datePosted: 'all' // 'today', 'week', 'month', 'all'
  })
  const [activeTab, setActiveTab] = useState('jobs')
  const [isLoading, setIsLoading] = useState(false)

  // Load jobs data when user changes
  useEffect(() => {
    if (user) {
      loadJobsData()
    }
  }, [user])

  const loadJobsData = async () => {
    setIsLoading(true)
    try {
      // Mock jobs data
      const mockJobs = [
        {
          id: 'job_001',
          title: 'Senior React Developer',
          company: 'TechCorp Solutions',
          companyLogo: null,
          location: 'San Francisco, CA',
          type: 'full-time',
          experienceLevel: 'senior',
          salary: {
            min: 120000,
            max: 180000,
            currency: 'USD',
            period: 'year'
          },
          isRemote: true,
          skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
          description: 'We are looking for a Senior React Developer to join our dynamic team. You will be responsible for developing user interface components and implementing them following well-known React.js workflows.',
          requirements: [
            '5+ years of experience with React.js',
            'Strong proficiency in JavaScript and TypeScript',
            'Experience with modern front-end build pipelines and tools',
            'Familiarity with RESTful APIs and GraphQL',
            'Experience with version control systems like Git'
          ],
          responsibilities: [
            'Develop new user-facing features using React.js',
            'Build reusable components and front-end libraries',
            'Translate designs and wireframes into high-quality code',
            'Optimize components for maximum performance',
            'Collaborate with team members and stakeholders'
          ],
          benefits: [
            'Competitive salary and equity',
            'Health, dental, and vision insurance',
            'Flexible working hours',
            'Remote work opportunities',
            'Professional development budget'
          ],
          postedBy: 'usr_hr_001',
          postedDate: '2024-01-15T09:00:00Z',
          applicationDeadline: '2024-02-15T23:59:59Z',
          applicationsCount: 24,
          isActive: true,
          matchScore: 92
        },
        {
          id: 'job_002',
          title: 'UX/UI Designer',
          company: 'Design Studio Pro',
          companyLogo: null,
          location: 'New York, NY',
          type: 'full-time',
          experienceLevel: 'mid',
          salary: {
            min: 80000,
            max: 120000,
            currency: 'USD',
            period: 'year'
          },
          isRemote: false,
          skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
          description: 'Join our creative team as a UX/UI Designer and help shape the future of digital experiences. You will work on diverse projects ranging from web applications to mobile apps.',
          requirements: [
            '3+ years of UX/UI design experience',
            'Proficiency in Figma and Adobe Creative Suite',
            'Strong understanding of user-centered design principles',
            'Experience with design systems and component libraries',
            'Portfolio demonstrating design process and thinking'
          ],
          responsibilities: [
            'Create wireframes, prototypes, and high-fidelity designs',
            'Conduct user research and usability testing',
            'Collaborate with developers and product managers',
            'Maintain and evolve design systems',
            'Present design concepts to stakeholders'
          ],
          benefits: [
            'Creative freedom and autonomy',
            'Modern design tools and equipment',
            'Conference and workshop attendance',
            'Mentorship opportunities',
            'Collaborative work environment'
          ],
          postedBy: 'usr_hr_002',
          postedDate: '2024-01-14T14:30:00Z',
          applicationDeadline: '2024-02-14T23:59:59Z',
          applicationsCount: 18,
          isActive: true,
          matchScore: 85
        },
        {
          id: 'job_003',
          title: 'Data Scientist - Machine Learning',
          company: 'AI Innovations Inc',
          companyLogo: null,
          location: 'Austin, TX',
          type: 'full-time',
          experienceLevel: 'mid',
          salary: {
            min: 100000,
            max: 150000,
            currency: 'USD',
            period: 'year'
          },
          isRemote: true,
          skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Statistics'],
          description: 'We are seeking a talented Data Scientist to join our ML team. You will work on cutting-edge AI projects and help build intelligent systems that make a real impact.',
          requirements: [
            'Master\'s degree in Data Science, Statistics, or related field',
            '3+ years of experience in machine learning',
            'Proficiency in Python and SQL',
            'Experience with ML frameworks like TensorFlow or PyTorch',
            'Strong statistical analysis skills'
          ],
          responsibilities: [
            'Develop and deploy machine learning models',
            'Analyze large datasets to extract insights',
            'Collaborate with engineering teams on ML infrastructure',
            'Present findings to technical and non-technical stakeholders',
            'Stay current with latest ML research and techniques'
          ],
          benefits: [
            'Cutting-edge technology stack',
            'Research and publication opportunities',
            'Flexible work arrangements',
            'Stock options',
            'Learning and development budget'
          ],
          postedBy: 'usr_hr_003',
          postedDate: '2024-01-13T11:15:00Z',
          applicationDeadline: '2024-02-13T23:59:59Z',
          applicationsCount: 31,
          isActive: true,
          matchScore: 78
        },
        {
          id: 'job_004',
          title: 'DevOps Engineer',
          company: 'CloudTech Systems',
          companyLogo: null,
          location: 'Seattle, WA',
          type: 'contract',
          experienceLevel: 'senior',
          salary: {
            min: 85,
            max: 120,
            currency: 'USD',
            period: 'hour'
          },
          isRemote: true,
          skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
          description: 'Contract position for an experienced DevOps Engineer to help modernize our cloud infrastructure and implement best practices for deployment and monitoring.',
          requirements: [
            '5+ years of DevOps/SRE experience',
            'Expert-level AWS knowledge',
            'Experience with containerization and orchestration',
            'Infrastructure as Code experience',
            'Strong scripting skills (Python, Bash)'
          ],
          responsibilities: [
            'Design and implement cloud infrastructure',
            'Set up CI/CD pipelines',
            'Monitor and optimize system performance',
            'Implement security best practices',
            'Mentor junior team members'
          ],
          benefits: [
            'Competitive hourly rate',
            'Flexible schedule',
            'Remote work',
            'Opportunity for extension',
            'Latest tools and technologies'
          ],
          postedBy: 'usr_hr_004',
          postedDate: '2024-01-12T16:20:00Z',
          applicationDeadline: '2024-02-01T23:59:59Z',
          applicationsCount: 15,
          isActive: true,
          matchScore: 88
        },
        {
          id: 'job_005',
          title: 'Frontend Developer Intern',
          company: 'StartupXYZ',
          companyLogo: null,
          location: 'Remote',
          type: 'internship',
          experienceLevel: 'entry',
          salary: {
            min: 20,
            max: 25,
            currency: 'USD',
            period: 'hour'
          },
          isRemote: true,
          skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
          description: 'Great opportunity for a student or recent graduate to gain hands-on experience in frontend development at a fast-growing startup.',
          requirements: [
            'Currently pursuing or recently completed degree in CS or related field',
            'Basic knowledge of HTML, CSS, JavaScript',
            'Familiarity with React framework',
            'Understanding of version control (Git)',
            'Strong willingness to learn'
          ],
          responsibilities: [
            'Assist in building user interfaces',
            'Write clean, maintainable code',
            'Participate in code reviews',
            'Learn from senior developers',
            'Contribute to team projects'
          ],
          benefits: [
            'Mentorship from experienced developers',
            'Real project experience',
            'Flexible hours',
            'Potential for full-time offer',
            'Learning stipend'
          ],
          postedBy: 'usr_hr_005',
          postedDate: '2024-01-11T10:45:00Z',
          applicationDeadline: '2024-01-25T23:59:59Z',
          applicationsCount: 42,
          isActive: true,
          matchScore: 75
        }
      ]

      // Mock projects data
      const mockProjects = [
        {
          id: 'proj_001',
          title: 'E-commerce Platform Redesign',
          description: 'Looking for a UI/UX designer to redesign our e-commerce platform. The project involves creating a modern, user-friendly interface that improves conversion rates.',
          type: 'design',
          budget: {
            min: 5000,
            max: 8000,
            currency: 'USD'
          },
          duration: '6-8 weeks',
          skillsRequired: ['UI/UX Design', 'Figma', 'E-commerce', 'User Research'],
          experienceLevel: 'mid',
          isRemote: true,
          postedBy: {
            id: 'usr_client_001',
            name: 'Sarah Chen',
            company: 'RetailTech Co',
            avatar: null
          },
          postedDate: '2024-01-14T12:00:00Z',
          deadline: '2024-02-28T23:59:59Z',
          proposalsCount: 12,
          status: 'open',
          matchScore: 89
        },
        {
          id: 'proj_002',
          title: 'Mobile App Development',
          description: 'Need a React Native developer to build a cross-platform mobile app for fitness tracking. The app should include workout logging, progress tracking, and social features.',
          type: 'development',
          budget: {
            min: 12000,
            max: 18000,
            currency: 'USD'
          },
          duration: '3-4 months',
          skillsRequired: ['React Native', 'Mobile Development', 'Firebase', 'REST APIs'],
          experienceLevel: 'senior',
          isRemote: true,
          postedBy: {
            id: 'usr_client_002',
            name: 'Mike Johnson',
            company: 'FitLife Startup',
            avatar: null
          },
          postedDate: '2024-01-13T15:30:00Z',
          deadline: '2024-02-20T23:59:59Z',
          proposalsCount: 8,
          status: 'open',
          matchScore: 82
        },
        {
          id: 'proj_003',
          title: 'Data Analysis Dashboard',
          description: 'Create an interactive dashboard for visualizing sales data. The project requires building charts, graphs, and analytics features using modern data visualization tools.',
          type: 'data',
          budget: {
            min: 3000,
            max: 5000,
            currency: 'USD'
          },
          duration: '4-6 weeks',
          skillsRequired: ['Python', 'Data Visualization', 'Tableau', 'SQL'],
          experienceLevel: 'mid',
          isRemote: true,
          postedBy: {
            id: 'usr_client_003',
            name: 'Emma Rodriguez',
            company: 'Analytics Pro',
            avatar: null
          },
          postedDate: '2024-01-12T09:15:00Z',
          deadline: '2024-02-15T23:59:59Z',
          proposalsCount: 15,
          status: 'open',
          matchScore: 76
        }
      ]

      // Mock user applications
      const mockApplications = [
        {
          id: 'app_001',
          jobId: 'job_002',
          applicantId: user.id,
          status: 'pending', // 'pending', 'reviewing', 'interviewed', 'accepted', 'rejected'
          appliedDate: '2024-01-14T16:30:00Z',
          coverLetter: 'I am excited to apply for the UX/UI Designer position. With my background in user-centered design and passion for creating intuitive experiences...',
          resume: 'resume_001.pdf',
          customAnswers: {
            'portfolio_url': 'https://myportfolio.com',
            'availability': 'Available to start in 2 weeks'
          }
        },
        {
          id: 'app_002',
          jobId: 'job_003',
          applicantId: user.id,
          status: 'interviewed',
          appliedDate: '2024-01-13T14:20:00Z',
          coverLetter: 'As a data scientist with experience in machine learning, I am thrilled about the opportunity to contribute to your AI initiatives...',
          resume: 'resume_001.pdf',
          customAnswers: {
            'github_profile': 'https://github.com/myprofile',
            'ml_experience': '3 years working with TensorFlow and PyTorch'
          }
        }
      ]

      // Mock saved jobs
      const mockSavedJobs = ['job_001', 'job_004']

      setJobs(mockJobs)
      setProjects(mockProjects)
      setApplications(mockApplications)
      setSavedJobs(mockSavedJobs)
    } catch (error) {
      console.error('Error loading jobs data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const searchJobs = async (query, searchFilters = {}) => {
    setIsLoading(true)
    try {
      let filtered = jobs.filter(job => {
        const matchesQuery = !query || 
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase()) ||
          job.description.toLowerCase().includes(query.toLowerCase()) ||
          job.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))

        const matchesType = searchFilters.jobType === 'all' || job.type === searchFilters.jobType
        const matchesLevel = searchFilters.experienceLevel === 'all' || job.experienceLevel === searchFilters.experienceLevel
        const matchesLocation = !searchFilters.location || 
          job.location.toLowerCase().includes(searchFilters.location.toLowerCase()) ||
          (searchFilters.remote && job.isRemote)
        const matchesSkills = !searchFilters.skills?.length ||
          searchFilters.skills.some(skill => 
            job.skills.some(jobSkill => jobSkill.toLowerCase().includes(skill.toLowerCase()))
          )

        return matchesQuery && matchesType && matchesLevel && matchesLocation && matchesSkills
      })

      // Sort by match score and date
      filtered.sort((a, b) => {
        if (query) {
          return b.matchScore - a.matchScore
        }
        return new Date(b.postedDate) - new Date(a.postedDate)
      })

      return filtered
    } catch (error) {
      throw new Error('Job search failed')
    } finally {
      setIsLoading(false)
    }
  }

  const searchProjects = async (query, searchFilters = {}) => {
    setIsLoading(true)
    try {
      let filtered = projects.filter(project => {
        const matchesQuery = !query || 
          project.title.toLowerCase().includes(query.toLowerCase()) ||
          project.description.toLowerCase().includes(query.toLowerCase()) ||
          project.skillsRequired.some(skill => skill.toLowerCase().includes(query.toLowerCase()))

        const matchesType = !searchFilters.type || project.type === searchFilters.type
        const matchesLevel = searchFilters.experienceLevel === 'all' || project.experienceLevel === searchFilters.experienceLevel

        return matchesQuery && matchesType && matchesLevel
      })

      filtered.sort((a, b) => {
        if (query) {
          return b.matchScore - a.matchScore
        }
        return new Date(b.postedDate) - new Date(a.postedDate)
      })

      return filtered
    } catch (error) {
      throw new Error('Project search failed')
    } finally {
      setIsLoading(false)
    }
  }

  const applyToJob = async (jobId, applicationData) => {
    setIsLoading(true)
    try {
      const newApplication = {
        id: 'app_' + Date.now(),
        jobId,
        applicantId: user.id,
        status: 'pending',
        appliedDate: new Date().toISOString(),
        ...applicationData
      }

      setApplications(prev => [...prev, newApplication])

      // Update job applications count
      setJobs(prev => prev.map(job => 
        job.id === jobId 
          ? { ...job, applicationsCount: job.applicationsCount + 1 }
          : job
      ))

      return newApplication
    } catch (error) {
      throw new Error('Failed to apply to job')
    } finally {
      setIsLoading(false)
    }
  }

  const saveJob = async (jobId) => {
    setSavedJobs(prev => [...prev, jobId])
  }

  const unsaveJob = async (jobId) => {
    setSavedJobs(prev => prev.filter(id => id !== jobId))
  }

  const submitProposal = async (projectId, proposalData) => {
    setIsLoading(true)
    try {
      // Update project proposals count
      setProjects(prev => prev.map(project => 
        project.id === projectId 
          ? { ...project, proposalsCount: project.proposalsCount + 1 }
          : project
      ))

      return { success: true }
    } catch (error) {
      throw new Error('Failed to submit proposal')
    } finally {
      setIsLoading(false)
    }
  }

  const getRecommendedJobs = () => {
    // Return jobs sorted by match score
    return jobs.sort((a, b) => b.matchScore - a.matchScore).slice(0, 10)
  }

  const getApplicationStatus = (jobId) => {
    const application = applications.find(app => app.jobId === jobId)
    return application?.status || null
  }

  const isJobSaved = (jobId) => {
    return savedJobs.includes(jobId)
  }

  const value = {
    jobs,
    projects,
    applications,
    savedJobs,
    userPostedJobs,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    activeTab,
    setActiveTab,
    isLoading,
    searchJobs,
    searchProjects,
    applyToJob,
    saveJob,
    unsaveJob,
    submitProposal,
    getRecommendedJobs,
    getApplicationStatus,
    isJobSaved,
    loadJobsData
  }

  return (
    <JobsContext.Provider value={value}>
      {children}
    </JobsContext.Provider>
  )
}