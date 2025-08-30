import { useEffect, useState } from 'react';

/**
 * Hook for detecting viewport width and providing responsive width utilities
 */
export function useViewportWidth() {
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };
    updateViewportWidth();
    window.addEventListener('resize', updateViewportWidth);
    return () => window.removeEventListener('resize', updateViewportWidth);
  }, []);

  const isMinWidth = (minWidth: number): boolean => {
    return viewportWidth >= minWidth;
  };

  return {
    viewportWidth,
    isMinWidth,
  };
}
