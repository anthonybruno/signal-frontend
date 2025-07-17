import { cn } from '@/lib/utils';
import React from 'react';
import { QuickActionButtonProps } from '@/types';

function QuickActionButton({
  type = 'quick-action',
  label,
  icon: Icon,
  onClick,
}: QuickActionButtonProps) {
  if (type === 'floating') {
    return (
      <button
        className={cn(
          'fixed top-4 right-4 inline-flex items-center p-2 transition-colors',
          'text-sm font-medium text-neutral-500',
          'hover:cursor-pointer hover:border-neutral-400 hover:text-neutral-700',
          'focus:outline-none',
          'active:bg-gray-100',
        )}
        onClick={onClick}
      >
        <Icon strokeWidth={2.25} className="mr-1 h-4 w-4" aria-hidden="true" />
        {label}
      </button>
    );
  }

  // Default: quick-action style
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-lg border border-neutral-300 px-2 py-1.5 transition-colors',
        'text-sm font-medium text-neutral-500',
        'hover:cursor-pointer hover:border-neutral-400 hover:text-neutral-700',
        'focus:outline-none',
        'active:bg-gray-100',
      )}
    >
      <Icon strokeWidth={2.25} className="mr-1 h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}

export default QuickActionButton;
