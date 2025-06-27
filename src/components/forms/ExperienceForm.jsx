import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Plus } from 'lucide-react'

const ExperienceForm = ({ onAddExperience, onClose, isLoading = false, initialData = null }) => {
  const [formData, setFormData] = useState({
    company: initialData?.company || '',
    position: initialData?.position || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    description: initialData?.description || '',
    location: initialData?.location || '',
    skills: initialData?.skills || [],
    isCurrentJob: initialData?.endDate ? false : true
  })
  const [skillInput, setSkillInput] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'isCurrentJob' && checked ? { endDate: '' } : {})
    }))
  }

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }))
      setSkillInput('')
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const handleSkillKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.company.trim() || !formData.position.trim() || !formData.startDate) return

    try {
      const experienceData = {
        ...formData,
        endDate: formData.isCurrentJob ? null : formData.endDate || null
      }
      await onAddExperience(experienceData)
      
      // Reset form
      setFormData({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        location: '',
        skills: [],
        isCurrentJob: false
      })
      setSkillInput('')
      onClose?.()
    } catch (error) {
      console.error('Error adding experience:', error)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{initialData ? 'Edit Experience' : 'Add Work Experience'}</CardTitle>
            <CardDescription>Add your professional experience</CardDescription>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">
                Company *
              </label>
              <Input
                id="company"
                name="company"
                type="text"
                placeholder="e.g., Tech Corp"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="position" className="text-sm font-medium">
                Job Title *
              </label>
              <Input
                id="position"
                name="position"
                type="text"
                placeholder="e.g., Senior Developer"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location
            </label>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="e.g., New York, NY or Remote"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium">
                Start Date *
              </label>
              <Input
                id="startDate"
                name="startDate"
                type="month"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium">
                End Date
              </label>
              <Input
                id="endDate"
                name="endDate"
                type="month"
                value={formData.endDate}
                onChange={handleChange}
                disabled={formData.isCurrentJob}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="isCurrentJob"
              name="isCurrentJob"
              type="checkbox"
              checked={formData.isCurrentJob}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="isCurrentJob" className="text-sm">
              I currently work here
            </label>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Describe your role, responsibilities, and achievements..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Skills Used</label>
            <div className="flex gap-2 mb-2">
              <Input
                type="text"
                placeholder="Add a skill..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={handleSkillKeyPress}
                className="flex-1"
              />
              <Button type="button" onClick={handleAddSkill} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="cursor-pointer">
                    {skill}
                    <X 
                      className="w-3 h-3 ml-1 hover:text-destructive" 
                      onClick={() => handleRemoveSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Saving...' : (initialData ? 'Update Experience' : 'Add Experience')}
            </Button>
            {onClose && (
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ExperienceForm