import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import {
  Search,
  Star,
  Clock,
  Users,
  Award,
  Filter,
  BookOpen,
  Code,
  Briefcase,
  Palette,
  Database,
  Smartphone,
  ArrowRight,
  ChevronUp,
} from "lucide-react";

const Learn = () => {
  useDocumentTitle("Learn - SkillLink");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll to top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const categories = [
    { id: "all", name: "All Courses", icon: BookOpen },
    { id: "programming", name: "Programming", icon: Code },
    { id: "business", name: "Business", icon: Briefcase },
    { id: "design", name: "Design", icon: Palette },
    { id: "data", name: "Data Science", icon: Database },
    { id: "mobile", name: "Mobile Dev", icon: Smartphone },
  ];

  const featuredCourses = [
    {
      id: 1,
      title: "Advanced React Development",
      instructor: "Akosua Tachie-Menson",
      company: "Google Ghana",
      image: "/api/placeholder/400/240",
      rating: 4.9,
      students: 2347,
      duration: "12 hours",
      level: "Advanced",
      price: 299,
      category: "programming",
      description:
        "Master advanced React patterns, hooks, and performance optimization techniques used in production applications.",
    },
    {
      id: 2,
      title: "Product Management Fundamentals",
      instructor: "Kwame Asante",
      company: "Hubtel",
      image: "/api/placeholder/400/240",
      rating: 4.8,
      students: 1823,
      duration: "8 hours",
      level: "Beginner",
      price: 239,
      category: "business",
      description:
        "Learn the essential skills and frameworks for successful product management in tech companies.",
    },
    {
      id: 3,
      title: "UX Design Bootcamp",
      instructor: "Ama Osei",
      company: "DreamOval",
      image: "/api/placeholder/400/240",
      rating: 4.9,
      students: 3156,
      duration: "16 hours",
      level: "Intermediate",
      price: 479,
      category: "design",
      description:
        "Complete UX design course covering research, wireframing, prototyping, and user testing.",
    },
    {
      id: 4,
      title: "Machine Learning with Python",
      instructor: "Kofi Boakye",
      company: "Microsoft Ghana",
      image: "/api/placeholder/400/240",
      rating: 4.7,
      students: 1943,
      duration: "20 hours",
      level: "Intermediate",
      price: 539,
      category: "data",
      description:
        "Hands-on machine learning course with real-world projects and industry best practices.",
    },
    {
      id: 5,
      title: "iOS App Development",
      instructor: "Efua Adjei",
      company: "Ashesi University",
      image: "/api/placeholder/400/240",
      rating: 4.8,
      students: 1456,
      duration: "14 hours",
      level: "Beginner",
      price: 359,
      category: "mobile",
      description:
        "Build your first iOS app from scratch using Swift and modern development practices.",
    },
    {
      id: 6,
      title: "Digital Marketing Strategy",
      instructor: "Nana Akoto",
      company: "MEST Africa",
      image: "/api/placeholder/400/240",
      rating: 4.6,
      students: 2891,
      duration: "10 hours",
      level: "Beginner",
      price: 279,
      category: "business",
      description:
        "Comprehensive digital marketing course covering SEO, social media, and analytics.",
    },
  ];

  const stats = [
    { number: "500+", label: "Expert Courses" },
    { number: "50K+", label: "Active Learners" },
    { number: "95%", label: "Completion Rate" },
    { number: "4.8", label: "Average Rating" },
  ];

  const filteredCourses = featuredCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-20 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full opacity-12"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-500 rounded-full opacity-10"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-emerald-500 rounded-full opacity-8"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Learn from industry experts
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
              Access courses designed and taught by professionals from top
              companies. Build practical skills that advance your career.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search courses, instructors, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-300 focus:bg-white/20"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-gradient-to-r from-indigo-900 to-purple-900 border-b border-indigo-700 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-32 w-64 h-64 bg-violet-500 rounded-full opacity-10"></div>
          <div className="absolute bottom-0 -right-32 w-72 h-72 bg-blue-500 rounded-full opacity-12"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category.id
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-600"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 right-1/4 w-80 h-80 bg-emerald-500 rounded-full opacity-10"></div>
          <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-teal-500 rounded-full opacity-12"></div>
          <div className="absolute top-1/2 -right-32 w-64 h-64 bg-cyan-500 rounded-full opacity-8"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {selectedCategory === "all"
                  ? "Featured Courses"
                  : `${
                      categories.find((c) => c.id === selectedCategory)?.name
                    } Courses`}
              </h2>
              <p className="text-gray-300">
                {filteredCourses.length} courses found
              </p>
            </div>
            {/* <Button
              variant="outline"
              className="flex items-center border-gray-600 text-gray-200 hover:bg-gray-800"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button> */}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700"
              >
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover bg-gray-200"
                  />
                  <div
                    className={`absolute top-4 left-4 px-2 py-1 rounded text-xs font-medium ${getLevelColor(
                      course.level
                    )}`}
                  >
                    {course.level}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(course.rating) ? "fill-current" : ""
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-300">
                      ({course.rating}) • {course.students.toLocaleString()}{" "}
                      students
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {course.description}
                  </p>

                  <div className="flex items-center mb-4">
                    <img
                      src="/api/placeholder/32/32"
                      alt={course.instructor}
                      className="w-8 h-8 rounded-full mr-3 bg-gray-300"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {course.instructor}
                      </p>
                      <p className="text-xs text-gray-400">{course.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-300">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-yellow-400">
                      GHS {course.price}
                    </span>
                    <Link to="/auth/register">
                      <Button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold">
                        Enroll Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No courses found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-gray-800 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gray-700 rounded-full opacity-30"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gray-600 rounded-full opacity-20"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gray-800 rounded-full opacity-25"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Structured Learning Paths
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Follow curated learning paths designed to take you from beginner
              to expert in your chosen field.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Full-Stack Developer",
                courses: 8,
                duration: "6 months",
                description:
                  "Master both frontend and backend development with modern technologies.",
                skills: ["React", "Node.js", "Databases", "APIs"],
              },
              {
                title: "Product Manager",
                courses: 6,
                duration: "4 months",
                description:
                  "Learn product strategy, user research, and agile development practices.",
                skills: ["Strategy", "Research", "Analytics", "Leadership"],
              },
              {
                title: "Data Scientist",
                courses: 10,
                duration: "8 months",
                description:
                  "Build expertise in machine learning, statistics, and data visualization.",
                skills: ["Python", "ML", "Statistics", "Visualization"],
              },
            ].map((path, index) => (
              <Card
                key={index}
                className="text-center border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-[#191961] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {path.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{path.description}</p>

                  <div className="flex justify-center gap-4 mb-4 text-sm text-gray-600">
                    <span>{path.courses} courses</span>
                    <span>•</span>
                    <span>{path.duration}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {path.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <Link to="/auth/register">
                    <Button className="bg-[#191961] hover:bg-[#191961]/90 w-full text-white">
                      Start Path
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#191961] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to start learning?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of professionals advancing their careers through our
            expert-led courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-300 text-[#191961] font-semibold"
              >
                Start Learning Today
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#191961]"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-[#191961] hover:bg-[#2d2b69] text-white p-3 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        </button>
      )}
    </div>
  );
};

export default Learn;
