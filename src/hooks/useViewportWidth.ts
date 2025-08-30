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

    // Set initial width
    updateViewportWidth();

    // Add event listener
    window.addEventListener('resize', updateViewportWidth);

    // Cleanup
    return () => window.removeEventListener('resize', updateViewportWidth);
  }, []);

  // Helper function to check if viewport width is at least the specified value
  const isMinWidth = (minWidth: number): boolean => {
    return viewportWidth >= minWidth;
  };

  return {
    viewportWidth,
    isMinWidth,
  };
}
