import type { QuickActionButtonProps } from '@/types';

function QuickActionButton({
  label,
  icon: Icon,
  onClick,
}: QuickActionButtonProps) {
  return (
    <button
      className="border-tony-300/50 dark:border-tony-500 text-tony-500 dark:text-tony-300 dark:hover:text-tony-200 inline-flex cursor-pointer items-center rounded-full border px-2 py-1.5 text-sm font-medium transition-colors focus:outline-none active:bg-gray-100"
      onClick={onClick}
    >
      <Icon strokeWidth={2} className="mr-1 h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}

export default QuickActionButton;
