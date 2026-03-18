"use client"
import Header from "./components/Header";
import { TopCryptos } from "./components/TopCryptos";
import MarketCap from "./components/MarketCap"; 
import CryptosPrice from "./components/CryptosPrice";
import { useState } from "react";
import CoinChart from "./components/CoinChart";

export default function Home() {

  
const [selectedCoin, setSelectedCoin] = useState<any>(null)
 

  


  
  return (
    <div className="bg-[var(--bg-primary)] font-sans p-4">
      <Header />
      <main className="flex min-h-screen w-full flex-col items-center  sm:items-start ">
        {/* top criptos */}
        <TopCryptos />
        {/* market cap */}
        <MarketCap />
        {/* criptos price */}
        <CryptosPrice  onSelect={setSelectedCoin} />
        {/* coin chart */}
        <CoinChart coin={selectedCoin} />
      </main>
    </div>
  );
}
