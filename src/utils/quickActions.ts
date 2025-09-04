import {
  CircleUser,
  AudioLines,
  Handshake,
  Rss,
  Zap,
  GitCompareArrows,
  Briefcase,
  TrendingUp,
  Info,
  ContactRound,
} from 'lucide-react';

export interface QuickAction {
  label: string;
  question: string;
  icon: React.ComponentType<{
    className?: string;
    size?: number;
    strokeWidth?: number;
  }>;
  category: 'personal' | 'professional' | 'social' | 'project';
}

// Centralized quick actions configuration
export const QUICK_ACTIONS: QuickAction[] = [
  {
    label: 'About me',
    question: 'Who are you?',
    icon: ContactRound,
    category: 'personal',
  },
  {
    label: 'Background',
    question:
      'Tell me about your background and what drives you professionally',
    icon: CircleUser,
    category: 'professional',
  },
  {
    label: 'Leadership',
    question:
      "What's your management philosophy and how do you approach team leadership?",
    icon: Handshake,
    category: 'professional',
  },
  {
    label: 'Projects',
    question:
      'Tell me about your most significant projects and their business impact',
    icon: Briefcase,
    category: 'professional',
  },
  {
    label: 'Skills',
    question: 'What are your core technical skills and areas of expertise?',
    icon: Zap,
    category: 'professional',
  },
  {
    label: 'Career',
    question:
      'Walk me through your career progression from IC to Engineering Manager and key leadership learnings',
    icon: TrendingUp,
    category: 'professional',
  },
  {
    label: 'Social',
    question:
      'Show me your recent GitHub activity, Spotify listening, and latest blog post',
    icon: Rss,
    category: 'social',
  },
  {
    label: 'Signal',
    question: 'Tell me about this project',
    icon: Info,
    category: 'project',
  },
];

// Filter quick actions by category
export function getQuickActionsByCategory(
  categories: QuickAction['category'][],
): QuickAction[] {
  return QUICK_ACTIONS.filter((action) => categories.includes(action.category));
}

// Get welcome screen actions (personal + project)
export const WELCOME_SCREEN_ACTIONS = getQuickActionsByCategory([
  'personal',
  'project',
]);

// Get chat interface actions (professional + social)
export const CHAT_INTERFACE_ACTIONS = getQuickActionsByCategory([
  'professional',
  'social',
]);
