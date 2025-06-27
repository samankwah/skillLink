import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const ProfileContext = createContext({})

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}

export const ProfileProvider = ({ children }) => {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState([])
  const [education, setEducation] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Load profile data when user changes
  useEffect(() => {
    if (user) {
      loadProfileData()
    }
  }, [user])

  const loadProfileData = async () => {
    setIsLoading(true)
    try {
      // Mock profile data - replace with actual API calls
      const mockProfile = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        title: user.title || 'Full Stack Developer',
        bio: 'Passionate developer with 5+ years of experience building scalable web applications. I love working with React, Node.js, and modern web technologies.',
        avatar: user.avatar || null,
        location: 'New York, NY',
        email: user.email,
        phone: '+1 (555) 123-4567',
        website: 'https://johndoe.dev',
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        joinDate: '2024-01-01',
        profileViews: 142,
        connectionCount: 23
      }

      const mockSkills = [
        {
          id: 'skill_1',
          name: 'JavaScript',
          level: 'Expert',
          endorsements: 15,
          yearsOfExperience: 5,
          category: 'Programming'
        },
        {
          id: 'skill_2',
          name: 'React',
          level: 'Expert',
          endorsements: 12,
          yearsOfExperience: 4,
          category: 'Programming'
        },
        {
          id: 'skill_3',
          name: 'Node.js',
          level: 'Advanced',
          endorsements: 8,
          yearsOfExperience: 3,
          category: 'Programming'
        },
        {
          id: 'skill_4',
          name: 'TypeScript',
          level: 'Advanced',
          endorsements: 6,
          yearsOfExperience: 2,
          category: 'Programming'
        },
        {
          id: 'skill_5',
          name: 'UI/UX Design',
          level: 'Intermediate',
          endorsements: 4,
          yearsOfExperience: 2,
          category: 'Design'
        }
      ]

      const mockExperience = [
        {
          id: 'exp_1',
          company: 'Tech Innovations Inc.',
          position: 'Senior Full Stack Developer',
          startDate: '2022-01-01',
          endDate: null,
          description: 'Led development of microservices architecture serving 1M+ users. Built React applications with Node.js backends. Mentored junior developers and established coding standards.',
          skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
          location: 'New York, NY'
        },
        {
          id: 'exp_2',
          company: 'Digital Solutions Corp',
          position: 'Full Stack Developer',
          startDate: '2020-03-01',
          endDate: '2021-12-31',
          description: 'Developed e-commerce platforms and CRM systems. Collaborated with design team to implement responsive user interfaces. Optimized database queries improving performance by 40%.',
          skills: ['JavaScript', 'React', 'PHP', 'MySQL'],
          location: 'New York, NY'
        },
        {
          id: 'exp_3',
          company: 'StartupXYZ',
          position: 'Frontend Developer',
          startDate: '2019-06-01',
          endDate: '2020-02-28',
          description: 'Built responsive web applications from scratch. Worked closely with founders to define product requirements and user experience.',
          skills: ['JavaScript', 'Vue.js', 'CSS', 'HTML'],
          location: 'Remote'
        }
      ]

      const mockEducation = [
        {
          id: 'edu_1',
          institution: 'University of Technology',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2015-09-01',
          endDate: '2019-05-31',
          description: 'Focused on software engineering, algorithms, and data structures. Graduated Magna Cum Laude.',
          location: 'New York, NY'
        }
      ]

      setProfile(mockProfile)
      setSkills(mockSkills)
      setExperience(mockExperience)
      setEducation(mockEducation)
    } catch (error) {
      console.error('Error loading profile data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = async (profileData) => {
    setIsLoading(true)
    try {
      // Mock API call
      const updatedProfile = { ...profile, ...profileData }
      setProfile(updatedProfile)
      return updatedProfile
    } catch (error) {
      throw new Error('Profile update failed')
    } finally {
      setIsLoading(false)
    }
  }

  const addSkill = async (skillData) => {
    setIsLoading(true)
    try {
      const newSkill = {
        id: 'skill_' + Date.now(),
        ...skillData,
        endorsements: 0
      }
      setSkills(prev => [...prev, newSkill])
      return newSkill
    } catch (error) {
      throw new Error('Failed to add skill')
    } finally {
      setIsLoading(false)
    }
  }

  const updateSkill = async (skillId, skillData) => {
    setIsLoading(true)
    try {
      setSkills(prev => prev.map(skill => 
        skill.id === skillId ? { ...skill, ...skillData } : skill
      ))
    } catch (error) {
      throw new Error('Failed to update skill')
    } finally {
      setIsLoading(false)
    }
  }

  const removeSkill = async (skillId) => {
    setIsLoading(true)
    try {
      setSkills(prev => prev.filter(skill => skill.id !== skillId))
    } catch (error) {
      throw new Error('Failed to remove skill')
    } finally {
      setIsLoading(false)
    }
  }

  const addExperience = async (experienceData) => {
    setIsLoading(true)
    try {
      const newExperience = {
        id: 'exp_' + Date.now(),
        ...experienceData
      }
      setExperience(prev => [newExperience, ...prev])
      return newExperience
    } catch (error) {
      throw new Error('Failed to add experience')
    } finally {
      setIsLoading(false)
    }
  }

  const updateExperience = async (experienceId, experienceData) => {
    setIsLoading(true)
    try {
      setExperience(prev => prev.map(exp => 
        exp.id === experienceId ? { ...exp, ...experienceData } : exp
      ))
    } catch (error) {
      throw new Error('Failed to update experience')
    } finally {
      setIsLoading(false)
    }
  }

  const removeExperience = async (experienceId) => {
    setIsLoading(true)
    try {
      setExperience(prev => prev.filter(exp => exp.id !== experienceId))
    } catch (error) {
      throw new Error('Failed to remove experience')
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    profile,
    skills,
    experience,
    education,
    isLoading,
    isEditing,
    setIsEditing,
    updateProfile,
    addSkill,
    updateSkill,
    removeSkill,
    addExperience,
    updateExperience,
    removeExperience,
    loadProfileData
  }

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
}