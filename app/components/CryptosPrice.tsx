'use client'

import { useEffect, useState } from "react"
import { getTopCoins } from "../services/api"

type Coin = {
  id: string
  name: string
  symbol: string
  price: number
  change: number
  image: string
}

export default function CryptosPrice({ onSelect }: { onSelect: (coin: Coin) => void }) {
  const [coins, setCoins] = useState<Coin[]>([])

  useEffect(() => {
    async function load() {
      const data = await getTopCoins()
      setCoins(data)
    }
    load()
  }, [])

  return (
    <div className="w-full h-fit mt-4 border border-[var(--border-color)] rounded-xl p-4 bg-gradient-to-r from-slate-900 to-slate-800">

      {/* HEADER */}
      <h2 className="text-xl font-bold mb-4 text-white">
        Cryptocurrency Prices
      </h2>

      {/* TABLE HEADER */}
      <div className="grid grid-cols-5 text-gray-400 text-sm px-2 pb-2 border-b border-slate-700">
        <p>#</p>
        <p>Coin</p>
        <p className="text-right">Price</p>
        <p className="text-right">24h</p>
        <p className="text-right">Market Cap</p>
      </div>

      {/* SCROLL AREA */}
      <div className="max-h-[220px] overflow-y-auto mt-2 space-y-1 pr-1">

        {coins.map((coin, index) => (
          <div
            key={coin.id}
            onClick={() => onSelect(coin)}
            className="grid grid-cols-5 items-center px-2 py-2 rounded-lg cursor-pointer hover:bg-slate-700/50 transition"
          >
            {/* RANK */}
            <p className="text-gray-400">{index + 1}.</p>

            {/* COIN */}
            <div>
              <p className="text-white font-semibold">
                <img src={coin.image} alt={coin.name} className="w-5 h-5 inline-block mr-2" />
                {coin.name} <span className="text-gray-400">{coin.symbol}</span>
              </p>
            </div>

            {/* PRICE */}
            <p className="text-right text-white">
              ${coin.price.toLocaleString()}
            </p>

            {/* CHANGE */}
            <p className={`text-right font-semibold ${
              coin.change >= 0 ? "text-green-400" : "text-red-400"
            }`}>
              {coin.change.toFixed(2)}%
            </p>

            {/* MARKET CAP (fake por enquanto) */}
            <p className="text-right text-gray-300">
              ${Math.floor(coin.price * 1000000).toLocaleString()}
            </p>
          </div>
        ))}

      </div>
    </div>
  )
}