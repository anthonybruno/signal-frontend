import {
  AudioLines,
  Briefcase,
  CircleUser,
  ContactRound,
  GitCompareArrows,
  Handshake,
  Info,
  Rss,
  TrendingUp,
  Zap,
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
    question: 'Who are you?',
    icon: ContactRound,
    category: 'welcome',
  },
  {
    label: 'Now playing',
    question: 'What are you listening to?',
    icon: AudioLines,
    category: 'welcome',
  },
  {
    label: 'What is Signal',
    question: 'Tell me about this project',
    icon: Info,
    category: 'welcome',
  },
  {
    label: 'About',
    question:
      'Tell me about your background and what drives you professionally',
    icon: CircleUser,
    category: 'chat',
  },
  {
    label: 'Leadership',
    question:
      "What's your management philosophy and how do you approach team leadership?",
    icon: Handshake,
    category: 'chat',
  },
  {
    label: 'Projects',
    question:
      'Tell me about your most significant projects and their business impact',
    icon: Briefcase,
    category: 'chat',
  },
  {
    label: 'Skills',
    question: 'What are your core technical skills and areas of expertise?',
    icon: Zap,
    category: 'chat',
  },
  {
    label: 'Career',
    question:
      'Walk me through your career progression from IC to Engineering Manager and key leadership learnings',
    icon: TrendingUp,
    category: 'chat',
  },
  {
    label: 'GitHub',
    question: 'Show me your recent GitHub activity',
    icon: GitCompareArrows,
    category: 'chat',
  },
  {
    label: 'Spotify',
    question: 'What are you currently listening to on Spotify?',
    icon: AudioLines,
    category: 'chat',
  },
  {
    label: 'Blog',
    question: 'What is your latest blog post?',
    icon: Rss,
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
