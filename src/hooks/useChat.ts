import { useCallback } from 'react';

import { ChatService } from '@/services/chatService';
import type { Message } from '@/types';
import { createMessage } from '@/utils/message';

import { useChatState } from './useChatState';

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  hasSubmitted: boolean;
}

export function useChat(): UseChatReturn {
  const {
    messages,
    isLoading,
    hasSubmitted,
    updateChat,
    handleStreamingChunk,
    setLoading,
    setHasSubmitted,
  } = useChatState();

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      if (!hasSubmitted) setHasSubmitted(true);

      updateChat('add', createMessage('user', content));
      setLoading(true);

      try {
        await ChatService.streamChat(
          {
            message: content,
            history: messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
          },
          {
            onChunk: (chunk, mcpTool) => {
              handleStreamingChunk(chunk, mcpTool);
            },
            onError: () => {
              updateChat(
                'add',
                createMessage('system', 'Connection error occurred'),
              );
              setLoading(false);
            },
            onComplete: () => {
              setLoading(false);
            },
          },
        );
      } catch {
        updateChat('add', createMessage('system', 'Connection error occurred'));
        setLoading(false);
      }
    },
    [
      isLoading,
      messages,
      hasSubmitted,
      updateChat,
      handleStreamingChunk,
      setLoading,
      setHasSubmitted,
    ],
  );

  return { messages, isLoading, sendMessage, hasSubmitted };
}
