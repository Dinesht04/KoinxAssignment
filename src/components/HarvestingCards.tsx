"use client"

import { useEffect, useState } from "react"
import { CapitalGains } from "@/Types"
import { UseCapitalGains } from "@/hooks/useCapitalGains"
import PreHarvesting from "./cards/PreharvestingCard"
import PostHarvesting from "./cards/Postharvestingcard"

export default function HarvestingCards() {
  const [capitalGains, setCapitalGains] = useState<CapitalGains>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    UseCapitalGains(setCapitalGains, setError, setLoading)
  }, [])

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="p-8 text-center">Loading capital gains data...</div>
      </div>
    )
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>
  }

  if (!capitalGains) {
    return <div className="p-8 text-center text-gray-500">No capital gains data available.</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <PreHarvesting gain={capitalGains} />
      <PostHarvesting gain={capitalGains} />
    </div>
  )
}
