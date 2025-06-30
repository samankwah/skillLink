import { useEffect, useRef, useState } from 'react'

const ParallaxSection = ({ 
  children, 
  speed = 0.5, 
  className = '',
  backgroundImage,
  overlay = true,
  overlayColor = 'bg-black/50'
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      // Scroll handler can be used for future parallax implementations
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
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundAttachment: 'fixed'
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