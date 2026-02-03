import { useState, useEffect } from "react";

export const useCoinHistory = (selectedCoin) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!selectedCoin) return;

    // Simulate generating history based on current price
    // In a real app, we would fetch API data here
    const generateMockHistory = () => {
      const data = [];
      const now = Date.now();
      const startPrice = selectedCoin.current_price;
      let currentPrice = startPrice;

      // Generate 20 points covering last hour
      for (let i = 20; i >= 0; i--) {
        const time = now - i * 3 * 60 * 1000; // 3 min intervals
        // Random walk
        const change = (Math.random() - 0.5) * (startPrice * 0.02);
        currentPrice += change;

        data.push({
          time: new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          price: currentPrice,
          originalTime: time,
        });
      }
      // Ensure the last point matches current price somewhat or just leave it as history
      return data;
    };

    setHistory(generateMockHistory());
  }, [selectedCoin]); // Re-run when coin changes

  return { history };
};
