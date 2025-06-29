import { createContext, useContext, useReducer, useEffect } from 'react'

const CalendarContext = createContext()

// Action types
const CALENDAR_ACTIONS = {
  SET_EVENTS: 'SET_EVENTS',
  ADD_EVENT: 'ADD_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
  SET_VIEW: 'SET_VIEW',
  SET_CURRENT_DATE: 'SET_CURRENT_DATE',
  SET_SELECTED_DATE: 'SET_SELECTED_DATE',
  SET_SELECTED_EVENT: 'SET_SELECTED_EVENT',
  SET_SHOW_EVENT_MODAL: 'SET_SHOW_EVENT_MODAL',
  SET_CALENDARS: 'SET_CALENDARS',
  TOGGLE_CALENDAR: 'TOGGLE_CALENDAR',
}

// Event categories/types - Enhanced for study environment
const EVENT_CATEGORIES = {
  WORK: { id: 'work', label: 'Work', color: 'bg-gradient-to-r from-blue-500 to-blue-600', textColor: 'text-white' },
  PERSONAL: { id: 'personal', label: 'Personal', color: 'bg-gradient-to-r from-emerald-500 to-teal-600', textColor: 'text-white' },
  MEETING: { id: 'meeting', label: 'Meeting', color: 'bg-gradient-to-r from-purple-500 to-indigo-600', textColor: 'text-white' },
  DEADLINE: { id: 'deadline', label: 'Deadline', color: 'bg-gradient-to-r from-rose-500 to-red-600', textColor: 'text-white' },
  REMINDER: { id: 'reminder', label: 'Reminder', color: 'bg-gradient-to-r from-amber-400 to-yellow-500', textColor: 'text-gray-900' },
  LEARNING: { id: 'learning', label: 'Learning', color: 'bg-gradient-to-r from-violet-500 to-purple-600', textColor: 'text-white' },
}

// Initial state
const initialState = {
  events: [
    {
      id: 1,
      title: 'Team Standup',
      description: 'Daily team synchronization meeting',
      start: new Date(2025, 5, 26, 9, 0),
      end: new Date(2025, 5, 26, 9, 30),
      category: 'meeting',
      location: 'Conference Room A',
      attendees: ['john@company.com', 'sarah@company.com'],
      isAllDay: false,
      recurring: null,
      reminders: [15, 5], // minutes before
      calendarId: 'work',
    },
    {
      id: 2,
      title: 'React Course Review',
      description: 'Review advanced React patterns module',
      start: new Date(2025, 5, 26, 14, 0),
      end: new Date(2025, 5, 26, 15, 30),
      category: 'learning',
      location: 'Online',
      attendees: [],
      isAllDay: false,
      recurring: null,
      reminders: [30],
      calendarId: 'personal',
    },
    {
      id: 3,
      title: 'Project Deadline',
      description: 'SkillLink calendar feature completion',
      start: new Date(2025, 5, 27, 17, 0),
      end: new Date(2025, 5, 27, 17, 0),
      category: 'deadline',
      location: null,
      attendees: [],
      isAllDay: false,
      recurring: null,
      reminders: [60, 30],
      calendarId: 'work',
    },
    {
      id: 4,
      title: 'Morning Workout',
      description: 'Gym session - Upper body',
      start: new Date(2025, 5, 28, 6, 30),
      end: new Date(2025, 5, 28, 7, 30),
      category: 'personal',
      location: 'Fitness Center',
      attendees: [],
      isAllDay: false,
      recurring: { type: 'weekly', days: ['monday', 'wednesday', 'friday'] },
      reminders: [10],
      calendarId: 'personal',
    }
  ],
  calendars: [
    { id: 'work', name: 'Work', color: 'bg-blue-500', visible: true },
    { id: 'personal', name: 'Personal', color: 'bg-green-500', visible: true },
    { id: 'learning', name: 'Learning', color: 'bg-purple-500', visible: true },
  ],
  view: 'week', // day, week, month
  currentDate: new Date(),
  selectedDate: new Date(),
  selectedEvent: null,
  showEventModal: false,
  draggedEvent: null,
}

