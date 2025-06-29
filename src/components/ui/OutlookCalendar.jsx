import { useState, useEffect } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
  Filter,
  Share2,
  Printer,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Edit,
  Trash2
} from 'lucide-react'
import { useCalendar } from '@/context/CalendarContext'
import EventModal from './EventModal'

const OutlookCalendar = () => {
  const calendarContext = useCalendar()
  
  // Defensive checks to prevent errors
  if (!calendarContext) {
    return <div className="flex items-center justify-center h-full">Loading calendar...</div>
  }
  
  const {
    currentDate = new Date(),
    view = 'week',
    calendars = [],
    getVisibleEvents = () => [],
    getEventsForDate = () => [],
    getEventsForWeek = () => [],
    getEventsForMonth = () => [],
    setView = () => {},
    navigateDate = () => {},
    goToToday = () => {},
    openEventModal = () => {},
    toggleCalendar = () => {},
    updateEvent = () => {},
    EVENT_CATEGORIES
  } = calendarContext
  
  // Generate time slots for the day view
  const timeSlots = []
  for (let hour = 0; hour < 24; hour++) {
    timeSlots.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      hour: hour
    })
  }

  // Get current week dates
  const getWeekDates = (date) => {
    const week = []
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1) // Start from Monday
    startOfWeek.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek)
      currentDay.setDate(startOfWeek.getDate() + i)
      week.push(currentDay)
    }
    return week
  }

  // Get mini calendar grid
  const getMiniCalendarGrid = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    const endDate = new Date(lastDay)
    
    // Adjust to start from Monday
    const startDay = firstDay.getDay()
    startDate.setDate(firstDay.getDate() - (startDay === 0 ? 6 : startDay - 1))
    
    const days = []
    const current = new Date(startDate)
    
    while (current <= endDate || days.length % 7 !== 0) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    
    return days
  }

  // Get month calendar grid
  const getMonthGrid = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    
    const startDate = new Date(firstDay)
    const startDay = firstDay.getDay()
    startDate.setDate(firstDay.getDate() - (startDay === 0 ? 6 : startDay - 1))
    
    const days = []
    const current = new Date(startDate)
    
    // Generate 6 weeks (42 days) to ensure consistent grid
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    
    return days
  }

  const weekDates = getWeekDates(currentDate)
  const miniCalendarDays = getMiniCalendarGrid(currentDate)
  const monthDays = getMonthGrid(currentDate)
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const fullDayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const formatDateRange = () => {
    if (view === 'week') {
      const start = weekDates[0]
      const end = weekDates[6]
      if (start.getMonth() === end.getMonth()) {
        return `${start.getDate()}-${end.getDate()} ${monthNames[start.getMonth()]}, ${start.getFullYear()}`
      } else {
        return `${start.getDate()} ${monthNames[start.getMonth()]} - ${end.getDate()} ${monthNames[end.getMonth()]}, ${start.getFullYear()}`
      }
    } else if (view === 'day') {
      return `${currentDate.getDate()} ${monthNames[currentDate.getMonth()]}, ${currentDate.getFullYear()}`
    }
    return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSameMonth = (date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const handleTimeSlotClick = (date, hour) => {
    const clickDate = new Date(date)
    clickDate.setHours(hour, 0, 0, 0)
    openEventModal(null, clickDate)
  }

  const handleDateClick = (date) => {
    openEventModal(null, date)
  }

  const handleDrop = (e, date, hour = null) => {
    try {
      e.preventDefault()
      const eventData = JSON.parse(e.dataTransfer.getData('application/json'))
      
      if (eventData && eventData.id) {
        const newStart = new Date(date)
        if (hour !== null) {
          newStart.setHours(hour, 0, 0, 0)
        } else {
          newStart.setHours(eventData.start.getHours(), eventData.start.getMinutes(), 0, 0)
        }
        
        const duration = new Date(eventData.end) - new Date(eventData.start)
        const newEnd = new Date(newStart.getTime() + duration)
        
        updateEvent({
          ...eventData,
          start: newStart,
          end: newEnd
        })
      }
    } catch (error) {
      console.error('Error handling drop:', error)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const renderEvent = (event, style = {}) => {
    // Fallback categories if EVENT_CATEGORIES is undefined - Enhanced for study environment
    const defaultCategories = {
      work: { color: 'bg-gradient-to-r from-blue-500 to-blue-600', textColor: 'text-white' },
      personal: { color: 'bg-gradient-to-r from-emerald-500 to-teal-600', textColor: 'text-white' },
      meeting: { color: 'bg-gradient-to-r from-purple-500 to-indigo-600', textColor: 'text-white' },
      deadline: { color: 'bg-gradient-to-r from-rose-500 to-red-600', textColor: 'text-white' },
      reminder: { color: 'bg-gradient-to-r from-amber-400 to-yellow-500', textColor: 'text-gray-900' },
      learning: { color: 'bg-gradient-to-r from-violet-500 to-purple-600', textColor: 'text-white' },
    }
    
    const categories = EVENT_CATEGORIES || defaultCategories
    const category = categories[event.category] || categories.work
    
    return (
      <div
        key={event.id}
        className={`${category.color} ${category.textColor} rounded-lg p-2 text-xs z-10 cursor-move hover:scale-105 hover:shadow-lg transition-all duration-200 select-none shadow-md border border-white/20`}
        style={style}
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer.setData('application/json', JSON.stringify(event))
          e.dataTransfer.effectAllowed = 'move'
        }}
        onClick={(e) => {
          e.stopPropagation()
          openEventModal(event)
        }}
      >
        <div className="font-medium truncate">{event.title}</div>
        {event.location && (
          <div className="flex items-center mt-1 opacity-90">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="truncate">{event.location}</span>
          </div>
        )}
        {!event.isAllDay && (
          <div className="text-xs opacity-90">
            {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="h-full bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 flex flex-col">
      {/* Header Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-600/30 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-700/80 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => openEventModal()}
            className="flex items-center px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            New event
          </button>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setView('day')}
              className={`px-3 py-1 rounded-lg transition-all duration-200 ${view === 'day' ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 dark:from-blue-900/50 dark:to-indigo-900/50 dark:text-blue-300 shadow-md' : 'hover:bg-gray-100 dark:hover:bg-slate-700/50 hover:scale-105'}`}
            >
              Day
            </button>
            <button 
              onClick={() => setView('week')}
              className={`px-3 py-1 rounded-lg transition-all duration-200 ${view === 'week' ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 dark:from-blue-900/50 dark:to-indigo-900/50 dark:text-blue-300 shadow-md' : 'hover:bg-gray-100 dark:hover:bg-slate-700/50 hover:scale-105'}`}
            >
              Week
            </button>
            <button 
              onClick={() => setView('month')}
              className={`px-3 py-1 rounded-lg transition-all duration-200 ${view === 'month' ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 dark:from-blue-900/50 dark:to-indigo-900/50 dark:text-blue-300 shadow-md' : 'hover:bg-gray-100 dark:hover:bg-slate-700/50 hover:scale-105'}`}
            >
              Month
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-105">
            <Filter className="w-4 h-4 text-gray-600 dark:text-slate-300" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-105">
            <Share2 className="w-4 h-4 text-gray-600 dark:text-slate-300" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-105">
            <Printer className="w-4 h-4 text-gray-600 dark:text-slate-300" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with Mini Calendar */}
        <div className="w-64 lg:w-64 md:w-56 sm:w-48 hidden sm:block border-r border-gray-200 dark:border-slate-600/30 bg-gradient-to-b from-gray-50 to-white dark:from-slate-800/50 dark:to-slate-700/30 backdrop-blur-sm p-4">
          {/* Date Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => navigateDate(-1, 'month')}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h3 className="font-semibold text-sm dark:text-white">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button 
              onClick={() => navigateDate(1, 'month')}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mini Calendar */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map(day => (
              <div key={day} className="text-xs font-medium text-gray-500 dark:text-gray-400 text-center p-1">
                {day}
              </div>
            ))}
            {miniCalendarDays.map((date, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                className={`text-xs p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900 ${
                  isToday(date) ? 'bg-blue-600 text-white' : 
                  !isSameMonth(date) ? 'text-gray-400 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {date.getDate()}
              </button>
            ))}
          </div>

          {/* Add Calendar Section */}
          <div className="mb-4">
            <button className="flex items-center text-blue-600 dark:text-blue-400 text-sm hover:text-blue-700 dark:hover:text-blue-300">
              <Plus className="w-4 h-4 mr-1" />
              Add calendar
            </button>
          </div>

          {/* Calendar List */}
          <div className="space-y-2">
            {calendars.map(calendar => (
              <div key={calendar.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`calendar-${calendar.id}`}
                  checked={calendar.visible}
                  onChange={() => toggleCalendar(calendar.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                />
                <div className={`w-3 h-3 ${calendar.color} rounded-full mr-2`}></div>
                <label 
                  htmlFor={`calendar-${calendar.id}`}
                  className="text-sm dark:text-gray-300 cursor-pointer"
                >
                  {calendar.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Main Calendar View */}
        <div className="flex-1 flex flex-col">
          {/* Date Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigateDate(-1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigateDate(1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold dark:text-white">{formatDateRange()}</h2>
            </div>
            <button 
              onClick={goToToday}
              className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
            >
              Today
            </button>
          </div>

          {/* Week View */}
          {view === 'week' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Week Header */}
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <div className="w-16 flex-shrink-0"></div>
                {weekDates.map((date, index) => (
                  <div key={index} className="flex-1 text-center p-2 sm:p-3 border-r border-gray-200 dark:border-gray-700">
                    <div className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      <span className="hidden sm:inline">{fullDayNames[index]}</span>
                      <span className="sm:hidden">{dayNames[index]}</span>
                    </div>
                    <div className={`text-sm sm:text-lg font-semibold ${
                      isToday(date) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                    }`}>
                      {date.getDate()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time Grid */}
              <div className="flex-1 overflow-y-auto">
                <div className="flex">
                  {/* Time Labels */}
                  <div className="w-16 flex-shrink-0">
                    {timeSlots.map(slot => (
                      <div key={slot.time} className="h-16 border-b border-gray-100 dark:border-gray-700 flex items-start pt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400 px-2">
                          {slot.hour === 0 ? '' : slot.time}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Week Grid */}
                  {weekDates.map((date, dayIndex) => (
                    <div key={dayIndex} className="flex-1 border-r border-gray-200 dark:border-gray-700">
                      {timeSlots.map((slot, timeIndex) => (
                        <div
                          key={`${dayIndex}-${timeIndex}`}
                          className="h-16 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 relative cursor-pointer"
                          onClick={() => handleTimeSlotClick(date, slot.hour)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, date, slot.hour)}
                        >
                          {/* Event rendering */}
                          {getEventsForDate(date)?.map(event => {
                            try {
                              if (!event || !event.start || !event.end) return null
                              
                              const eventHour = event.start.getHours()
                              
                              if (eventHour === slot.hour) {
                                const duration = (event.end - event.start) / (1000 * 60 * 60) // hours
                                const height = Math.max(duration * 64, 20) // 64px per hour, minimum 20px
                                
                                return renderEvent(event, {
                                  position: 'absolute',
                                  left: '2px',
                                  right: '2px',
                                  height: `${height}px`,
                                  zIndex: 10
                                })
                              }
                              return null
                            } catch (error) {
                              console.error('Error rendering event:', error)
                              return null
                            }
                          }) || []}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Month View */}
          {view === 'month' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Month Header */}
              <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
                {fullDayNames.map(day => (
                  <div key={day} className="p-3 text-center font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                    <span className="hidden sm:inline">{day}</span>
                    <span className="sm:hidden">{day.slice(0, 3)}</span>
                  </div>
                ))}
              </div>

              {/* Month Grid */}
              <div className="flex-1 grid grid-cols-7 grid-rows-6">
                {monthDays.map((date, index) => (
                  <div
                    key={index}
                    className={`border-r border-b border-gray-200 dark:border-gray-700 p-2 min-h-[100px] cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      !isSameMonth(date) ? 'bg-gray-50 dark:bg-gray-800/50' : ''
                    }`}
                    onClick={() => handleDateClick(date)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, date)}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      isToday(date) 
                        ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center' 
                        : !isSameMonth(date) 
                          ? 'text-gray-400 dark:text-gray-600' 
                          : 'text-gray-900 dark:text-white'
                    }`}>
                      {date.getDate()}
                    </div>
                    
                    {/* Events for this date */}
                    <div className="space-y-1">
                      {getEventsForDate(date)?.slice(0, 3).map(event => {
                        try {
                          return event ? renderEvent(event) : null
                        } catch (error) {
                          console.error('Error rendering month event:', error)
                          return null
                        }
                      }) || []}
                      {(getEventsForDate(date)?.length || 0) > 3 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          +{(getEventsForDate(date)?.length || 0) - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day View */}
          {view === 'day' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Day Header */}
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <div className="w-16 flex-shrink-0"></div>
                <div className="flex-1 text-center p-4 border-r border-gray-200 dark:border-gray-700">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {fullDayNames[currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1]}
                  </div>
                  <div className={`text-2xl font-semibold ${
                    isToday(currentDate) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                  }`}>
                    {currentDate.getDate()}
                  </div>
                </div>
              </div>

              {/* Day Time Grid */}
              <div className="flex-1 overflow-y-auto">
                <div className="flex">
                  {/* Time Labels */}
                  <div className="w-16 flex-shrink-0">
                    {timeSlots.map(slot => (
                      <div key={slot.time} className="h-16 border-b border-gray-100 dark:border-gray-700 flex items-start pt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400 px-2">
                          {slot.hour === 0 ? '' : slot.time}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Day Grid */}
                  <div className="flex-1 border-r border-gray-200 dark:border-gray-700">
                    {timeSlots.map((slot, timeIndex) => (
                      <div
                        key={timeIndex}
                        className="h-16 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 relative cursor-pointer"
                        onClick={() => handleTimeSlotClick(currentDate, slot.hour)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, currentDate, slot.hour)}
                      >
                        {/* Event rendering */}
                        {getEventsForDate(currentDate)?.map(event => {
                          try {
                            if (!event || !event.start || !event.end) return null
                            
                            const eventHour = event.start.getHours()
                            
                            if (eventHour === slot.hour) {
                              const duration = (event.end - event.start) / (1000 * 60 * 60) // hours
                              const height = Math.max(duration * 64, 20) // 64px per hour, minimum 20px
                              
                              return renderEvent(event, {
                                position: 'absolute',
                                left: '4px',
                                right: '4px',
                                height: `${height}px`,
                                zIndex: 10
                              })
                            }
                            return null
                          } catch (error) {
                            console.error('Error rendering day event:', error)
                            return null
                          }
                        }) || []}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Event Modal */}
      <EventModal />
    </div>
  )
}

export default OutlookCalendar