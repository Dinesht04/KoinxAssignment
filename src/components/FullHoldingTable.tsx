"use client"

import { useEffect, useState } from "react"
import HoldingsTable from "@/components/HoldingsTable"
import { UseHoldings } from "@/hooks/useHoldings"
import { Holding } from "@/Types"

export default function FullHoldingsTable() {
  
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
      UseHoldings(setHoldings,setError,setLoading)
    }, [])

  

  if (loading) {
    return <div className="p-8 text-center">
      <div className="p-8 text-center">Loading holdings...</div>
    </div>
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>
  }

  return <HoldingsTable setHoldings={setHoldings} holdings={holdings} initialVisibleCount={5} />
}
