import { useEffect, useRef, useState } from 'react';

const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    animation = 'fade-up'
  } = options;
  
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!triggerOnce || !animated.current)) {
            setIsVisible(true);
            animated.current = true;
            
            // Add animation class
            if (elementRef.current) {
              elementRef.current.classList.add(`animate-${animation}`);
            }
            
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce && !entry.isIntersecting) {
            setIsVisible(false);
            if (elementRef.current) {
              elementRef.current.classList.remove(`animate-${animation}`);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce, animation]);

  // Get animation class name
  const getAnimationClass = () => {
    const animations = {
      'fade-up': 'opacity-0 translate-y-8',
      'fade-down': 'opacity-0 -translate-y-8',
      'fade-left': 'opacity-0 translate-x-8',
      'fade-right': 'opacity-0 -translate-x-8',
      'scale': 'opacity-0 scale-95',
    };
    return animations[animation] || animations['fade-up'];
  };

  return { elementRef, isVisible, getAnimationClass };
};

export default useScrollAnimation;