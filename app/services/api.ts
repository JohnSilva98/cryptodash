const BASE_URL = "https://api.coingecko.com/api/v3"

export async function fetchAPI(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`)

  if (!res.ok) {
    throw new Error("Erro na API")
  }
  

  return res.json()
}

export async function getTopCryptos() {
  const data = await fetchAPI("/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
  return data;
}

export async function getMarketChart() {

  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1"
  )

  const data = await res.json()
  let totalMarketCap = 0
  let totalVolume = 0

  data.forEach((coin: any) => {
    totalMarketCap += coin.market_cap
    totalVolume += coin.total_volume
  })

  return {
    marketCap: totalMarketCap,
    volume: totalVolume
  }
 
}

export function generateChartData(data: [number, number][]) {
  return data.map(([timestamp, price]) => ({
    time: new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    }),
    marketCap: price,
    price: price,
    price_change_percentage_24h: 0,
    circulating_supply: 0
  }))
}
export async function getGlobalData() {
  const res = await fetch("https://api.coingecko.com/api/v3/global")
  const data = await res.json()
  console.log(data)
  console.log(data.data.total_market_cap.usd)

  return {
    marketCap: data.data.total_market_cap.usd,
    volume: data.data.total_volume.usd,
    btcDominance: data.data.market_cap_percentage.btc
  }
}

export async function getTopCoins() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1"
  )

  const data = await res.json()
  console.log(data)

  return data.map((coin: any) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    price: coin.current_price,
    change: coin.price_change_percentage_24h,
    image: coin.image,
    volume: coin.total_volume,
    marketCap: coin.market_cap,
    supply: coin.circulating_supply
  }))
}

export async function getCoinChart(coinId: string, days: number) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
  )

  const data = await res.json()

  return {
    prices: data.prices, // [[timestamp, price]]
    total_volume: data.total_volume
  }

}