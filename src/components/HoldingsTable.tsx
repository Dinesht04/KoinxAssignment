"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { TooltipContent } from "@radix-ui/react-tooltip"
import { Holding } from "@/Types"

interface HoldingsTableProps {
  holdings: Holding[]
  initialVisibleCount?: number
}

type SortField = 'totalHolding' | 'currentPrice' | 'stcg.gain' | 'ltcg.gain' | null
type SortDirection = 'asc' | 'desc'

export default function HoldingsTable({ holdings,initialVisibleCount = 5 }: HoldingsTableProps) {
  const [showAllHoldings, setShowAllHoldings] = useState(false)
  const [selectAll, setSelectAll] = useState(false)
  const [selectedHoldings, setSelectedHoldings] = useState<string[]>([])
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // Set new field and default to ascending
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Get nested property value
  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((prev, curr) => {
      return prev ? prev[curr] : null
    }, obj)
  }

  // Sort holdings based on current sort field and direction
  const sortedHoldings = [...holdings].sort((a, b) => {
    if (!sortField) return 0

    const aValue = getNestedValue(a, sortField)
    const bValue = getNestedValue(b, sortField)

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedHoldings([])
    } else {
      const allCoinIds = sortedHoldings.map((holding) => holding.coin)
      setSelectedHoldings(allCoinIds)
      // Log all coin names when selecting all
      console.log("Selected all coins:", allCoinIds.join(", "))
    }
    setSelectAll(!selectAll)
  }

  const toggleHolding = (coin: string, coinName: string) => {
    if (selectedHoldings.includes(coin)) {
      setSelectedHoldings(selectedHoldings.filter((holdingId) => holdingId !== coin))
    } else {
      setSelectedHoldings([...selectedHoldings, coin])
      // Log the coin name when selected
      console.log("Selected coin:", coinName)
    }
  }

  const displayedHoldings = showAllHoldings ? sortedHoldings : sortedHoldings.slice(0, initialVisibleCount)

  // Render sort indicator
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) return null
    
    return sortDirection === 'asc' 
      ? <ChevronUp className="inline-block ml-1 h-4 w-4" /> 
      : <ChevronDown className="inline-block ml-1 h-4 w-4" />
  }

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Holdings</h2>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead className="w-12 flex items-center">
                <Checkbox 
                  checked={selectAll} 
                  onCheckedChange={toggleSelectAll} 
                  aria-label="Select all" 
                />
              </TableHead>
              <TableHead>Asset</TableHead>
              <TableHead 
                onClick={() => handleSort('totalHolding')}
                className="cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <span>Holdings</span>
                  {renderSortIndicator('totalHolding')}
                </div>
                <div className="text-xs text-gray-500">Current Market Rate</div>
              </TableHead>
              <TableHead 
                onClick={() => handleSort('currentPrice')}
                className="cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <span>Total Current Value</span>
                  {renderSortIndicator('currentPrice')}
                </div>
              </TableHead>
              <TableHead 
                onClick={() => handleSort('stcg.gain')}
                className="cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <span>Short-term</span>
                  {renderSortIndicator('stcg.gain')}
                </div>
              </TableHead>
              <TableHead 
                onClick={() => handleSort('ltcg.gain')}
                className="cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <span>Long-Term</span>
                  {renderSortIndicator('ltcg.gain')}
                </div>
              </TableHead>
              <TableHead>Amount to Sell</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedHoldings.map((holding) => (
              <TableRow key={holding.coinName} className={cn(selectedHoldings.includes(holding.coin) && "bg-blue-50")}>
                <TableCell>
                  <Checkbox
                    checked={selectedHoldings.includes(holding.coin)}
                    onCheckedChange={() => toggleHolding(holding.coin, holding.coinName)}
                    aria-label={`Select ${holding.coinName}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-8 h-8 mr-2 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      {holding.logo.includes("DefaultCoin") ? (
                        <span>{holding.coin.charAt(0)}</span>
                      ) : (
                        <img src={holding.logo || "/placeholder.svg"} alt={holding.coin} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{holding.coinName}</div>
                      <div className="text-xs text-gray-500">{holding.coin}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                <div>
                  
                      {holding.totalHolding < 1e-8
                    ? (
                      <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                      <span>{`< 0.000001`}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        {holding.totalHolding}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                    )
                    : holding.totalHolding.toLocaleString(undefined, { maximumFractionDigits: 8 })}
                      
                  
                </div>
                  <div className="text-xs text-gray-500">
                    {holding.averageBuyPrice.toLocaleString(undefined, { 
                      style: 'currency', 
                      currency: 'USD',
                      minimumFractionDigits: holding.currentPrice < 1 ? 6 : 2,
                      maximumFractionDigits: holding.currentPrice < 1 ? 6 : 2
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  {(holding.currentPrice).toLocaleString(undefined, { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 2
                  })}
                </TableCell>
                <TableCell>
                  <div className={cn(holding.stcg.gain < 0 ? "text-red-500" : "text-green-500")}>
                    {holding.stcg.gain.toLocaleString(undefined, { 
                      style: 'currency', 
                      currency: 'USD',
                      maximumFractionDigits: 2
                    })}
                  </div>
                  <div className="text-xs text-gray-500">{holding.stcg.balance.toLocaleString(undefined, { maximumFractionDigits: 8 })}</div>
                </TableCell>
                <TableCell>
                  <div className={cn(holding.ltcg.gain < 0 ? "text-red-500" : "text-green-500")}>
                    {holding.ltcg.gain.toLocaleString(undefined, { 
                      style: 'currency', 
                      currency: 'USD',
                      maximumFractionDigits: 2
                    })}
                  </div>
                  <div className="text-xs text-gray-500">{holding.ltcg.balance.toLocaleString(undefined, { maximumFractionDigits: 8 })}</div>
                </TableCell>
                <TableCell>{holding.amountToSell || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="p-4">
        <Button variant="link" onClick={() => setShowAllHoldings(!showAllHoldings)} className="text-blue-600">
          {showAllHoldings ? (
            <>
              <span>View less</span>
              <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              <span>View all</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
