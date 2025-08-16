// Frontend-specific message interface
export interface Message {
  id: string;
  role: 'user' | 'system';
  content: string;
  mcpTool?: string;
}

// Frontend Component Types
export interface QuickActionButtonProps {
  isPlain?: boolean;
  label: string;
  icon: React.ComponentType<{
    className?: string;
    size?: number;
    strokeWidth?: number;
  }>;
  onClick: () => void;
}
