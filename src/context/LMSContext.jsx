import { createContext, useContext, useReducer, useEffect } from 'react'
import { useAuth } from './AuthContext'

const LMSContext = createContext()

const initialState = {
  courses: [],
  enrolledCourses: [],
  completedCourses: [],
  certificates: [],
  currentCourse: null,
  courseProgress: {},
  reviews: [],
  isLoading: false,
  error: null
}

const lmsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    case 'SET_COURSES':
      return { ...state, courses: action.payload, isLoading: false }
    case 'SET_ENROLLED_COURSES':
      return { ...state, enrolledCourses: action.payload }
    case 'SET_COMPLETED_COURSES':
      return { ...state, completedCourses: action.payload }
    case 'SET_CERTIFICATES':
      return { ...state, certificates: action.payload }
    case 'SET_CURRENT_COURSE':
      return { ...state, currentCourse: action.payload }
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        courseProgress: {
          ...state.courseProgress,
          [action.payload.courseId]: action.payload.progress
        }
      }
    case 'ADD_REVIEW':
      return {
        ...state,
        reviews: [...state.reviews, action.payload]
      }
    case 'ENROLL_COURSE':
      return {
        ...state,
        enrolledCourses: [...state.enrolledCourses, action.payload]
      }
    case 'COMPLETE_COURSE':
      return {
        ...state,
        completedCourses: [...state.completedCourses, action.payload],
        certificates: [...state.certificates, action.payload.certificate]
      }
    default:
      return state
  }
}

