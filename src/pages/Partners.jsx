import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import {
  Building,
  Users,
  Globe,
  Award,
  ArrowRight,
  Handshake,
  Target,
  Briefcase,
  ChevronUp,
} from "lucide-react";

const Partners = () => {
  useDocumentTitle("Partners - SkillLink");
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

  const partnerCategories = [
    {
      title: "Technology Partners",
      description:
        "Leading tech companies providing cutting-edge courses and real-world projects.",
      icon: Building,
      partners: [
        {
          name: "Hubtel",
          logo: "/api/placeholder/120/60",
          students: "5K+",
        },
        { name: "MTN Ghana", logo: "/api/placeholder/120/60", students: "8K+" },
        { name: "Vodafone Ghana", logo: "/api/placeholder/120/60", students: "6K+" },
        { name: "Google Ghana", logo: "/api/placeholder/120/60", students: "4K+" },
        { name: "Microsoft Ghana", logo: "/api/placeholder/120/60", students: "3K+" },
        { name: "DreamOval", logo: "/api/placeholder/120/60", students: "2K+" },
      ],
    },
    {
      title: "Educational Institutions",
      description:
        "Prestigious universities and institutions offering accredited programs.",
      icon: Award,
      partners: [
        {
          name: "University of Ghana",
          logo: "/api/placeholder/120/60",
          students: "8K+",
        },
        { name: "KNUST", logo: "/api/placeholder/120/60", students: "6K+" },
        { name: "Ashesi University", logo: "/api/placeholder/120/60", students: "3K+" },
        {
          name: "University of Cape Coast",
          logo: "/api/placeholder/120/60",
          students: "5K+",
        },
        {
          name: "GIMPA",
          logo: "/api/placeholder/120/60",
          students: "4K+",
        },
        {
          name: "Central University",
          logo: "/api/placeholder/120/60",
          students: "2K+",
        },
      ],
    },
    {
      title: "Industry Organizations",
      description:
        "Professional associations and industry leaders setting standards.",
      icon: Briefcase,
      partners: [
        { name: "Ghana Institute of Engineers", logo: "/api/placeholder/120/60", students: "3K+" },
        { name: "Ghana Computer Society", logo: "/api/placeholder/120/60", students: "2K+" },
        { name: "Institute of ICT Professionals Ghana", logo: "/api/placeholder/120/60", students: "4K+" },
        {
          name: "Ghana Association of Banks",
          logo: "/api/placeholder/120/60",
          students: "2K+",
        },
        { name: "Ghana Investment Promotion Centre", logo: "/api/placeholder/120/60", students: "1K+" },
        { name: "Tech4Dev Ghana", logo: "/api/placeholder/120/60", students: "3K+" },
      ],
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: "Expert-Led Content",
      description:
        "Access courses developed and taught by industry professionals from our partner companies.",
    },
    {
      icon: Award,
      title: "Recognized Certifications",
      description:
        "Earn certificates that are valued and recognized by top employers worldwide.",
    },
    {
      icon: Briefcase,
      title: "Career Opportunities",
      description:
        "Get direct access to job openings and internships at our partner organizations.",
    },
    {
      icon: Users,
      title: "Industry Networks",
      description:
        "Connect with professionals and mentors from leading companies in your field.",
    },
  ];

  const stats = [
    { number: "200+", label: "Global Partners" },
    { number: "50K+", label: "Students Placed" },
    { number: "95%", label: "Employer Satisfaction" },
    { number: "150+", label: "Countries Reached" },
  ];

  const testimonials = [
    {
      quote:
        "SkillLink has been instrumental in helping us identify and train top Ghanaian talent. The quality of students coming through their programs is exceptional.",
      author: "Kwame Planno",
      role: "Head of Engineering",
      company: "Hubtel",
    },
    {
      quote:
        "Our partnership with SkillLink has enabled us to scale our educational impact across Ghana while maintaining the highest standards of quality.",
      author: "Prof. Nana Jane Opoku-Agyemang",
      role: "Vice-Chancellor",
      company: "University of Cape Coast",
    },
    {
      quote:
        "The collaborative approach SkillLink takes with partners ensures that our courses remain relevant to Ghana's digital transformation goals.",
      author: "Ama Osei-Somuah",
      role: "Country Director",
      company: "Google Ghana",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gray-800 rounded-full opacity-30"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gray-700 rounded-full opacity-25"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gray-800 rounded-full opacity-20"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Handshake className="w-8 h-8 text-[#191961]" />
            </div> */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Powered by world-class partners
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
              We collaborate with leading companies, universities, and
              organizations to deliver the highest quality education and career
              opportunities.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {stats.map((stat, index) => {
                // Extract numeric value and suffix from stat.number
                const numericValue = parseInt(
                  stat.number.replace(/[^0-9]/g, "")
                );
                const suffix = stat.number.replace(/[0-9]/g, "");

                return (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      <AnimatedCounter
                        end={numericValue}
                        suffix={suffix}
                        duration={5000}
                        separator={numericValue >= 100 ? "," : ""}
                      />
                    </div>
                    <div className="text-gray-300">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-40 w-72 h-72 bg-gray-800 rounded-full opacity-20"></div>
          <div className="absolute -bottom-32 right-1/3 w-64 h-64 bg-gray-700 rounded-full opacity-25"></div>
          <div className="absolute top-1/2 right-0 w-56 h-56 bg-gray-800 rounded-full opacity-15"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Partnership benefits
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our strategic partnerships create value for learners, educators,
              and employers alike.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="text-center border border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="pt-8 pb-6 flex flex-col items-center">
                    <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-gray-900" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners Categories */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 right-1/4 w-80 h-80 bg-gray-800 rounded-full opacity-20"></div>
          <div className="absolute bottom-0 -left-32 w-72 h-72 bg-gray-700 rounded-full opacity-25"></div>
          <div className="absolute top-1/3 -right-20 w-64 h-64 bg-gray-800 rounded-full opacity-15"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our partner ecosystem
            </h2>
            <p className="text-xl text-gray-300">
              Collaborating across industries to deliver comprehensive learning
              experiences
            </p>
          </div>

          <div className="space-y-16">
            {partnerCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <div key={categoryIndex}>
                  <div className="text-center mb-12">
                    <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-gray-900" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {category.title}
                    </h3>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                      {category.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {category.partners.map((partner, partnerIndex) => (
                      <Card
                        key={partnerIndex}
                        className="text-center border border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-6">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="h-12 mx-auto mb-3 bg-gray-100 rounded"
                          />
                          <h4 className="font-semibold text-white text-sm mb-1">
                            {partner.name}
                          </h4>
                          <p className="text-xs text-gray-300">
                            {partner.students} students
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-800 rounded-full opacity-20"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gray-700 rounded-full opacity-25"></div>
          <div className="absolute top-2/3 -left-24 w-64 h-64 bg-gray-800 rounded-full opacity-15"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What our partners say
            </h2>
            <p className="text-xl text-gray-300">
              Hear from the organizations that trust SkillLink to deliver
              results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-lg"
              >
                <CardContent className="pt-6">
                  <p className="text-gray-300 italic mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src="/api/placeholder/48/48"
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full mr-4 bg-gray-300"
                    />
                    <div>
                      <h4 className="font-semibold text-white">
                        {testimonial.author}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {testimonial.role}
                      </p>
                      <p className="text-sm text-yellow-400 font-medium">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="py-20 bg-[#191961] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Globe className="w-8 h-8 text-[#191961]" />
          </div> */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Become a partner
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join leading organizations in shaping the future of professional
            education. Partner with us to reach global talent and drive
            innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-300 text-[#191961] font-semibold"
            >
              Partner With Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Link to="/auth/register">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#191961]"
              >
                Start Learning
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

export default Partners;
