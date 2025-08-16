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
      data-role={message.role}
      className={`rounded-xl px-4 py-2 ${
        isUser
          ? 'bg-emerald-600 text-white'
          : 'bg-neutral-200 dark:bg-neutral-900'
      }`}
    >
      <div
        className={`break-words ${
          isUser
            ? ''
            : 'prose prose-headings:font-medium prose-h1:text-xl prose-a:text-emerald-600'
        }`}
      >
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>

      {message.mcpTool ? (
        <div className="flex items-center gap-2 pt-1 text-sm">
          <Wrench strokeWidth={2.25} size={14} />
          <span>MCP used:</span>
          <span className="font-mono text-emerald-600">{message.mcpTool}</span>
        </div>
      ) : null}
    </div>
  );
}

export default memo(ChatBubble);
