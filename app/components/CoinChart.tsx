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
  volume: number
  marketCap: number
  supply: number
}

export default function CoinChart({ coin }: { coin: Coin | null }) {

  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [days, setDays] = useState(1)


  function formatNumber(num: number) { 
    //formatador de numeros
     if (num >= 1_000_000_000_000) return (num / 1_000_000_000_000).toFixed(1) + "T"
  
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + "B"
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M"
    if (num >= 1_000) return (num / 1_000).toFixed(2) + "K"

    return num.toFixed(2)
  }

  useEffect(() => {
    // Carrega o gráfico quando a moeda muda
    async function load() {
      if (!coin) return

      setLoading(true)

      try {
        const chartData = await getCoinChart(coin.id, days)
        console.log("Dados da API:", chartData)
        const chart = generateChartData(chartData.prices)
        console.log("Dados processados:", chart)
        setData(chart)
      } catch (err) {
        console.error("Erro ao carregar gráfico", err)
      }

      setLoading(false)
    }

    load()
  }, [coin, days])

  if (!coin) return null

  return (
    <div className="border border-[var(--border-color)] bg-[var(--bg-secondary)] rounded-lg p-4">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <img src={coin.image} alt={coin.name} className="w-10 h-10" />
        <div className="flex flex-row gap-2 justify-between items-center">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            {coin.name}
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>

      {/* COIN DETAILS */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-[var(--text-secondary)]">Current Price</span>
          <span className="font-semibold text-[var(--text-primary)]">
            ${formatNumber(coin.price)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[var(--text-secondary)]">Market Cap</span>
          <span className="font-semibold text-[var(--text-primary)]">
             ${formatNumber(coin.marketCap)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[var(--text-secondary)]">24h Volume</span>
          <span className="font-semibold text-[var(--text-primary)]">
            ${formatNumber(coin.volume)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[var(--text-secondary)]">Circulating Supply</span>
          <span className="font-semibold text-[var(--text-primary)]">
            ${formatNumber(coin.supply)}
          </span>
        </div>
      </div>

      {/* TIME RANGE BUTTONS */}
      <div className="flex gap-2 mb-4">
        {['1D', '7D', '1M', '1Y'].map((range) => (
          <button
            key={range}
            onClick={() => setDays(range)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              days === range
                ? 'bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {range === '1D' ? '1D' : range === '7D' ? '7D' : range === '1M' ? '1M' : '1Y'}
          </button>
        ))}
      </div>

      {/* CHART */}
      <div className="h-48">
        {loading ? (
          <p className="text-[var(--text-secondary)] text-center">Loading chart...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="time" hide />

              <YAxis
                domain={['auto', 'auto']}
                tickFormatter={(value) => `$${formatNumber(value)}`}
                tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
              />

              <Tooltip
                contentStyle={{ 
                  backgroundColor: "var(--bg-secondary)", 
                  border: "1px solid var(--border-color)",
                  borderRadius: '8px'
                }}
                labelStyle={{ color: "var(--text-secondary)" }}
                itemStyle={{ color: "var(--text-primary)" }}
              />

              <Line
                type="monotone"
                dataKey="marketCap"
                stroke={coin.change >= 0 ? "#22c55e" : "#ef4444"}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}