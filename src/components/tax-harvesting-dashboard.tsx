"use client"

import { useState,useEffect } from "react"
import { Tooltip, TooltipProvider, TooltipTrigger,TooltipContent } from "./ui/tooltip"
import Disclaimer from "./Disclaimers"
import HoldingsTable from "./HoldingsTable"
import PreHarvesting from "./cards/PreharvestingCard"
import PostHarvesting from "./cards/Postharvestingcard"
import FullHoldingsTable from "./FullHoldingTable"
import HarvestingCards from "./HarvestingCards"
  

// Dummy data for pre and after harvesting
const preHarvestingData = {
  shortTerm: {
    profits: "$ 1,540",
    losses: "- $ 743",
    netCapitalGains: "$ 787",
  },
  longTerm: {
    profits: "$ 1,200",
    losses: "- $ 650",
    netCapitalGains: "$ 550",
  },
  realisedCapitalGains: "$ 1,337",
}

const afterHarvestingData = {
  shortTerm: {
    profits: "$ 1,540",
    losses: "- $ 2,343",
    netCapitalGains: "- $ 987",
  },
  longTerm: {
    profits: "$ 1,200",
    losses: "- $ 3,650",
    netCapitalGains: "- $ 2,450",
  },
  effectiveCapitalGains: "- $ 2,353",
  savings: "$ 862",
}

export default function TaxHarvestingDashboard() {
  
  return (
    <div className="flex flex-col min-h-screen">  

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Title Section */}
        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-bold">Tax Harvesting</h1>
          <TooltipProvider>
            <Tooltip >
                <TooltipTrigger><span className="ml-2 text-sm text-blue-600 underline">How it works?</span></TooltipTrigger>
                    <TooltipContent className="max-w-[350px] bg-black text-white">
                        <span>
                        Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper mattis scelerisque tellus. Vel mattis diam duis morbi tellus dui consectetur. 
                        <span className="underline text-blue-600">
                        Know More  </span> 
                        </span>
                    </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Accordion Section */}
        <Disclaimer/>

        {/* Cards Section */}
        <HarvestingCards/>

        {/* Holdings Table */}
        <FullHoldingsTable />
        
      </main>
    </div>
  )
}
