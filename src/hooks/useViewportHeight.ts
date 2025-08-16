import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Hook for managing viewport height and calculating message container heights
 * Handles window resize events and provides dynamic height calculations for chat layout
 */
export function useViewportHeight() {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [lastTwoMessagesHeight, setLastTwoMessagesHeight] = useState(0);

  const getChatMessageGap = useCallback((): number => {
    const rootStyles = getComputedStyle(document.documentElement);
    const gap = rootStyles.getPropertyValue('--gap-chat-message');
    return parseInt(gap) || 0;
  }, []);

  const calculateMessageHeights = useCallback((): number => {
    if (!messagesContainerRef.current) return 0;

    const children = Array.from(messagesContainerRef.current.children);
    const lastTwo = children.slice(-3, -1);

    return lastTwo.reduce(
      (sum, child) => sum + (child as HTMLElement).offsetHeight,
      0,
    );
  }, []);

  const calculateMessageSpacing = useCallback(
    (messageCount: number): number => {
      const gap = getChatMessageGap();
      const gapHeight = messageCount > 1 ? gap * 2 : gap;
      return gapHeight + gap;
    },
    [getChatMessageGap],
  );

  const calculateLastTwoMessagesHeight = useCallback(() => {
    const messageHeight = calculateMessageHeights();
    const messageCount = Math.min(
      2,
      messagesContainerRef.current?.children.length || 0,
    );
    const spacing = calculateMessageSpacing(messageCount);

    setLastTwoMessagesHeight(messageHeight + spacing);
  }, [calculateMessageHeights, calculateMessageSpacing]);

  const updateViewportHeight = useCallback(() => {
    setViewportHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    updateViewportHeight();
    calculateLastTwoMessagesHeight();

    window.addEventListener('resize', updateViewportHeight);

    return () => window.removeEventListener('resize', updateViewportHeight);
  }, [updateViewportHeight, calculateLastTwoMessagesHeight]);

  return {
    messagesContainerRef,
    viewportHeight,
    lastTwoMessagesHeight,
    calculateLastTwoMessagesHeight,
  };
}
