import { useEffect, useRef, useState } from 'react'

const FadeInSection = ({ 
  children, 
  delay = 0,
  duration = 600,
  threshold = 0.1,
  direction = 'up',
  distance = 50,
  className = '',
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef(null)

  const getTransform = () => {
    if (isVisible || (!once && hasAnimated)) return 'translate3d(0, 0, 0)'
    
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`
      case 'down':
        return `translate3d(0, -${distance}px, 0)`
      case 'left':
        return `translate3d(${distance}px, 0, 0)`
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`
      default:
        return `translate3d(0, ${distance}px, 0)`
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (once && hasAnimated) return
          
          setTimeout(() => {
            setIsVisible(true)
            if (once) setHasAnimated(true)
          }, delay)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [delay, threshold, once, hasAnimated])

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  )
}

export default FadeInSection