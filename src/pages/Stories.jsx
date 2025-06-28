import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import {
  Star,
  Quote,
  Users,
  TrendingUp,
  Award,
  ArrowRight,
  Heart,
  Briefcase,
  GraduationCap,
  MapPin,
  ChevronUp,
} from "lucide-react";

const Stories = () => {
  useDocumentTitle("Success Stories - SkillLink");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [expandedStories, setExpandedStories] = useState(new Set());
  const [isFeaturedExpanded, setIsFeaturedExpanded] = useState(false);

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

  const toggleStoryExpansion = (storyId) => {
    setExpandedStories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(storyId)) {
        newSet.delete(storyId);
      } else {
        newSet.add(storyId);
      }
      return newSet;
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  const categories = [
    { id: "all", name: "All Stories" },
    { id: "career-change", name: "Career Change" },
    { id: "promotion", name: "Promotion" },
    { id: "skill-building", name: "Skill Building" },
    { id: "startup", name: "Startup Success" },
    { id: "certification", name: "Certification" },
  ];

  const featuredStory = {
    name: "Akosua Mensah",
    title: "From Banking to Software Engineering",
    company: "Hubtel",
    image: "/api/placeholder/400/400",
    location: "Accra, Ghana",
    story:
      "After 6 years in banking, I decided to pursue my passion for technology. SkillLink's structured learning paths and supportive community of Ghanaian professionals helped me transition into software engineering. Within 15 months, I landed my dream job at Hubtel.",
    courses: [
      "JavaScript Fundamentals",
      "React Development",
      "Full-Stack Bootcamp",
    ],
    outcome:
      "Increased salary by 150% and found fulfilling work in Ghana's fintech sector",
    category: "career-change",
  };

  const successStories = [
    {
      id: 1,
      name: "Kwame Asante",
      title: "Marketing Manager → Product Manager",
      company: "MTN Ghana",
      image: "/api/placeholder/300/300",
      location: "Kumasi, Ghana",
      story:
        "The Product Management course gave me the framework and confidence to transition from marketing to product in Ghana's telecom industry. The hands-on projects and mentor feedback were invaluable.",
      courses: ["Product Management Fundamentals", "Data Analytics"],
      outcome: "40% salary increase and leadership role",
      category: "career-change",
      rating: 5,
    },
    {
      id: 2,
      name: "Ama Osei",
      title: "Junior Developer → Senior Engineer",
      company: "DreamOval",
      image: "/api/placeholder/300/300",
      location: "Accra, Ghana",
      story:
        "The advanced React course and system design modules helped me level up my technical skills in Ghana's growing tech ecosystem. I got promoted twice in 18 months after completing the program.",
      courses: ["Advanced React", "System Design", "Leadership Skills"],
      outcome: "Double promotion and team lead position",
      category: "promotion",
      rating: 5,
    },
    {
      id: 3,
      name: "Kofi Mensah",
      title: "Freelancer → Startup Founder",
      company: "GhanaStart Ltd.",
      image: "/api/placeholder/300/300",
      location: "Tema, Ghana",
      story:
        "SkillLink's entrepreneurship track gave me the business skills I was missing as a technical freelancer. Now I'm running a successful agritech startup with 15 employees across Ghana.",
      courses: ["Business Strategy", "Startup Fundamentals", "Leadership"],
      outcome: "Founded successful startup, $2M funding raised",
      category: "startup",
      rating: 5,
    },
    {
      id: 4,
      name: "Efua Adjei",
      title: "Data Analyst Certification Success",
      company: "Ghana Commercial Bank",
      image: "/api/placeholder/300/300",
      location: "Cape Coast, Ghana",
      story:
        "The data science certification program was comprehensive and practical. It gave me the credibility I needed to transition from traditional banking to data analytics in Ghana's financial sector.",
      courses: ["Data Science Bootcamp", "Python for Analytics", "SQL Mastery"],
      outcome: "Career pivot with 60% salary increase",
      category: "certification",
      rating: 5,
    },
    {
      id: 5,
      name: "Nana Akoto",
      title: "Upskilled for Digital Transformation",
      company: "Vodafone Ghana",
      image: "/api/placeholder/300/300",
      location: "Accra, Ghana",
      story:
        "As Vodafone Ghana went through digital transformation, SkillLink helped me stay relevant by learning cloud technologies and agile methodologies relevant to the African market.",
      courses: ["AWS Certification", "Agile Project Management", "DevOps"],
      outcome: "Retained position and became transformation lead",
      category: "skill-building",
      rating: 5,
    },
    {
      id: 6,
      name: "Abena Boateng",
      title: "Designer → UX Research Lead",
      company: "Turntable",
      image: "/api/placeholder/300/300",
      location: "Accra, Ghana",
      story:
        "The UX research specialization helped me transition from visual design to research in Ghana's creative tech industry. The portfolio projects were key to landing interviews.",
      courses: [
        "UX Research Methods",
        "Psychology of Design",
        "Research Portfolio",
      ],
      outcome: "Leadership role in UX research team",
      category: "promotion",
      rating: 5,
    },
  ];

  const filteredStories = successStories.filter(
    (story) => selectedCategory === "all" || story.category === selectedCategory
  );

  const stats = [
    { number: "15K+", label: "Success Stories", icon: Users },
    { number: "78%", label: "Career Advancement", icon: TrendingUp },
    { number: "92%", label: "Salary Increase", icon: Award },
    { number: "4.9/5", label: "Student Rating", icon: Star },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      "career-change": "bg-blue-500/20 text-blue-400",
      promotion: "bg-green-500/20 text-green-400",
      "skill-building": "bg-purple-500/20 text-purple-400",
      startup: "bg-orange-500/20 text-orange-400",
      certification: "bg-indigo-500/20 text-indigo-400",
    };
    return colors[category] || "bg-gray-500/20 text-gray-400";
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
          <div className="text-center">
            {/* <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-[#191961]" />
            </div> */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Success Stories
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
              Real people, real transformations. See how SkillLink has helped
              professionals around the world advance their careers and achieve
              their goals.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-[#191961]" />
                    </div>
                    <div className="text-2xl font-bold text-yellow-400 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Story */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-40 w-72 h-72 bg-violet-500 rounded-full opacity-10"></div>
          <div className="absolute -bottom-32 right-1/3 w-64 h-64 bg-blue-500 rounded-full opacity-12"></div>
          <div className="absolute top-1/2 right-0 w-56 h-56 bg-cyan-500 rounded-full opacity-8"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Success Story
            </h2>
            <p className="text-xl text-gray-300">
              Inspiring career transformation through dedication and learning
            </p>
          </div>

          <Card className="overflow-hidden shadow-xl max-w-5xl mx-auto bg-gray-800/50 backdrop-blur-sm border border-gray-700">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="bg-[#191961] text-white p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <Quote className="w-12 h-12 text-yellow-400 mb-4" />
                  <p className="text-lg leading-relaxed mb-4">
                    "
                    {isFeaturedExpanded
                      ? featuredStory.story
                      : truncateText(featuredStory.story, 200)}
                    "
                  </p>
                  {featuredStory.story.length > 200 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFeaturedExpanded(!isFeaturedExpanded)}
                      className="text-yellow-400 hover:bg-yellow-400/10 p-0"
                    >
                      {isFeaturedExpanded ? "Read Less" : "Read More"}
                      <ArrowRight
                        className={`ml-1 w-3 h-3 transition-transform duration-200 ${
                          isFeaturedExpanded ? "rotate-90" : ""
                        }`}
                      />
                    </Button>
                  )}
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-yellow-400 mb-2">
                    Courses Completed:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {featuredStory.courses.map((course, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/20 pt-6">
                  <h4 className="font-semibold text-yellow-400 mb-2">
                    Outcome:
                  </h4>
                  <p className="text-gray-200">{featuredStory.outcome}</p>
                </div>
              </div>

              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="text-center">
                  <img
                    src={featuredStory.image}
                    alt={featuredStory.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 bg-gray-200"
                  />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {featuredStory.name}
                  </h3>
                  <p className="text-lg text-white font-semibold mb-1">
                    {featuredStory.title}
                  </p>
                  <div className="flex items-center justify-center text-gray-300 mb-2">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span>{featuredStory.company}</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-300 mb-6">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{featuredStory.location}</span>
                  </div>

                  <div
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                      featuredStory.category
                    )}`}
                  >
                    {
                      categories.find((c) => c.id === featuredStory.category)
                        ?.name
                    }
                  </div>
                </div>
              </div>
            </div>
          </Card>
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
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? "bg-yellow-400 text-gray-900"
                    : "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-600"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-900 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 right-1/4 w-80 h-80 bg-emerald-500 rounded-full opacity-10"></div>
          <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-teal-500 rounded-full opacity-12"></div>
          <div className="absolute top-1/2 -right-32 w-64 h-64 bg-cyan-500 rounded-full opacity-8"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">
              {selectedCategory === "all"
                ? "All Success Stories"
                : `${
                    categories.find((c) => c.id === selectedCategory)?.name
                  } Stories`}
            </h2>
            <p className="text-gray-300">
              {filteredStories.length} stories found
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story) => (
              <Card
                key={story.id}
                className="overflow-hidden hover:shadow-lg transition-shadow bg-gray-800/50 backdrop-blur-sm border border-gray-700"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-48 object-cover bg-gray-200"
                    />
                    <div
                      className={`absolute top-4 left-4 px-2 py-1 rounded text-xs font-medium ${getCategoryColor(
                        story.category
                      )}`}
                    >
                      {categories.find((c) => c.id === story.category)?.name}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {story.name}
                      </h3>
                      <p className="text-white font-medium mb-1">
                        {story.title}
                      </p>
                      <div className="flex items-center justify-center text-gray-300 text-sm mb-2">
                        <Briefcase className="w-4 h-4 mr-1" />
                        <span>{story.company}</span>
                      </div>
                      <div className="flex items-center justify-center text-gray-300 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{story.location}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Quote className="w-6 h-6 text-[#191961] mb-2" />
                      <p className="text-gray-300 text-sm italic mb-2">
                        "
                        {expandedStories.has(story.id)
                          ? story.story
                          : truncateText(story.story)}
                        "
                      </p>
                      {story.story.length > 150 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStoryExpansion(story.id)}
                          className="text-yellow-400 hover:bg-yellow-400/10 p-0 text-xs"
                        >
                          {expandedStories.has(story.id)
                            ? "Show Less"
                            : "Show More"}
                        </Button>
                      )}
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-white mb-2 text-sm">
                        Courses:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {story.courses.slice(0, 2).map((course, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-700 text-gray-200 text-xs rounded"
                          >
                            {course}
                          </span>
                        ))}
                        {story.courses.length > 2 && (
                          <span className="px-2 py-1 bg-gray-700 text-gray-200 text-xs rounded">
                            +{story.courses.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex text-yellow-400">
                          {[...Array(story.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <div className="text-xs text-gray-400">
                          {story.outcome && (
                            <span className="font-medium">
                              Outcome: {truncateText(story.outcome, 50)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStories.length === 0 && (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No stories found
              </h3>
              <p className="text-gray-300">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="py-20 bg-[#191961] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-8 h-8 text-[#191961]" />
          </div> */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your success story starts here
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of professionals who have transformed their careers
            through SkillLink. Start your learning journey today and write your
            own success story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-300 text-[#191961] font-semibold"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/learn">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#191961]"
              >
                Explore Courses
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

export default Stories;
