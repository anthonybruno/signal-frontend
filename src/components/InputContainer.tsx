import { ArrowUp, ArrowRight } from 'lucide-react';

import ChatTextInput from '@/components/ChatTextInput';

interface InputContainerProps {
  message: string;
  isLoading: boolean;
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
  animatedPlaceholders,
  autoFocus,
  setMessage,
  onMessageSubmit,
  setInputFocusState,
  children,
}) => (
  <div className="@container w-full">
    <div className="border-tony-300 dark:bg-tony-700 relative mx-auto mb-4 flex w-full max-w-4xl items-center rounded-full border-1 bg-white p-2 pl-4 transition-colors @min-[835px]:block @md:p-4 @xl:rounded-2xl dark:border-none">
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
      <div className="flex items-center @min-[835px]:pt-4">
        {children}
        <button
          onClick={() => {
            if (!message.trim() || isLoading) return;
            onMessageSubmit(message);
          }}
          className={`bg-tony-mint hover:bg-tony-mint-hover focus:ring-tony-mint flex items-center justify-center rounded-full p-1.5 text-white transition-all hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none ${isLoading || !message.trim() ? 'pointer-events-none opacity-50' : ''}`}
          type="submit"
          aria-label="Send message"
          disabled={isLoading || !message.trim()}
        >
          {children ? <ArrowUp size={18} /> : <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  </div>
);

export default InputContainer;
