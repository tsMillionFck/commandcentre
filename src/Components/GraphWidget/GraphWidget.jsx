import React, { useMemo } from "react";
import { useMarket } from "../../Context/MarketContext";
import { useCoinHistory } from "../../hooks/useCoinHistory";
import { useSystem } from "../../Context/SystemContext";

export const GraphWidget = () => {
  const { selectedCoin } = useMarket();
  const { history } = useCoinHistory(selectedCoin);
  const { state } = useSystem(); // For theme detection if needed

  // Calculate path for SVG
  const pathData = useMemo(() => {
    if (!history.length) return "";

    const minPrice = Math.min(...history.map((d) => d.price));
    const maxPrice = Math.max(...history.map((d) => d.price));
    const range = maxPrice - minPrice;

    // Canvas dimensions (viewBox 0 0 100 50)
    const width = 100;
    const height = 50;

    return history
      .map((point, i) => {
        const x = (i / (history.length - 1)) * width;
        // Normalize price to 0-height, flip Y axis because SVG 0 is top
        const normalizedPrice = (point.price - minPrice) / range;
        const y = height - normalizedPrice * height;
        return `${i === 0 ? "M" : "L"} ${x},${y}`;
      })
      .join(" ");
  }, [history]);

  if (!selectedCoin)
    return (
      <div className="flex items-center justify-center h-full text-zinc-500">
        Select a coin to view history
      </div>
    );

  const isPositive = selectedCoin.price_change_percentage_24h > 0;
  const strokeColor = isPositive ? "#34d399" : "#ef4444"; // Emerald-400 or Red-500

  return (
    <div className="flex flex-col h-full w-full relative overflow-hidden group">
      {/* Header */}
      <div className="flex justify-between items-center pb-2 border-b border-white/5 shrink-0 z-10 bg-transparent">
        <div className="flex items-baseline gap-2">
          <h3 className="text-xs font-bold text-zinc-100 uppercase tracking-widest">
            {selectedCoin.name} Analysis
          </h3>
          <span className="text-[10px] text-zinc-500 font-mono">1H TREND</span>
        </div>
        <div className="flex flex-col items-end">
          <span
            className={`text-sm font-mono font-bold ${isPositive ? "text-emerald-400" : "text-red-400"}`}
          >
            ${selectedCoin.current_price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Graph Area */}
      <div className="flex-grow relative w-full h-full min-h-0 flex items-center justify-center p-2">
        {history.length > 0 ? (
          <svg
            viewBox="0 0 100 50"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="graphGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity="0.2" />
                <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Area under curve */}
            <path
              d={`${pathData} L 100,50 L 0,50 Z`}
              fill="url(#graphGradient)"
              className="transition-all duration-500 ease-in-out"
            />

            {/* Line */}
            <path
              d={pathData}
              fill="none"
              stroke={strokeColor}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_4px_rgba(0,0,0,0.5)] transition-all duration-500 ease-in-out"
            />

            {/* Dot on latest point */}
            <circle
              cx="100"
              cy={pathData.split(" ").pop().split(",")[1]}
              r="1.5"
              fill={strokeColor}
              className="animate-pulse"
            />
          </svg>
        ) : (
          <div className="text-zinc-600 animate-pulse text-xs">
            Generating Prediction Model...
          </div>
        )}
      </div>

      {/* Crosshair/Grid visual elements (decorative) */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"></div>
    </div>
  );
};
