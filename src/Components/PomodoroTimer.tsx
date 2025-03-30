import { useEffect, useState } from "react";
import { useTimerContext } from "../context/TimerContext"; // adjust path if needed


interface PomodoroTimerProps {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>; // used to update timeLeft and trigger a re-render
  sessionTime: number;
  setSessionTime: React.Dispatch<React.SetStateAction<number>>;
}

function PomodoroTimer({
  timeLeft,
  setTimeLeft,
  sessionTime,
  setSessionTime,
}: PomodoroTimerProps) {
  const initialTimer: number = 25 * 60;
  const shortBreakTimer: number = 5 * 60;
  const longBreakTimer: number = 15 * 60;
  const TimerType = ["Pomodoro", "Short Break", "Long Break"] as const;
  type TimerType = (typeof TimerType)[number];

  const [isRunning, setIsRunning] = useState<boolean>(false);
  // const [currentType, setCurrentType] = useState<TimerType>("Pomodoro");
  const { currentType, setCurrentType , getBgColors} = useTimerContext();
  const {transparent} = getBgColors();
  const [currentSprint, setCurrentSprint] = useState<number>(1);

  // Display the time as title of the page
  useEffect(() => {
    document.title = `${formatTime(timeLeft)} - ${currentType}`;
  }, [timeLeft, currentType]);
  
  const longBreakSprints: number[] = [4, 8, 12, 16, 20];
  const alarmAudio: HTMLAudioElement = new Audio("./alarm.mp3");
  const clickAudio: HTMLAudioElement = new Audio("./click.mp3");

  const getSessionLength = (type: TimerType): number => {
    if (type === "Pomodoro") {
      return initialTimer;
    }
    if (type === "Short Break") {
      return shortBreakTimer;
    }
    if (type === "Long Break") {
      return longBreakTimer;
    }
    return 0;
  };

  useEffect(() => {
    const newSessionTime = getSessionLength(currentType);
    setTimeLeft(newSessionTime);
    setSessionTime(newSessionTime);
  }, [currentType]);

  useEffect(() => {
    if (currentType === "Pomodoro") {
      setTimeLeft(initialTimer);
    } else if (currentType === "Short Break") {
      setTimeLeft(shortBreakTimer);
    } else if (currentType === "Long Break") {
      setTimeLeft(longBreakTimer);
    }
  }, [currentType]);
  useEffect(() => {
    let timer: number;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      switchMode();
      setIsRunning(true);
      // play sound after
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  function toggleTimer() {
    setIsRunning((prev) => !prev);
    clickAudio.play();
  }
  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function switchMode() {
    alarmAudio.play();
    if (currentType === "Pomodoro") {
      setCurrentType("Short Break");
    } else if (currentType === "Short Break") {
      const nextSprint = currentSprint + 1;
      setCurrentSprint(nextSprint);
      if (longBreakSprints.includes(nextSprint)) {
        setCurrentType("Long Break");
      } else {
        setCurrentType("Pomodoro");
      }
    } else if (currentType === "Long Break") {
      setCurrentType("Pomodoro");
    }
  }

  function handleSwitchMode(type: TimerType) {
    setCurrentType(type);
    clickAudio.play();
  }

  function resetTimer() {
    setIsRunning(false);
    setTimeLeft(initialTimer);
    setCurrentType("Pomodoro");
    clickAudio.play();
  }
  return (
    <div className="flex items-center justify-center p-6">
      <div className={ `${transparent} text-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-8 text-center backdrop-blur-md`}>
        {/* Mode Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleSwitchMode("Pomodoro")}
            className={`px-4 py-2 rounded-full transition font-semibold ${
              currentType === "Pomodoro"
                ? "bg-white text-red-600"
                : "bg-white/20 hover:bg-white/30"
            }`}
          >
            Pomodoro
          </button>
          <button
            onClick={() => handleSwitchMode("Short Break")}
            className={`px-4 py-2 rounded-full transition font-semibold ${
              currentType === "Short Break"
                ? "bg-white text-red-600"
                : "bg-white/20 hover:bg-white/30"
            }`}
          >
            Short Break
          </button>
          <button
            onClick={() => handleSwitchMode("Long Break")}
            className={`px-4 py-2 rounded-full transition font-semibold ${
              currentType === "Long Break"
                ? "bg-white text-red-600"
                : "bg-white/20 hover:bg-white/30"
            }`}
          >
            Long Break
          </button>
        </div>

        {/* Timer */}
        <h1 className="text-8xl font-bold">{formatTime(timeLeft)}</h1>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={toggleTimer}
            className="bg-white text-red-600 px-8 py-2 rounded-full font-semibold hover:bg-gray-400 transition"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={resetTimer}
            className="bg-white text-red-600 px-8 py-2 rounded-full font-semibold hover:bg-gray-400 transition"
          >
            Reset
          </button>
        </div>

        {/* Sprint Count */}
        <div className="text-white/80 text-xl">Sprint: {currentSprint}</div>
      </div>
    </div>
  );
}

export default PomodoroTimer;
