import {
  ChevronsLeftRightEllipsis,
  Link,
  Sparkles,
  WandSparkles,
  Wrench,
} from 'lucide-react';
import { memo, useRef, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { useViewportWidth } from '@/hooks/useViewportWidth';
import type { Message } from '@/types';

interface ChatBubbleProps {
  message: Message;
}

function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  const textRef = useRef<HTMLDivElement>(null);
  const [isMultiLine, setIsMultiLine] = useState(false);
  const { viewportWidth } = useViewportWidth();

  const checkMultiLine = () => {
    if (textRef.current) {
      const element = textRef.current;
      const lineHeight = parseInt(getComputedStyle(element).lineHeight);
      const height = element.scrollHeight;
      setIsMultiLine(height > lineHeight);
    }
  };

  useEffect(() => {
    checkMultiLine();
  }, [message.content, viewportWidth]);

  return (
    <div
      className={`flex w-full ${
        message.role === 'user' ? 'justify-end' : 'justify-start'
      }`}
      role="article"
      aria-label={`${message.role === 'user' ? 'Your message' : 'AI response'}`}
    >
      <div
        className={
          isUser
            ? `bg-tony-mint px-4 py-2 text-white ${
                isMultiLine ? 'rounded-2xl' : 'rounded-full'
              }`
            : ''
        }
      >
        {message.mcpTool ? (
          <div className="flex items-center gap-2 pb-3 text-sm">
            <WandSparkles strokeWidth={2.25} size={16} />
            <strong>MCP used:</strong>
            <span className="text-tony-mint font-mono">{message.mcpTool}</span>
          </div>
        ) : null}
        <div
          ref={textRef}
          className={`text-pretty break-words ${
            isUser
              ? ''
              : 'prose prose-headings:font-medium prose-headings:text-xl prose-headings:my-3 prose-a:font-bold prose-a:hover:no-underline prose-code:text-tony-700'
          }`}
        >
          <ReactMarkdown
            components={{
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-1"
                >
                  {children} <Link size={14} />
                </a>
              ),
              code: ({ children }) => children,
              hr: ({ children }) => children,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default memo(ChatBubble);
