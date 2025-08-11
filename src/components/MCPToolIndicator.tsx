'use client';

import { Wrench } from 'lucide-react';

interface MCPToolIndicatorProps {
  tools: string[];
}

export function MCPToolIndicator({ tools }: MCPToolIndicatorProps) {
  if (tools.length === 0) return null;

  return (
    <div className="mb-4 flex w-full justify-start">
      <div className="flex max-w-[80%] gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            <span className="text-sm font-medium text-gray-600">AB</span>
          </div>
        </div>

        {/* Tool indicators */}
        <div className="flex flex-col gap-1">
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex flex-col gap-2">
              {tools.map((toolName, toolIndex) => ( // Changed from tool to toolName and index to toolIndex for clarity
                <div key={toolIndex} className="flex items-center gap-2 text-sm text-gray-600">
                  <Wrench size={14} className="animate-pulse text-blue-500" />
                  <span className="font-medium">MCP Tool:</span>
                  <span className="font-mono text-blue-600">{toolName}</span> {/* Changed from tool to toolName */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
