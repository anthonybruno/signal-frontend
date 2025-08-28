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

import ChatBubble from '@/components/ChatBubble';
import InputContainer from '@/components/InputContainer';
import QuickActionButton from '@/components/QuickActionButton';
import TypingIndicator from '@/components/TypingIndicator';
import { useChatContext } from '@/contexts/ChatContext';
import { useMessageHandlers } from '@/hooks/useMessageHandlers';
import { useViewportHeight } from '@/hooks/useViewportHeight';

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

  const { messagesContainerRef, viewportHeight, lastTwoMessagesHeight } =
    useViewportHeight();

  const { handleMessageSubmit } = useMessageHandlers(sendMessage);

  return (
    <>
      <div className="min-h-screen pt-4">
        <div
          ref={messagesContainerRef}
          className="gap-chat-message mx-auto flex max-w-4xl flex-col"
        >
          {messages.map((message) => (
            <AnimatePresence key={message.id}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className={`flex w-full ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <ChatBubble message={message} />
              </motion.div>
            </AnimatePresence>
          ))}

          <AnimatePresence>
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <TypingIndicator />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div
            aria-hidden="true"
            className="min-h-[160px]"
            style={{
              height: `${viewportHeight - lastTwoMessagesHeight}px`,
            }}
          />
        </div>
      </div>
      <AnimatePresence>
        <motion.div
          className="fixed bottom-0 w-full"
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
            isInputFocused={isInputFocused}
            setInputFocusState={setInputFocusState}
            autoFocus
          >
            {QUICK_ACTIONS.map((action) => (
              <QuickActionButton
                key={action.label}
                label={action.label}
                icon={action.icon}
                onClick={() => void handleMessageSubmit(action.question)}
              />
            ))}
          </InputContainer>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
