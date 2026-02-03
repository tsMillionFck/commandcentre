import React from "react";
import { useMarket } from "../../Context/MarketContext";
import { useSystem } from "../../Context/SystemContext";
// import "./MarketWidget.css"

export const MarketWidget = () => {
  const { coins, loading, setSelectedCoin } = useMarket(); // Get setSelectedCoin
  const { dispatch } = useSystem();

  const handleCoinClick = (coin) => {
    // Accept full coin object
    setSelectedCoin(coin); // Update context
    dispatch({
      type: "ADD_LOG",
      payload: `Inspecting ${coin.name} telematry`,
      logType: "success",
    });
  };

  if (loading.status)
    return (
      <div className="text-zinc-500 text-sm animate-pulse p-4">
        {loading.message}...
      </div>
    );

  return (
    <div className="flex flex-col gap-2 h-full w-full">
      <div className="flex justify-between items-center pb-2 border-b border-white/5 shrink-0">
        <h3 className="text-xs font-bold text-zinc-100 uppercase tracking-widest">
          Live Market
        </h3>
        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse"></span>
      </div>
      <div className="flex-grow overflow-y-auto pr-1 min-h-0">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="flex justify-between items-center py-2 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors px-2 rounded shrink-0"
            onClick={() => handleCoinClick(coin)}
          >
            <div className="flex items-center">
              <span className="font-bold text-zinc-300 text-sm">
                {coin.symbol.toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-mono text-zinc-200">
                ${coin.current_price.toLocaleString()}
              </span>
              <span
                className={`text-xs font-mono font-bold ${coin.price_change_percentage_24h > 0 ? "text-emerald-400" : "text-red-400"}`}
              >
                {coin.price_change_percentage_24h > 0 ? "▲" : "▼"}
                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
