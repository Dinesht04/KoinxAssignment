
import { Tooltip, TooltipProvider, TooltipTrigger,TooltipContent } from "./ui/tooltip"
import Disclaimer from "./Disclaimers"

import FullHoldingsTable from "./FullHoldingTable"
import HarvestingCards from "./HarvestingCards"
import { TooltipArrow } from "@radix-ui/react-tooltip"
  

export default function TaxHarvestingDashboard() {
  
  return (
    <div className="flex flex-col min-h-screen">  

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Title Section */}
        <div className="flex items-center mb-4">
          <h1 className="text-[24px] font-bold">Tax Harvesting</h1>
          <TooltipProvider>
            <Tooltip >
                <TooltipTrigger><span className="ml-2 text-[14px] text-[#4A78FF] underline">How it works?</span></TooltipTrigger>
                    <TooltipContent className="max-w-[350px] dark:bg-white dark:text-black bg-[#0F172A] text-white">
                        <span>
                        Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper mattis scelerisque tellus. Vel mattis diam duis morbi tellus dui consectetur. 
                        <span className="underline text-[#4A78FF]">
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
