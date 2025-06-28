import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  Search, 
  Filter, 
  Users, 
  Briefcase, 
  FolderOpen,
  MapPin,
  Building,
  Clock,
  DollarSign,
  Star,
  TrendingUp,
  BookmarkCheck,
  Send,
  Eye,
  UserPlus,
  Lightbulb
} from 'lucide-react'
import { useSearch } from '@/context/SearchContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const SearchPage = () => {
  useDocumentTitle('Search')
  const [searchParams] = useSearchParams()
  const {
    searchHistory,
    recommendations,
    trending,
    searchFilters,
    setSearchFilters,
    isLoading,
    performAdvancedSearch,
    getPopularSearches,
    getSuggestedFilters
  } = useSearch()

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState({
    people: [],
    jobs: [],
    projects: [],
    total: 0
  })
  const [activeTab, setActiveTab] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchQuery(query)
      performSearch(query)
    }
  }, [searchParams])

  const performSearch = async (query) => {
    try {
      const results = await performAdvancedSearch(query, searchFilters)
      setSearchResults(results)
    } catch (error) {
      console.error('Search failed:', error)
    }
  }

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await performSearch(searchQuery.trim())
    }
  }

  const handleFilterChange = (newFilters) => {
    setSearchFilters(newFilters)
    if (searchQuery.trim()) {
      performSearch(searchQuery.trim())
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatSalary = (salary) => {
    if (!salary) return 'Salary not disclosed'
    const { min, max, currency, period } = salary
    const formatNumber = (num) => num >= 1000 ? `${(num / 1000).toFixed(0)}k` : num
    
    if (min && max) {
      return `${currency}${formatNumber(min)} - ${currency}${formatNumber(max)}${period === 'hour' ? '/hr' : '/year'}`
    }
    return `${currency}${formatNumber(min || max)}${period === 'hour' ? '/hr' : '/year'}`
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
  }

  const currentResults = activeTab === 'all' ? searchResults : 
                        activeTab === 'people' ? { ...searchResults, jobs: [], projects: [] } :
                        activeTab === 'jobs' ? { ...searchResults, people: [], projects: [] } :
                        { ...searchResults, people: [], jobs: [] }

  const hasResults = searchResults.total > 0
  const hasQuery = searchQuery.trim().length > 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Search</h1>
        <p className="text-muted-foreground">
          {hasQuery ? `Search results for "${searchQuery}"` : 'Discover people, jobs, and projects'}
        </p>
      </div>

      {/* Search Bar and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for people, jobs, projects, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
            </div>
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <select
                    value={searchFilters.type}
                    onChange={(e) => handleFilterChange({ ...searchFilters, type: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="all">All</option>
                    <option value="people">People</option>
                    <option value="jobs">Jobs</option>
                    <option value="projects">Projects</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    placeholder="Enter location..."
                    value={searchFilters.location}
                    onChange={(e) => handleFilterChange({ ...searchFilters, location: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Experience</label>
                  <select
                    value={searchFilters.experience}
                    onChange={(e) => handleFilterChange({ ...searchFilters, experience: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="all">All Levels</option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                    <option value="executive">Executive</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Date Posted</label>
                  <select
                    value={searchFilters.dateRange}
                    onChange={(e) => handleFilterChange({ ...searchFilters, dateRange: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="all">Any time</option>
                    <option value="today">Today</option>
                    <option value="week">This week</option>
                    <option value="month">This month</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {hasQuery && (
            <>
              {/* Results Tabs */}
              <div className="border-b mb-6">
                <nav className="flex space-x-8">
                  {[
                    { id: 'all', label: 'All', count: searchResults.total },
                    { id: 'people', label: 'People', count: searchResults.people.length },
                    { id: 'jobs', label: 'Jobs', count: searchResults.jobs.length },
                    { id: 'projects', label: 'Projects', count: searchResults.projects.length }
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

              {/* Search Results */}
              {hasResults ? (
                <div className="space-y-6">
                  {/* People Results */}
                  {(activeTab === 'all' || activeTab === 'people') && searchResults.people.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold mb-4">People</h2>
                      <div className="space-y-4">
                        {searchResults.people.map((person) => (
                          <Card key={person.id} className="hover:shadow-sm transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-4">
                                  <Avatar className="w-12 h-12">
                                    {person.avatar ? (
                                      <AvatarImage src={person.avatar} alt={`${person.firstName} ${person.lastName}`} />
                                    ) : (
                                      <AvatarFallback>
                                        {getInitials(person.firstName, person.lastName)}
                                      </AvatarFallback>
                                    )}
                                  </Avatar>
                                  <div className="flex-1">
                                    <h3 className="font-semibold">
                                      {person.firstName} {person.lastName}
                                    </h3>
                                    <p className="text-muted-foreground">{person.title}</p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                                      <div className="flex items-center">
                                        <Building className="w-4 h-4 mr-1" />
                                        {person.company}
                                      </div>
                                      <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {person.location}
                                      </div>
                                      {person.matchScore && (
                                        <div className="flex items-center">
                                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                          {person.matchScore}% match
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-3">
                                      {person.skills?.slice(0, 4).map((skill) => (
                                        <Badge key={skill} variant="outline" className="text-xs">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm">
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Connect
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4 mr-2" />
                                    View
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Jobs Results */}
                  {(activeTab === 'all' || activeTab === 'jobs') && searchResults.jobs.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold mb-4">Jobs</h2>
                      <div className="space-y-4">
                        {searchResults.jobs.map((job) => (
                          <Card key={job.id} className="hover:shadow-sm transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                                      <Building className="w-5 h-5" />
                                    </div>
                                    <div>
                                      <h3 className="font-semibold">{job.title}</h3>
                                      <p className="text-muted-foreground">{job.company}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                    <div className="flex items-center">
                                      <MapPin className="w-4 h-4 mr-1" />
                                      {job.location}
                                      {job.isRemote && <Badge variant="outline" className="ml-2">Remote</Badge>}
                                    </div>
                                    <div className="flex items-center">
                                      <DollarSign className="w-4 h-4 mr-1" />
                                      {formatSalary(job.salary)}
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="w-4 h-4 mr-1" />
                                      {formatDate(job.postedDate)}
                                    </div>
                                  </div>

                                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                    {job.description}
                                  </p>

                                  <div className="flex flex-wrap gap-1">
                                    {job.skills?.slice(0, 4).map((skill) => (
                                      <Badge key={skill} variant="outline" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  <Button size="sm">
                                    <Send className="w-4 h-4 mr-2" />
                                    Apply
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <BookmarkCheck className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects Results */}
                  {(activeTab === 'all' || activeTab === 'projects') && searchResults.projects.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold mb-4">Projects</h2>
                      <div className="space-y-4">
                        {searchResults.projects.map((project) => (
                          <Card key={project.id} className="hover:shadow-sm transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                                      <FolderOpen className="w-5 h-5" />
                                    </div>
                                    <div>
                                      <h3 className="font-semibold">{project.title}</h3>
                                      <p className="text-muted-foreground">{project.postedBy.company}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                    <div className="flex items-center">
                                      <DollarSign className="w-4 h-4 mr-1" />
                                      ${project.budget?.min}-${project.budget?.max}
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="w-4 h-4 mr-1" />
                                      {project.duration}
                                    </div>
                                  </div>

                                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                    {project.description}
                                  </p>

                                  <div className="flex flex-wrap gap-1">
                                    {project.skillsRequired?.map((skill) => (
                                      <Badge key={skill} variant="outline" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  <Button size="sm">
                                    <Send className="w-4 h-4 mr-2" />
                                    Submit Proposal
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4 mr-2" />
                                    View
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-24 h-24 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No results found</h2>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or filters
                  </p>
                </div>
              )}
            </>
          )}

          {/* Default State - No Query */}
          {!hasQuery && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <Search className="w-24 h-24 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Start Your Search</h2>
                <p className="text-muted-foreground mb-6">
                  Find people, jobs, and projects that match your interests
                </p>
                
                {/* Popular Searches */}
                <div className="max-w-md mx-auto">
                  <h3 className="text-sm font-medium mb-3">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {getPopularSearches().map((search) => (
                      <Button
                        key={search}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchQuery(search)
                          performSearch(search)
                        }}
                      >
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Search History */}
          {searchHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Searches</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {searchHistory.slice(0, 5).map((search) => (
                  <button
                    key={search.id}
                    onClick={() => {
                      setSearchQuery(search.query)
                      performSearch(search.query)
                    }}
                    className="w-full text-left p-2 text-sm hover:bg-accent rounded-md transition-colors"
                  >
                    {search.query}
                  </button>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Trending Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trending Skills</CardTitle>
              <CardDescription>Skills in high demand</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {trending.skills.slice(0, 6).map((skill) => (
                <div key={skill.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+{skill.growth}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommended for You */}
          {recommendations.people.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommended People</CardTitle>
                <CardDescription>Based on your profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.people.slice(0, 3).map((person) => (
                  <div key={person.id} className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>
                        {getInitials(person.firstName, person.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">
                        {person.firstName} {person.lastName}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate">{person.title}</p>
                      <p className="text-xs text-muted-foreground">{person.matchScore}% match</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPage