'use client';

import { useState } from 'react';
import { MessageCircleQuestion } from 'lucide-react';

import ChatContainer from '@/components/ChatContainer';
import QuickActionButton from '@/components/QuickActionButton';
import InputArea from '@/components/InputArea';
import { useChat } from '@/hooks/useChat';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const { messages, isLoading, sendMessage, hasSubmitted } = useChat();

  const handleQuickAction = (question: string) => {
    sendMessage(question);
  };

  const handleSendButton = () => {
    if (message.trim() && !isLoading) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <>
      <div>
        <QuickActionButton
          type="floating"
          label="What is this?"
          icon={MessageCircleQuestion}
          onClick={() => handleQuickAction('Tell me about this project')}
        />
      </div>
      <div className="flex h-screen flex-col">
        {hasSubmitted ? (
          <div className="flex flex-1">
            <div className="flex max-h-screen flex-1 flex-col">
              <div className="flex-1 overflow-scroll">
                <ChatContainer messages={messages} isLoading={isLoading} />
              </div>
              <InputArea
                message={message}
                setMessage={setMessage}
                onSendMessage={sendMessage}
                onQuickAction={handleQuickAction}
                onSendButton={handleSendButton}
                isLoading={isLoading}
                inputFocused={inputFocused}
                setInputFocused={setInputFocused}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="flex w-full flex-col items-center px-4">
              <div className="mb-8 flex justify-center">
                <div className="text-emerald-600">
                  <svg
                    width="70"
                    height="76"
                    viewBox="0 0 138 150"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <path d="M0 141.1v-.3a9 9 0 0 1 7.8-8.8 57.6 57.6 0 0 0 0-114A9 9 0 0 1 0 9.1v-.3C0 3.5 4.7-.6 10 0a75.6 75.6 0 0 1 0 149.8c-5.3.7-10-3.4-10-8.8Z" />
                    <path d="m70.7 141.6-.2-.2a8.8 8.8 0 0 1-1-11.8 88.3 88.3 0 0 0 .2-109.2 8.8 8.8 0 0 1 1-11.8l.1-.3a8.8 8.8 0 0 1 13 1 106.3 106.3 0 0 1-.1 131.4 8.8 8.8 0 0 1-13 1Z" />
                    <path d="m110 141.7-.2-.1a8.9 8.9 0 0 1-3.2-11.6 118.6 118.6 0 0 0 0-110A8.9 8.9 0 0 1 110 8.4l.2-.1a8.8 8.8 0 0 1 12.4 3.4 136.6 136.6 0 0 1 0 126.6 8.8 8.8 0 0 1-12.5 3.4ZM0 46.6a9.6 9.6 0 0 1 12.4-9.2 39.6 39.6 0 0 1 0 75.2A9.6 9.6 0 0 1 0 103.4V46.6Z" />
                  </svg>
                  <h1 className="text-2xl font-bold">Signal</h1>
                </div>
              </div>
              <InputArea
                message={message}
                setMessage={setMessage}
                onSendMessage={sendMessage}
                onQuickAction={handleQuickAction}
                onSendButton={handleSendButton}
                isLoading={isLoading}
                inputFocused={inputFocused}
                setInputFocused={setInputFocused}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
