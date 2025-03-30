import { createContext,useContext,useState } from "react";

const timerModes = ["Pomodoro", "Short Break", "Long Break"] as const;
export type TimerType = (typeof timerModes)[number];

interface TimerContextProps {
    currentType:TimerType;
    setCurrentType:(type:TimerType) => void;
    getBgColors: ()=>{solid:string,transparent:string}
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined); // used to create context

export const useTimerContext = ()=>{
    const context = useContext(TimerContext);
    if(!context){
        throw new Error("useTimerContext must be used within a TimerContextProvider");
    }
    return context;
}

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentType, setCurrentType] = useState<TimerType>("Pomodoro");
  
    const getBgColors = () => {
      switch (currentType) {
        case "Pomodoro":
          return {
            solid: "bg-[#ba4949]",
            transparent: "bg-white/10",
          };
        case "Short Break":
          return {
            solid: "bg-[#38858a]",
            transparent: "bg-white/10",
          };
        case "Long Break":
          return {
            solid: "bg-[#397097]",
            transparent: "bg-white/10",
          };
        default:
          return {
            solid: "bg-white",
            transparent: "bg-white/20",
          };
      }
    };
  
    return (
      <TimerContext.Provider value={{ currentType, setCurrentType, getBgColors }}>
        {children}
      </TimerContext.Provider>
    );
  };