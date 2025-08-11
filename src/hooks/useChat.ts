import { useState, useCallback } from 'react';

import { ChatService } from '@/services/chatService';
import type { Message } from '@/types';

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  hasSubmitted: boolean;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const sendMessage = useCallback(
    async (messageContent: string) => {
      // Changed from content to messageContent for clarity
      if (!messageContent.trim() || isLoading) return;
      if (!hasSubmitted) setHasSubmitted(true);

      // Add user message immediately
      const userMessage = ChatService.createUserMessage(messageContent);
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Create assistant message that will be updated as it streams
      const assistantMessageId = (Date.now() + 1).toString();
      let hasStartedStreaming = false;
      let streamedContent = '';

      try {
        await ChatService.streamChat(
          {
            message: messageContent,
            conversationHistory: messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
          },
          (chunk, mcpTool) => {
            // Changed from mcp_tool to mcpTool
            streamedContent += chunk;

            if (!hasStartedStreaming) {
              const assistantMessage = ChatService.createAssistantMessage(
                streamedContent,
                mcpTool, // Changed from mcp_tool to mcpTool
              );
              assistantMessage.id = assistantMessageId;
              setMessages((prev) => [...prev, assistantMessage]);
              hasStartedStreaming = true;
            } else {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMessageId
                    ? { ...msg, content: streamedContent }
                    : msg,
                ),
              );
            }
          },
          (error) => {
            console.error('Chat stream error:', error);
            const errorMessage = ChatService.createErrorMessage();
            errorMessage.id = assistantMessageId;
            setMessages((prev) => [...prev, errorMessage]);
          },
          () => {
            setIsLoading(false);
          },
        );
      } catch {
        const errorMessage = ChatService.createErrorMessage();
        errorMessage.id = assistantMessageId;
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, hasSubmitted],
  );

  return {
    messages,
    isLoading,
    sendMessage,
    hasSubmitted,
  };
}
