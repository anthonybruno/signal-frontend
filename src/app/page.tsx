'use client';

import BrandLockup from '@/components/BrandLockup';
import ChatInterface from '@/components/ChatInterface';
import WelcomeScreen from '@/components/WelcomeScreen';
import { useChatContext } from '@/contexts/ChatContext';

export default function ChatPage() {
  const { hasSubmitted } = useChatContext();

  return (
    <>
      <BrandLockup markOnly={hasSubmitted} />
      {/* <div className="flex h-screen flex-col">
        <div>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum illum
          tempora fugiat culpa accusantium iusto laudantium perferendis unde
          mollitia, nihil asperiores tenetur, officiis dolore! Mollitia ea
          inventore libero ducimus magni.
        </div>
        <div className="flex-1 bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700" />
      </div>
      <div className="flex h-screen flex-col">
        <div>Hello</div>
        <div className="flex-1 bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700" />
      </div> */}
      {hasSubmitted ? <ChatInterface /> : <WelcomeScreen />}
    </>
  );
}
