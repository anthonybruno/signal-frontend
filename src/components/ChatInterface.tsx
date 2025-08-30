import { motion, AnimatePresence } from 'framer-motion';
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
import { useCallback, useRef } from 'react';

import ChatBubble from '@/components/ChatBubble';
import InputContainer from '@/components/InputContainer';
import QuickActionButton from '@/components/QuickActionButton';
import { useChatContext } from '@/contexts/ChatContext';
import { useViewportWidth } from '@/hooks/useViewportWidth';

import TypingIndicator from './TypingIndicator';

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
  const {
    messages,
    isLoading,
    message,
    setMessage,
    sendMessage,
    setInputFocusState,
  } = useChatContext();

  const { isMinWidth } = useViewportWidth();
  const messagesRef = useRef<HTMLDivElement>(null);

  const handleMessageSubmit = useCallback(
    (msg: string) => {
      sendMessage(msg).catch((error) => {
        console.error('Failed to send message:', error);
      });
    },
    [sendMessage],
  );

  return (
    <>
      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col px-4">
        <div className="relative">
          <AnimatePresence>
            {isLoading ? (
              <div className="absolute bottom-0 w-full">
                <motion.div
                  id="typing-indicator"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 25 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <TypingIndicator />
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>

          <div ref={messagesRef}>
            {messages.map((message) => (
              <AnimatePresence key={message.id}>
                <div
                  id={message.id}
                  className={`flex w-full ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <ChatBubble message={message} />
                </div>
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
          exit={{ opacity: 0, y: 10 }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        >
          <InputContainer
            message={message}
            setMessage={setMessage}
            onMessageSubmit={handleMessageSubmit}
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
                  onClick={() => void handleMessageSubmit(action.question)}
                />
              ))}
            </div>
          </InputContainer>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
