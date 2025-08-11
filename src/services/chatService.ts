import type { Message } from '@/types';

export interface ChatStreamResponse {
  type: 'tools_starting' | 'chunk' | 'done' | 'error';
  data?:
    | string
    | {
        tool?: string;
        message?: string;
      };
}

export interface ChatRequest {
  message: string;
  conversationHistory: Array<{
    role: string;
    content: string;
  }>;
}

export class ChatService {
  private static readonly STREAM_ENDPOINT = `${process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000'}/chat`;

  static async streamChat(
    request: ChatRequest,
    onChunk: (content: string, mcpTool?: string) => void,
    onError: (error: string) => void,
    onComplete: () => void,
  ): Promise<void> {
    try {
      const response = await fetch(ChatService.STREAM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('HTTP error occurred');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No reader available');
      }

      let mcpTool: string | undefined;

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter((line) => line.trim());

        for (const line of lines) {
          try {
            const parsed: ChatStreamResponse = JSON.parse(line);

            switch (parsed.type) {
              case 'tools_starting':
                if (typeof parsed.data === 'object' && parsed.data.tool) {
                  mcpTool = parsed.data.tool;
                }
                break;
              case 'chunk':
                if (typeof parsed.data === 'string') {
                  onChunk(parsed.data, mcpTool);
                } else if (
                  typeof parsed.data === 'object' &&
                  parsed.data.message
                ) {
                  onChunk(parsed.data.message, mcpTool);
                }
                break;
              case 'done':
                onComplete();
                return;
              case 'error': {
                const errorMessage =
                  typeof parsed.data === 'string'
                    ? parsed.data
                    : (parsed.data?.message ?? 'Stream error occurred');
                throw new Error(errorMessage);
              }
            }
          } catch {
            // Skip invalid JSON lines
            continue;
          }
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      onError(errorMessage);
    }
  }

  static createUserMessage(content: string): Message {
    return {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };
  }

  static createAssistantMessage(content: string, mcpTool?: string): Message {
    return {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content,
      timestamp: new Date(),
      mcpTool: mcpTool ?? undefined,
    };
  }

  static createErrorMessage(): Message {
    return {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: 'Connection error occurred',
      timestamp: new Date(),
    };
  }
}
