'use client';

import { KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  message: string;
  setMessage: (msg: string) => void;
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

function MessageInput({
  message,
  setMessage,
  onSendMessage,
  isLoading,
  disabled = false,
  onFocus,
  onBlur,
}: MessageInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (message.trim() && !isLoading && !disabled) {
        onSendMessage(message);
        setMessage('');
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="block w-full pb-4">
      <input
        type="text"
        value={message}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Ask me (mostly) anything..."
        onFocus={onFocus}
        onBlur={onBlur}
        className={cn(
          'w-full',
          'block',
          'focus:outline-none',
          'box-border placeholder:text-gray-500',
        )}
      />
    </div>
  );
}

export default MessageInput;
