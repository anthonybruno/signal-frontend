import { useState, useCallback } from 'react';

import type { Message } from '@/types';
import { createMessage } from '@/utils/message';

interface UseChatStateReturn {
  messages: Message[];
  isLoading: boolean;
  hasSubmitted: boolean;
  updateChat: (
    action: 'add' | 'update',
    message: Message,
    index?: number,
  ) => void;
  handleStreamingChunk: (chunk: string, mcpTool?: string) => void;
  setLoading: (loading: boolean) => void;
  setHasSubmitted: (submitted: boolean) => void;
}

export function useChatState(): UseChatStateReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  /**
   * Updates the chat conversation by either adding new messages or updating existing ones
   * This handles both user messages and streaming AI responses
   *
   * @param action - 'add' to create new message, 'update' to modify existing message
   * @param message - The message content to add or update
   * @param index - Required for 'update' action - which message to modify
   */
  const updateChat = useCallback(
    (action: 'add' | 'update', message: Message, index?: number) => {
      setMessages((prev) => {
        // Add a new message to the end of the conversation
        if (action === 'add') {
          return [...prev, message];
        }

        // Update an existing message (used for streaming responses)
        if (index !== undefined && prev[index]) {
          const newMessages = [...prev];
          // Append to the existing message content for streaming
          newMessages[index] = {
            ...newMessages[index],
            content: prev[index].content + message.content,
          };
          return newMessages;
        }

        // Fallback: return unchanged messages if action is invalid
        return prev;
      });
    },
    [],
  );

  /**
   * Handles streaming chunks by either creating a new message or appending to existing one
   */
  const handleStreamingChunk = useCallback(
    (chunk: string, mcpTool?: string) => {
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];

        if (lastMessage.role === 'system') {
          // Append to existing system message
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            ...lastMessage,
            content: lastMessage.content + chunk,
          };
          return newMessages;
        } else {
          // Create new system message
          return [...prev, createMessage('system', chunk, mcpTool)];
        }
      });
    },
    [],
  );

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const setHasSubmittedCallback = useCallback((submitted: boolean) => {
    setHasSubmitted(submitted);
  }, []);

  return {
    messages,
    isLoading,
    hasSubmitted,
    updateChat,
    handleStreamingChunk,
    setLoading,
    setHasSubmitted: setHasSubmittedCallback,
  };
}
