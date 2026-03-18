'use client'

import { useEffect, useState } from "react"
import { getCoinChart, generateChartData } from "../services/api"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

type Coin = {
  id: string
  name: string
  symbol: string
  price: number
  change: number
  image: string
}

export default function CoinChart({ coin }: { coin: Coin | null }) {

  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  function formatNumber(num: number) { 
    //formatador de numeros
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + "B"
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M"
    return num.toFixed(2)
  }

  useEffect(() => {
    // Carrega o gráfico quando a moeda muda
    async function load() {
      if (!coin) return

      setLoading(true)

      try {
        const prices = await getCoinChart(coin.id)
        const chart = generateChartData(prices)
        setData(chart)
      } catch (err) {
        console.error("Erro ao carregar gráfico", err)
      }

      setLoading(false)
    }

    load()
  }, [coin])

  if (!coin) return null

  return (
    <div className="w-[72vw] mt-4 border border-[var(--border-color)] rounded-lg p-4">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-4">
        <img src={coin.image} alt={coin.name} className="w-8 h-8" />
        <h2 className="text-xl font-bold text-white">
          {coin.name} ({coin.symbol})
        </h2>
      </div>

      {/* INFO */}
      <div className="flex gap-6 mb-4 text-sm text-gray-400">
        <p>Preço: <span className="text-white">${formatNumber(coin.price)}</span></p>
        <p>
          24h:
          <span className={coin.change >= 0 ? "text-green-500" : "text-red-500"}>
            {coin.change.toFixed(2)}%
          </span>
        </p>
      </div>

      {/* GRÁFICO */}
      <div className="h-72">
        {loading ? (
          <p className="text-gray-400">Carregando gráfico...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="time" hide />

              <YAxis
                domain={['auto', 'auto']}
                tickFormatter={(value) => `$${formatNumber(value)}`}
              />

              <Tooltip
                contentStyle={{ backgroundColor: "#020617", border: "none" }}
                labelStyle={{ color: "#94a3b8" }}
              />

              <Line
                type="monotone"
                dataKey="marketCap"
                stroke={coin.change >= 0 ? "#22c55e" : "#ef4444"}
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}