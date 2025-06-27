import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { useConnections } from './ConnectionsContext'
import { useJobs } from './JobsContext'
import { useProjects } from './ProjectsContext'

const SearchContext = createContext({})

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

export const SearchProvider = ({ children }) => {
  const { user } = useAuth()
  const { connections, discoveredUsers } = useConnections()
  const { jobs, projects } = useJobs()
  const { activeProjects } = useProjects()
  
  const [searchHistory, setSearchHistory] = useState([])
  const [recommendations, setRecommendations] = useState({
    people: [],
    jobs: [],
    projects: [],
    skills: []
  })
  const [trending, setTrending] = useState({
    skills: [],
    companies: [],
    roles: []
  })
  const [searchFilters, setSearchFilters] = useState({
    type: 'all', // 'people', 'jobs', 'projects', 'all'
    location: '',
    skills: [],
    experience: 'all',
    dateRange: 'all'
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      loadRecommendations()
      loadTrendingData()
    }
  }, [user, connections, jobs, projects])

  const loadRecommendations = async () => {
    try {
      // Generate skill-based recommendations
      const userSkills = user?.skills || []
      
      // Recommend people based on skill overlap and industry
      const peopleRecommendations = discoveredUsers
        .map(person => ({
          ...person,
          matchScore: calculateSkillMatch(userSkills, person.skills || []),
          reason: getRecommendationReason(person, userSkills)
        }))
        .filter(person => person.matchScore > 30)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 10)

      // Recommend jobs based on skills and experience
      const jobRecommendations = jobs
        .map(job => ({
          ...job,
          matchScore: calculateJobMatch(user, job),
          reason: getJobRecommendationReason(job, userSkills)
        }))
        .filter(job => job.matchScore > 50)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 8)

      // Recommend projects based on skills
      const projectRecommendations = projects
        .map(project => ({
          ...project,
          matchScore: calculateProjectMatch(userSkills, project.skillsRequired || []),
          reason: getProjectRecommendationReason(project, userSkills)
        }))
        .filter(project => project.matchScore > 40)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 6)

      // Recommend skills to learn
      const skillRecommendations = generateSkillRecommendations(userSkills, jobs, connections)

      setRecommendations({
        people: peopleRecommendations,
        jobs: jobRecommendations,
        projects: projectRecommendations,
        skills: skillRecommendations
      })
    } catch (error) {
      console.error('Error loading recommendations:', error)
    }
  }

  const loadTrendingData = async () => {
    try {
      // Mock trending data - in real app, this would come from analytics
      const trendingSkills = [
        { name: 'React', growth: 25, demand: 'high' },
        { name: 'TypeScript', growth: 30, demand: 'high' },
        { name: 'Python', growth: 20, demand: 'high' },
        { name: 'Machine Learning', growth: 45, demand: 'very_high' },
        { name: 'AWS', growth: 35, demand: 'high' },
        { name: 'Node.js', growth: 15, demand: 'medium' },
        { name: 'Docker', growth: 28, demand: 'high' },
        { name: 'GraphQL', growth: 40, demand: 'medium' }
      ]

      const trendingCompanies = [
        { name: 'TechCorp Solutions', openings: 45, growth: 'hiring' },
        { name: 'AI Innovations Inc', openings: 23, growth: 'expanding' },
        { name: 'Design Studio Pro', openings: 12, growth: 'stable' },
        { name: 'CloudTech Systems', openings: 34, growth: 'hiring' },
        { name: 'StartupXYZ', openings: 8, growth: 'growing' }
      ]

      const trendingRoles = [
        { title: 'Frontend Developer', demand: 'high', averageSalary: 95000 },
        { title: 'Data Scientist', demand: 'very_high', averageSalary: 125000 },
        { title: 'UX Designer', demand: 'high', averageSalary: 85000 },
        { title: 'DevOps Engineer', demand: 'high', averageSalary: 110000 },
        { title: 'Product Manager', demand: 'medium', averageSalary: 130000 }
      ]

      setTrending({
        skills: trendingSkills,
        companies: trendingCompanies,
        roles: trendingRoles
      })
    } catch (error) {
      console.error('Error loading trending data:', error)
    }
  }

  const calculateSkillMatch = (userSkills, targetSkills) => {
    if (!userSkills.length || !targetSkills.length) return 0
    
    const intersection = userSkills.filter(skill => 
      targetSkills.some(target => 
        target.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(target.toLowerCase())
      )
    )
    
    const union = [...new Set([...userSkills, ...targetSkills])]
    return Math.round((intersection.length / union.length) * 100)
  }

  const calculateJobMatch = (user, job) => {
    let score = 0
    
    // Skill match (40% weight)
    const skillMatch = calculateSkillMatch(user.skills || [], job.skills || [])
    score += skillMatch * 0.4
    
    // Experience level match (20% weight)
    const userLevel = user.experienceLevel || 'mid'
    const jobLevel = job.experienceLevel || 'mid'
    const levelMatch = userLevel === jobLevel ? 100 : 
                     Math.abs(['entry', 'mid', 'senior', 'executive'].indexOf(userLevel) - 
                             ['entry', 'mid', 'senior', 'executive'].indexOf(jobLevel)) <= 1 ? 70 : 30
    score += levelMatch * 0.2
    
    // Location preference (15% weight)
    const locationMatch = job.isRemote || (user.location && job.location?.includes(user.location)) ? 100 : 50
    score += locationMatch * 0.15
    
    // Industry/title relevance (25% weight)
    const titleMatch = user.title && job.title.toLowerCase().includes(user.title.toLowerCase()) ? 100 : 
                      user.title && job.description?.toLowerCase().includes(user.title.toLowerCase()) ? 70 : 50
    score += titleMatch * 0.25
    
    return Math.round(score)
  }

  const calculateProjectMatch = (userSkills, projectSkills) => {
    return calculateSkillMatch(userSkills, projectSkills)
  }

  const getRecommendationReason = (person, userSkills) => {
    const commonSkills = person.skills?.filter(skill => 
      userSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    ) || []
    
    if (commonSkills.length > 2) {
      return `Shares ${commonSkills.length} skills with you: ${commonSkills.slice(0, 2).join(', ')}`
    } else if (person.company) {
      return `Works at ${person.company} in similar field`
    } else {
      return `Similar professional background`
    }
  }

  const getJobRecommendationReason = (job, userSkills) => {
    const matchingSkills = job.skills?.filter(skill => 
      userSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    ) || []
    
    if (matchingSkills.length > 0) {
      return `Matches your skills: ${matchingSkills.slice(0, 2).join(', ')}`
    } else {
      return `Good career progression opportunity`
    }
  }

  const getProjectRecommendationReason = (project, userSkills) => {
    const matchingSkills = project.skillsRequired?.filter(skill => 
      userSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    ) || []
    
    if (matchingSkills.length > 0) {
      return `Requires your expertise in ${matchingSkills.slice(0, 2).join(', ')}`
    } else {
      return `Interesting project in your field`
    }
  }

  const generateSkillRecommendations = (userSkills, availableJobs, userConnections) => {
    // Analyze job requirements to find trending skills
    const jobSkills = availableJobs.flatMap(job => job.skills || [])
    const skillFrequency = {}
    
    jobSkills.forEach(skill => {
      skillFrequency[skill] = (skillFrequency[skill] || 0) + 1
    })
    
    // Find skills that are in demand but user doesn't have
    const recommendedSkills = Object.entries(skillFrequency)
      .filter(([skill]) => !userSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase())
      ))
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
      .map(([skill, frequency]) => ({
        name: skill,
        demand: frequency > 10 ? 'high' : frequency > 5 ? 'medium' : 'low',
        reason: `Required in ${frequency} job postings`,
        category: categorizeSkill(skill)
      }))
    
    return recommendedSkills
  }

  const categorizeSkill = (skill) => {
    const skillLower = skill.toLowerCase()
    if (['react', 'vue', 'angular', 'javascript', 'typescript', 'html', 'css'].includes(skillLower)) {
      return 'Frontend'
    } else if (['node.js', 'python', 'java', 'api', 'database', 'sql'].includes(skillLower)) {
      return 'Backend'
    } else if (['figma', 'adobe', 'ui/ux', 'design', 'prototype'].includes(skillLower)) {
      return 'Design'
    } else if (['aws', 'docker', 'kubernetes', 'devops', 'ci/cd'].includes(skillLower)) {
      return 'DevOps'
    } else if (['machine learning', 'ai', 'data science', 'python', 'tensorflow'].includes(skillLower)) {
      return 'Data Science'
    } else {
      return 'General'
    }
  }

  const performAdvancedSearch = async (query, filters = {}) => {
    setIsLoading(true)
    try {
      const combinedFilters = { ...searchFilters, ...filters }
      const results = {
        people: [],
        jobs: [],
        projects: [],
        total: 0
      }

      // Search people
      if (combinedFilters.type === 'all' || combinedFilters.type === 'people') {
        const peopleResults = discoveredUsers.filter(person => {
          const matchesQuery = !query || 
            person.firstName?.toLowerCase().includes(query.toLowerCase()) ||
            person.lastName?.toLowerCase().includes(query.toLowerCase()) ||
            person.title?.toLowerCase().includes(query.toLowerCase()) ||
            person.company?.toLowerCase().includes(query.toLowerCase()) ||
            person.skills?.some(skill => skill.toLowerCase().includes(query.toLowerCase()))

          const matchesLocation = !combinedFilters.location || 
            person.location?.toLowerCase().includes(combinedFilters.location.toLowerCase())

          const matchesSkills = !combinedFilters.skills?.length ||
            combinedFilters.skills.some(skill => 
              person.skills?.some(personSkill => 
                personSkill.toLowerCase().includes(skill.toLowerCase())
              )
            )

          return matchesQuery && matchesLocation && matchesSkills
        })

        results.people = peopleResults.slice(0, 20)
      }

      // Search jobs
      if (combinedFilters.type === 'all' || combinedFilters.type === 'jobs') {
        const jobResults = jobs.filter(job => {
          const matchesQuery = !query || 
            job.title?.toLowerCase().includes(query.toLowerCase()) ||
            job.company?.toLowerCase().includes(query.toLowerCase()) ||
            job.description?.toLowerCase().includes(query.toLowerCase()) ||
            job.skills?.some(skill => skill.toLowerCase().includes(query.toLowerCase()))

          const matchesLocation = !combinedFilters.location || 
            job.location?.toLowerCase().includes(combinedFilters.location.toLowerCase()) ||
            job.isRemote

          const matchesExperience = combinedFilters.experience === 'all' || 
            job.experienceLevel === combinedFilters.experience

          const matchesSkills = !combinedFilters.skills?.length ||
            combinedFilters.skills.some(skill => 
              job.skills?.some(jobSkill => 
                jobSkill.toLowerCase().includes(skill.toLowerCase())
              )
            )

          return matchesQuery && matchesLocation && matchesExperience && matchesSkills
        })

        results.jobs = jobResults.slice(0, 20)
      }

      // Search projects
      if (combinedFilters.type === 'all' || combinedFilters.type === 'projects') {
        const projectResults = projects.filter(project => {
          const matchesQuery = !query || 
            project.title?.toLowerCase().includes(query.toLowerCase()) ||
            project.description?.toLowerCase().includes(query.toLowerCase()) ||
            project.skillsRequired?.some(skill => skill.toLowerCase().includes(query.toLowerCase()))

          const matchesSkills = !combinedFilters.skills?.length ||
            combinedFilters.skills.some(skill => 
              project.skillsRequired?.some(projectSkill => 
                projectSkill.toLowerCase().includes(skill.toLowerCase())
              )
            )

          return matchesQuery && matchesSkills
        })

        results.projects = projectResults.slice(0, 20)
      }

      results.total = results.people.length + results.jobs.length + results.projects.length

      // Add to search history
      if (query.trim()) {
        addToSearchHistory(query, combinedFilters)
      }

      return results
    } catch (error) {
      console.error('Search failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const addToSearchHistory = (query, filters) => {
    const searchEntry = {
      id: Date.now(),
      query,
      filters,
      timestamp: new Date().toISOString()
    }

    setSearchHistory(prev => {
      const updated = [searchEntry, ...prev.filter(item => item.query !== query)]
      return updated.slice(0, 10) // Keep only last 10 searches
    })
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
  }

  const getPopularSearches = () => {
    return [
      'React Developer',
      'UX Designer',
      'Machine Learning',
      'Remote Jobs',
      'Frontend Projects',
      'Data Science',
      'JavaScript',
      'Python Developer'
    ]
  }

  const getSuggestedFilters = (query) => {
    const suggestions = {
      skills: [],
      locations: [],
      companies: []
    }

    // Extract potential skills from all data
    const allSkills = new Set()
    jobs.forEach(job => job.skills?.forEach(skill => allSkills.add(skill)))
    discoveredUsers.forEach(person => person.skills?.forEach(skill => allSkills.add(skill)))
    
    suggestions.skills = Array.from(allSkills)
      .filter(skill => skill.toLowerCase().includes(query?.toLowerCase() || ''))
      .slice(0, 10)

    // Extract locations
    const allLocations = new Set()
    jobs.forEach(job => job.location && allLocations.add(job.location))
    discoveredUsers.forEach(person => person.location && allLocations.add(person.location))
    
    suggestions.locations = Array.from(allLocations).slice(0, 8)

    // Extract companies
    const allCompanies = new Set()
    jobs.forEach(job => job.company && allCompanies.add(job.company))
    discoveredUsers.forEach(person => person.company && allCompanies.add(person.company))
    
    suggestions.companies = Array.from(allCompanies).slice(0, 8)

    return suggestions
  }

  const value = {
    searchHistory,
    recommendations,
    trending,
    searchFilters,
    setSearchFilters,
    isLoading,
    performAdvancedSearch,
    addToSearchHistory,
    clearSearchHistory,
    getPopularSearches,
    getSuggestedFilters,
    loadRecommendations,
    loadTrendingData
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}