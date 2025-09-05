'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

import { useViewportWidth } from '@/hooks/useViewportWidth';

interface ChatTextInputProps {
  message: string;
  isLoading: boolean;
  setMessage: (message: string) => void;
  onMessageSubmit: (message: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  animatedPlaceholders?: boolean;
  autoFocus?: boolean;
}

function ChatTextInput({
  message,
  isLoading,
  setMessage,
  onMessageSubmit,
  onFocus,
  onBlur,
  animatedPlaceholders = false,
  autoFocus = false,
}: ChatTextInputProps) {
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { viewportWidth } = useViewportWidth();
  const shouldReduceMotion = useReducedMotion();

  const getCSSVariable = (variableName: string): number => {
    if (typeof window === 'undefined') return 0;
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
    return parseInt(value);
  };

  const placeholders = [
    'Let’s talk about what drives your work',
    'Thoughts on the Costco hot dog',
    'Tell me about a time you...',
    'Whats your favorite dessert?',
    'Chasing growth, purpose, and clarity',
  ];

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (!animatedPlaceholders) return;

    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentPlaceholderIndex(
        (prevIndex) => (prevIndex + 1) % placeholders.length,
      );
    }, 4000);

    // eslint-disable-next-line @typescript-eslint/consistent-return
    return () => clearInterval(interval);
  }, [animatedPlaceholders, isPaused, placeholders.length]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const messageText = message.trim();
    if (messageText && !isLoading) {
      onMessageSubmit(messageText);
      setMessage('');
      if (viewportWidth < getCSSVariable('--breakpoint-sm')) {
        inputRef.current?.blur();
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const updatePauseState = (paused: boolean) => {
    if (animatedPlaceholders) {
      setIsPaused(paused);
    }
  };

  const handleFocus = () => {
    updatePauseState(true);
    onFocus?.();
  };

  const handleBlur = () => {
    updatePauseState(false);
    onBlur?.();
  };

  return (
    <form onSubmit={handleSubmit} className="block w-full">
      <div className="relative">
        <input
          ref={inputRef}
          id="chat-message"
          name="message"
          type="text"
          value={message}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={animatedPlaceholders ? undefined : 'Ask me anything'}
          enterKeyHint="send"
          aria-label="Chat message input"
          className="placeholder:text-tony-500 dark:placeholder:text-tony-400 box-border block w-full bg-transparent focus:outline-none"
        />

        {animatedPlaceholders === true && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPlaceholderIndex}
              initial={
                shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }
              }
              animate={{
                opacity: message || isPaused ? 0 : 1,
                y: message || 0,
              }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="text-tony-500 dark:text-tony-400 pointer-events-none absolute top-0 left-0"
            >
              {placeholders[currentPlaceholderIndex]}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </form>
  );
}

export default ChatTextInput;
