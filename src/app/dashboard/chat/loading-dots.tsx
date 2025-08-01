export const LoadingDots = () => (
  <div className="flex items-center gap-2">
    <div className="animate-pulse flex space-x-2">
      <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
      <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
    </div>
    <p className="text-gray-500">AI is thinking...</p>
  </div>
); 