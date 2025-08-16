'use client';

interface ChatTextInputProps {
  message: string;
  isLoading: boolean;
  setMessage: (message: string) => void;
  onMessageSubmit: (message: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

function ChatTextInput({
  message,
  isLoading,
  setMessage,
  onMessageSubmit,
  onFocus,
  onBlur,
}: ChatTextInputProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const messageText = message.trim();
    if (messageText && !isLoading) {
      onMessageSubmit(messageText);
      setMessage('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="block w-full pb-4">
      <input
        name="message"
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="Ask me (mostly) anything..."
        onFocus={onFocus}
        onBlur={onBlur}
        className="box-border block w-full placeholder:text-gray-500 focus:outline-none"
      />
    </form>
  );
}

export default ChatTextInput;