// Reducer
function calendarReducer(state, action) {
  switch (action.type) {
    case CALENDAR_ACTIONS.SET_EVENTS:
      return { ...state, events: action.payload }
    
    case CALENDAR_ACTIONS.ADD_EVENT:
      const newEvent = {
        ...action.payload,
        id: Date.now(), // Simple ID generation
      }
      return { 
        ...state, 
        events: [...state.events, newEvent],
        showEventModal: false,
        selectedEvent: null
      }
    
    case CALENDAR_ACTIONS.UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? { ...event, ...action.payload } : event
        ),
        showEventModal: false,
        selectedEvent: null
      }
    
    case CALENDAR_ACTIONS.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload),
        showEventModal: false,
        selectedEvent: null
      }
    
    case CALENDAR_ACTIONS.SET_VIEW:
      return { ...state, view: action.payload }
    
    case CALENDAR_ACTIONS.SET_CURRENT_DATE:
      return { ...state, currentDate: action.payload }
    
    case CALENDAR_ACTIONS.SET_SELECTED_DATE:
      return { ...state, selectedDate: action.payload }
    
    case CALENDAR_ACTIONS.SET_SELECTED_EVENT:
      return { ...state, selectedEvent: action.payload }
    
    case CALENDAR_ACTIONS.SET_SHOW_EVENT_MODAL:
      return { ...state, showEventModal: action.payload }
    
    case CALENDAR_ACTIONS.SET_CALENDARS:
      return { ...state, calendars: action.payload }
    
    case CALENDAR_ACTIONS.TOGGLE_CALENDAR:
      return {
        ...state,
        calendars: state.calendars.map(cal =>
          cal.id === action.payload ? { ...cal, visible: !cal.visible } : cal
        )
      }
    
    default:
      return state
  }
}

