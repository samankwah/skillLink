import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import {
  Target,
  Heart,
  Globe,
  Users,
  Award,
  Lightbulb,
  ArrowRight,
  ChevronUp,
} from "lucide-react";

const About = () => {
  useDocumentTitle("About - SkillLink");
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

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for the highest quality in education and professional development.",
    },
    {
      icon: Heart,
      title: "Community",
      description:
        "Building meaningful connections and supporting each other's growth journey.",
    },
    {
      icon: Globe,
      title: "Accessibility",
      description:
        "Making professional learning available to everyone, everywhere.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Continuously evolving our platform with cutting-edge learning technologies.",
    },
  ];

  const stats = [
    { number: "2019", label: "Founded" },
    { number: "50K+", label: "Learners" },
    { number: "200+", label: "Companies" },
    { number: "95%", label: "Success Rate" },
  ];

  const team = [
    {
      name: "Dr. Nana Akoto",
      role: "CEO & Co-Founder",
      image: "/api/placeholder/200/200",
      bio: "Former Director of Innovation at MEST Africa, passionate about advancing digital skills across Africa.",
    },
    {
      name: "Kwabena Boahen",
      role: "CTO & Co-Founder",
      image: "/api/placeholder/200/200",
      bio: "Former Senior Engineer at Google Ghana with 15+ years building scalable learning platforms.",
    },
    {
      name: "Efua Adjei",
      role: "Head of Content",
      image: "/api/placeholder/200/200",
      bio: "Former Head of Curriculum at Ashesi University, expert in African professional skill development.",
    },
    {
      name: "Kofi Mensah",
      role: "Head of Partnerships",
      image: "/api/placeholder/200/200",
      bio: "Industry veteran with extensive network across leading African companies and multinationals.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-20 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500 rounded-full opacity-12"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-teal-500 rounded-full opacity-10"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-emerald-500 rounded-full opacity-8"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Empowering professionals worldwide
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              We believe everyone deserves access to high-quality professional
              education and the opportunity to build meaningful career
              connections.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-40 w-72 h-72 bg-violet-500 rounded-full opacity-10"></div>
          <div className="absolute -bottom-32 right-1/3 w-64 h-64 bg-blue-500 rounded-full opacity-12"></div>
          <div className="absolute top-1/2 right-0 w-56 h-56 bg-cyan-500 rounded-full opacity-8"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                At SkillLink, we're on a mission to bridge the gap between
                learning and career advancement. We believe that with the right
                skills, connections, and opportunities, anyone can achieve their
                professional goals.
              </p>
              <p className="text-lg text-gray-300 mb-8">
                Our platform combines expert-led courses, peer-to-peer learning,
                and professional networking to create a comprehensive ecosystem
                for career growth. We're not just about learning – we're about
                transformation.
              </p>
              <Link to="/auth/register">
                <Button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold">
                  Join Our Mission
                </Button>
              </Link>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
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
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-900 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 right-1/4 w-80 h-80 bg-emerald-500 rounded-full opacity-10"></div>
          <div className="absolute bottom-0 -left-32 w-72 h-72 bg-teal-500 rounded-full opacity-12"></div>
          <div className="absolute top-1/3 -right-20 w-64 h-64 bg-cyan-500 rounded-full opacity-8"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These core principles guide everything we do and shape the
              experience we create for our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="text-center border border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-gray-900" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-300">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-10"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-violet-500 rounded-full opacity-12"></div>
          <div className="absolute top-2/3 -left-24 w-64 h-64 bg-emerald-500 rounded-full opacity-8"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Story
            </h2>
            <div className="max-w-4xl mx-auto text-lg text-gray-300 space-y-6">
              <p>
                SkillLink was born from a simple observation: while there's no
                shortage of online courses, most professionals struggle to
                translate learning into real career advancement. The missing
                pieces were community, mentorship, and practical application.
              </p>
              <p>
                Founded in 2019 in Accra by a team of educators and
                technologists from leading African and international companies,
                SkillLink set out to create more than just another learning
                platform. We wanted to build a complete ecosystem where
                learning, networking, and career opportunities converge across
                the African continent.
              </p>
              <p>
                Today, we're proud to serve over 50,000 professionals across
                Ghana and 15+ African countries, partnering with top local and
                international companies to deliver education that truly
                transforms careers in Africa's digital economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-teal-900 to-cyan-900 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute -top-32 -left-32 w-88 h-88 bg-cyan-500 rounded-full opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-500 rounded-full opacity-12"></div>
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-8"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-300">
              Passionate educators and technologists working to democratize
              professional learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center border border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="pt-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-600 border-2 border-yellow-400"
                  />
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-yellow-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-300">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-40 w-80 h-80 bg-emerald-500 rounded-full opacity-10"></div>
          <div className="absolute -bottom-32 right-1/3 w-96 h-96 bg-violet-500 rounded-full opacity-12"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full opacity-8"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-gray-900" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join our growing community
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Be part of a community that's reshaping professional learning and
            career development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold"
              >
                Get Started Today
              </Button>
            </Link>
            <Link to="/learn">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900"
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

export default About;
