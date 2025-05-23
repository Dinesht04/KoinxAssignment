"use client"

import { Holding } from "@/Types"
import React, { createContext, useContext, useState, ReactNode } from "react"

type SelectedHoldingsContextType = {
  selectedHoldings: string[]
  setSelectedHoldings: React.Dispatch<React.SetStateAction<string[]>>
  holdings : Holding[]
  setHoldings: React.Dispatch<React.SetStateAction<Holding[]>>
}


const SelectedHoldingsContext = createContext<SelectedHoldingsContextType | undefined>(undefined)


export const SelectedHoldingsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedHoldings, setSelectedHoldings] = useState<string[]>([])
  const [holdings,setHoldings] = useState<Holding[]>([]);
  return (
    <SelectedHoldingsContext.Provider value={{ selectedHoldings, setSelectedHoldings , holdings, setHoldings }}>
      {children}
    </SelectedHoldingsContext.Provider>
  )
}


// Custom hook for easier consumption
export const useSelectedHoldings = () => {
  const context = useContext(SelectedHoldingsContext)
  if (!context) {
    throw new Error("useSelectedHoldings must be used within a SelectedHoldingsProvider")
  }
  return context
}
