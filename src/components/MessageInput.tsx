'use client';

import { KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  message: string;
  setMessage: (messageContent: string) => void; // Changed from msg to messageContent for clarity
  onSendMessage: (messageContent: string) => void; // Changed from msg to messageContent for clarity
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
  const handleKeyDown = (keyboardEvent: KeyboardEvent<HTMLInputElement>) => { // Changed from e to keyboardEvent for clarity
    if (keyboardEvent.key === 'Enter') {
      keyboardEvent.preventDefault();
      if (message.trim() && !isLoading && !disabled) {
        onSendMessage(message);
        setMessage('');
      }
    }
  };

  const handleInput = (inputEvent: React.ChangeEvent<HTMLInputElement>) => { // Changed from e to inputEvent for clarity
    setMessage(inputEvent.target.value);
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
