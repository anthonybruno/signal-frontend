// ChatService handles HTTP communication and stream processing only

export interface ChatStreamResponse {
  type: 'tools_starting' | 'chunk' | 'done' | 'error';
  data?: string | { tool?: string } | { message?: string };
}

export interface ChatRequest {
  message: string;
  history: Array<{
    role: string;
    content: string;
  }>;
}

export interface StreamCallbacks {
  onChunk: (content: string, mcpTool?: string) => void;
  onError: (error: string) => void;
  onComplete: () => void;
}

export class ChatService {
  private static readonly STREAM_ENDPOINT = `${process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000'}/chat`;

  private static handleToolsStarting(data: unknown): string | undefined {
    if (data && typeof data === 'object' && 'tool' in data) {
      return String(data.tool);
    }
    return undefined;
  }

  private static handleChunk(
    data: unknown,
    mcpTool: string | undefined,
    onChunk: (content: string, mcpTool?: string) => void,
  ): void {
    if (typeof data === 'string') {
      onChunk(data, mcpTool);
    }
  }

  private static handleError(data: unknown): never {
    let errorMessage = 'Stream error occurred';

    if (data && typeof data === 'object' && 'message' in data) {
      errorMessage = String(data.message);
    }

    throw new Error(errorMessage);
  }

  static async streamChat(
    request: ChatRequest,
    callbacks: StreamCallbacks,
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
              case 'tools_starting': {
                const tool = ChatService.handleToolsStarting(parsed.data);
                if (tool) mcpTool = tool;
                break;
              }
              case 'chunk':
                ChatService.handleChunk(
                  parsed.data,
                  mcpTool,
                  callbacks.onChunk,
                );
                break;
              case 'done':
                callbacks.onComplete();
                break;
              case 'error':
                ChatService.handleError(parsed.data);
            }
          } catch {
            continue;
          }
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      callbacks.onError(errorMessage);
    }
  }
}
