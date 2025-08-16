function TypingIndicator() {
  return (
    <div className="flex w-full items-center">
      <span className="relative flex size-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
      </span>
      <div className="ml-2 flex max-w-[80%] items-center gap-3 text-sm font-medium text-neutral-500">
        Thinking
      </div>
    </div>
  );
}

export default TypingIndicator;
