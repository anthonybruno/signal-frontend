import { useState, useCallback } from 'react';
import { Message } from '@/types';
import { ChatService } from '@/services/chatService';

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
    async (content: string) => {
      if (!content.trim() || isLoading) return;
      if (!hasSubmitted) setHasSubmitted(true);

      // Add user message immediately
      const userMessage = ChatService.createUserMessage(content);
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Create assistant message that will be updated as it streams
      const assistantMessageId = (Date.now() + 1).toString();
      let hasStartedStreaming = false;
      let streamedContent = '';

      try {
        await ChatService.streamChat(
          {
            message: content,
            conversationHistory: messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
          },
          (chunk, toolsUsed) => {
            streamedContent += chunk;

            if (!hasStartedStreaming) {
              const assistantMessage = ChatService.createAssistantMessage(
                streamedContent,
                toolsUsed,
              );
              assistantMessage.id = assistantMessageId;
              setMessages((prev) => [...prev, assistantMessage]);
              hasStartedStreaming = true;
            } else {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMessageId ? { ...msg, content: streamedContent } : msg,
                ),
              );
            }
          },
          (error) => {
            console.error('Chat stream error:', error);
            if (hasStartedStreaming) {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMessageId
                    ? {
                        ...msg,
                        content:
                          "Sorry, I'm having trouble connecting right now. Please try again.",
                      }
                    : msg,
                ),
              );
            } else {
              const errorMessage = ChatService.createErrorMessage();
              errorMessage.id = assistantMessageId;
              setMessages((prev) => [...prev, errorMessage]);
            }
          },
          () => {
            setIsLoading(false);
          },
        );
      } catch {
        if (hasStartedStreaming) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? {
                    ...msg,
                    content: "Sorry, I'm having trouble connecting right now. Please try again.",
                  }
                : msg,
            ),
          );
        } else {
          const errorMessage = ChatService.createErrorMessage();
          errorMessage.id = assistantMessageId;
          setMessages((prev) => [...prev, errorMessage]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages],
  );

  return {
    messages,
    isLoading,
    sendMessage,
    hasSubmitted,
  };
}
