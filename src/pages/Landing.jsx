import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useState, useEffect } from "react";
import HeroCarousel from "@/components/ui/HeroCarousel";
import FadeInSection from "@/components/ui/FadeInSection";
import ParallaxSection from "@/components/ui/ParallaxSection";
import {
  BookOpen,
  Users,
  Trophy,
  Briefcase,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Zap,
  Shield,
  Globe,
  Target,
  TrendingUp,
  Award,
  ChevronUp,
} from "lucide-react";

const Landing = () => {
  useDocumentTitle("SkillLink - Professional Learning & Networking Platform");
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

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description:
        "Access courses, certifications, and hands-on projects designed by industry experts.",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      icon: Users,
      title: "Professional Network",
      description:
        "Connect with peers, mentors, and industry leaders to accelerate your career growth.",
      gradient: "from-green-500 to-teal-600",
    },
    {
      icon: Trophy,
      title: "Skill Certification",
      description:
        "Earn recognized certifications that validate your expertise and boost your profile.",
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      icon: Briefcase,
      title: "Career Opportunities",
      description:
        "Discover job opportunities and projects that match your skills and interests.",
      gradient: "from-purple-500 to-pink-600",
    },
  ];

  const stats = [
    { number: 5000, label: "Active Learners", suffix: "+", icon: Users },
    { number: 50, label: "Expert Courses", suffix: "+", icon: BookOpen },
    { number: 95, label: "Success Rate", suffix: "%", icon: TrendingUp },
    { number: 20, label: "Partner Companies", suffix: "+", icon: Award },
  ];

  const testimonials = [
    {
      name: "Akosua Mensah",
      role: "Software Developer at Hubtel",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face&auto=format",
      content:
        "SkillLink transformed my career from teaching to tech. The practical courses and mentorship helped me land my dream job in fintech.",
    },
    {
      name: "Kwame Asante",
      role: "Product Manager at DreamOval",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&auto=format",
      content:
        "The certifications I earned through SkillLink directly led to my promotion. This platform is revolutionizing professional development in Ghana.",
    },
    {
      name: "Ama Osei",
      role: "UX Designer at Turntable",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face&auto=format",
      content:
        "Amazing community of Ghanaian professionals. I learned more in 6 months than I did in years of self-study. Now I mentor other women in tech.",
    },
  ];

  return (
    <div className="public-page min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Features Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gray-800 rounded-full opacity-30"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gray-800 rounded-full opacity-20"></div>
          <div className="absolute top-1/2 -left-20 w-64 h-64 bg-gray-700 rounded-full opacity-25"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gray-800 rounded-full opacity-15"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-medium mb-4">
              Why Choose SkillLink
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Everything you need to{" "}
              <span className="text-yellow-400">succeed</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools, resources, and
              connections you need to advance your professional journey.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <FadeInSection
                  key={index}
                  delay={index * 200}
                  className="group"
                >
                  <Card className="text-center border-none shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gray-800/80 backdrop-blur-sm relative overflow-hidden border border-gray-700">
                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>

                    <CardContent className="pt-8 pb-6 relative z-10">
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Animated border on hover */}
                      <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-transparent via-[#191961]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </CardContent>
                  </Card>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=800&fit=crop&auto=format"
        className="py-24"
        speed={0.2}
        overlayColor="bg-[#191961]/70"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Trusted by professionals worldwide
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Join a global community of learners achieving remarkable results
            </p>
          </FadeInSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <FadeInSection
                  key={index}
                  delay={index * 150}
                  className="text-center group"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
                    <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-[#191961]" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                      {stat.number.toLocaleString()}
                      {stat.suffix}
                    </div>
                    <div className="text-gray-300 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </ParallaxSection>

      {/* Learning Preview Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -right-32 w-64 h-64 bg-gray-800 rounded-full opacity-20"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gray-700 rounded-full opacity-25"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gray-800 rounded-full opacity-15"></div>
          <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-gray-800 rounded-full opacity-20"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <FadeInSection direction="left">
              <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-6">
                Learn from the Best
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Learn from{" "}
                <span className="text-blue-400">industry experts</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Our courses are designed and taught by professionals from top
                companies. Get practical, real-world knowledge that you can
                apply immediately.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  "Expert-led video courses",
                  "Hands-on projects and assignments",
                  "Industry-recognized certifications",
                  "Peer collaboration and feedback",
                ].map((text, index) => (
                  <FadeInSection key={index} delay={index * 100}>
                    <div className="flex items-center group hover:bg-blue-500/10 p-3 rounded-lg transition-all duration-300">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300"></div>
                      <span className="text-gray-200 font-medium text-lg">
                        {text}
                      </span>
                    </div>
                  </FadeInSection>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/learn" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-[#191961] to-[#2d2b69] hover:from-[#2d2b69] hover:to-[#191961] text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    Explore Courses
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-gray-400 text-gray-200 hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold"
                >
                  View Learning Paths
                </Button>
              </div>
            </FadeInSection>

            <FadeInSection direction="right" className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl p-8 relative overflow-hidden">
                {/* Floating decoration */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-pulse animation-delay-1000"></div>

                <div className="bg-gray-900 w-full rounded-2xl p-8 shadow-xl relative z-10 transform hover:scale-105 transition-transform duration-500 border border-gray-600">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                      Featured Course
                    </span>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                  </div>

                  <h4 className="text-2xl w-full font-bold text-white mb-3">
                    Advanced React Development
                  </h4>

                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-300 font-medium">
                      (4.9) • 2,347 students
                    </span>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Master advanced React patterns, hooks, and performance
                    optimization techniques used by top tech companies.
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl font-bold text-yellow-400">
                        GHS 299
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        GHS 599
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">
                      50% OFF
                    </span>
                  </div>

                  <Link to="/auth/register">
                    <Button className="w-full bg-gradient-to-r from-[#191961] to-[#2d2b69] hover:from-[#2d2b69] hover:to-[#191961] text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      Enroll Now
                    </Button>
                  </Link>

                  <div className="mt-4 flex items-center justify-center text-sm text-gray-400">
                    <Shield className="w-4 h-4 mr-1" />
                    30-day money-back guarantee
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute -top-48 left-1/4 w-96 h-96 bg-gray-800 rounded-full opacity-20"></div>
          <div className="absolute -bottom-48 right-1/4 w-80 h-80 bg-gray-700 rounded-full opacity-25"></div>
          <div className="absolute top-1/4 -left-24 w-64 h-64 bg-gray-800 rounded-full opacity-15"></div>
          <div className="absolute bottom-1/3 -right-24 w-72 h-72 bg-gray-800 rounded-full opacity-20"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">
              Success Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Transforming{" "}
              <span className="text-purple-400">careers worldwide</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how SkillLink has helped thousands of professionals advance
              their careers and achieve their goals
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeInSection key={index} delay={index * 200}>
                <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gray-800/80 backdrop-blur-sm relative overflow-hidden group border border-gray-700">
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px] rounded-lg">
                    <div className="bg-gray-800 rounded-lg h-full w-full"></div>
                  </div>

                  <CardContent className="pt-8 pb-6 relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full mr-4 bg-gray-300 ring-4 ring-purple-100 group-hover:ring-purple-200 transition-all duration-300"
                        />
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-purple-400 font-medium">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex text-yellow-400 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>

                    <blockquote className="text-gray-300 italic text-lg leading-relaxed relative">
                      <span className="text-4xl text-purple-300 absolute -top-2 -left-2">
                        "
                      </span>
                      {testimonial.content}
                      <span className="text-4xl text-purple-300 absolute -bottom-4 -right-2">
                        "
                      </span>
                    </blockquote>

                    {/* Decorative element */}
                    <div className="mt-6 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection className="text-center mt-16">
            <Link to="/stories">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                View More Success Stories
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* CTA Section */}
      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&h=800&fit=crop&auto=format"
        className="py-24"
        speed={0.2}
        overlayColor="bg-gradient-to-r from-[#191961]/95 to-[#2d2b69]/70"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ready to{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-orange-500">
                transform
              </span>{" "}
              your career?
            </h2>

            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals who are already growing their
              skills, expanding their networks, and achieving their career goals
              with SkillLink.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link to="/auth/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-orange-400 hover:to-yellow-400 text-[#191961] font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    Start Learning Today
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>

              <div className="flex items-center text-gray-300">
                <span className="text-lg">or</span>
              </div>

              <Link to="/auth/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#191961] text-xl px-12 py-6 rounded-2xl font-semibold backdrop-blur-sm bg-white/10 hover:bg-white transform hover:scale-105 transition-all duration-300"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 opacity-80">
              {[
                { icon: Shield, text: "Secure Platform" },
                { icon: Award, text: "Industry Certified" },
                { icon: Users, text: "50K+ Students" },
                { icon: Globe, text: "Global Community" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex flex-col items-center group">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </FadeInSection>
        </div>
      </ParallaxSection>

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

export default Landing;
