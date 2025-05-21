import React from "react";
import { CapitalGains } from "@/Types";

interface HarvestingData {
  shortTerm: {
    profits: string;
    losses: string;
    netCapitalGains: string;
  };
  longTerm: {
    profits: string;
    losses: string;
    netCapitalGains: string;
  };
  realisedCapitalGains: string;
}

interface PreHarvestingProps {
  gain: CapitalGains;
}

const PreHarvesting: React.FC<PreHarvestingProps> = ({ gain }) => {
  const inititalGain = (gain?.stcg?.profits - gain?.stcg?.losses)+(gain?.ltcg?.profits - gain?.ltcg?.losses) 
  return (
    <div className="bg-[#FFFFFF] dark:bg-[#171A26] rounded-lg shadow p-6">
      <h2 className="text-[20px] font-semibold mb-4">Pre Harvesting</h2>
      <div className="grid grid-cols-3 gap-4">
        <div></div>
        <div className="text-[16px] font-medium text-right ">Short-term</div>
        <div className="text-[16px] font-medium text-right ">Long-term</div>

        <div className="text-[16px]">Profits</div>
        <div className="text-right text-[16px]">{gain?.stcg?.profits.toLocaleString(undefined, { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 2
                  })}</div>
        <div className="text-right text-[16px]">{gain?.ltcg?.profits.toLocaleString(undefined, { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 2
                  })}</div>

        <div className="text-[16px]">Losses</div>
        <div className="text-right text-[16px]">{gain?.stcg?.losses.toLocaleString(undefined, { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 2
                  })}</div>
        <div className="text-right text-[16px]">{gain?.ltcg?.losses.toLocaleString(undefined, { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 2
                  })}</div>

        <div className="text-[16px]">Net Capital Gains</div>
        <div className="text-right text-[16px]">{(gain?.stcg?.profits - gain?.stcg?.losses).toLocaleString(undefined, { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 2
                  })}</div>
        <div className="text-right text-[16px]">{(gain?.ltcg?.profits - gain?.ltcg?.losses).toLocaleString(undefined, { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 2
                  })}</div>
      </div>
      <div className="mt-6 pt-4">
        <div className="flex space-x-8  items-center">
          <div className="text-[20px] font-medium">Realised Capital Gains:</div>
          <div className="text-[28px ] font-bold">{inititalGain.toLocaleString(undefined, { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 2
                  })}</div>
        </div>
      </div>
    </div>
  );
};

export default PreHarvesting;
