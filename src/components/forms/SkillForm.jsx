import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Plus } from 'lucide-react'

const SkillForm = ({ onAddSkill, onClose, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    level: 'Beginner',
    yearsOfExperience: 0,
    category: ''
  })

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert']
  const skillCategories = [
    'Programming',
    'Design',
    'Marketing',
    'Data Science',
    'Management',
    'Sales',
    'Writing',
    'Languages',
    'Other'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'yearsOfExperience' ? parseInt(value) || 0 : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    try {
      await onAddSkill(formData)
      setFormData({
        name: '',
        level: 'Beginner',
        yearsOfExperience: 0,
        category: ''
      })
      onClose?.()
    } catch (error) {
      console.error('Error adding skill:', error)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Add New Skill</CardTitle>
            <CardDescription>Add a skill to your profile</CardDescription>
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
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Skill Name *
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g., JavaScript, React, Python"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="level" className="text-sm font-medium">
              Proficiency Level
            </label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
            >
              {skillLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="yearsOfExperience" className="text-sm font-medium">
              Years of Experience
            </label>
            <Input
              id="yearsOfExperience"
              name="yearsOfExperience"
              type="number"
              min="0"
              max="50"
              value={formData.yearsOfExperience}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="">Select a category</option>
              {skillCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Adding...' : 'Add Skill'}
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

export default SkillForm