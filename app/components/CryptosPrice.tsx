'use client'

import { useEffect, useState } from "react"
import { getTopCoins } from "../services/api"

type Coin = {
  id: string
  name: string
  symbol: string
  price: number
  change: number
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
    <div className="w-[72vw] mt-4 border border-[var(--border-color)] rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Top Coins</h2>

      <div className="space-y-2">
        {coins.map((coin) => (
          <div
            key={coin.id}
            onClick={() => onSelect(coin)}
            className="flex justify-between p-2 rounded-lg bg-[var(--bg-secondary)] cursor-pointer hover:bg-slate-800 transition"
          >
            <div>
              <p className="font-bold">{coin.symbol}</p>
              <p className="text-sm text-gray-400">{coin.name}</p>
            </div>

            <div className="text-right">
              <p>${coin.price}</p>
              <p className={coin.change >= 0 ? "text-green-500" : "text-red-500"}>
                {coin.change.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}