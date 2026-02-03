import React, { useState, useEffect } from "react";
import { useSystem } from "../Context/SystemContext";

export const useMarketStream = (initialLimit = 10) => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState({
        message: 'Fetching Coin Data.',
        status: true
    })
    const { dispatch } = useSystem();

    const fetchMarket = async () => {
        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${initialLimit}&page=1&sparkline=false`
            );

            if (!response.ok) setLoading(prevLoad => ({
                ...prevLoad,
                message: 'Failed to Fetch Coin Data, Try Again'
            }))
            const data = await response.json();

            const cleanData = data.map(d => {
                return {
                    id: d.id,
                    name: d.name,
                    symbol: d.symbol,
                    current_price: d.current_price,
                    price_change_24h: d.price_change_24h,
                    price_change_percentage_24h: d.price_change_percentage_24h,
                    last_updated: d.last_updated

                }
            })
            setCoins(cleanData);
            setLoading(prevLoad => ({
                ...prevLoad,
                status: false
            }));
        } catch (error) {
            setLoading(prevLoad => ({
                ...prevLoad,
                message: `Failed to fetch data, Reason: ${error.message}`
            }));
            console.error("Failed to Get the response Due to This: ", error.message);
        }
    }

    useEffect(() => {
        fetchMarket();
    }, [])

    useEffect(() => {
        if (!loading.status && coins.length > 0) {
            dispatch({
                type: 'ADD_LOG',
                payload: 'Market Data Synchronized',
                logType: 'success'
            })
        }
    }, [loading, coins])

    return { coins, loading, refresh: fetchMarket }
}