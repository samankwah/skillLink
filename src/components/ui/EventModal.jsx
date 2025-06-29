import { useState, useEffect } from 'react'
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Bell, 
  Repeat, 
  Save, 
  Trash2,
  Plus,
  Minus
} from 'lucide-react'
import { useCalendar } from '@/context/CalendarContext'

const EventModal = () => {
  const { 
    showEventModal, 
    selectedEvent, 
    selectedDate,
    closeEventModal, 
    addEvent, 
    updateEvent, 
    deleteEvent,
    EVENT_CATEGORIES,
    calendars 
  } = useCalendar()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start: new Date(),
    end: new Date(),
    category: 'work',
    location: '',
    attendees: [],
    isAllDay: false,
    calendarId: 'work',
    reminders: [15],
    recurring: null
  })

  const [attendeeInput, setAttendeeInput] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Initialize form data when modal opens
  useEffect(() => {
    if (showEventModal) {
      if (selectedEvent) {
        // Editing existing event
        setFormData({
          ...selectedEvent,
          attendees: selectedEvent.attendees || [],
          reminders: selectedEvent.reminders || [15]
        })
      } else {
        // Creating new event
        const start = selectedDate ? new Date(selectedDate) : new Date()
        const end = new Date(start)
        end.setHours(start.getHours() + 1)
        
        setFormData({
          title: '',
          description: '',
          start,
          end,
          category: 'work',
          location: '',
          attendees: [],
          isAllDay: false,
          calendarId: 'work',
          reminders: [15],
          recurring: null
        })
      }
    }
  }, [showEventModal, selectedEvent, selectedDate])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDateTimeChange = (field, date, time) => {
    const newDateTime = new Date(date)
    if (time && !formData.isAllDay) {
      const [hours, minutes] = time.split(':')
      newDateTime.setHours(parseInt(hours), parseInt(minutes))
    }
    
    setFormData(prev => {
      const updated = { ...prev, [field]: newDateTime }
      
      // Ensure end time is after start time
      if (field === 'start' && updated.end <= updated.start) {
        const newEnd = new Date(updated.start)
        newEnd.setHours(newEnd.getHours() + 1)
        updated.end = newEnd
      }
      
      return updated
    })
  }

  const addAttendee = () => {
    if (attendeeInput.trim() && !formData.attendees.includes(attendeeInput.trim())) {
      setFormData(prev => ({
        ...prev,
        attendees: [...prev.attendees, attendeeInput.trim()]
      }))
      setAttendeeInput('')
    }
  }

  const removeAttendee = (email) => {
    setFormData(prev => ({
      ...prev,
      attendees: prev.attendees.filter(attendee => attendee !== email)
    }))
  }

  const addReminder = () => {
    setFormData(prev => ({
      ...prev,
      reminders: [...prev.reminders, 15]
    }))
  }

  const updateReminder = (index, value) => {
    setFormData(prev => ({
      ...prev,
      reminders: prev.reminders.map((reminder, i) => 
        i === index ? parseInt(value) : reminder
      )
    }))
  }

  const removeReminder = (index) => {
    setFormData(prev => ({
      ...prev,
      reminders: prev.reminders.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert('Please enter a title for the event')
      return
    }

    const eventData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      location: formData.location.trim(),
    }

    if (selectedEvent) {
      updateEvent(eventData)
    } else {
      addEvent(eventData)
    }
  }

  const handleDelete = () => {
    if (selectedEvent && window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(selectedEvent.id)
      setIsDeleting(false)
    }
  }

  const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0]
  }

  const formatTimeForInput = (date) => {
    return date.toTimeString().slice(0, 5)
  }

  if (!showEventModal) return null

  const isEditing = !!selectedEvent

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[10000] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {isEditing ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button
            onClick={closeEventModal}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Event title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Event description"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Date/Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Start
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  value={formatDateForInput(formData.start)}
                  onChange={(e) => handleDateTimeChange('start', e.target.value, formatTimeForInput(formData.start))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                {!formData.isAllDay && (
                  <input
                    type="time"
                    value={formatTimeForInput(formData.start)}
                    onChange={(e) => handleDateTimeChange('start', formatDateForInput(formData.start), e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                )}
              </div>
            </div>

            {/* End Date/Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                End
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  value={formatDateForInput(formData.end)}
                  onChange={(e) => handleDateTimeChange('end', e.target.value, formatTimeForInput(formData.end))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                {!formData.isAllDay && (
                  <input
                    type="time"
                    value={formatTimeForInput(formData.end)}
                    onChange={(e) => handleDateTimeChange('end', formatDateForInput(formData.end), e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                )}
              </div>
            </div>
          </div>

          {/* All Day Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="allDay"
              checked={formData.isAllDay}
              onChange={(e) => handleInputChange('isAllDay', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="allDay" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              All day event
            </label>
          </div>

          {/* Category and Calendar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {Object.values(EVENT_CATEGORIES).map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Calendar
              </label>
              <select
                value={formData.calendarId}
                onChange={(e) => handleInputChange('calendarId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {calendars.map(calendar => (
                  <option key={calendar.id} value={calendar.id}>
                    {calendar.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Event location"
            />
          </div>

          {/* Attendees */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Users className="w-4 h-4 inline mr-1" />
              Attendees
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={attendeeInput}
                  onChange={(e) => setAttendeeInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAttendee())}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Add attendee email"
                />
                <button
                  type="button"
                  onClick={addAttendee}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {formData.attendees.length > 0 && (
                <div className="space-y-1">
                  {formData.attendees.map((email, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded">
                      <span className="text-sm">{email}</span>
                      <button
                        type="button"
                        onClick={() => removeAttendee(email)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recurring Events */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Repeat className="w-4 h-4 inline mr-1" />
              Repeat
            </label>
            <select
              value={formData.recurring?.type || 'none'}
              onChange={(e) => {
                const value = e.target.value
                if (value === 'none') {
                  handleInputChange('recurring', null)
                } else {
                  handleInputChange('recurring', { type: value, interval: 1 })
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="none">Does not repeat</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {/* Reminders */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Bell className="w-4 h-4 inline mr-1" />
              Reminders
            </label>
            <div className="space-y-2">
              {formData.reminders.map((reminder, index) => (
                <div key={index} className="flex items-center gap-2">
                  <select
                    value={reminder}
                    onChange={(e) => updateReminder(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value={5}>5 minutes before</option>
                    <option value={10}>10 minutes before</option>
                    <option value={15}>15 minutes before</option>
                    <option value={30}>30 minutes before</option>
                    <option value={60}>1 hour before</option>
                    <option value={120}>2 hours before</option>
                    <option value={1440}>1 day before</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeReminder(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addReminder}
                className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add reminder
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => setIsDeleting(!isDeleting)}
                  className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Event
                </button>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={closeEventModal}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </div>

          {/* Delete Confirmation */}
          {isDeleting && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200 mb-3">
                Are you sure you want to delete this event? This action cannot be undone.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                >
                  Yes, Delete
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeleting(false)}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default EventModal