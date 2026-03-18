
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

export default function MarketCap() {

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
            const chart = generateChartData(overview.marketCap)
            setData(chart)
        }
        load()
    }, [])

    return (
   <div className="w-[72vw] h-80 border border-[var(--border-color)] rounded-lg p-4 mt-2 flex flex-col">

  {/* HEADER */}
  <h1 className="text-2xl font-bold text-[var(--text-primary)] border border-[var(--border-color)] bg-[var(--bg-secondary)] rounded-lg p-2 mb-2">
    Market Overview
  </h1>

  {/* CONTEÚDO */}
  <div className="flex flex-row flex-1 space-x-4">

    {/* GRÁFICO */}
    <div className="w-[85%] h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" />

          <YAxis domain={['dataMin - 10000', 'dataMax + 10000']} />

          <Tooltip
            contentStyle={{ backgroundColor: "#020617", border: "none" }}
            labelStyle={{ color: "#94a3b8" }}
            cursor={{ stroke: "#475569", strokeWidth: 1 }}
          />

          <Line
            type="monotone"
            dataKey="marketCap"
            stroke="#22c55e"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* SIDEBAR */}
    <div className="flex flex-col gap-4 text-white w-[15%]">
      <div className="border border-[var(--border-color)] bg-[var(--bg-secondary)] rounded-lg p-2">
        <p className="text-gray-400">Market Cap</p>
        <p className="text-xl font-bold"> ${globalData ? formatNumber(globalData.marketCap) : "--"}</p>
      </div>

      <div className="border border-[var(--border-color)] bg-[var(--bg-secondary)] rounded-lg p-2">
        <p className="text-gray-400">24h Volume</p>
        <p className="text-xl font-bold"> ${globalData ? formatNumber(globalData.volume) : "--"}</p>
      </div>

      <div className="border border-[var(--border-color)] bg-[var(--bg-secondary)] rounded-lg p-2">
        <p className="text-gray-400">BTC Dominance</p>
        <p className="text-xl font-bold"> ${globalData ? formatNumber(globalData.marketCap) : "--"}</p>
      </div>
    </div>

  </div>
</div>
    
    )
}