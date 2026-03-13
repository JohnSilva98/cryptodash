'use client'
import { CircleDollarSign, Sun, Moon, Search } from "lucide-react"
import { useState } from "react"

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  return (
    <header className=" text-white p-4">
      <div className="container mx-auto flex gap-1 items-center justify-between">
        <div className="flex gap-2 items-center">
          <CircleDollarSign/>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">CryptoDash</h1>
        </div>

        <div className="flex gap-2 items-center">
            <button className="p-2 rounded-md bg-[var(--bg-secondary)] text-[var(--text-primary)] cursor-pointer" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <Moon/> : <Sun/>}
            </button>
            <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"/>
                <input className="bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-md p-2 pl-8" type="search" name="searchcurrency" id="searchcurrency" placeholder="Pesquise uma moeda" />
            </div>
        </div>
      </div>
    </header>
  )
}

export default Header