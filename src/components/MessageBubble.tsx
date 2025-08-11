'use client';

import { Message } from '@/types';
import { cn } from '@/lib/utils';
import { Wrench } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React from 'react';

interface MessageBubbleProps {
  message: Message;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'flex max-w-[80%] gap-3',
          isUser ? 'flex-row-reverse' : 'flex-row',
        )}
      >
        {/* Message Content */}
        <div className="flex flex-col gap-1">
          <div
            className={cn(
              'max-w-none rounded-xl px-4 py-2',
              cn(
                isUser
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-200 dark:bg-neutral-900',
              ),
            )}
          >
            <div className="prose prose-sm max-w-none break-words transition-all">
              {isUser ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Custom styling for different markdown elements
                    p: ({ children }) => (
                      <p className="mb-2 last:mb-0">{children}</p>
                    ),
                    code: ({
                      inline,
                      className,
                      children,
                    }: React.ComponentProps<'code'> & { inline?: boolean }) => {
                      return !inline ? (
                        <pre className="mb-2 overflow-x-auto rounded bg-gray-100 p-3 text-sm">
                          <code className={className}>{children}</code>
                        </pre>
                      ) : (
                        <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm">
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="mb-2 overflow-x-auto rounded bg-gray-100 p-3 text-sm">
                        {children}
                      </pre>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="mb-2 border-l-4 border-gray-300 pl-4 italic">
                        {children}
                      </blockquote>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-2 list-disc pl-6">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-2 list-decimal pl-6">{children}</ol>
                    ),
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 underline hover:text-emerald-500 hover:no-underline"
                      >
                        {children}
                      </a>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                    h1: ({ children }) => (
                      <h1 className="mb-2 text-xl font-bold">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mb-2 text-lg font-bold">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mb-2 text-base font-bold">{children}</h3>
                    ),
                    table: ({ children }) => (
                      <div className="mb-2 overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-gray-300 bg-gray-100 px-3 py-2 text-left font-semibold">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-gray-300 px-3 py-2">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => (
                      <p className="mb-2 last:mb-0">{children}</p>
                    ),
                    code: ({
                      inline,
                      className,
                      children,
                      ...props
                    }: React.ComponentProps<'code'> & { inline?: boolean }) => {
                      return !inline ? (
                        <pre className="mb-2 overflow-x-auto rounded bg-gray-100 p-3 text-sm">
                          <code className={className}>{children}</code>
                        </pre>
                      ) : (
                        <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm">
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="mb-2 overflow-x-auto rounded bg-gray-100 p-3 text-sm">
                        {children}
                      </pre>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="mb-2 border-l-4 border-gray-300 pl-4 italic">
                        {children}
                      </blockquote>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-2 list-disc pl-6">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-2 list-decimal pl-6">{children}</ol>
                    ),
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 underline hover:text-emerald-500 hover:no-underline"
                      >
                        {children}
                      </a>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                    h1: ({ children }) => (
                      <h1 className="mb-2 text-xl font-bold">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mb-2 text-lg font-bold">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mb-2 text-base font-bold">{children}</h3>
                    ),
                    table: ({ children }) => (
                      <div className="mb-2 overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-gray-300 bg-gray-100 px-3 py-2 text-left font-semibold">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-gray-300 px-3 py-2">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              )}
            </div>

            {/* MCP Tool Used Indicator */}
            {message.mcpTool ? (
              <div className="pt-1">
                <div className="flex items-center gap-2 text-sm">
                  <Wrench strokeWidth={2.25} size={14} />
                  <span>MCP used:</span>
                  <span className="font-mono text-emerald-600">
                    {message.mcpTool}
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
