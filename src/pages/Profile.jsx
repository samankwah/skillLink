import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { 
  Edit, 
  MapPin, 
  Calendar, 
  Globe, 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  Plus,
  Award,
  Building,
  GraduationCap,
  Eye,
  Save,
  X,
  Upload,
  Camera
} from 'lucide-react'
import { useProfile } from '@/context/ProfileContext'
import { useAuth } from '@/context/AuthContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const Profile = () => {
  const { user } = useAuth()
  const { profile, skills, experience, education, isLoading } = useProfile()
  
  useDocumentTitle("Profile")
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingPhoto, setIsEditingPhoto] = useState(false)
  const [editedProfile, setEditedProfile] = useState({})
  const [newPhoto, setNewPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [showAddSkillModal, setShowAddSkillModal] = useState(false)
  const [showAddExperienceModal, setShowAddExperienceModal] = useState(false)
  const [showAddEducationModal, setShowAddEducationModal] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Beginner', category: '' })
  const [newExperience, setNewExperience] = useState({
    company: '', position: '', startDate: '', endDate: '', description: '', current: false
  })
  const [newEducation, setNewEducation] = useState({
    institution: '', degree: '', field: '', startDate: '', endDate: '', description: ''
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-primary-foreground font-bold text-sm">SL</span>
          </div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Profile not found</p>
      </div>
    )
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    })
  }

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'bg-green-100 text-green-800'
      case 'Advanced': return 'bg-blue-100 text-blue-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Beginner': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleEditProfile = () => {
    setEditedProfile({ ...profile })
    setIsEditingProfile(true)
  }

  const handleSaveProfile = () => {
    // In a real app, this would update via API
    console.log('Saving profile:', editedProfile)
    alert('Profile updated successfully! (This would integrate with your backend API)')
    setIsEditingProfile(false)
  }

  const handleCancelEdit = () => {
    setEditedProfile({})
    setIsEditingProfile(false)
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)')
        event.target.value = ''
        return
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024 // 5MB in bytes
      if (file.size > maxSize) {
        alert('File size must be less than 5MB')
        event.target.value = ''
        return
      }

      setNewPhoto(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSavePhoto = () => {
    // In a real app, this would upload to backend
    console.log('Uploading new photo:', newPhoto)
    alert('Photo updated successfully! (This would integrate with your backend API)')
    setIsEditingPhoto(false)
    setNewPhoto(null)
    setPhotoPreview(null)
  }

  const handleAddSkill = () => {
    // In a real app, this would add via API
    console.log('Adding skill:', newSkill)
    alert('Skill added successfully! (This would integrate with your backend API)')
    setShowAddSkillModal(false)
    setNewSkill({ name: '', level: 'Beginner', category: '' })
  }

  const handleAddExperience = () => {
    // In a real app, this would add via API
    console.log('Adding experience:', newExperience)
    alert('Experience added successfully! (This would integrate with your backend API)')
    setShowAddExperienceModal(false)
    setNewExperience({
      company: '', position: '', startDate: '', endDate: '', description: '', current: false
    })
  }

  const handleAddEducation = () => {
    // In a real app, this would add via API
    console.log('Adding education:', newEducation)
    alert('Education added successfully! (This would integrate with your backend API)')
    setShowAddEducationModal(false)
    setNewEducation({
      institution: '', degree: '', field: '', startDate: '', endDate: '', description: ''
    })
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="w-24 h-24 md:w-32 md:h-32 mb-4">
                {profile.avatar ? (
                  <AvatarImage src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} />
                ) : (
                  <AvatarFallback className="text-2xl">
                    {getInitials(profile.firstName, profile.lastName)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditingPhoto(true)}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Edit Photo
                </Button>
                {isEditingPhoto && (
                  <div className="flex flex-col gap-3 mt-3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Choose Profile Photo</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                          onChange={handlePhotoChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          id="photo-upload"
                        />
                        <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="text-center">
                            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm font-medium">Click to upload or drag and drop</p>
                            <p className="text-xs text-muted-foreground">JPEG, PNG, GIF, WebP (max 5MB)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {photoPreview && (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={photoPreview} 
                            alt="Preview" 
                            className="w-16 h-16 rounded-full object-cover border-2 border-border"
                          />
                          <span className="text-sm text-muted-foreground">Preview</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSavePhoto}>
                            <Save className="w-4 h-4 mr-1" />
                            Save Photo
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => {
                            setIsEditingPhoto(false)
                            setPhotoPreview(null)
                            setNewPhoto(null)
                          }}>
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  {isEditingProfile ? (
                    <div className="space-y-3 mb-4">
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          value={editedProfile.firstName || ''}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, firstName: e.target.value }))}
                          placeholder="First Name"
                        />
                        <Input
                          value={editedProfile.lastName || ''}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, lastName: e.target.value }))}
                          placeholder="Last Name"
                        />
                      </div>
                      <Input
                        value={editedProfile.title || ''}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Professional Title"
                      />
                      <Input
                        value={editedProfile.location || ''}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Location"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl md:text-3xl font-bold">
                        {profile.firstName} {profile.lastName}
                      </h1>
                      <p className="text-lg md:text-xl text-muted-foreground mb-2">{profile.title}</p>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{profile.location}</span>
                      </div>
                    </>
                  )}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>{profile.profileViews} profile views</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Joined {formatDate(profile.joinDate)}</span>
                    </div>
                  </div>
                </div>
                {isEditingProfile ? (
                  <div className="flex gap-2">
                    <Button onClick={handleSaveProfile}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancelEdit}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleEditProfile}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>

              {/* Bio */}
              {isEditingProfile ? (
                <textarea
                  value={editedProfile.bio || ''}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none mb-4"
                  rows={4}
                />
              ) : (
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {profile.bio}
                </p>
              )}

              {/* Contact Links */}
              <div className="flex flex-wrap gap-2 md:gap-4">
                {profile.email && (
                  <a href={`mailto:${profile.email}`} className="flex items-center text-primary hover:underline">
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </a>
                )}
                {profile.phone && (
                  <a href={`tel:${profile.phone}`} className="flex items-center text-primary hover:underline">
                    <Phone className="w-4 h-4 mr-1" />
                    Phone
                  </a>
                )}
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline">
                    <Globe className="w-4 h-4 mr-1" />
                    Website
                  </a>
                )}
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline">
                    <Linkedin className="w-4 h-4 mr-1" />
                    LinkedIn
                  </a>
                )}
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline">
                    <Github className="w-4 h-4 mr-1" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="border-b overflow-x-auto">
        <nav className="flex space-x-4 md:space-x-8 min-w-max">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'experience', label: 'Experience' },
            { id: 'education', label: 'Education' },
            { id: 'skills', label: 'Skills' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 md:py-4 px-2 md:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Top Skills</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowAddSkillModal(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="space-y-4">
                {skills.slice(0, 5).map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{skill.name}</span>
                      <Badge variant="secondary" className={getSkillLevelColor(skill.level)}>
                        {skill.level}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Award className="w-4 h-4" />
                      <span>{skill.endorsements}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Experience */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Experience</CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="space-y-4">
                {experience.slice(0, 3).map((exp) => (
                  <div key={exp.id} className="flex space-x-3">
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      <Building className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{exp.position}</h4>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'experience' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Work Experience</span>
              <Button onClick={() => setShowAddExperienceModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={exp.id}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">{exp.position}</h3>
                          <p className="text-muted-foreground font-medium">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                            {exp.location && ` • ${exp.location}`}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-muted-foreground mb-3 leading-relaxed">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  {index < experience.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'education' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Education</span>
              <Button onClick={() => setShowAddEducationModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={edu.id}>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">{edu.degree} in {edu.field}</h3>
                          <p className="text-muted-foreground font-medium">{edu.institution}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                            {edu.location && ` • ${edu.location}`}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                      {edu.description && (
                        <p className="text-muted-foreground leading-relaxed">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {index < education.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'skills' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>All Skills</span>
              <Button onClick={() => setShowAddSkillModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{skill.name}</h4>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary" className={getSkillLevelColor(skill.level)}>
                      {skill.level}
                    </Badge>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{skill.yearsOfExperience} years experience</span>
                      <div className="flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        <span>{skill.endorsements} endorsements</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{skill.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Skill Modal */}
      {showAddSkillModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto shadow-2xl bg-card border-border">
            <CardHeader>
              <CardTitle>Add New Skill</CardTitle>
              <CardDescription>Add a skill to your profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Skill Name</label>
                <Input
                  value={newSkill.name}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., React, Python, Project Management"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Proficiency Level</label>
                <select
                  value={newSkill.level}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, level: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Input
                  value={newSkill.category}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g., Programming, Design, Marketing"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddSkill} disabled={!newSkill.name.trim()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
                <Button variant="outline" onClick={() => setShowAddSkillModal(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Experience Modal */}
      {showAddExperienceModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl bg-card border-border">
            <CardHeader>
              <CardTitle>Add Work Experience</CardTitle>
              <CardDescription>Add your professional experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Company</label>
                  <Input
                    value={newExperience.company}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Position</label>
                  <Input
                    value={newExperience.position}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, position: e.target.value }))}
                    placeholder="Your role/position"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Start Date</label>
                  <Input
                    type="date"
                    value={newExperience.startDate}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">End Date</label>
                  <Input
                    type="date"
                    value={newExperience.endDate}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, endDate: e.target.value }))}
                    disabled={newExperience.current}
                  />
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      checked={newExperience.current}
                      onChange={(e) => setNewExperience(prev => ({ 
                        ...prev, 
                        current: e.target.checked,
                        endDate: e.target.checked ? '' : prev.endDate 
                      }))}
                      className="mr-2"
                    />
                    <label className="text-sm">Currently working here</label>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <textarea
                  value={newExperience.description}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your role and achievements..."
                  className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none"
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddExperience} disabled={!newExperience.company.trim() || !newExperience.position.trim()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
                <Button variant="outline" onClick={() => setShowAddExperienceModal(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Education Modal */}
      {showAddEducationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl bg-card border-border">
            <CardHeader>
              <CardTitle>Add Education</CardTitle>
              <CardDescription>Add your educational background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Institution</label>
                <Input
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
                  placeholder="University or school name"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Degree</label>
                  <Input
                    value={newEducation.degree}
                    onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
                    placeholder="e.g., Bachelor's, Master's, PhD"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Field of Study</label>
                  <Input
                    value={newEducation.field}
                    onChange={(e) => setNewEducation(prev => ({ ...prev, field: e.target.value }))}
                    placeholder="e.g., Computer Science, Marketing"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Start Date</label>
                  <Input
                    type="date"
                    value={newEducation.startDate}
                    onChange={(e) => setNewEducation(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">End Date</label>
                  <Input
                    type="date"
                    value={newEducation.endDate}
                    onChange={(e) => setNewEducation(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description (Optional)</label>
                <textarea
                  value={newEducation.description}
                  onChange={(e) => setNewEducation(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Additional details about your education..."
                  className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddEducation} disabled={!newEducation.institution.trim() || !newEducation.degree.trim()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
                <Button variant="outline" onClick={() => setShowAddEducationModal(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Profile