export const LMSProvider = ({ children }) => {
  const [state, dispatch] = useReducer(lmsReducer, initialState)
  const { user } = useAuth()

  // Mock data for demonstration
  useEffect(() => {
    if (user) {
      loadMockData()
    }
  }, [user])

  const loadMockData = () => {
    const mockCourses = [
      {
        id: 1,
        title: 'JavaScript Fundamentals',
        description: 'Learn the basics of JavaScript programming language',
        instructor: 'John Smith',
        duration: '4 hours',
        level: 'Beginner',
        rating: 4.8,
        enrolledCount: 1234,
        price: 'Free',
        thumbnail: '/api/placeholder/300/200',
        category: 'Programming',
        lessons: [
          { id: 1, title: 'Introduction to JavaScript', duration: '15 min', type: 'video', completed: false },
          { id: 2, title: 'Variables and Data Types', duration: '20 min', type: 'video', completed: false },
          { id: 3, title: 'Functions and Scope', duration: '25 min', type: 'video', completed: false },
          { id: 4, title: 'Practice Quiz', duration: '10 min', type: 'quiz', completed: false }
        ]
      },
      {
        id: 2,
        title: 'React Development',
        description: 'Build modern web applications with React',
        instructor: 'Sarah Johnson',
        duration: '8 hours',
        level: 'Intermediate',
        rating: 4.9,
        enrolledCount: 856,
        price: 'Free',
        thumbnail: '/api/placeholder/300/200',
        category: 'Web Development',
        lessons: [
          { id: 1, title: 'React Basics', duration: '30 min', type: 'video', completed: false },
          { id: 2, title: 'Components and Props', duration: '35 min', type: 'video', completed: false },
          { id: 3, title: 'State Management', duration: '40 min', type: 'video', completed: false },
          { id: 4, title: 'Hooks in React', duration: '45 min', type: 'video', completed: false },
          { id: 5, title: 'Final Assessment', duration: '15 min', type: 'quiz', completed: false }
        ]
      },
      {
        id: 3,
        title: 'UI/UX Design Principles',
        description: 'Master the fundamentals of user interface and experience design',
        instructor: 'Mike Chen',
        duration: '6 hours',
        level: 'Beginner',
        rating: 4.7,
        enrolledCount: 2341,
        price: 'Free',
        thumbnail: '/api/placeholder/300/200',
        category: 'Design',
        lessons: [
          { id: 1, title: 'Design Thinking', duration: '25 min', type: 'video', completed: false },
          { id: 2, title: 'Color Theory', duration: '30 min', type: 'video', completed: false },
          { id: 3, title: 'Typography', duration: '20 min', type: 'video', completed: false },
          { id: 4, title: 'User Research', duration: '35 min', type: 'video', completed: false },
          { id: 5, title: 'Design Assessment', duration: '20 min', type: 'quiz', completed: false }
        ]
      },
      {
        id: 4,
        title: 'Python Programming',
        description: 'Learn Python from scratch and build real-world applications',
        instructor: 'Emily Davis',
        duration: '10 hours',
        level: 'Beginner',
        rating: 4.6,
        enrolledCount: 1856,
        price: 'Free',
        thumbnail: '/api/placeholder/300/200',
        category: 'Programming',
        lessons: [
          { id: 1, title: 'Python Basics', duration: '30 min', type: 'video', completed: false },
          { id: 2, title: 'Data Structures', duration: '45 min', type: 'video', completed: false },
          { id: 3, title: 'Control Flow', duration: '35 min', type: 'video', completed: false },
          { id: 4, title: 'Functions and Modules', duration: '40 min', type: 'video', completed: false },
          { id: 5, title: 'Python Quiz', duration: '15 min', type: 'quiz', completed: false }
        ]
      },
      {
        id: 5,
        title: 'Data Science Fundamentals',
        description: 'Introduction to data science concepts and tools',
        instructor: 'Alex Rodriguez',
        duration: '12 hours',
        level: 'Intermediate',
        rating: 4.8,
        enrolledCount: 1245,
        price: 'Free',
        thumbnail: '/api/placeholder/300/200',
        category: 'Data Science',
        lessons: [
          { id: 1, title: 'Data Science Overview', duration: '25 min', type: 'video', completed: false },
          { id: 2, title: 'Statistics Basics', duration: '50 min', type: 'video', completed: false },
          { id: 3, title: 'Data Visualization', duration: '45 min', type: 'video', completed: false },
          { id: 4, title: 'Machine Learning Intro', duration: '60 min', type: 'video', completed: false },
          { id: 5, title: 'Data Science Assessment', duration: '20 min', type: 'quiz', completed: false }
        ]
      },
      {
        id: 6,
        title: 'Digital Marketing Essentials',
        description: 'Master the fundamentals of digital marketing and online promotion',
        instructor: 'Lisa Thompson',
        duration: '7 hours',
        level: 'Beginner',
        rating: 4.5,
        enrolledCount: 1678,
        price: 'Free',
        thumbnail: '/api/placeholder/300/200',
        category: 'Marketing',
        lessons: [
          { id: 1, title: 'Marketing Strategy', duration: '30 min', type: 'video', completed: false },
          { id: 2, title: 'Social Media Marketing', duration: '40 min', type: 'video', completed: false },
          { id: 3, title: 'Content Marketing', duration: '35 min', type: 'video', completed: false },
          { id: 4, title: 'SEO Basics', duration: '45 min', type: 'video', completed: false },
          { id: 5, title: 'Marketing Quiz', duration: '15 min', type: 'quiz', completed: false }
        ]
      },
      {
        id: 7,
        title: 'Node.js Backend Development',
        description: 'Build scalable backend applications with Node.js and Express',
        instructor: 'David Wilson',
        duration: '9 hours',
        level: 'Intermediate',
        rating: 4.7,
        enrolledCount: 987,
        price: 'Free',
        thumbnail: '/api/placeholder/300/200',
        category: 'Web Development',
        lessons: [
          { id: 1, title: 'Node.js Basics', duration: '35 min', type: 'video', completed: false },
          { id: 2, title: 'Express Framework', duration: '45 min', type: 'video', completed: false },
          { id: 3, title: 'Database Integration', duration: '50 min', type: 'video', completed: false },
          { id: 4, title: 'API Development', duration: '40 min', type: 'video', completed: false },
          { id: 5, title: 'Backend Assessment', duration: '20 min', type: 'quiz', completed: false }
        ]
      },
      {
        id: 8,
        title: 'Mobile App Design',
        description: 'Design beautiful and functional mobile applications',
        instructor: 'Jennifer Lee',
        duration: '5 hours',
        level: 'Intermediate',
        rating: 4.6,
        enrolledCount: 1432,
        price: 'Free',
        thumbnail: '/api/placeholder/300/200',
        category: 'Design',
        lessons: [
          { id: 1, title: 'Mobile Design Principles', duration: '25 min', type: 'video', completed: false },
          { id: 2, title: 'User Interface Patterns', duration: '30 min', type: 'video', completed: false },
          { id: 3, title: 'Prototyping Tools', duration: '35 min', type: 'video', completed: false },
          { id: 4, title: 'Design Systems', duration: '40 min', type: 'video', completed: false },
          { id: 5, title: 'Design Portfolio', duration: '15 min', type: 'quiz', completed: false }
        ]
      }
    ]

    dispatch({ type: 'SET_COURSES', payload: mockCourses })
    dispatch({ type: 'SET_ENROLLED_COURSES', payload: [mockCourses[0]] })
  }

  const enrollInCourse = async (course) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      
      // Check if already enrolled
      const isAlreadyEnrolled = state.enrolledCourses.some(c => c.id === course.id)
      if (isAlreadyEnrolled) {
        dispatch({ type: 'SET_LOADING', payload: false })
        return { success: false, error: 'You are already enrolled in this course' }
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Initialize progress for this course
      const courseWithProgress = {
        ...course,
        enrollmentDate: new Date().toISOString(),
        progress: 0,
        lastAccessedLesson: 0
      }
      
      dispatch({ type: 'ENROLL_COURSE', payload: courseWithProgress })
      
      // Save to localStorage for persistence
      const updatedEnrolledCourses = [...state.enrolledCourses, courseWithProgress]
      localStorage.setItem('enrolledCourses', JSON.stringify(updatedEnrolledCourses))
      
      dispatch({ type: 'SET_LOADING', payload: false })
      return { success: true, message: 'Successfully enrolled in course!' }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      return { success: false, error: error.message }
    }
  }

  const updateProgress = (courseId, lessonId, isCompleted = true) => {
    const currentProgress = state.courseProgress[courseId] || {}
    const updatedProgress = { ...currentProgress, [lessonId]: isCompleted }
    
    dispatch({
      type: 'UPDATE_PROGRESS',
      payload: { courseId, progress: updatedProgress }
    })
    
    // Calculate overall course progress
    const course = state.courses.find(c => c.id === parseInt(courseId))
    if (course) {
      const completedLessons = Object.values(updatedProgress).filter(Boolean).length
      const totalLessons = course.lessons.length
      const progressPercentage = Math.round((completedLessons / totalLessons) * 100)
      
      // Update enrolled course progress
      const updatedEnrolledCourses = state.enrolledCourses.map(c => 
        c.id === parseInt(courseId) 
          ? { ...c, progress: progressPercentage, lastAccessedLesson: lessonId }
          : c
      )
      
      dispatch({ type: 'SET_ENROLLED_COURSES', payload: updatedEnrolledCourses })
      
      // Save to localStorage
      localStorage.setItem('enrolledCourses', JSON.stringify(updatedEnrolledCourses))
      localStorage.setItem('courseProgress', JSON.stringify({
        ...state.courseProgress,
        [courseId]: updatedProgress
      }))
    }
  }

  const completeCourse = async (courseId) => {
    try {
      const course = state.courses.find(c => c.id === courseId)
      if (!course) {
        throw new Error('Course not found')
      }

      // Generate unique certificate
      const timestamp = Date.now()
      const certificate = {
        id: timestamp,
        courseId,
        courseName: course.title,
        instructor: course.instructor,
        completionDate: new Date().toISOString(),
        verificationCode: `SL-${courseId}-${timestamp}`,
        verificationUrl: `https://skilllink.com/verify/SL-${courseId}-${timestamp}`,
        grade: 'Passed',
        duration: course.duration,
        level: course.level
      }
      
      dispatch({
        type: 'COMPLETE_COURSE',
        payload: { course, certificate }
      })
      
      // Save certificate to localStorage
      const existingCertificates = JSON.parse(localStorage.getItem('certificates') || '[]')
      const updatedCertificates = [...existingCertificates, certificate]
      localStorage.setItem('certificates', JSON.stringify(updatedCertificates))
      
      // Update completed courses
      const existingCompleted = JSON.parse(localStorage.getItem('completedCourses') || '[]')
      const updatedCompleted = [...existingCompleted, { ...course, completionDate: certificate.completionDate }]
      localStorage.setItem('completedCourses', JSON.stringify(updatedCompleted))
      
      return certificate
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  const addReview = async (courseId, rating, comment) => {
    try {
      if (!user) {
        throw new Error('User must be logged in to add reviews')
      }

      const review = {
        id: Date.now(),
        courseId: parseInt(courseId),
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userAvatar: user.avatar || null,
        rating: parseInt(rating),
        comment: comment.trim(),
        date: new Date().toISOString(),
        helpful: 0
      }
      
      dispatch({ type: 'ADD_REVIEW', payload: review })
      
      // Save to localStorage
      const existingReviews = JSON.parse(localStorage.getItem('courseReviews') || '[]')
      const updatedReviews = [...existingReviews, review]
      localStorage.setItem('courseReviews', JSON.stringify(updatedReviews))
      
      return { success: true, message: 'Review added successfully!' }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      return { success: false, error: error.message }
    }
  }

  const getCourseReviews = (courseId) => {
    return state.reviews.filter(review => review.courseId === parseInt(courseId))
  }

  const getCourseRating = (courseId) => {
    const courseReviews = getCourseReviews(courseId)
    if (courseReviews.length === 0) return 0
    
    const totalRating = courseReviews.reduce((sum, review) => sum + review.rating, 0)
    return (totalRating / courseReviews.length).toFixed(1)
  }

  // Load data from localStorage on mount
  useEffect(() => {
    const loadStoredData = () => {
      try {
        const storedEnrolled = localStorage.getItem('enrolledCourses')
        const storedProgress = localStorage.getItem('courseProgress')
        const storedCertificates = localStorage.getItem('certificates')
        const storedReviews = localStorage.getItem('courseReviews')
        const storedCompleted = localStorage.getItem('completedCourses')

        if (storedEnrolled) {
          dispatch({ type: 'SET_ENROLLED_COURSES', payload: JSON.parse(storedEnrolled) })
        }
        if (storedProgress) {
          const progress = JSON.parse(storedProgress)
          Object.entries(progress).forEach(([courseId, courseProgress]) => {
            dispatch({ type: 'UPDATE_PROGRESS', payload: { courseId, progress: courseProgress } })
          })
        }
        if (storedCertificates) {
          dispatch({ type: 'SET_CERTIFICATES', payload: JSON.parse(storedCertificates) })
        }
        if (storedReviews) {
          const reviews = JSON.parse(storedReviews)
          reviews.forEach(review => {
            dispatch({ type: 'ADD_REVIEW', payload: review })
          })
        }
        if (storedCompleted) {
          dispatch({ type: 'SET_COMPLETED_COURSES', payload: JSON.parse(storedCompleted) })
        }
      } catch (error) {
        console.error('Error loading stored LMS data:', error)
      }
    }

    if (user) {
      loadMockData()
      loadStoredData()
    }
  }, [user])

  const value = {
    ...state,
    enrollInCourse,
    updateProgress,
    completeCourse,
    addReview,
    getCourseReviews,
    getCourseRating
  }

  return <LMSContext.Provider value={value}>{children}</LMSContext.Provider>
}

export const useLMS = () => {
  const context = useContext(LMSContext)
  if (!context) {
    throw new Error('useLMS must be used within an LMSProvider')
  }
  return context
}