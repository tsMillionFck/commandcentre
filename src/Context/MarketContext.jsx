import React, { createContext, useContext } from "react";
import { useMarketStream } from "../hooks/useMarketStream";

const MarketContext = createContext(); //creating the frequency roller

//Creating The Music
export const MarketProvider = ({ children }) => {
  const { coins, loading } = useMarketStream();
  const [selectedCoin, setSelectedCoin] = React.useState(null);

  // Set default selected coin when data loads
  React.useEffect(() => {
    if (coins.length > 0 && !selectedCoin) {
      setSelectedCoin(coins[0]);
    }
  }, [coins]);

  return (
    <MarketContext.Provider
      value={{ coins, loading, selectedCoin, setSelectedCoin }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context)
    throw new Error("useMarket should be used inside the MarketContext");
  return context;
};
