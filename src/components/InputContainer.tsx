import { ArrowUp, ArrowRight } from 'lucide-react';

import ChatTextInput from '@/components/ChatTextInput';

interface InputContainerProps {
  message: string;
  isLoading: boolean;
  isInputFocused: boolean;
  animatedPlaceholders?: boolean;
  autoFocus?: boolean;
  setMessage: (message: string) => void;
  onMessageSubmit: (message: string) => void;
  setInputFocusState: (isFocused: boolean) => void;
  children?: React.ReactNode;
}

const InputContainer: React.FC<InputContainerProps> = ({
  message,
  isLoading,
  isInputFocused,
  animatedPlaceholders,
  autoFocus,
  setMessage,
  onMessageSubmit,
  setInputFocusState,
  children,
}) => (
  <div
    className={`border-tony-300 hover:border-tony-400 dark:hover:border-tony-200 dark:bg-tony-700/50 relative mx-auto mb-4 w-full max-w-4xl border-1 bg-white p-4 transition-colors hover:shadow dark:hover:shadow-none ${children ? 'rounded-2xl' : 'flex items-center rounded-full'} ${isInputFocused ? 'border-tony-400 shadow' : ''}`}
  >
    <ChatTextInput
      message={message}
      setMessage={setMessage}
      onMessageSubmit={onMessageSubmit}
      isLoading={isLoading}
      animatedPlaceholders={animatedPlaceholders}
      autoFocus={autoFocus}
      onFocus={() => setInputFocusState(true)}
      onBlur={() => setInputFocusState(false)}
    />
    <div className={`flex items-center ${children ? 'pt-3' : ''}`}>
      {children ? <div className="flex flex-1 gap-2">{children}</div> : null}
      <button
        onClick={() => {
          if (!message.trim() || isLoading) return;
          onMessageSubmit(message);
        }}
        className={`bg-tony-mint hover:bg-tony-mint-hover focus:ring-tony-mint flex items-center justify-center rounded-full p-1.5 text-white transition-all hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none ${isLoading || !message.trim() ? 'pointer-events-none opacity-50' : ''}`}
        aria-label="Send message"
        disabled={isLoading || !message.trim()}
      >
        {children ? <ArrowUp size={18} /> : <ArrowRight size={18} />}
      </button>
    </div>
  </div>
);

export default InputContainer;
