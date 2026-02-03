import { useUptime } from "../../hooks/useUpTime";
// import './ClockWidget.css'

export const ClockWidget = () => {
  const { upTime, currentTime } = useUptime();

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)] m-0 font-mono tracking-widest">
        {currentTime}
      </h1>
      <div className="flex justify-between text-[0.7rem] text-zinc-500 border-t border-white/10 pt-2.5 mt-2.5">
        <span className="font-bold tracking-wider">SYSTEM UPTIME:</span>
        <span className="font-mono text-emerald-500/80">{upTime}</span>
      </div>
    </div>
  );
};
