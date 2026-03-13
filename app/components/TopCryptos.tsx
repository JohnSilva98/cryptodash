'use client'
import { useState, useEffect } from "react";
import { formatCurrency } from "../utils/formatCurrency";
import { getTopCryptos } from "../services/api";


export function TopCryptos() {
    const [topCryptos, setTopCryptos] = useState([]);

  useEffect(() => {
    const fetchTopCryptos = async () => {
      const data = await getTopCryptos();
      setTopCryptos(data);
    };
    fetchTopCryptos();
  }, []);

  const apiBaseUrl = "https://api.coingecko.com/api/v3";
    return (
       <div className="border border-[var(--border-color)] bg-[var(--bg-secondary)] w-full rounded-lg">
          <div className="border border-[var(--border-color)]  rounded-lg p-2 ">
            <h1 className="text-2xl font-bold text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg p-2 mb-2">Top Criptos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
              {topCryptos.slice(0, 4).map((coin: any) => (
                <div key={coin.id} className="p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]  hover:scale-[1.02] transition cursor-pointer">
                  <div className="flex items-center gap-2">
                    <img src={coin.image} alt={coin.name} className="w-10 h-10" />
                    <p>{coin.symbol.toUpperCase()}</p>
                  </div>
                  
                  <p>{formatCurrency(coin.current_price)}</p>
                  <p
            className={
              coin.price_change_percentage_24h > 0
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
                </div>
              ))}
            </div>
          </div>
        </div>
    )
}