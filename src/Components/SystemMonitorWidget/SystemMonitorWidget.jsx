import { useSystemMonitor } from "../../hooks/useSystemMonitor";
// import './SystemMonitorWidget.css'

export const SystemMonitorWidget = () => {
  const { cpu, ram } = useSystemMonitor();

  return (
    <div className="flex flex-col gap-4 min-w-[200px] p-2">
      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
          CPU LOAD: {cpu}%
        </label>
        <div className="w-full h-2 bg-black rounded overflow-hidden border border-zinc-800">
          <div
            className={`h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(0,255,65,0.2)] ${cpu > 50 ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]" : "bg-emerald-400"}`}
            style={{ width: `${cpu}%` }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
          RAM USAGE: {ram}%
        </label>
        <div className="w-full h-2 bg-black rounded overflow-hidden border border-zinc-800">
          <div
            className={`h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(0,255,65,0.2)] ${ram > 70 ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]" : "bg-emerald-400"}`}
            style={{ width: `${ram}%` }}
          />
        </div>
      </div>
    </div>
  );
};
