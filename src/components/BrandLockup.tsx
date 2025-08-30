import { AnimatePresence, motion } from 'framer-motion';

interface BrandLockupProps {
  markOnly?: boolean;
}

export default function BrandLockup({ markOnly = false }: BrandLockupProps) {
  return (
    <div className="fixed flex items-center gap-2 p-4">
      <div className="text-tony-mint">
        <svg
          width="31"
          height="33"
          viewBox="0 0 138 150"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M0 141.1v-.3a9 9 0 0 1 7.8-8.8 57.6 57.6 0 0 0 0-114A9 9 0 0 1 0 9.1v-.3C0 3.5 4.7-.6 10 0a75.6 75.6 0 0 1 0 149.8c-5.3.7-10-3.4-10-8.8Z" />
          <path d="m70.7 141.6-.2-.2a8.8 8.8 0 0 1-1-11.8 88.3 88.3 0 0 0 .2-109.2 8.8 8.8 0 0 1 1-11.8l.1-.3a8.8 8.8 0 0 1 13 1 106.3 106.3 0 0 1-.1 131.4 8.8 8.8 0 0 1-13 1Z" />
          <path d="m110 141.7-.2-.1a8.9 8.9 0 0 1-3.2-11.6 118.6 118.6 0 0 0 0-110A8.9 8.9 0 0 1 110 8.4l.2-.1a8.8 8.8 0 0 1 12.4 3.4 136.6 136.6 0 0 1 0 126.6 8.8 8.8 0 0 1-12.5 3.4ZM0 46.6a9.6 9.6 0 0 1 12.4-9.2 39.6 39.6 0 0 1 0 75.2A9.6 9.6 0 0 1 0 103.4V46.6Z" />
        </svg>
      </div>
      <AnimatePresence>
        {!markOnly && (
          <motion.h1
            className="text-2xl font-bold"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0.0, 0.2, 1],
            }}
          >
            Signal
          </motion.h1>
        )}
      </AnimatePresence>
    </div>
  );
}
