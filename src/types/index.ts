// Frontend-specific message interface
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  mcp_tool?: string;
}

// Frontend Component Types
export interface QuickActionButtonProps {
  type?: 'quick-action' | 'floating';
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
  onClick: () => void;
}

// Error Types
export interface APIError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}
