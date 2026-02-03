import React from "react";
import { useMacroData } from "../../hooks/useMacroData";

export const MacroWidget = () => {
  const { macro, loading } = useMacroData();

  if (loading.status || !macro)
    return (
      <div className="text-zinc-500 text-xs animate-pulse p-4">
        Analyzing Global Sentiment...
      </div>
    );

  const getSentimentColor = (value) => {
    if (value > 70) return "#34d399"; // emerald
    if (value < 30) return "#ef4444"; // red
    return "#a1a1aa"; // zinc-400
  };

  return (
    <div className="flex flex-col gap-4 p-2 text-center items-center">
      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-1 w-full">
        Economics Sentiment
      </h3>
      <div className="flex flex-col items-center gap-1">
        <h1
          className="text-5xl font-bold tracking-tighter"
          style={{
            color: getSentimentColor(macro?.value),
            textShadow: `0 0 20px ${getSentimentColor(macro?.value)}44`,
          }}
        >
          {macro.value || "--"}
        </h1>
        <p className="text-sm font-medium text-zinc-300 uppercase tracking-wider">
          {macro?.value_classification || "Pending..."}
        </p>
      </div>
      <div className="border-t border-white/5 pt-2 w-full">
        <span className="text-[10px] text-zinc-600 font-mono">
          Next Update: {new Date(macro.timestamp * 1000).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};
