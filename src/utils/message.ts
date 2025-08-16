import type { Message } from '@/types';

/**
 * Creates a message object with the specified role and content
 * Follows the same pattern as the backend for consistency
 */
export function createMessage(
  role: 'user' | 'system',
  content: string,
  mcpTool?: string,
): Message {
  return {
    id: `${role}-${Date.now()}`,
    role,
    content: role === 'user' ? content.trim() : content,
    mcpTool: role === 'system' ? mcpTool : undefined,
  };
}
