import type { QuickActionButtonProps } from '@/types';

function QuickActionButton({
  isPlain = false,
  label,
  icon: Icon,
  onClick,
}: QuickActionButtonProps) {
  return (
    <button
      className={`inline-flex items-center text-sm font-medium text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-700 focus:outline-none active:bg-gray-100 ${
        isPlain
          ? 'fixed top-4 right-4 p-2'
          : 'rounded-lg border border-neutral-300 px-2 py-1.5'
      }`}
      onClick={onClick}
    >
      <Icon strokeWidth={2.5} className="mr-1 h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}

export default QuickActionButton;