// Calendar Provider
export function CalendarProvider({ children }) {
  const [state, dispatch] = useReducer(calendarReducer, initialState)

  // Load events from localStorage on mount
  useEffect(() => {
    try {
      const savedEvents = localStorage.getItem('skilllink_calendar_events')
      if (savedEvents) {
        const events = JSON.parse(savedEvents).map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        })).filter(event => 
          event.start instanceof Date && !isNaN(event.start) &&
          event.end instanceof Date && !isNaN(event.end)
        )
        dispatch({ type: CALENDAR_ACTIONS.SET_EVENTS, payload: events })
      }
    } catch (error) {
      console.error('Error loading calendar events:', error)
      // Reset to initial events if there's an error
      localStorage.removeItem('skilllink_calendar_events')
    }
  }, [])

  // Save events to localStorage when events change
  useEffect(() => {
    try {
      localStorage.setItem('skilllink_calendar_events', JSON.stringify(state.events))
    } catch (error) {
      console.error('Error saving calendar events:', error)
    }
  }, [state.events])

  // Helper functions
  const generateRecurringEvents = (baseEvent, startDate, endDate) => {
    if (!baseEvent.recurring) return [baseEvent]
    
    const events = [baseEvent]
    const { type, interval = 1 } = baseEvent.recurring
    
    let currentDate = new Date(baseEvent.start)
    const eventDuration = baseEvent.end - baseEvent.start
    
    while (currentDate < endDate) {
      switch (type) {
        case 'daily':
          currentDate.setDate(currentDate.getDate() + interval)
          break
        case 'weekly':
          currentDate.setDate(currentDate.getDate() + (7 * interval))
          break
        case 'monthly':
          currentDate.setMonth(currentDate.getMonth() + interval)
          break
        case 'yearly':
          currentDate.setFullYear(currentDate.getFullYear() + interval)
          break
        default:
          return events
      }
      
      if (currentDate >= startDate && currentDate <= endDate) {
        const newEvent = {
          ...baseEvent,
          id: `${baseEvent.id}-${currentDate.getTime()}`,
          start: new Date(currentDate),
          end: new Date(currentDate.getTime() + eventDuration),
          isRecurring: true,
          originalId: baseEvent.id
        }
        events.push(newEvent)
      }
    }
    
    return events
  }

  const getVisibleEvents = () => {
    const visibleCalendars = state.calendars
      .filter(cal => cal.visible)
      .map(cal => cal.id)
    
    let events = state.events.filter(event => 
      visibleCalendars.includes(event.calendarId)
    )
    
    // Generate recurring events for the current view
    const now = new Date()
    const viewStart = new Date(now.getFullYear(), now.getMonth() - 2, 1)
    const viewEnd = new Date(now.getFullYear(), now.getMonth() + 4, 0)
    
    const allEvents = []
    events.forEach(event => {
      if (event.recurring) {
        allEvents.push(...generateRecurringEvents(event, viewStart, viewEnd))
      } else {
        allEvents.push(event)
      }
    })
    
    return allEvents
  }

  const getEventsForDate = (date) => {
    const dateStr = date.toDateString()
    return getVisibleEvents().filter(event => {
      const eventDate = event.start.toDateString()
      return eventDate === dateStr
    })
  }

  const getEventsForWeek = (startDate) => {
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + 7)
    
    return getVisibleEvents().filter(event => {
      return event.start >= startDate && event.start < endDate
    })
  }

  const getEventsForMonth = (year, month) => {
    return getVisibleEvents().filter(event => {
      return event.start.getFullYear() === year && event.start.getMonth() === month
    })
  }

  const addEvent = (eventData) => {
    dispatch({ type: CALENDAR_ACTIONS.ADD_EVENT, payload: eventData })
  }

  const updateEvent = (eventData) => {
    dispatch({ type: CALENDAR_ACTIONS.UPDATE_EVENT, payload: eventData })
  }

  const deleteEvent = (eventId) => {
    dispatch({ type: CALENDAR_ACTIONS.DELETE_EVENT, payload: eventId })
  }

  const setView = (view) => {
    dispatch({ type: CALENDAR_ACTIONS.SET_VIEW, payload: view })
  }

  const setCurrentDate = (date) => {
    dispatch({ type: CALENDAR_ACTIONS.SET_CURRENT_DATE, payload: date })
  }

  const setSelectedDate = (date) => {
    dispatch({ type: CALENDAR_ACTIONS.SET_SELECTED_DATE, payload: date })
  }

  const setSelectedEvent = (event) => {
    dispatch({ type: CALENDAR_ACTIONS.SET_SELECTED_EVENT, payload: event })
  }

  const setShowEventModal = (show) => {
    dispatch({ type: CALENDAR_ACTIONS.SET_SHOW_EVENT_MODAL, payload: show })
  }

  const toggleCalendar = (calendarId) => {
    dispatch({ type: CALENDAR_ACTIONS.TOGGLE_CALENDAR, payload: calendarId })
  }

  const openEventModal = (event = null, date = null) => {
    if (event) {
      setSelectedEvent(event)
    } else if (date) {
      setSelectedDate(date)
      setSelectedEvent(null)
    }
    setShowEventModal(true)
  }

  const closeEventModal = () => {
    setShowEventModal(false)
    setSelectedEvent(null)
  }

  // Navigate calendar
  const navigateDate = (direction, viewType = state.view) => {
    const newDate = new Date(state.currentDate)
    
    switch (viewType) {
      case 'day':
        newDate.setDate(newDate.getDate() + direction)
        break
      case 'week':
        newDate.setDate(newDate.getDate() + (direction * 7))
        break
      case 'month':
        newDate.setMonth(newDate.getMonth() + direction)
        break
    }
    
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const value = {
    // State
    ...state,
    
    // Helper functions
    getVisibleEvents,
    getEventsForDate,
    getEventsForWeek,
    getEventsForMonth,
    
    // Actions
    addEvent,
    updateEvent,
    deleteEvent,
    setView,
    setCurrentDate,
    setSelectedDate,
    setSelectedEvent,
    setShowEventModal,
    toggleCalendar,
    openEventModal,
    closeEventModal,
    navigateDate,
    goToToday,
    
    // Constants
    EVENT_CATEGORIES,
  }

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  )
}

// Custom hook
export function useCalendar() {
  const context = useContext(CalendarContext)
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider')
  }
  return context
}

export default CalendarContext