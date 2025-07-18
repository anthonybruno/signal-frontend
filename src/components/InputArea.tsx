import React from 'react';
import MessageInput from './MessageInput';
import QuickActions from './QuickActions';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputAreaProps {
  message: string;
  setMessage: (msg: string) => void;
  onSendMessage: (msg: string) => void;
  onQuickAction: (msg: string) => void;
  onSendButton: () => void;
  isLoading: boolean;
  inputFocused: boolean;
  setInputFocused: (focused: boolean) => void;
}

const InputArea: React.FC<InputAreaProps> = ({
  message,
  setMessage,
  onSendMessage,
  onQuickAction,
  onSendButton,
  isLoading,
  inputFocused,
  setInputFocused,
}) => (
  <div
    className={cn(
      'mx-auto mb-4 w-full max-w-4xl rounded-2xl border-1 border-neutral-300 bg-white dark:bg-neutral-900 p-4 transition-colors',
      'hover:border-neutral-400 hover:shadow',
      inputFocused && 'border-neutral-400 shadow',
    )}
  >
    <MessageInput
      message={message}
      setMessage={setMessage}
      onSendMessage={onSendMessage}
      isLoading={isLoading}
      onFocus={() => setInputFocused(true)}
      onBlur={() => setInputFocused(false)}
    />
    <div className="flex items-center">
      <div className="flex-1 pr-4">
        <QuickActions onQuickAction={onQuickAction} />
      </div>
      <button
        onClick={() => {
          if (!message.trim() || isLoading) return;
          onSendButton();
        }}
        className={cn(
          'flex items-center justify-center rounded-lg p-1.5 transition-all',
          'bg-emerald-600 text-white hover:bg-emerald-500',
          'hover:cursor-pointer',
          'focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none',
          isLoading && 'cursor-not-allowed opacity-50',
        )}
        aria-label="Send message"
        disabled={isLoading}
      >
        <ArrowUp size={18} />
      </button>
    </div>
  </div>
);

export default InputArea;
