import {
  AudioLines,
  Cpu,
  GitCompareArrows,
  Info,
  Package,
  Rss,
  Smile,
  SquareChartGantt,
  SquareUser,
  Users,
} from 'lucide-react';

export interface QuickAction {
  label: string;
  question: string;
  icon: React.ComponentType<{
    className?: string;
    size?: number;
    strokeWidth?: number;
  }>;
  category: 'welcome' | 'chat';
}

// Centralized quick actions configuration
export const QUICK_ACTIONS: QuickAction[] = [
  {
    label: 'About me',
    question: 'Oh hey! Tell me a little about yourself.',
    icon: Smile,
    category: 'welcome',
  },
  {
    label: 'Now playing',
    question: 'What are you listening to right now?',
    icon: AudioLines,
    category: 'welcome',
  },
  {
    label: 'What is Signal',
    question: 'Can you give me a quick overview of Signal?',
    icon: Info,
    category: 'welcome',
  },
  {
    label: 'About',
    question: 'Who are you and what drives your work?',
    icon: SquareUser,
    category: 'chat',
  },
  {
    label: 'Career',
    question:
      'Can you walk me through your career journey and how it shaped your approach?',
    icon: SquareChartGantt,
    category: 'chat',
  },
  {
    label: 'Leadership',
    question: 'How do you grow engineers and build strong teams?',
    icon: Users,
    category: 'chat',
  },
  {
    label: 'Projects',
    question:
      'Which projects best highlight your technical and leadership impact?',
    icon: Package,
    category: 'chat',
  },
  {
    label: 'Skills',
    question: 'What skills help you most as both an engineer and a manager?',
    icon: Cpu,
    category: 'chat',
  },
  {
    label: 'Github',
    question: 'What have you been working on in Github?',
    icon: GitCompareArrows,
    category: 'chat',
  },
  {
    label: 'Blog',
    question: 'What have you been writing about lately?',
    icon: Rss,
    category: 'chat',
  },
  {
    label: 'Spotify',
    question: 'What are you listening to right now?',
    icon: AudioLines,
    category: 'chat',
  },
];

// Filter quick actions by category
export function getQuickActionsByCategory(
  categories: QuickAction['category'][],
): QuickAction[] {
  return QUICK_ACTIONS.filter((action) => categories.includes(action.category));
}

// Get welcome screen actions (personal + project)
export const WELCOME_SCREEN_ACTIONS = getQuickActionsByCategory(['welcome']);

// Get chat interface actions (professional + social)
export const CHAT_INTERFACE_ACTIONS = getQuickActionsByCategory(['chat']);
