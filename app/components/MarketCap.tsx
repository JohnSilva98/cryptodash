
'use client'

import { useEffect, useState } from "react"
import { generateChartData, getMarketChart, getGlobalData } from "../services/api"


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export default function MarketCap({ className = "" }: any) {

  function formatNumber(num: number) {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(2) + "T"
  }
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + "B"
  }
  return num
}

type GlobalData = {
  marketCap: number
  volume: number
  btcDominance: number
}

  const [globalData, setGlobalData] = useState<GlobalData | null>(null)

useEffect(() => {
  async function load() {
    const data = await getGlobalData()
     console.log("GLOBAL DATA:", data)
    setGlobalData(data)
  }

  load()
}, [])
    
    const [data, setData] = useState([])

    useEffect(() => {
        async function load(){
            const overview = await getMarketChart()
            const chart = Array.from({ length: 20 }, (_, i) => ({
  time: `${i}:00`,
  marketCap: overview.marketCap + (Math.random() - 0.5) * 50000000000
}))
            setData(chart)
        }
        load()
    }, [])

    return (
   <div className={`w-full h-80 border border-[var(--border-color)] rounded-lg p-4 mt-2 flex flex-col ${className}`}>

  {/* HEADER */}
  <h1 className="text-2xl font-bold text-[var(--text-primary)] border border-[var(--border-color)] bg-[var(--bg-secondary)] rounded-lg p-2 mb-2">
    Market Overview
  </h1>

  {/* CONTEÚDO */}
  <div className="flex flex-row flex-1 space-x-4">

    {/* GRÁFICO */}
    <div className="flex-1 h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" />

          <YAxis domain={['auto', 'auto']}
           tickFormatter={(value) => `$${formatNumber(value)}`} />

          <Tooltip
            contentStyle={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
            labelStyle={{ color: "var(--text-secondary)" }}
            cursor={{ stroke: "var(--border-color)", strokeWidth: 1 }}
          />
          <defs>
  <linearGradient id="colorMarket" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
  </linearGradient>
</defs>

          <Line
            type="monotone"
            dataKey="marketCap"
            stroke="var(--profit)"
            strokeWidth={3}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* SIDEBAR */}
    <div className="flex flex-col gap-4 text-[var(--text-primary)] w-1/4">
      <div className="border border-[var(--border-color)] bg-[var(--bg-secondary)] rounded-lg p-2">
        <p className="text-[var(--text-secondary)]">Market Cap</p>
        <p className="text-xl font-bold"> ${globalData ? formatNumber(globalData.marketCap) : "--"}</p>
      </div>

      <div className="border border-[var(--border-color)] bg-[var(--bg-secondary)] rounded-lg p-2">
        <p className="text-[var(--text-secondary)]">24h Volume</p>
        <p className="text-xl font-bold"> ${globalData ? formatNumber(globalData.volume) : "--"}</p>
      </div>

      <div className="border border-[var(--border-color)] bg-[var(--bg-secondary)] rounded-lg p-2">
        <p className="text-[var(--text-secondary)]">BTC Dominance</p>
        <p className="text-xl font-bold"> {globalData ? globalData.btcDominance.toFixed(1) + "%" : "--"}</p>
      </div>
    </div>

  </div>
</div>
    
    )
}