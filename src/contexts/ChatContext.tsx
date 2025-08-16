'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

import { useChat } from '@/hooks/useChat';
import type { Message } from '@/types';

interface ChatContextType {
  // Chat state
  messages: Message[];
  isLoading: boolean;
  hasSubmitted: boolean;

  // Input state
  message: string;
  setMessage: (message: string) => void;
  isInputFocused: boolean;
  setInputFocusState: (focused: boolean) => void;

  // Actions
  sendMessage: (message: string) => Promise<void>;
  handleQuickAction: (message: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [message, setMessage] = useState('');
  const [isInputFocused, setInputFocusState] = useState(false);
  const { messages, isLoading, sendMessage, hasSubmitted } = useChat();

  const handleQuickAction = (quickActionMessage: string) => {
    void sendMessage(quickActionMessage);
  };

  const value: ChatContextType = {
    // Chat state
    messages,
    isLoading,
    hasSubmitted,

    // Input state
    message,
    setMessage,
    isInputFocused,
    setInputFocusState,

    // Actions
    sendMessage,
    handleQuickAction,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext(): ChatContextType {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
