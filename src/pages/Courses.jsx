import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Clock,
  Users,
  Star,
  Play,
  BookOpen,
  Award,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { useLMS } from "@/context/LMSContext";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const Courses = () => {
  useDocumentTitle("Courses");
  const { courses, enrolledCourses, enrollInCourse, isLoading } = useLMS();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const [notification, setNotification] = useState(null);

  const featuredCourses = courses
    .filter((course) => course.rating >= 4.7)
    .slice(0, 4);

  const categories = [
    "All",
    "Programming",
    "Web Development",
    "Design",
    "Data Science",
    "Marketing",
  ];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];
  const sortOptions = [
    { value: "popularity", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "recent", label: "Most Recent" },
    { value: "alphabetical", label: "A-Z" },
  ];

  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "All" || course.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.enrolledCount - a.enrolledCount;
        case "rating":
          return b.rating - a.rating;
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "recent":
          return b.id - a.id; // Assuming higher ID means more recent
        default:
          return 0;
      }
    });

  const isEnrolled = (courseId) => {
    return enrolledCourses.some((course) => course.id === courseId);
  };

  const handleEnroll = async (course) => {
    const result = await enrollInCourse(course);
    if (result.success) {
      setNotification({
        type: "success",
        message: result.message || `Successfully enrolled in ${course.title}!`,
      });
      setTimeout(() => setNotification(null), 4000);
    } else {
      setNotification({
        type: "error",
        message: result.error || "Failed to enroll in course",
      });
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLevel("All");
    setSortBy("popularity");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground">
            Discover and learn new skills with our free courses
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <BookOpen className="w-3 h-3 mr-1" />
            {courses.length} Available
          </Badge>
        </div>
      </div>

      {/* Continue Learning */}
      {enrolledCourses.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <ChevronRight className="w-3 h-3 mr-1" />
                In Progress
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="card-content-fix">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrolledCourses.slice(0, 3).map((course) => (
                <Card
                  key={course.id}
                  className="group hover:shadow-md transition-shadow duration-200"
                >
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-200" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="bg-white/90 rounded-full p-2">
                        <Play className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <Badge className="absolute top-2 left-2 bg-white/90 text-primary hover:bg-white text-xs">
                      {course.level}
                    </Badge>
                    {course.progress > 0 && (
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="bg-white/90 rounded-full h-2">
                          <div
                            className="bg-primary rounded-full h-2 transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm leading-tight line-clamp-2">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-1">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{course.progress || 0}% complete</span>
                      </div>
                    </div>

                    <div className="text-xs">
                      <span className="text-muted-foreground">by </span>
                      <span className="font-medium">{course.instructor}</span>
                    </div>

                    <div className="pt-1">
                      <Button asChild size="sm" className="w-full text-xs">
                        <Link to={`/courses/${course.id}`}>
                          Continue Learning
                          <ChevronRight className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Featured Courses */}
      {featuredCourses.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Featured Courses</CardTitle>
                <CardDescription>
                  Top-rated courses recommended for you
                </CardDescription>
              </div>
              <Badge
                variant="secondary"
                className="bg-yellow-100 text-yellow-800"
              >
                <Award className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="card-content-fix">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredCourses.map((course) => (
                <Card
                  key={course.id}
                  className="group hover:shadow-md transition-shadow duration-200"
                >
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-200" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="bg-white/90 rounded-full p-2">
                        <Play className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <Badge className="absolute top-2 left-2 bg-white/90 text-primary hover:bg-white text-xs">
                      {course.level}
                    </Badge>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm leading-tight line-clamp-2">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-1">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    <div className="text-xs">
                      <span className="text-muted-foreground">by </span>
                      <span className="font-medium">{course.instructor}</span>
                    </div>

                    <div className="pt-1">
                      {isEnrolled(course.id) ? (
                        <Button asChild size="sm" className="w-full text-xs">
                          <Link to={`/courses/${course.id}`}>Continue</Link>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleEnroll(course)}
                          disabled={isLoading}
                          size="sm"
                          className="w-full text-xs"
                          variant="outline"
                        >
                          {isLoading ? "Enrolling..." : "Enroll"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recommended Courses</CardTitle>
          <CardDescription>
            Find the perfect course for your learning journey
          </CardDescription>
        </CardHeader>
        <CardContent className="card-content-fix">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search courses, instructors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-col lg:flex-row gap-4 items-end">
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 flex-1">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Level</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear Filters Button */}
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {filteredCourses.length} course
                {filteredCourses.length !== 1 ? "s" : ""} found
                {searchQuery && ` for "${searchQuery}"`}
              </span>
              {(searchQuery ||
                selectedCategory !== "All" ||
                selectedLevel !== "All") && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Show all courses
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="group hover:shadow-lg transition-shadow duration-200"
          >
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-200" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-white/90 rounded-full p-3">
                  <Play className="h-6 w-6 text-primary" />
                </div>
              </div>
              <Badge className="absolute top-3 left-3 bg-white/90 text-primary hover:bg-white">
                {course.level}
              </Badge>
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg leading-tight line-clamp-2">
                  {course.title}
                </CardTitle>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200 shrink-0"
                >
                  FREE
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">
                {course.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0 space-y-4">
              {/* Course Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{course.enrolledCount}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="text-sm">
                <span className="text-muted-foreground">by </span>
                <span className="font-medium">{course.instructor}</span>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                {isEnrolled(course.id) ? (
                  <Button asChild className="w-full">
                    <Link to={`/courses/${course.id}`}>
                      Continue Learning
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleEnroll(course)}
                    disabled={isLoading}
                    className="w-full"
                    variant="outline"
                  >
                    {isLoading ? "Enrolling..." : "Enroll Now"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border-l-4 max-w-md ${
            notification.type === "success"
              ? "bg-green-50 border-green-500 text-green-700"
              : "bg-red-50 border-red-500 text-red-700"
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? (
              <BookOpen className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
