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
      <main className="grid grid-cols-4 gap-4">
        {/* top criptos */}
        <div className="col-span-4">
        <TopCryptos />
        </div>
        {/* market cap */}
        <div className="col-span-1">
        <MarketCap />
        </div>
        {/* criptos price */}
        <div className="col-span-4">
        <CryptosPrice  onSelect={setSelectedCoin} />
        </div>
        {/* coin chart */}
        <div className="col-span-1">
        <CoinChart coin={selectedCoin} />
        </div>
      </main>
    </div>
  );
}
