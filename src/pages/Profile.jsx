import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
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
  Eye
} from 'lucide-react'
import { useProfile } from '@/context/ProfileContext'
import { useAuth } from '@/context/AuthContext'

const Profile = () => {
  const { user } = useAuth()
  const { profile, skills, experience, education, isLoading } = useProfile()
  const [activeTab, setActiveTab] = useState('overview')

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
              <Button variant="outline" size="sm" className="mb-2">
                <Edit className="w-4 h-4 mr-2" />
                Edit Photo
              </Button>
            </div>

            {/* Profile Details */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mb-2">{profile.title}</p>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{profile.location}</span>
                  </div>
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
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              {/* Bio */}
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {profile.bio}
              </p>

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
                <Button variant="outline" size="sm">
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
              <Button>
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
              <Button>
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
              <Button>
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
    </div>
  )
}

export default Profile