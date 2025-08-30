import { Wrench } from 'lucide-react';
import { memo } from 'react';
import ReactMarkdown from 'react-markdown';

import type { Message } from '@/types';

interface ChatBubbleProps {
  message: Message;
}

function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  return (
    <div
      className={`flex w-full ${
        message.role === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={
          isUser ? 'bg-tony-mint rounded-full px-4 py-2 text-white' : ''
        }
      >
        {message.mcpTool ? (
          <div className="flex items-center gap-2 pt-1 text-sm">
            <Wrench strokeWidth={2.25} size={14} />
            <span>MCP used:</span>
            <span className="text-tony-mint font-mono">{message.mcpTool}</span>
          </div>
        ) : null}
        <div
          className={`text-pretty break-words ${
            isUser
              ? ''
              : 'prose prose-headings:font-medium prose-headings:text-xl prose-headings:my-3'
          }`}
        >
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default memo(ChatBubble);
