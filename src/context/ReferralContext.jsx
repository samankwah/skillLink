import { createContext, useContext, useReducer, useEffect } from 'react'
import { useAuth } from './AuthContext'

const ReferralContext = createContext()

const initialState = {
  referralCode: '',
  referrals: [],
  referralStats: {
    totalReferrals: 0,
    successfulReferrals: 0,
    pendingReferrals: 0,
    rewardPoints: 0
  },
  rewardHistory: [],
  isLoading: false,
  error: null
}

const referralReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    case 'SET_REFERRAL_CODE':
      return { ...state, referralCode: action.payload }
    case 'SET_REFERRALS':
      return { ...state, referrals: action.payload }
    case 'SET_REFERRAL_STATS':
      return { ...state, referralStats: action.payload }
    case 'ADD_REFERRAL':
      return {
        ...state,
        referrals: [...state.referrals, action.payload],
        referralStats: {
          ...state.referralStats,
          totalReferrals: state.referralStats.totalReferrals + 1,
          pendingReferrals: state.referralStats.pendingReferrals + 1
        }
      }
    case 'UPDATE_REFERRAL_STATUS':
      return {
        ...state,
        referrals: state.referrals.map(ref =>
          ref.id === action.payload.id
            ? { ...ref, status: action.payload.status }
            : ref
        )
      }
    default:
      return state
  }
}

export const ReferralProvider = ({ children }) => {
  const [state, dispatch] = useReducer(referralReducer, initialState)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      generateReferralCode()
      loadReferralData()
      loadStoredReferralData()
    }
  }, [user])

  const loadStoredReferralData = () => {
    try {
      const storedReferrals = localStorage.getItem('userReferrals')
      const storedStats = localStorage.getItem('referralStats')
      
      if (storedReferrals) {
        const referrals = JSON.parse(storedReferrals)
        dispatch({ type: 'SET_REFERRALS', payload: referrals })
        
        // Recalculate stats from stored referrals
        const stats = {
          totalReferrals: referrals.length,
          successfulReferrals: referrals.filter(r => r.status === 'completed').length,
          pendingReferrals: referrals.filter(r => r.status === 'pending').length,
          rewardPoints: referrals.reduce((sum, r) => sum + (r.rewardEarned || 0), 0)
        }
        dispatch({ type: 'SET_REFERRAL_STATS', payload: stats })
      }
    } catch (error) {
      console.error('Error loading stored referral data:', error)
    }
  }

  const generateReferralCode = () => {
    const code = `${user.firstName.toUpperCase()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    dispatch({ type: 'SET_REFERRAL_CODE', payload: code })
  }

  const loadReferralData = () => {
    const mockReferrals = [
      {
        id: 1,
        email: 'jane.doe@example.com',
        name: 'Jane Doe',
        status: 'completed',
        referredDate: '2024-01-15',
        joinedDate: '2024-01-16',
        rewardEarned: 50
      },
      {
        id: 2,
        email: 'bob.smith@example.com',
        name: 'Bob Smith',
        status: 'pending',
        referredDate: '2024-01-20',
        joinedDate: null,
        rewardEarned: 0
      }
    ]

    const mockStats = {
      totalReferrals: 5,
      successfulReferrals: 3,
      pendingReferrals: 2,
      rewardPoints: 150
    }

    dispatch({ type: 'SET_REFERRALS', payload: mockReferrals })
    dispatch({ type: 'SET_REFERRAL_STATS', payload: mockStats })
  }

  const sendReferral = async (email, name) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address')
      }

      // Check for duplicate referrals
      const existingReferral = state.referrals.find(ref => 
        ref.email.toLowerCase() === email.toLowerCase()
      )
      if (existingReferral) {
        throw new Error('You have already referred this email address')
      }
      
      // Simulate email sending API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newReferral = {
        id: Date.now(),
        email: email.toLowerCase(),
        name: name.trim(),
        status: 'pending',
        referredDate: new Date().toISOString().split('T')[0],
        joinedDate: null,
        rewardEarned: 0,
        emailSent: true,
        remindersSent: 0
      }
      
      dispatch({ type: 'ADD_REFERRAL', payload: newReferral })
      
      // Save to localStorage
      const updatedReferrals = [...state.referrals, newReferral]
      localStorage.setItem('userReferrals', JSON.stringify(updatedReferrals))
      
      dispatch({ type: 'SET_LOADING', payload: false })
      
      return { 
        success: true, 
        message: `Invitation sent successfully to ${name}!`,
        referral: newReferral
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      dispatch({ type: 'SET_LOADING', payload: false })
      return { success: false, error: error.message }
    }
  }

  const shareReferralLink = () => {
    const referralLink = `https://skilllink.com/register?ref=${state.referralCode}`
    
    if (navigator.share) {
      navigator.share({
        title: 'Join SkillLink',
        text: 'Join me on SkillLink - the best platform for learning and growing your skills!',
        url: referralLink
      })
    } else {
      navigator.clipboard.writeText(referralLink)
      return { success: true, message: 'Referral link copied to clipboard!' }
    }
  }

  const value = {
    ...state,
    sendReferral,
    shareReferralLink
  }

  return <ReferralContext.Provider value={value}>{children}</ReferralContext.Provider>
}

export const useReferral = () => {
  const context = useContext(ReferralContext)
  if (!context) {
    throw new Error('useReferral must be used within a ReferralProvider')
  }
  return context
}