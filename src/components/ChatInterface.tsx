import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  CircleUser,
  AudioLines,
  Handshake,
  Rss,
  Zap,
  GitCompareArrows,
  Briefcase,
  TrendingUp,
} from 'lucide-react';
import { useState, useEffect } from 'react';

import ChatBubble from '@/components/ChatBubble';
import InputContainer from '@/components/InputContainer';
import QuickActionButton from '@/components/QuickActionButton';
import TypingIndicator from '@/components/TypingIndicator';
import { useChatContext } from '@/contexts/ChatContext';
import { useViewportWidth } from '@/hooks/useViewportWidth';
import { createMessageGroups, type MessageGroup } from '@/utils/message';

const QUICK_ACTIONS = [
  {
    label: 'About',
    question:
      'Tell me about your background and what drives you professionally',
    icon: CircleUser,
  },
  {
    label: 'Leadership',
    question:
      "What's your management philosophy and how do you approach team leadership?",
    icon: Handshake,
  },
  {
    label: 'Projects',
    question:
      'Tell me about your most significant projects and their business impact',
    icon: Briefcase,
  },
  {
    label: 'Skills',
    question: 'What are your core technical skills and areas of expertise?',
    icon: Zap,
  },
  {
    label: 'Career',
    question:
      'Walk me through your career progression from IC to Engineering Manager and key leadership learnings',
    icon: TrendingUp,
  },
  {
    label: 'GitHub',
    question: 'Show me your recent GitHub activity',
    icon: GitCompareArrows,
  },
  {
    label: 'Spotify',
    question: 'What are you currently listening to on Spotify?',
    icon: AudioLines,
  },
  {
    label: 'Blog',
    question: 'What is your latest blog post?',
    icon: Rss,
  },
];

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
  } = useChatContext();
  const [messageGroups, setMessageGroups] = useState<MessageGroup[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const lastMessageGroupIndex = messageGroups.length - 1;
  const secondToLastMessageGroupIndex = messageGroups.length - 2;

  // Update message groups when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const newMessageGroups = createMessageGroups(messages);

      setMessageGroups(newMessageGroups);

      // Auto-scroll to the last message group
      if (newMessageGroups.length > 0) {
        const reduceMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches;
        const lastMessageGroup = newMessageGroups[newMessageGroups.length - 1];
        setTimeout(() => {
          const element = document.getElementById(lastMessageGroup.id);
          if (element) {
            element.scrollIntoView({
              behavior: reduceMotion ? 'instant' : 'smooth',
              block: 'start',
            });
          }
        }, 100);
      }
    }
  }, [messages]);

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
                  <div className="flex flex-col gap-4">
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
                    className={`spacer ${(() => {
                      if (isLoading && index >= secondToLastMessageGroupIndex)
                        return 'min-h-40';
                      if (index === lastMessageGroupIndex && !isLoading)
                        return 'min-h-40';
                      return '';
                    })()} flex-1 transition-all`}
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
              {QUICK_ACTIONS.map((action) => (
                <QuickActionButton
                  key={action.label}
                  label={action.label}
                  icon={action.icon}
                  onClick={() => void sendMessage(action.question)}
                />
              ))}
            </div>
          </InputContainer>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
