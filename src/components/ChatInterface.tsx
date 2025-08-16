import { useEffect } from 'react';

import ChatBubble from '@/components/ChatBubble';
import InputContainer from '@/components/InputContainer';
import { useChatContext } from '@/contexts/ChatContext';
import { useMessageHandlers } from '@/hooks/useMessageHandlers';
import { useViewportHeight } from '@/hooks/useViewportHeight';

import TypingIndicator from './TypingIndicator';

/**
 * Main chat interface component that displays messages and handles user input
 * Manages viewport sizing and scroll behavior for optimal chat experience
 */
export default function ChatInterface() {
  const {
    messages,
    isLoading,
    message,
    setMessage,
    sendMessage,
    isInputFocused,
    setInputFocusState,
  } = useChatContext();

  const {
    messagesContainerRef,
    viewportHeight,
    lastTwoMessagesHeight,
    calculateLastTwoMessagesHeight,
  } = useViewportHeight();

  const { handleMessageSubmit } = useMessageHandlers(sendMessage);

  useEffect(() => {
    // Recalculate heights when messages or loading state changes
    calculateLastTwoMessagesHeight();
  }, [messages, isLoading, calculateLastTwoMessagesHeight]);

  return (
    <>
      <div className="min-h-screen pt-4">
        <div
          ref={messagesContainerRef}
          className="gap-chat-message mx-auto flex max-w-4xl flex-col"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex w-full ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <ChatBubble message={message} />
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role !== 'system' ? (
            <TypingIndicator />
          ) : null}

          <div
            aria-hidden="true"
            className="min-h-[160px]"
            style={{
              height: `${viewportHeight - lastTwoMessagesHeight}px`,
            }}
          />
        </div>
      </div>
      <div className="fixed bottom-0 w-full">
        <InputContainer
          message={message}
          setMessage={setMessage}
          onMessageSubmit={handleMessageSubmit}
          isLoading={isLoading}
          isInputFocused={isInputFocused}
          setInputFocusState={setInputFocusState}
        />
      </div>
    </>
  );
}
