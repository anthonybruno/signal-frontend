function TypingIndicator() {
  return (
    <div className="flex w-full items-center">
      <span className="relative flex size-3">
        <span className="bg-tony-mint absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
        <span className="bg-tony-mint relative inline-flex size-3 rounded-full" />
      </span>
      <div className="text-tony-500 dark:text-tony-300 ml-2 flex max-w-[80%] items-center gap-3 text-sm font-medium">
        Thinking
      </div>
    </div>
  );
}

export default TypingIndicator;
