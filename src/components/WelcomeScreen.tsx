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
  const { message, setMessage, sendMessage, isLoading, setInputFocusState } =
    useChatContext();

  return (
    <div className="flex h-dvh flex-col lg:flex-row">
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-balance">
          Static portfolios are boring.
        </h2>
        <p className="text-xl text-pretty md:max-w-1/2 lg:max-w-3/4">
          Ask questions, explore projects, and see my career in a way that feels
          more alive.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center px-4 md:px-8 lg:flex-1 lg:bg-white dark:bg-transparent">
        <InputContainer
          message={message}
          setMessage={setMessage}
          onMessageSubmit={(msg) => void sendMessage(msg)}
          isLoading={isLoading}
          setInputFocusState={setInputFocusState}
          animatedPlaceholders
        />
        <div className="hidden items-center gap-3 pb-3 md:flex">
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
