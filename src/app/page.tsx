'use client';

import BrandLockup from '@/components/BrandLockup';
import ChatInterface from '@/components/ChatInterface';
import WelcomeScreen from '@/components/WelcomeScreen';
import { useChatContext } from '@/contexts/ChatContext';

export default function ChatPage() {
  const { hasSubmitted } = useChatContext();

  return (
    <div className="flex h-screen flex-col">
      <BrandLockup markOnly={hasSubmitted} />
      {hasSubmitted ? <ChatInterface /> : <WelcomeScreen />}
    </div>
  );
}
