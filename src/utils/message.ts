import type { Message } from '@/types';

export interface MessageGroup {
  id: string;
  userMessage: Message;
  systemMessage: Message;
}

/**
 * Makes a short, random string to help create unique IDs
 */
function generateRandomSuffix(): string {
  return Math.random().toString(36).slice(2, 11);
}

/**
 * Creates a message object with the specified role and content
 */
export function createMessage(
  role: 'user' | 'system',
  content: string,
  mcpTool?: string,
): Message {
  return {
    id: `${role}-${generateRandomSuffix()}`,
    role,
    content: role === 'user' ? content.trim() : content,
    mcpTool: role === 'system' ? mcpTool : undefined,
  };
}

/**
 * Groups chat messages into pairs of user and system messages
 *
 * @param {Message[]} messages Array of chat messages, alternating user and system
 * @returns {MessageGroup[]} Array of message groups
 *
 * @example
 * Input: [u1, s1, u2, s2, u3]
 * Output: [{user: u1, system: s1}, {user: u2, system: s2}, {user: u3, system: null}]
 */
export function createMessageGroups(messages: Message[]): MessageGroup[] {
  return Array.from({ length: Math.ceil(messages.length / 2) }, (_, index) => {
    const userMessagePosition = index * 2;
    const systemMessagePosition = userMessagePosition + 1;

    return {
      id: `group-${index}`,
      userMessage: messages[userMessagePosition],
      systemMessage: messages[systemMessagePosition] || {
        id: `system-${index}`,
        role: 'system',
        content: null,
      },
    };
  });
}
