"use client"
import Header from "./components/Header";
import { TopCryptos } from "./components/TopCryptos";
import MarketCap from "./components/MarketCap"; 

export default function Home() {

  

 

  


  
  return (
    <div className="bg-[var(--bg-primary)] font-sans p-4">
      <Header />
      <main className="flex min-h-screen w-full flex-col items-center  sm:items-start ">
        {/* top criptos */}
        <TopCryptos />
        {/* market cap */}
        <MarketCap />
      </main>
    </div>
  );
}
