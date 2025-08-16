import { useCallback } from 'react';

/**
 * Hook for handling message submissions in the chat interface
 * Manages sending messages (both user input and quick actions) with scroll behavior
 */
export function useMessageHandlers(
  sendMessage: (message: string) => Promise<void>,
) {
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 10);
  }, []);

  const handleMessageSubmit = useCallback(
    (msg: string) => {
      scrollToBottom();
      sendMessage(msg).catch((error) => {
        console.error('Failed to send message:', error);
      });
    },
    [sendMessage, scrollToBottom],
  );

  return { handleMessageSubmit };
}
