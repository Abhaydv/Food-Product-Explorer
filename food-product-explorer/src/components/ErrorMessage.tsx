interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

function ErrorMessage({
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <main className="state-container">
      <div className="state-icon">⚠️</div>

      <h2>Something went wrong</h2>

      <p>{message}</p>

      <button type="button" onClick={onRetry}>
        Try Again
      </button>
    </main>
  );
}

export default ErrorMessage;