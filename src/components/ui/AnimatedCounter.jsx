import { useState, useEffect, useRef } from "react";

const AnimatedCounter = ({
  end,
  start = 0,
  duration = 4000,
  decimals = 0,
  suffix = "",
  prefix = "",
  separator = ",",
  className = "",
  trigger = true,
}) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const countRef = useRef(null);
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);

  const formatNumber = (num) => {
    const formattedNum = num.toFixed(decimals);
    if (separator && decimals === 0) {
      return formattedNum.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    }
    return formattedNum;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!isVisible || !trigger || hasAnimated) return;

    setHasAnimated(true);
    startTimeRef.current = null;

    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min(
        (timestamp - startTimeRef.current) / duration,
        1
      );

      // Easing function (ease-out-cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentCount = start + (end - start) * easeOut;
      setCount(currentCount);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isVisible, trigger, hasAnimated, start, end, duration]);

  return (
    <span
      ref={countRef}
      className={`inline-block transition-all duration-300 ${className}`}
      aria-live="polite"
    >
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
