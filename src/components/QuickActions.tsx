'use client';

import {
  CircleUser,
  AudioLines,
  Handshake,
  Rss,
  Zap,
  GitCompareArrows,
  Briefcase,
  TrendingUp,
} from 'lucide-react';
import QuickActionButton from './QuickActionButton';

interface QuickActionsProps {
  onQuickAction: (question: string) => void;
}

const QUICK_ACTIONS = [
  {
    id: 'about-this',
    label: 'About',
    question: 'Tell me about your background and what drives you professionally',
    icon: CircleUser,
  },
  {
    id: 'leadership-management',
    label: 'Leadership',
    question: "What's your management philosophy and how do you approach team leadership?",
    icon: Handshake,
  },
  {
    id: 'notable-projects',
    label: 'Projects',
    question: 'Tell me about your most significant projects and their business impact',
    icon: Briefcase,
  },
  {
    id: 'technical-skills',
    label: 'Skills',
    question: 'What are your core technical skills and areas of expertise?',
    icon: Zap,
  },
  {
    id: 'career-progression',
    label: 'Career',
    question:
      'Walk me through your career progression from IC to Engineering Manager and key leadership learnings',
    icon: TrendingUp,
  },
  {
    id: 'github-mcp',
    label: 'GitHub',
    question: 'Show me your recent GitHub activity',
    icon: GitCompareArrows,
  },
  {
    id: 'spotify-mcp',
    label: 'Spotify',
    question: 'What are you currently listening to on Spotify?',
    icon: AudioLines,
  },
  {
    id: 'blog-mcp',
    label: 'Blog',
    question: 'What is your latest blog post?',
    icon: Rss,
  },
];

function QuickActions({ onQuickAction }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap space-x-2">
      {QUICK_ACTIONS.map((action) => (
        <QuickActionButton
          key={action.id}
          type="quick-action"
          label={action.label}
          icon={action.icon}
          onClick={() => onQuickAction(action.question)}
        />
      ))}
    </div>
  );
}

export default QuickActions;
