// hooks/useOnScreen.ts
import { useEffect, useState } from 'react';

type UseOnScreenOptions = IntersectionObserverInit;

const useOnScreen = (options: UseOnScreenOptions) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);
    
    const element = document.querySelector('.section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);
  
  return isVisible;
};

export default useOnScreen;
