"use client"

import { useState} from "react"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { TooltipContent } from "@radix-ui/react-tooltip"
import { useSelectedHoldings } from "@/Context/SelectedHoldingsContext"
import Image from "next/image"

interface HoldingsTableProps {
  initialVisibleCount?: number
}

type SortField = 'totalHolding' | 'currentPrice' | 'stcg.gain' | 'ltcg.gain' | null
type SortDirection = 'asc' | 'desc'

export default function HoldingsTable({ initialVisibleCount = 5 }: HoldingsTableProps) {
  const [showAllHoldings, setShowAllHoldings] = useState(false)
  const [selectAll, setSelectAll] = useState(false)
  const { selectedHoldings, setSelectedHoldings,holdings,setHoldings } = useSelectedHoldings()
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
  const getNestedValue = <T,>(obj: T, path: string): unknown => {
    return path.split('.').reduce((prev: any, curr) => {
      return prev ? prev[curr] : null;
    }, obj);
  };

  // Sort holdings based on current sort field and direction
  const sortedHoldings = [...holdings].sort((a, b) => {
    if (!sortField) return 0;
  
    const aValue = getNestedValue(a, sortField);
    const bValue = getNestedValue(b, sortField);
  
    if (
      (typeof aValue === 'string' && typeof bValue === 'string') ||
      (typeof aValue === 'number' && typeof bValue === 'number')
    ) {
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    }
  
    return 0; // fallback if values are not comparable
  });
  

  const toggleSelectAll = () => {
    const allCoinIds = sortedHoldings.map((h) => h.coinName)
  
    const updatedHoldings = holdings.map((h) => ({
      ...h,
      amountToSell: selectAll ? "-" : h.totalHolding.toString(),
    }))
  
    setHoldings(updatedHoldings)
  
    if (selectAll) {
      setSelectedHoldings([])
    } else {
      setSelectedHoldings(allCoinIds)

    }
    setSelectAll(!selectAll)
  }
  

  const toggleHolding = (coin: string, coinName: string) => {
    const isSelected = selectedHoldings.includes(coinName)
  
    const updatedHoldings = holdings.map((h) => {
      if (h.coinName === coinName) {
        return {
          ...h,
          amountToSell: isSelected ? "-" : h.totalHolding.toString(), // update amountToSell
        }
      }
      return h
    })
  
    setHoldings(updatedHoldings)
  
    if (isSelected) {
      setSelectedHoldings(selectedHoldings.filter((name) => name !== coinName))
    } else {
      setSelectedHoldings([...selectedHoldings, coinName])
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
    <div className="bg-[#FFFFFF] dark:bg-[#171A26] rounded-lg shadow mb-6">
      <div className="p-4 ">
        <h2 className="text-[20px] font-semibold">Holdings</h2>
      </div>
      <div className="overflow-x-auto">
        <Table className="">
          <TableHeader className="bg-[#F1F5F9] dark:bg-[#0A0A12] border-0 ">
            <TableRow className="">
              <TableHead className="w-12 flex items-center px-4">
                <Checkbox 
                  checked={selectAll} 
                  onCheckedChange={toggleSelectAll} 
                  aria-label="Select all"
                  className="hover:bg-[#F1F5F9] hover:dark:bg-[#0A0A12] hover:cursor-pointer" 
                />
              </TableHead>
              <TableHead className="text-[16px]">Asset</TableHead>
              <TableHead 
                onClick={() => handleSort('totalHolding')}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1F1F2A]"
              >
                <div className="flex items-center">
                  <span className="text-[16px]">Holdings</span>
                  {renderSortIndicator('totalHolding')}
                </div>
                <div className="text-[12px] text-[#A9AFC5]">Current Market Rate</div>
              </TableHead>
              <TableHead 
                onClick={() => handleSort('currentPrice')}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1F1F2A]"
              >
                <div className="flex items-center">
                  <span className="text-[16px]">Total Current Value</span>
                  {renderSortIndicator('currentPrice')}
                </div>
              </TableHead>
              <TableHead 
                onClick={() => handleSort('stcg.gain')}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1F1F2A]"
              >
                <div className="flex items-center">
                  <span className="text-[16px]">Short-term</span>
                  {renderSortIndicator('stcg.gain')}
                </div>
              </TableHead>
              <TableHead 
                onClick={() => handleSort('ltcg.gain')}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1F1F2A]"
              >
                <div className="flex items-center">
                  <span className="text-[16px]">Long-Term</span>
                  {renderSortIndicator('ltcg.gain')}
                </div>
              </TableHead>
              <TableHead className="text-[16px]">Amount to Sell</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedHoldings.map((holding) => (
              <TableRow key={holding.coinName} className={cn(selectedHoldings.includes(holding.coinName) && "bg-[#EAF2FF] dark:bg-[#3A3F54]") || "bg-[#FFFFFF] dark:bg-[#171A26] border-b"}>
                <TableCell className="px-4">
                  <Checkbox
                    checked={selectedHoldings.includes(holding.coinName)}
                    onCheckedChange={() => toggleHolding(holding.coin, holding.coinName)}
                    aria-label={`Select ${holding.coinName}`}
                    className="hover:cursor-pointer hover:bg-[#EAF2FF] hover:dark:bg-[#3A3F54]"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-8 h-8 mr-2 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      {holding.logo.includes("DefaultCoin") ? (
                        <span>{holding.coin.charAt(0)}</span>
                      ) : (
                        <Image src={holding.logo || "/placeholder.svg"} alt={holding.coin} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-[16px]">{holding.coinName}</div>
                      <div className="text-[14px] text-gray-500">{holding.coin}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                <div className="text-[16px]">
                  
                      {holding.totalHolding < 1e-8
                    ? (
                      <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                      <span>{`< 0.000001 ${holding.coin}`}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        {holding.totalHolding}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                    )
                    : `${holding.totalHolding.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${holding.coin}`}
                      
                  
                </div>
                  <div className="text-[12px] text-gray-500">
                    {holding.averageBuyPrice.toLocaleString(undefined, { 
                      style: 'currency', 
                      currency: 'USD',
                      minimumFractionDigits: holding.currentPrice < 1 ? 6 : 2,
                      maximumFractionDigits: holding.currentPrice < 1 ? 6 : 2
                    })}
                  </div>
                </TableCell>
                <TableCell className="text-[16px]">
                  {(holding.currentPrice).toLocaleString(undefined, { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 2
                  })}
                </TableCell>
                <TableCell>
                  <div className={cn(holding.stcg.gain < 0 ? "text-[#FF5A6E]" : "text-[#3FF1B8]")+"text-[16px]"}>
                    {holding.stcg.gain.toLocaleString(undefined, { 
                      style: 'currency', 
                      currency: 'USD',
                      maximumFractionDigits: 2
                    })}
                  </div>
                  <div className="text-[12px] text-[#A9AFC5]">{holding.stcg.balance.toLocaleString(undefined, { maximumFractionDigits: 8 })}</div>
                </TableCell>
                <TableCell>
                  <div className={cn(holding.ltcg.gain < 0 ? "text-[#FF5A6E]" : "text-[#3FF1B8]")+"text-[16px]"}>
                    {holding.ltcg.gain.toLocaleString(undefined, { 
                      style: 'currency', 
                      currency: 'USD',
                      maximumFractionDigits: 2
                    })}
                  </div>
                  <div className="text-[12px] text-[#A9AFC5]">{holding.ltcg.balance.toLocaleString(undefined, { maximumFractionDigits: 8 })}</div>
                </TableCell>
              
                <TableCell><span className="text-[16px]">
                        {holding.amountToSell !== "-" ? `${holding.totalHolding.toLocaleString(undefined, { maximumFractionDigits: 8 })} ${holding.coin}` : "-"}
                      </span>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="p-4">
        <Button variant="link" onClick={() => setShowAllHoldings(!showAllHoldings)} className="text-[#4A78FF] text-[16pxx] underline hover:cursor-pointer">
          {showAllHoldings ? (
            <>
              <span>View less</span>
            </>
          ) : (
            <>
              <span>View all</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
