interface ProgressProps {
  timeLeft: number;
  totalTime: number;
}

function Progress({ timeLeft, totalTime }: ProgressProps) {
  return (
    <div className="w-full max-w-md mx-auto pt-4">
      <progress
        value={totalTime - timeLeft}
        max={totalTime}
        className="w-full h-4 rounded-lg overflow-hidden 
               [&::-webkit-progress-bar]:bg-gray-400 
               [&::-webkit-progress-value]:bg-blue-500 
               [&::-moz-progress-bar]:bg-blue-500"
      />
    </div>
  );
}

export default Progress;
