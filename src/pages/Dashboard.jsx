import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Check,
  UserPlus,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { useLMS } from "@/context/LMSContext";
import { useConnections } from "@/context/ConnectionsContext";
import { useNotifications } from "@/context/NotificationContext";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const Dashboard = () => {
  const { user } = useAuth();
  const { profile, skills, experience, isLoading } = useProfile();
  const { courses, enrolledCourses, certificates, continueLesson } = useLMS();
  const { sendConnectionRequest } = useConnections();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const [connectedUsers, setConnectedUsers] = useState(new Set());
  const [isConnecting, setIsConnecting] = useState(false);

  useDocumentTitle("Dashboard");

  // Mock recommended connections data
  const recommendedConnections = [
    {
      id: 1,
      name: "Alice Miller",
      title: "UI/UX Designer",
      skills: ["Design", "Figma"],
      avatar: "AM",
    },
    {
      id: 2,
      name: "Robert Taylor",
      title: "Data Scientist",
      skills: ["Python", "ML"],
      avatar: "RT",
    },
    {
      id: 3,
      name: "Lisa Wong",
      title: "Product Manager",
      skills: ["Strategy", "Agile"],
      avatar: "LW",
    },
  ];

  // Handler functions for button interactions
  const handleConnect = async (userId, userName) => {
    setIsConnecting(true);
    try {
      // Check if user is already connected
      if (connectedUsers.has(userId)) {
        addNotification({
          type: "info",
          message: `You are already connected with ${userName}`,
        });
        // Navigate to connections page to view existing connections
        setTimeout(() => navigate("/app/connections"), 1000);
        return;
      }

      // Send connection request
      await sendConnectionRequest(userId);

      // Update local state
      setConnectedUsers((prev) => new Set([...prev, userId]));

      // Show success notification
      addNotification({
        type: "success",
        message: `Connection request sent to ${userName}`,
      });

      // Navigate to connections page after successful connection
      setTimeout(() => navigate("/app/connections"), 1500);
    } catch (error) {
      addNotification({
        type: "error",
        message: "Failed to send connection request. Please try again.",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleContinueLearning = async (courseId) => {
    try {
      // Continue the course lesson
      await continueLesson(courseId);

      // Navigate to course detail page for learning
      navigate(`/app/course/${courseId}`);

      addNotification({
        type: "success",
        message: "Resuming your learning session",
      });
    } catch (error) {
      addNotification({
        type: "error",
        message: "Failed to continue lesson. Please try again.",
      });
    }
  };

  const handleViewCourse = (courseId) => {
    navigate(`/app/courses/${courseId}`);
  };

  const handleQuickAction = (action) => {
    addNotification({
      type: "info",
      message: `Navigating to ${action}...`,
    });
  };

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
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
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
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Total Skills
            </CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {skills?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {skills?.length > 0
                ? "+2 from last month"
                : "Add your first skill"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Connections
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {profile?.connectionCount || 0}
            </div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Profile Views
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {profile?.profileViews || 0}
            </div>
            <p className="text-xs text-muted-foreground">+18% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Skill Match
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Market relevance</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm"
                asChild
              >
                <Link to="/app/profile?tab=skills">View All</Link>
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
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-sm sm:text-base font-medium line-clamp-1">
                      {skill.name}
                    </span>
                    <Badge
                      variant="secondary"
                      className={getSkillLevelColor(skill.level)}
                    >
                      {skill.level}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-muted-foreground">
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
                  <Link to="/app/profile?tab=skills">Add Skills</Link>
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
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm"
                asChild
              >
                <Link to="/app/profile?tab=experience">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {experience && experience.length > 0 ? (
              experience.slice(0, 3).map((exp) => (
                <div key={exp.id} className="flex space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary rounded-lg flex items-center justify-center">
                    <Building className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base font-semibold line-clamp-1">
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
                  <Link to="/app/profile?tab=experience">Add Experience</Link>
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

            <Button
              variant="outline"
              className="w-full text-xs sm:text-sm"
              asChild
            >
              <Link to="/app/activity">View All Activity</Link>
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
            {recommendedConnections.map((connection) => (
              <div
                key={connection.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                    <AvatarFallback>{connection.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs sm:text-sm font-medium line-clamp-1">
                      {connection.name}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {connection.title}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {connection.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs py-0"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="text-xs sm:text-sm px-2 sm:px-3"
                  onClick={() => handleConnect(connection.id, connection.name)}
                  disabled={isConnecting || connectedUsers.has(connection.id)}
                >
                  {connectedUsers.has(connection.id) ? (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      Connected
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3 h-3 mr-1" />
                      Connect
                    </>
                  )}
                </Button>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full text-xs sm:text-sm"
              asChild
            >
              <Link to="/app/connections">
                <Users className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
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
                <Link to="/app/courses">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {enrolledCourses.slice(0, 2).map((course) => (
              <div
                key={course.id}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Play className="h-4 w-4 sm:h-6 sm:w-6 text-[#191961]" />
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
                <Button
                  size="sm"
                  className="text-xs sm:text-sm px-2 sm:px-3"
                  onClick={() => handleContinueLearning(course.id)}
                >
                  Continue
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
              <Link to="/app/courses">Browse All</Link>
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
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewCourse(course.id)}
                    >
                      View
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
              onClick={() => handleQuickAction("Browse Courses")}
              asChild
            >
              <Link to="/app/courses">
                <BookOpen className="h-5 w-5 md:h-6 md:w-6" />
                <span className="text-sm md:text-base">Browse Courses</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 min-h-[72px]"
              onClick={() => handleQuickAction("Manage Skills")}
              asChild
            >
              <Link to="/app/profile?tab=skills">
                <Lightbulb className="h-5 w-5 md:h-6 md:w-6" />
                <span className="text-sm md:text-base">Manage Skills</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 min-h-[72px]"
              onClick={() => handleQuickAction("Send Message")}
              asChild
            >
              <Link to="/app/messages">
                <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
                <span className="text-sm md:text-base">Send Message</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 min-h-[72px]"
              onClick={() => handleQuickAction("Browse Jobs")}
              asChild
            >
              <Link to="/app/jobs">
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
