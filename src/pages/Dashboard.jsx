import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Lightbulb,
  Briefcase,
  TrendingUp,
  MessageCircle,
  Eye,
  Building,
  Award,
  BookOpen,
  Play,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { useLMS } from "@/context/LMSContext";

const Dashboard = () => {
  const { user } = useAuth();
  const { profile, skills, experience, isLoading } = useProfile();
  const { courses, enrolledCourses, certificates } = useLMS();

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  const getSkillLevelColor = (level) => {
    switch (level) {
      case "Expert":
        return "bg-green-100 text-green-800";
      case "Advanced":
        return "bg-blue-100 text-blue-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Beginner":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-primary-foreground font-bold text-lg">
              SL
            </span>
          </div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Welcome Section */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome back, {profile?.firstName || user?.firstName || "there"}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening in your network
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Skills</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skills?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              {skills?.length > 0
                ? "+2 from last month"
                : "Add your first skill"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connections</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profile?.connectionCount || 0}
            </div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profile?.profileViews || 0}
            </div>
            <p className="text-xs text-muted-foreground">+18% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skill Match</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Market relevance</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Skills Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Top Skills</CardTitle>
                <CardDescription>
                  Most endorsed and experienced skills
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/profile?tab=skills">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {skills && skills.length > 0 ? (
              skills.slice(0, 5).map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-medium line-clamp-1">
                      {skill.name}
                    </span>
                    <Badge
                      variant="secondary"
                      className={getSkillLevelColor(skill.level)}
                    >
                      {skill.level}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Award className="w-4 h-4" />
                    <span>{skill.endorsements}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <Lightbulb className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No skills added yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start building your profile by adding your skills
                </p>
                <Button asChild>
                  <Link to="/profile?tab=skills">Add Skills</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Experience */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>Your professional background</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/profile?tab=experience">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {experience && experience.length > 0 ? (
              experience.slice(0, 3).map((exp) => (
                <div key={exp.id} className="flex space-x-3">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold line-clamp-1">
                      {exp.position}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {exp.company}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(exp.startDate).getFullYear()} -{" "}
                      {exp.endDate
                        ? new Date(exp.endDate).getFullYear()
                        : "Present"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No experience added yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Showcase your professional background
                </p>
                <Button asChild>
                  <Link to="/profile?tab=experience">Add Experience</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your network</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm line-clamp-1">
                  Sarah Johnson connected with you
                </p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Briefcase className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm line-clamp-1">
                  New job match: React Developer at Tech Corp
                </p>
                <p className="text-xs text-muted-foreground">4 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm line-clamp-1">
                  Mike Chen endorsed your JavaScript skills
                </p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>

            <Button variant="outline" className="w-full" asChild>
              <Link to="/activity">View All Activity</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recommended Connections */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended Connections</CardTitle>
            <CardDescription>
              People you might want to connect with
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium line-clamp-1">
                    Alice Miller
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    UI/UX Designer
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="outline" className="text-xs py-0">
                      Design
                    </Badge>
                    <Badge variant="outline" className="text-xs py-0">
                      Figma
                    </Badge>
                  </div>
                </div>
              </div>
              <Button size="sm">Connect</Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>RT</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium line-clamp-1">
                    Robert Taylor
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    Data Scientist
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="outline" className="text-xs py-0">
                      Python
                    </Badge>
                    <Badge variant="outline" className="text-xs py-0">
                      ML
                    </Badge>
                  </div>
                </div>
              </div>
              <Button size="sm">Connect</Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>LW</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium line-clamp-1">Lisa Wong</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    Product Manager
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="outline" className="text-xs py-0">
                      Strategy
                    </Badge>
                    <Badge variant="outline" className="text-xs py-0">
                      Agile
                    </Badge>
                  </div>
                </div>
              </div>
              <Button size="sm">Connect</Button>
            </div>

            <Button variant="outline" className="w-full" asChild>
              <Link to="/connections">
                <Users className="mr-2 h-4 w-4" />
                Explore Connections
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Learning Progress */}
      {enrolledCourses.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/courses">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {enrolledCourses.slice(0, 2).map((course) => (
              <div
                key={course.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Play className="h-6 w-6 text-[#191961]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold line-clamp-1">{course.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                    {course.instructor}
                  </p>
                  <div className="flex items-center gap-2">
                    <Progress value={65} className="h-2 flex-1" />
                    <span className="text-xs text-muted-foreground">65%</span>
                  </div>
                </div>
                <Button size="sm" asChild>
                  <Link to={`/courses/${course.id}`}>Continue</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recommended Courses */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recommended Courses</CardTitle>
              <CardDescription>
                Based on your skills and interests
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/courses">Browse All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.slice(0, 3).map((course) => (
              <div
                key={course.id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-1 line-clamp-1">
                    {course.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                    {course.instructor}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{course.level}</Badge>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/courses/${course.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to get you started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              className="h-auto p-4 flex flex-col items-center space-y-2 min-h-[72px]"
              asChild
            >
              <Link to="/courses">
                <BookOpen className="h-5 w-5 md:h-6 md:w-6" />
                <span className="text-sm md:text-base">Browse Courses</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 min-h-[72px]"
              asChild
            >
              <Link to="/profile?tab=skills">
                <Lightbulb className="h-5 w-5 md:h-6 md:w-6" />
                <span className="text-sm md:text-base">Manage Skills</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 min-h-[72px]"
              asChild
            >
              <Link to="/messages">
                <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
                <span className="text-sm md:text-base">Send Message</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 min-h-[72px]"
              asChild
            >
              <Link to="/jobs">
                <Briefcase className="h-5 w-5 md:h-6 md:w-6" />
                <span className="text-sm md:text-base">Browse Jobs</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
