import { useState } from "react";
import "./App.css";
import Todos from "./Components/Todos";
import PomodoroTimer from "./Components/PomodoroTimer";
import Progress from "./Components/Progress";
import { useTimerContext } from "./context/TimerContext";

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);

  const { getBgColors } = useTimerContext();
  const {solid} = getBgColors();

  return (
    <div
      className={`min-h-screen ${solid} transition-colors duration-500`}
    >
      <Progress timeLeft={timeLeft} totalTime={sessionTime} />
      <PomodoroTimer
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        sessionTime={sessionTime}
        setSessionTime={setSessionTime}
      />
      <Todos />
    </div>
  );
}

export default App;
