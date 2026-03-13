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