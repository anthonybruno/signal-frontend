import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

/**
 * Hook for managing viewport height and calculating message container heights
 * Handles window resize events and provides dynamic height calculations for chat layout
 */
export function useViewportHeight() {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [lastTwoMessagesHeight, setLastTwoMessagesHeight] = useState(0);

  // Use ref to track current height without triggering re-renders
  const currentHeightRef = useRef(0);

  const calculateLastTwoMessagesHeight = useCallback(() => {
    if (!messagesContainerRef.current) return;

    const children = Array.from(messagesContainerRef.current.children);
    const lastTwo = children.slice(-3, -1);

    if (lastTwo.length === 0) return;

    const totalHeight = lastTwo.reduce((sum, child) => {
      return sum + (child as HTMLElement).offsetHeight;
    }, 0);

    const rootStyles = getComputedStyle(document.documentElement);
    const messageGap = parseInt(
      rootStyles.getPropertyValue('--gap-chat-message'),
    );
    const topPadding = parseInt(
      rootStyles.getPropertyValue('--gap-chat-message'),
    );

    const newHeight = totalHeight + messageGap * 2 + topPadding;

    // Only update state if height actually changed significantly
    if (Math.abs(newHeight - currentHeightRef.current) > 5) {
      currentHeightRef.current = newHeight;
      setLastTwoMessagesHeight(newHeight);
    }
  }, []);

  const updateViewportHeight = useCallback(() => {
    setViewportHeight(window.innerHeight);
  }, []);

  useLayoutEffect(() => {
    calculateLastTwoMessagesHeight();
  });

  useEffect(() => {
    updateViewportHeight();
    calculateLastTwoMessagesHeight();

    window.addEventListener('resize', updateViewportHeight);

    return () => window.removeEventListener('resize', updateViewportHeight);
  }, [updateViewportHeight]);

  return {
    messagesContainerRef,
    viewportHeight,
    lastTwoMessagesHeight,
    calculateLastTwoMessagesHeight,
  };
}
