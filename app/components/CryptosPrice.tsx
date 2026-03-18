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
    <div className="w-full h-fit mt-4 border border-[var(--border-color)] rounded-xl p-4 bg-[var(--bg-secondary)]">

      {/* HEADER */}
      <h2 className="text-xl font-bold mb-4 text-[var(--text-primary)]">
        Cryptocurrency Prices
      </h2>

      {/* TABLE HEADER */}
      <div className="grid grid-cols-5 text-[var(--text-secondary)] text-sm px-2 pb-2 border-b border-[var(--border-color)]">
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
            className="grid grid-cols-5 items-center px-2 py-2 rounded-lg cursor-pointer hover:bg-[var(--bg-card)]/50 transition"
          >
            {/* RANK */}
            <p className="text-[var(--text-secondary)]">{index + 1}.</p>

            {/* COIN */}
            <div>
              <p className="text-[var(--text-primary)] font-semibold">
                <img src={coin.image} alt={coin.name} className="w-5 h-5 inline-block mr-2" />
                {coin.name} <span className="text-[var(--text-secondary)]">{coin.symbol}</span>
              </p>
            </div>

            {/* PRICE */}
            <p className="text-right text-[var(--text-primary)]">
              ${coin.price.toLocaleString()}
            </p>

            {/* CHANGE */}
            <p className={`text-right font-semibold ${
              coin.change >= 0 ? "text-[var(--profit)]" : "text-[var(--loss)]"
            }`}>
              {coin.change.toFixed(2)}%
            </p>

            {/* MARKET CAP (fake por enquanto) */}
            <p className="text-right text-[var(--text-secondary)]">
              ${Math.floor(coin.price * 1000000).toLocaleString()}
            </p>
          </div>
        ))}

      </div>
    </div>
  )
}