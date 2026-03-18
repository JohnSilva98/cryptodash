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
      <Header onSelectCoin={setSelectedCoin} />
      <main className="space-y-4">
        {/* Top Cryptos */}
        <TopCryptos />
        
        {/* Main Content - 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column (2/3 width) - Market Overview */}
          <div className="lg:col-span-2 space-y-4">
            <MarketCap />
            <CryptosPrice onSelect={setSelectedCoin} />
          </div>
          
          {/* Right Column (1/3 width) - Coin Details */}
          <div className="lg:col-span-1">
            <CoinChart coin={selectedCoin} />
          </div>
        </div>
      </main>
    </div>
  );
}
