
'use client'

import { useEffect, useState } from "react"
import { getMarketChart } from "../services/api"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"
export default function MarketCap() {
    
    const [data, setData] = useState([])

    useEffect(() => {
        async function load(){
            const chart = await getMarketChart()
            setData(chart)
        }
        load()
    }, [])

    return (
     <div className="w-[70vw] h-80">
        
      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={data}>

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="price"
            stroke="#22c55e"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
    )
}