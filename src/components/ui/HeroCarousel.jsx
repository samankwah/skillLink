import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  ArrowRight,
  Star,
  Users,
  BookOpen,
  Award
} from 'lucide-react'

// Import images
import geminiImage from '@/assets/Gemini_Generated.jpg'
import geminiImage2 from '@/assets/Gemini_Generated_Image.jpg'
import womenImage from '@/assets/image-women.webp'

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef(null)

  const slides = [
    {
      id: 1,
      title: "Transform Your Career with Expert-Led Courses",
      subtitle: "Join 50,000+ professionals advancing their skills",
      description: "Access cutting-edge courses from industry leaders at Google, Microsoft, and Meta. Build the skills that matter most in today's job market.",
      image: geminiImage,
      gradient: "from-blue-600 via-purple-600 to-blue-800",
      stats: [
        { icon: Users, value: "50K+", label: "Active Learners" },
        { icon: BookOpen, value: "500+", label: "Expert Courses" },
        { icon: Award, value: "95%", label: "Success Rate" }
      ],
      ctaText: "Start Learning Today",
      ctaSecondary: "Browse Courses"
    },
    {
      id: 2,
      title: "Network with Industry Professionals",
      subtitle: "Connect, collaborate, and grow together",
      description: "Build meaningful professional relationships with peers, mentors, and industry leaders. Expand your network and unlock new opportunities.",
      image: geminiImage2,
      gradient: "from-green-600 via-teal-600 to-blue-600",
      stats: [
        { icon: Users, value: "25K+", label: "Professionals" },
        { icon: Star, value: "4.9", label: "Rating" },
        { icon: Award, value: "200+", label: "Companies" }
      ],
      ctaText: "Join Network",
      ctaSecondary: "View Success Stories"
    },
    {
      id: 3,
      title: "Get Hired at Top Companies",
      subtitle: "Access exclusive job opportunities",
      description: "Connect directly with hiring managers from Fortune 500 companies. Get noticed with our industry-recognized certifications and portfolio projects.",
      image: womenImage,
      gradient: "from-purple-600 via-pink-600 to-red-600",
      stats: [
        { icon: Award, value: "78%", label: "Get Hired" },
        { icon: Users, value: "10K+", label: "Job Placements" },
        { icon: Star, value: "$85K", label: "Avg Salary" }
      ],
      ctaText: "Find Jobs",
      ctaSecondary: "View Partners"
    }
  ]

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const _goToSlide = useCallback((index) => {
    setCurrentSlide(index)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isHovered) {
      intervalRef.current = setInterval(nextSlide, 6000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isPlaying, isHovered, nextSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        prevSlide()
      } else if (event.key === 'ArrowRight') {
        nextSlide()
      } else if (event.key === ' ') {
        event.preventDefault()
        setIsPlaying(!isPlaying)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevSlide, nextSlide, isPlaying])

  const currentSlideData = slides[currentSlide]

  return (
    <section 
      className="hero-carousel relative min-h-[600px] sm:h-[75vh] lg:h-[80vh] sm:min-h-[650px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Hero carousel"
    >
      {/* Background Images with Parallax Effect */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            {/* Professional Dark Overlay for Better Text Readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Content - Hidden on mobile, visible on desktop */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center justify-center h-full">
            {/* Text Content - Mobile Responsive */}
            <div className="text-white space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-1 text-center lg:text-left px-4 sm:px-0">
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <div>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 font-medium">
                    {currentSlideData.subtitle}
                  </p>
                </div>
                
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-white">
                    {currentSlideData.title.split(' ').map((word, index) => (
                      <span
                        key={index}
                        className={index > 3 ? 'text-yellow-400' : 'text-white'}
                      >
                        {word}{' '}
                      </span>
                    ))}
                  </h1>
                </div>

                <div>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-xl lg:max-w-2xl mx-auto lg:mx-0">
                    {currentSlideData.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 mt-6 sm:mt-8">
                <Link to="/auth/register" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-[#191961] font-semibold text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                  >
                    {currentSlideData.ctaText}
                  </Button>
                </Link>
                <Link to="/learn" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-[#191961] text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 backdrop-blur-sm bg-white/10 hover:bg-white transform hover:scale-105 transition-all duration-300"
                  >
                    <Play className="mr-2 w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5" />
                    {currentSlideData.ctaSecondary}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Panel - Mobile Responsive */}
            <div className="w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none mt-6 lg:mt-0 order-2 lg:order-2 px-4 sm:px-0">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:gap-6">
                  {currentSlideData.stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <div 
                        key={index} 
                        className="flex items-center space-x-3 group hover:bg-white/10 p-3 rounded-xl transition-all duration-300"
                      >
                        <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <Icon className="w-5 h-5 text-[#191961]" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{stat.value}</div>
                          <div className="text-sm text-gray-300">{stat.label}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  )
}

export default HeroCarousel