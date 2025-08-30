function TypingIndicator() {
  return (
    <div className="flex w-full items-center">
      <span className="relative flex size-3">
        <span className="bg-tony-mint/75 absolute inline-flex h-full w-full animate-ping rounded-full" />
        <span className="bg-tony-mint relative inline-flex size-3 rounded-full" />
      </span>
    </div>
  );
}

export default TypingIndicator;
