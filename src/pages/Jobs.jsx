import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Building,
  Users,
  Calendar,
  Briefcase,
  Star,
  Send,
  CheckCircle,
  XCircle,
  Eye,
  TrendingUp
} from 'lucide-react'
import { useJobs } from '@/context/JobsContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const Jobs = () => {
  const {
    jobs,
    projects,
    applications,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    activeTab,
    setActiveTab,
    isLoading,
    searchJobs,
    searchProjects,
    applyToJob,
    saveJob,
    unsaveJob,
    submitProposal,
    getRecommendedJobs,
    getApplicationStatus,
    isJobSaved
  } = useJobs()
  
  useDocumentTitle("Jobs & Projects")

  const [searchResults, setSearchResults] = useState([])
  const [projectResults, setProjectResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [showProposalModal, setShowProposalModal] = useState(false)
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    customAnswers: {}
  })
  const [proposalData, setProposalData] = useState({
    coverLetter: '',
    timeline: '',
    budget: ''
  })

  useEffect(() => {
    // Initialize with all jobs/projects
    setSearchResults(jobs)
    setProjectResults(projects)
  }, [jobs, projects])

  const formatSalary = (salary) => {
    if (!salary) return 'Salary not disclosed'
    
    const { min, max, currency, period } = salary
    const formatNumber = (num) => {
      if (period === 'hour') return num
      return num >= 1000 ? `${(num / 1000).toFixed(0)}k` : num
    }
    
    if (min && max) {
      return `${currency}${formatNumber(min)} - ${currency}${formatNumber(max)}${period === 'hour' ? '/hr' : '/year'}`
    }
    return `${currency}${formatNumber(min || max)}${period === 'hour' ? '/hr' : '/year'}`
  }

  const formatBudget = (budget) => {
    if (!budget) return 'Budget not disclosed'
    const { min, max, currency } = budget
    if (min && max) {
      return `${currency}${min.toLocaleString()} - ${currency}${max.toLocaleString()}`
    }
    return `${currency}${(min || max).toLocaleString()}`
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    return date.toLocaleDateString()
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults(activeTab === 'jobs' ? jobs : [])
      setProjectResults(activeTab === 'projects' ? projects : [])
      return
    }

    setIsSearching(true)
    try {
      if (activeTab === 'jobs') {
        const results = await searchJobs(searchQuery, filters)
        setSearchResults(results)
      } else if (activeTab === 'projects') {
        const results = await searchProjects(searchQuery, filters)
        setProjectResults(results)
      }
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleApplyToJob = async (job) => {
    setSelectedJob(job)
    setShowApplicationModal(true)
  }

  const handleSubmitProposal = async (project) => {
    setSelectedProject(project)
    setShowProposalModal(true)
  }

  const submitJobApplication = async () => {
    try {
      await applyToJob(selectedJob.id, applicationData)
      setShowApplicationModal(false)
      setApplicationData({ coverLetter: '', customAnswers: {} })
      setSelectedJob(null)
    } catch (error) {
      console.error('Failed to apply:', error)
    }
  }

  const submitProjectProposal = async () => {
    try {
      await submitProposal(selectedProject.id, proposalData)
      setShowProposalModal(false)
      setProposalData({ coverLetter: '', timeline: '', budget: '' })
      setSelectedProject(null)
    } catch (error) {
      console.error('Failed to submit proposal:', error)
    }
  }

  const handleSaveJob = async (jobId) => {
    try {
      if (isJobSaved(jobId)) {
        await unsaveJob(jobId)
      } else {
        await saveJob(jobId)
      }
    } catch (error) {
      console.error('Failed to save/unsave job:', error)
    }
  }

  const getJobTypeColor = (type) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800'
      case 'part-time': return 'bg-blue-100 text-blue-800'
      case 'contract': return 'bg-purple-100 text-purple-800'
      case 'internship': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getApplicationStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600'
      case 'reviewing': return 'text-blue-600'
      case 'interviewed': return 'text-purple-600'
      case 'accepted': return 'text-green-600'
      case 'rejected': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getApplicationStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'reviewing': return <Eye className="w-4 h-4" />
      case 'interviewed': return <Users className="w-4 h-4" />
      case 'accepted': return <CheckCircle className="w-4 h-4" />
      case 'rejected': return <XCircle className="w-4 h-4" />
      default: return null
    }
  }

  const currentData = activeTab === 'jobs' ? searchResults : 
                     activeTab === 'projects' ? projectResults : 
                     applications

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Jobs & Projects</h1>
        <p className="text-muted-foreground">Find your next opportunity or project</p>
      </div>

      {/* Search and Filters */}
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search jobs, projects, companies, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
            </div>
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filters.jobType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters(prev => ({ ...prev, jobType: 'all' }))}
            >
              All Types
            </Button>
            <Button
              variant={filters.jobType === 'full-time' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters(prev => ({ ...prev, jobType: 'full-time' }))}
            >
              Full-time
            </Button>
            <Button
              variant={filters.jobType === 'contract' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters(prev => ({ ...prev, jobType: 'contract' }))}
            >
              Contract
            </Button>
            <Button
              variant={filters.remote ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters(prev => ({ ...prev, remote: !prev.remote }))}
            >
              Remote
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="w-full border-b">
        <nav className="flex space-x-4 lg:space-x-8 px-4 lg:px-0 overflow-x-auto">
          {[
            { id: 'jobs', label: 'Jobs', count: jobs.length },
            { id: 'projects', label: 'Projects', count: projects.length },
            { id: 'applications', label: 'My Applications', count: applications.length },
            { id: 'saved', label: 'Saved', count: 0 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="w-full lg:col-span-2 space-y-4">
          {activeTab === 'jobs' && (
            <>
              {searchResults.map((job) => {
                const applicationStatus = getApplicationStatus(job.id)
                const saved = isJobSaved(job.id)

                return (
                  <Card key={job.id} className="hover:shadow-md transition-shadow overflow-hidden">
                    <CardContent className="pt-6 overflow-hidden">
                      <div className="flex justify-between items-start mb-4 overflow-hidden">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                              <Building className="w-6 h-6" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-lg truncate">{job.title}</h3>
                              <p className="text-muted-foreground truncate">{job.company}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center min-w-0">
                              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                              <span className="truncate">{job.location}</span>
                              {job.isRemote && <Badge variant="outline" className="ml-2 flex-shrink-0">Remote</Badge>}
                            </div>
                            <div className="flex items-center min-w-0">
                              <DollarSign className="w-4 h-4 mr-1 flex-shrink-0" />
                              <span className="truncate">{formatSalary(job.salary)}</span>
                            </div>
                            <div className="flex items-center min-w-0">
                              <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                              <span className="truncate">{formatDate(job.postedDate)}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge className={`${getJobTypeColor(job.type)} flex-shrink-0`}>
                              {job.type}
                            </Badge>
                            <Badge variant="outline" className="flex-shrink-0">
                              {job.experienceLevel}
                            </Badge>
                            {job.matchScore && (
                              <Badge variant="outline" className="flex-shrink-0">
                                <Star className="w-3 h-3 mr-1" />
                                {job.matchScore}% match
                              </Badge>
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {job.description}
                          </p>

                          <div className="flex flex-wrap gap-1 mb-4 overflow-hidden">
                            {job.skills.slice(0, 4).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs flex-shrink-0">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 4 && (
                              <Badge variant="outline" className="text-xs flex-shrink-0">
                                +{job.skills.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSaveJob(job.id)}
                            className="flex-shrink-0"
                          >
                            {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {job.applicationsCount} applicants
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            Apply by {formatDate(job.applicationDeadline)}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                          {applicationStatus ? (
                            <div className={`flex items-center justify-center gap-1 text-sm px-3 py-2 rounded-md ${getApplicationStatusColor(applicationStatus)}`}>
                              {getApplicationStatusIcon(applicationStatus)}
                              <span className="capitalize">{applicationStatus}</span>
                            </div>
                          ) : (
                            <Button onClick={() => handleApplyToJob(job)} className="w-full sm:w-auto">
                              <Send className="w-4 h-4 mr-2" />
                              Apply
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </>
          )}

          {activeTab === 'projects' && (
            <>
              {projectResults.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                            <Briefcase className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{project.title}</h3>
                            <p className="text-muted-foreground">{project.postedBy.company}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {formatBudget(project.budget)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {project.duration}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(project.postedDate)}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline">
                            {project.type}
                          </Badge>
                          <Badge variant="outline">
                            {project.experienceLevel}
                          </Badge>
                          {project.isRemote && (
                            <Badge variant="outline">Remote</Badge>
                          )}
                          {project.matchScore && (
                            <Badge variant="outline">
                              <Star className="w-3 h-3 mr-1" />
                              {project.matchScore}% match
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.skillsRequired.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {project.proposalsCount} proposals
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Deadline: {formatDate(project.deadline)}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <Button onClick={() => handleSubmitProposal(project)} className="w-full sm:w-auto">
                          <Send className="w-4 h-4 mr-2" />
                          Submit Proposal
                        </Button>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}

          {activeTab === 'applications' && (
            <>
              {applications.map((application) => {
                const job = jobs.find(j => j.id === application.jobId)
                if (!job) return null

                return (
                  <Card key={application.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                              <Building className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{job.title}</h3>
                              <p className="text-muted-foreground">{job.company}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Applied {formatDate(application.appliedDate)}
                            </div>
                            <div className={`flex items-center gap-1 ${getApplicationStatusColor(application.status)}`}>
                              {getApplicationStatusIcon(application.status)}
                              <span className="capitalize">{application.status}</span>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {application.coverLetter}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="flex gap-2">
                          <Badge className={getJobTypeColor(job.type)}>
                            {job.type}
                          </Badge>
                          <Badge variant="outline">
                            {job.experienceLevel}
                          </Badge>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                          <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            <Eye className="w-4 h-4 mr-2" />
                            View Application
                          </Button>
                          <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Job
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>Jobs matching your skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {getRecommendedJobs().slice(0, 3).map((job) => (
                <div key={job.id} className="border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                  <h4 className="font-medium text-sm">{job.title}</h4>
                  <p className="text-xs text-muted-foreground">{job.company}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      {job.matchScore}%
                    </Badge>
                    <span className="text-xs text-muted-foreground">{formatDate(job.postedDate)}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Market Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">React Developer</span>
                <span className="text-sm font-medium text-green-600">↑ 15%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">UX Designer</span>
                <span className="text-sm font-medium text-green-600">↑ 8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Data Scientist</span>
                <span className="text-sm font-medium text-green-600">↑ 22%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Profile Strength</CardTitle>
              <CardDescription>Complete your profile to get better matches</CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Profile Completeness</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Add portfolio links and certifications to reach 100%
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl bg-card border-border">
            <CardHeader>
              <CardTitle>Apply to {selectedJob.title}</CardTitle>
              <CardDescription>
                {selectedJob.company} • {selectedJob.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Cover Letter</label>
                <textarea
                  value={applicationData.coverLetter}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
                  placeholder="Tell the employer why you're the perfect fit for this role..."
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background resize-none"
                  rows={6}
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={submitJobApplication} disabled={isLoading}>
                  {isLoading ? 'Submitting...' : 'Submit Application'}
                </Button>
                <Button variant="outline" onClick={() => setShowApplicationModal(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Proposal Modal */}
      {showProposalModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl bg-card border-border">
            <CardHeader>
              <CardTitle>Submit Proposal for {selectedProject.title}</CardTitle>
              <CardDescription>
                {selectedProject.postedBy.company} • Budget: {formatBudget(selectedProject.budget)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Cover Letter</label>
                <textarea
                  value={proposalData.coverLetter}
                  onChange={(e) => setProposalData(prev => ({ ...prev, coverLetter: e.target.value }))}
                  placeholder="Describe your approach and why you're the best fit for this project..."
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background resize-none"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Proposed Timeline</label>
                  <Input
                    value={proposalData.timeline}
                    onChange={(e) => setProposalData(prev => ({ ...prev, timeline: e.target.value }))}
                    placeholder="e.g., 6-8 weeks"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Your Rate/Budget</label>
                  <Input
                    value={proposalData.budget}
                    onChange={(e) => setProposalData(prev => ({ ...prev, budget: e.target.value }))}
                    placeholder="e.g., $5,000"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={submitProjectProposal} disabled={isLoading}>
                  {isLoading ? 'Submitting...' : 'Submit Proposal'}
                </Button>
                <Button variant="outline" onClick={() => setShowProposalModal(false)}>
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

export default Jobs