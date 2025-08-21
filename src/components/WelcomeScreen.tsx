import { ContactRound, AudioLines, Info } from 'lucide-react';

import InputContainer from '@/components/InputContainer';
import QuickActionButton from '@/components/QuickActionButton';
import { useChatContext } from '@/contexts/ChatContext';

const QUICK_ACTIONS = [
  {
    label: 'About me',
    question: 'Who are you?',
    icon: ContactRound,
  },
  {
    label: 'Now playing',
    question: 'What are you listening to?',
    icon: AudioLines,
  },
  {
    label: 'What is Signal',
    question: 'Tell me about this project',
    icon: Info,
  },
];

export default function WelcomeScreen() {
  const {
    message,
    setMessage,
    sendMessage,
    isLoading,
    isInputFocused,
    setInputFocusState,
  } = useChatContext();

  return (
    <div className="flex h-screen">
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <h2 className="mb-4 text-4xl font-bold tracking-tight">
          Static portfolios are boring.
        </h2>
        <p className="max-w-3/4 text-xl text-pretty">
          Ask questions, explore projects, and see my career in a way that feels
          more alive.
        </p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center bg-white px-8 dark:bg-transparent">
        <InputContainer
          message={message}
          setMessage={setMessage}
          onMessageSubmit={(msg) => void sendMessage(msg)}
          isLoading={isLoading}
          isInputFocused={isInputFocused}
          setInputFocusState={setInputFocusState}
          animatedPlaceholders
        />
        <div className="flex items-center gap-3">
          {QUICK_ACTIONS.map((action) => (
            <QuickActionButton
              key={action.label}
              label={action.label}
              icon={action.icon}
              onClick={() => void sendMessage(action.question)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
