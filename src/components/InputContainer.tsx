import { ArrowUp } from 'lucide-react';

import ChatQuickActions from '@/components/ChatQuickActions';
import ChatTextInput from '@/components/ChatTextInput';

interface InputContainerProps {
  message: string;
  isLoading: boolean;
  isInputFocused: boolean;
  setMessage: (message: string) => void;
  onMessageSubmit: (message: string) => void;
  setInputFocusState: (isFocused: boolean) => void;
}

const InputContainer: React.FC<InputContainerProps> = ({
  message,
  isLoading,
  isInputFocused,
  setMessage,
  onMessageSubmit,
  setInputFocusState,
}) => (
  <div
    className={`mx-auto mb-4 w-full max-w-4xl rounded-2xl border-1 border-neutral-300 bg-white p-4 transition-colors hover:border-neutral-400 hover:shadow dark:bg-neutral-900 ${isInputFocused ? 'border-neutral-400 shadow' : ''}`}
  >
    <ChatTextInput
      message={message}
      setMessage={setMessage}
      onMessageSubmit={onMessageSubmit}
      isLoading={isLoading}
      onFocus={() => setInputFocusState(true)}
      onBlur={() => setInputFocusState(false)}
    />
    <div className="flex items-center">
      <div className="flex-1 pr-4">
        <ChatQuickActions onMessageSubmit={onMessageSubmit} />
      </div>
      <button
        onClick={() => {
          if (!message.trim() || isLoading) return;
          onMessageSubmit(message);
        }}
        className={`flex items-center justify-center rounded-lg bg-emerald-600 p-1.5 text-white transition-all hover:cursor-pointer hover:bg-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
        aria-label="Send message"
        disabled={isLoading}
      >
        <ArrowUp size={18} />
      </button>
    </div>
  </div>
);

export default InputContainer;
