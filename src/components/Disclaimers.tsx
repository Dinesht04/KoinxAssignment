"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Info } from "lucide-react";

const Disclaimer: React.FC = () => {
  return (
    <Accordion
      type="single"
      
      collapsible
      className="mb-6"
    >
      <AccordionItem
        value="item-1"
        className="border dark:border-[#4A78FF] border-[#0052FE] rounded-lg overflow-hidden dark:text-[#FFFFFF] dark:bg-[#121D3A] bg-[#EAF2FF]"
      >
        <AccordionTrigger className="px-4 py-3 hover:no-underline">
          <div className="flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-600" />
            <span className="font-medium">Important Notes & Disclaimers</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <ul className="space-y-2 list-disc pl-5 text-sm">
            <li>
              Tax-loss harvesting is currently not allowed under Indian tax
              regulations. Please consult your tax advisor before making any
              decisions.
            </li>
            <li>
              Tax harvesting does not apply to derivatives or futures. These are
              handled separately as business income under tax rules.
            </li>
            <li>
              Price and market value data is fetched from Coingecko, not from
              individual exchanges. As a result, values may slightly differ from
              the ones on your exchange.
            </li>
            <li>
              Some countries do not have a short-term / long-term bifurcation.
              For now, we are calculating everything as long-term.
            </li>
            <li>
              Only realized losses are considered for harvesting. Unrealized
              losses in held assets are not counted.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Disclaimer;
