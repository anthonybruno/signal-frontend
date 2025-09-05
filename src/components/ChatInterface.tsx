import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';

import ChatBubble from '@/components/ChatBubble';
import InputContainer from '@/components/InputContainer';
import QuickActionButton from '@/components/QuickActionButton';
import TypingIndicator from '@/components/TypingIndicator';
import { useChatContext } from '@/contexts/ChatContext';
import { useViewportWidth } from '@/hooks/useViewportWidth';
import { createMessageGroups } from '@/utils/message';
import { CHAT_INTERFACE_ACTIONS } from '@/utils/quickActions';

/**
 * Main chat interface component that displays messages and handles user input
 */
export default function ChatInterface() {
  const { isMinWidth } = useViewportWidth();
  const {
    messages,
    isLoading,
    message,
    setMessage,
    sendMessage,
    setInputFocusState,
    handleQuickAction,
  } = useChatContext();
  const shouldReduceMotion = useReducedMotion();

  // Track if user has manually scrolled
  const previousMessageCountRef = useRef(0);

  // Memoize message groups to prevent unnecessary re-renders during streaming
  const messageGroups = useMemo(() => {
    return messages.length > 0 ? createMessageGroups(messages) : [];
  }, [messages]);

  const lastMessageGroupIndex = messageGroups.length - 1;

  useEffect(() => {
    if (messageGroups.length > 0) {
      const isNewMessage =
        messageGroups.length > previousMessageCountRef.current;
      if (isNewMessage) {
        // Removed userHasScrolled check
        const reduceMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches;
        setTimeout(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: reduceMotion ? 'instant' : 'smooth',
          });
        }, 100);
      }
      previousMessageCountRef.current = messageGroups.length;
    }
  }, [messageGroups]); // Removed userHasScrolled from dependency array

  return (
    <>
      <div className="relative mx-auto flex min-h-dvh max-w-4xl flex-col px-4">
        <div className="relative">
          <div className="flex flex-col" aria-live="polite" aria-atomic="false">
            {messageGroups.map((messageGroup, index) => (
              <AnimatePresence key={messageGroup.id}>
                <motion.div
                  id={messageGroup.id}
                  className={`flex flex-col pt-20 ${
                    index === lastMessageGroupIndex ? 'h-dvh' : ''
                  }`}
                >
                  <div className="flex flex-col gap-10">
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{ duration: 2, ease: [0.4, 0.0, 0.2, 1] }}
                      >
                        <ChatBubble message={messageGroup.userMessage} />
                      </motion.div>
                    </AnimatePresence>
                    <AnimatePresence>
                      {messageGroup.systemMessage.content ? (
                        <motion.div
                          initial={{ opacity: 0, y: 0 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 0 }}
                          transition={{
                            duration: 1,
                            ease: [0.4, 0.0, 0.2, 1],
                          }}
                        >
                          <ChatBubble message={messageGroup.systemMessage} />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence>
                    {isLoading && index === lastMessageGroupIndex ? (
                      <motion.div
                        id="typing-indicator"
                        className="mt-7"
                        initial={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: 20 }
                        }
                        animate={{ opacity: 1, y: 20 }}
                        exit={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: 20 }
                        }
                        transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
                      >
                        <TypingIndicator />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                  <div
                    className={`spacer ${
                      index === lastMessageGroupIndex && !isLoading
                        ? 'min-h-40'
                        : ''
                    } flex-1 transition-all`}
                  />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          className="fixed bottom-0 w-full px-4"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        >
          <InputContainer
            message={message}
            setMessage={setMessage}
            onMessageSubmit={(msg) => void sendMessage(msg)}
            isLoading={isLoading}
            setInputFocusState={setInputFocusState}
            autoFocus={isMinWidth(500)}
          >
            <div className="hidden flex-1 items-center gap-1 @min-[835px]:flex">
              {CHAT_INTERFACE_ACTIONS.map((action) => (
                <QuickActionButton
                  key={action.label}
                  label={action.label}
                  icon={action.icon}
                  onClick={() => handleQuickAction(action.question)}
                />
              ))}
            </div>
          </InputContainer>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
