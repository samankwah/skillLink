import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Filter,
  Newspaper,
  TrendingUp,
  Award,
  Users,
  ChevronUp,
} from "lucide-react";

const News = () => {
  useDocumentTitle("News - SkillLink");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [expandedArticles, setExpandedArticles] = useState(new Set());
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

  const toggleArticleExpansion = (articleId) => {
    setExpandedArticles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  const categories = [
    { id: "all", name: "All News" },
    { id: "platform", name: "Platform Updates" },
    { id: "partnerships", name: "Partnerships" },
    { id: "courses", name: "New Courses" },
    { id: "community", name: "Community" },
    { id: "industry", name: "Industry Insights" },
  ];

  const featuredNews = {
    title: "SkillLink Announces $50M Series B Funding to Expand Global Reach",
    excerpt:
      "Funding will accelerate international expansion and enhance AI-powered learning experiences for professionals worldwide.",
    content:
      "SkillLink, the leading professional learning platform, today announced the successful completion of its Series B funding round, raising $50 million to accelerate global expansion and enhance its AI-powered learning experiences. The round was led by Sequoia Capital, with participation from existing investors including Andreessen Horowitz and Google Ventures. This brings SkillLink's total funding to $85 million since its inception in 2020. The new capital will be used to expand into new markets across Europe, Asia, and Latin America, while also investing heavily in artificial intelligence and machine learning capabilities to create more personalized learning experiences for the platform's rapidly growing user base of over 500,000 professionals worldwide.",
    image: "/api/placeholder/800/400",
    date: "2024-01-15",
    author: "SkillLink Team",
    readTime: "5 min read",
    category: "platform",
  };

  const newsArticles = [
    {
      id: 1,
      title:
        "Partnership with Microsoft Brings Azure Certification Programs to SkillLink",
      excerpt:
        "New collaboration offers comprehensive cloud computing courses and official Microsoft certifications.",
      content:
        "SkillLink has announced a strategic partnership with Microsoft to bring official Azure certification programs to our platform. This collaboration will provide learners with access to comprehensive cloud computing courses, hands-on labs, and the opportunity to earn industry-recognized Microsoft Azure certifications. The partnership includes over 15 specialized courses covering Azure fundamentals, cloud architecture, security, and advanced DevOps practices. These courses are designed by Microsoft certified trainers and include real-world projects that prepare learners for immediate application in their careers.",
      image: "/api/placeholder/400/240",
      date: "2024-01-12",
      author: "Sarah Mitchell",
      readTime: "3 min read",
      category: "partnerships",
    },
    {
      id: 2,
      title:
        "Introducing AI-Powered Learning Paths: Personalized Education at Scale",
      excerpt:
        "Our new machine learning algorithm creates customized learning experiences based on individual goals and progress.",
      content:
        "SkillLink today launched its revolutionary AI-powered learning paths feature, utilizing advanced machine learning algorithms to create truly personalized educational experiences for each learner. The system analyzes individual learning patterns, career goals, current skill levels, and industry trends to recommend optimal learning sequences. The AI considers factors such as learning speed, preferred content types, available time, and career aspirations to dynamically adjust course recommendations and pacing. This breakthrough technology has already shown impressive results in beta testing, with learners completing courses 40% faster and achieving 25% higher retention rates compared to traditional linear learning approaches.",
      image: "/api/placeholder/400/240",
      date: "2024-01-10",
      author: "David Chen",
      readTime: "4 min read",
      category: "platform",
    },
    {
      id: 3,
      title: "SkillLink Community Reaches 50,000 Active Learners Milestone",
      excerpt:
        "Platform growth accelerates as professionals worldwide embrace continuous learning and skill development.",
      content:
        "SkillLink celebrates a major milestone as our learning community surpasses 50,000 active learners worldwide. This achievement represents a 300% growth rate over the past 18 months, highlighting the increasing demand for professional skill development in today's rapidly evolving job market. Our diverse community spans across 85 countries, with professionals from tech, healthcare, finance, marketing, and numerous other industries. The platform has facilitated over 2 million learning hours and awarded more than 15,000 professional certifications, with learners reporting an average salary increase of 35% after completing their courses.",
      image: "/api/placeholder/400/240",
      date: "2024-01-08",
      author: "Maria Rodriguez",
      readTime: "2 min read",
      category: "community",
    },
    {
      id: 4,
      title:
        "New Data Science Bootcamp Launches with Industry-Leading Instructors",
      excerpt:
        "Comprehensive 12-week program covers machine learning, Python, and real-world project experience.",
      content:
        "SkillLink announces the launch of its intensive Data Science Bootcamp, a comprehensive 12-week program designed to transform beginners into job-ready data scientists. The bootcamp features world-class instructors from Google, Netflix, and Spotify, ensuring learners receive industry-relevant training. The curriculum covers Python programming, statistical analysis, machine learning algorithms, data visualization, and big data technologies. Students work on real-world projects using datasets from partner companies, giving them practical experience that employers value.",
      image: "/api/placeholder/400/240",
      date: "2024-01-05",
      author: "Emily Johnson",
      readTime: "3 min read",
      category: "courses",
    },
    {
      id: 5,
      title:
        "Remote Work Skills: Essential Competencies for the Modern Workplace",
      excerpt:
        "Industry report reveals key skills needed for remote work success and career advancement.",
      content:
        "A comprehensive industry report released by SkillLink Research reveals the essential skills needed for remote work success in 2024. The study, based on surveys from 10,000 remote workers and 500 hiring managers, identifies communication, digital collaboration, time management, and self-motivation as the top competencies. The report also highlights emerging skills like virtual leadership, asynchronous communication, and digital wellness as critical for career advancement in remote-first organizations.",
      image: "/api/placeholder/400/240",
      date: "2024-01-03",
      author: "James Wilson",
      readTime: "6 min read",
      category: "industry",
    },
    {
      id: 6,
      title:
        'SkillLink Wins "Best Learning Platform" at EdTech Innovation Awards',
      excerpt:
        "Recognition highlights platform's impact on professional development and career advancement.",
      content:
        "SkillLink has been honored with the prestigious 'Best Learning Platform' award at the annual EdTech Innovation Awards. The recognition celebrates SkillLink's innovative approach to professional development, particularly its AI-powered personalization features and strong community-driven learning environment. The judges praised the platform's measurable impact on career advancement, with 78% of learners reporting promotions or career changes within 6 months of completing their courses.",
      image: "/api/placeholder/400/240",
      date: "2024-01-01",
      author: "SkillLink Team",
      readTime: "2 min read",
      category: "platform",
    },
  ];

  const filteredNews = newsArticles.filter(
    (article) =>
      selectedCategory === "all" || article.category === selectedCategory
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      platform: "bg-blue-500/20 text-blue-400",
      partnerships: "bg-green-500/20 text-green-400",
      courses: "bg-purple-500/20 text-purple-400",
      community: "bg-yellow-500/20 text-yellow-400",
      industry: "bg-red-500/20 text-red-400",
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Newspaper className="w-8 h-8 text-[#191961]" />
            </div> */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Latest News & Updates
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Stay updated with the latest developments, partnerships, and
              insights from the SkillLink community and the broader learning
              ecosystem.
            </p>
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

      {/* Featured News */}
      <section className="py-12 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 right-1/4 w-80 h-80 bg-emerald-500 rounded-full opacity-10"></div>
          <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-teal-500 rounded-full opacity-12"></div>
          <div className="absolute top-1/2 -right-32 w-64 h-64 bg-cyan-500 rounded-full opacity-8"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden shadow-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="order-2 lg:order-1">
                <img
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  className="w-full h-64 lg:h-full object-cover bg-gray-200"
                />
              </div>
              <div className="order-1 lg:order-2 p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                      featuredNews.category
                    )}`}
                  >
                    Featured Story
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  {featuredNews.title}
                </h2>
                <p className="text-gray-300 mb-4 text-lg">
                  {isFeaturedExpanded
                    ? featuredNews.content
                    : featuredNews.excerpt}
                </p>
                {featuredNews.content &&
                  featuredNews.content.length > featuredNews.excerpt.length && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFeaturedExpanded(!isFeaturedExpanded)}
                      className="text-yellow-400 hover:bg-yellow-400/10 p-0 mb-4"
                    >
                      {isFeaturedExpanded ? "Read Less" : "Read More"}
                      <ArrowRight
                        className={`ml-1 w-3 h-3 transition-transform duration-200 ${
                          isFeaturedExpanded ? "rotate-90" : ""
                        }`}
                      />
                    </Button>
                  )}
                <div className="flex items-center text-sm text-gray-400 mb-6">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="mr-4">{formatDate(featuredNews.date)}</span>
                  <User className="w-4 h-4 mr-2" />
                  <span className="mr-4">{featuredNews.author}</span>
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{featuredNews.readTime}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-900 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-10"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-violet-500 rounded-full opacity-12"></div>
          <div className="absolute top-2/3 -left-24 w-64 h-64 bg-emerald-500 rounded-full opacity-8"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {selectedCategory === "all"
                  ? "All News"
                  : categories.find((c) => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-300">
                {filteredNews.length} articles found
              </p>
            </div>
            {/* <Button variant="outline" className="flex items-center border-gray-600 text-gray-200 hover:bg-gray-800">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button> */}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden hover:shadow-lg transition-shadow bg-gray-800/50 backdrop-blur-sm border border-gray-700"
              >
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover bg-gray-200"
                  />
                  <div
                    className={`absolute top-4 left-4 px-2 py-1 rounded text-xs font-medium ${getCategoryColor(
                      article.category
                    )}`}
                  >
                    {categories.find((c) => c.id === article.category)?.name}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-300 mb-2">
                    {expandedArticles.has(article.id)
                      ? article.content
                      : truncateText(article.excerpt)}
                  </p>
                  {article.content && article.content.length > 120 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleArticleExpansion(article.id)}
                      className="text-yellow-400 hover:bg-yellow-400/10 p-0 text-xs mb-2"
                    >
                      {expandedArticles.has(article.id)
                        ? "Show Less"
                        : "Show More"}
                    </Button>
                  )}

                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="mr-4">{formatDate(article.date)}</span>
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{article.readTime}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src="/api/placeholder/32/32"
                        alt={article.author}
                        className="w-8 h-8 rounded-full mr-3 bg-gray-300"
                      />
                      <span className="text-sm font-medium text-white">
                        {article.author}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {article.category === "platform" && "Platform Update"}
                      {article.category === "partnerships" &&
                        "Partnership News"}
                      {article.category === "courses" && "Course Launch"}
                      {article.category === "community" &&
                        "Community Milestone"}
                      {article.category === "industry" && "Industry Insight"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-16">
              <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-300">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-[#191961] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="w-8 h-8 text-[#191961]" />
          </div> */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay in the loop
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Subscribe to our newsletter for the latest updates, course
            announcements, and industry insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-2 focus:ring-2 focus:ring-yellow-400"
            />
            <Button className="bg-yellow-400 hover:bg-yellow-300 text-[#191961] font-semibold px-6">
              Subscribe
            </Button>
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

export default News;
