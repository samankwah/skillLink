import { useEffect, useRef, useState } from 'react'

const ParallaxSection = ({ 
  children, 
  speed = 0.5, 
  className = '',
  backgroundImage,
  overlay = true,
  overlayColor = 'bg-black/50'
}) => {
  const [offsetY, setOffsetY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current && isVisible) {
        const rect = elementRef.current.getBoundingClientRect()
        const scrolled = window.pageYOffset
        const parallax = scrolled * speed
        setOffsetY(parallax)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [speed, isVisible])

  return (
    <div 
      ref={elementRef}
      className={`relative overflow-hidden ${className}`}
    >
      {backgroundImage && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            transform: `translateY(${offsetY}px)`,
            willChange: 'transform'
          }}
        />
      )}
      {overlay && backgroundImage && (
        <div className={`absolute inset-0 ${overlayColor}`} />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default ParallaxSection