import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

export function usePageTransitions() {
  const [location, setLocation] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextLocation, setNextLocation] = useState<string | null>(null);

  const navigateWithTransition = (newLocation: string) => {
    if (newLocation === location) return;
    
    setNextLocation(newLocation);
    setIsTransitioning(true);
    
    // Duration matches the underwater transition animation
    setTimeout(() => {
      setLocation(newLocation);
      setTimeout(() => {
        setIsTransitioning(false);
        setNextLocation(null);
      }, 300); // Brief overlap for smooth transition
    }, 1200);
  };

  return {
    isTransitioning,
    nextLocation,
    navigateWithTransition,
    currentLocation: location
  };
}

export function useUnderwaterLoading(delay: number = 800) {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return showLoading;
}