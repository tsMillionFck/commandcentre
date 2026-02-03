import React, { useRef, useLayoutEffect } from "react";
import { useSystem } from "../../Context/SystemContext";
// import './LogWidget.css'

export const LogWidget = () => {
  const { logs, dispatch } = useSystem();
  const logEndRef = useRef();
  const LOG_COLORS = {
    info: "#71717a", // zinc-500
    success: "#34d399", // emerald-400
    warning: "#fbbf24", // amber-400
    critical: "#ef4444", // red-500
    default: "#e4e4e7", // zinc-200
  };

  const handleWipeClick = () => {
    dispatch({
      type: "CLEAR_LOG",
    });
  };

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, [logs]);

  return (
    <div className="h-[350px] w-full flex flex-col bg-black/20 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-2 border-b border-white/5 bg-white/5 shrink-0">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
          System Logs
        </h3>
        <button
          onClick={handleWipeClick}
          className="text-[10px] text-zinc-500 hover:text-red-400 transition-colors uppercase font-bold tracking-wider"
        >
          Wipe
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-3 font-mono text-xs min-h-0">
        {logs.length === 0 ? (
          <p className="text-zinc-600 italic">Awaiting system events... </p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className={`mb-1 pl-2 border-l-2`}
              style={{
                borderColor: LOG_COLORS[log.logType] || LOG_COLORS.default,
              }}
            >
              <span className="text-zinc-600 mr-2">[{log.time}]</span>
              <span
                style={{
                  color: LOG_COLORS[log.logType] || LOG_COLORS.default,
                }}
              >
                [{log.text}]
              </span>
            </div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};
