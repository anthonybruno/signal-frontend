import { useCallback, useRef } from 'react';

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

  // Use refs to access current values without causing re-renders
  const messagesRef = useRef<Message[]>([]);
  const handleStreamingChunkRef = useRef(handleStreamingChunk);
  const isLoadingRef = useRef(false);

  messagesRef.current = messages;
  handleStreamingChunkRef.current = handleStreamingChunk;
  isLoadingRef.current = isLoading;

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoadingRef.current) return;

      if (!hasSubmitted) setHasSubmitted(true);

      updateChat('add', createMessage('user', content));
      setLoading(true);

      try {
        await ChatService.streamChat(
          {
            message: content,
            history: messagesRef.current.map((msg) => ({
              role: msg.role,
              content: msg.content ?? '',
            })),
          },
          {
            onChunk: (chunk, mcpTool) => {
              handleStreamingChunkRef.current(chunk, mcpTool);
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
    [updateChat, setLoading, setHasSubmitted],
  );

  return { messages, isLoading, sendMessage, hasSubmitted };
}
