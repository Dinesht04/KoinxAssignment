import React, { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { CapitalGains } from "@/Types";
import { useSelectedHoldings } from "@/Context/SelectedHoldingsContext";

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
  effectiveCapitalGains: string;
  savings: string;
}

interface PostHarvestingProps {
  gain: CapitalGains;
}


const PostHarvesting: React.FC<PostHarvestingProps> = ({ gain }) => {

  const inititalGain = (gain?.stcg?.profits - gain?.stcg?.losses)+(gain?.ltcg?.profits - gain?.ltcg?.losses) 
  
  const {selectedHoldings,holdings} = useSelectedHoldings();

  var effectiveCapitalGains = useMemo(()=>{
    if(selectedHoldings.length == 0){
      return (gain?.stcg?.profits - gain?.stcg?.losses)+(gain?.ltcg?.profits - gain?.ltcg?.losses)
    } else {
      var calculatedHoldings = holdings.filter((holding)=>selectedHoldings.includes(holding.coinName))
      calculatedHoldings.map((calculatedHolding)=>{
        //short-term
        if(calculatedHolding.stcg.gain > 0){
          gain.stcg.profits += calculatedHolding.stcg.gain;
        } else {
          gain.stcg.losses += calculatedHolding.stcg.gain
        }
        //long-term
        if(calculatedHolding.ltcg.gain > 0){
          gain.ltcg.profits += calculatedHolding.ltcg.gain
        } else {
          gain.ltcg.losses += calculatedHolding.ltcg.gain
        }
      })
      return (gain?.stcg?.profits - gain?.stcg?.losses)+(gain?.ltcg?.profits - gain?.ltcg?.losses)
    }
  },[selectedHoldings,holdings])

  return (
    <div className="rounded-lg shadow p-6 bg-gradient-to-r from-[#3C9AFF] to-[#0066FE] text-white">
      <h2 className="text-lg font-semibold mb-4">After Harvesting</h2>
      <div className="grid grid-cols-3 gap-4">
        <div></div>
        <div className="text-sm font-medium text-right">Short-term</div>
        <div className="text-sm font-medium text-right">Long-term</div>

        <div className="text-sm">Profits</div>
        <div className="text-right">{gain?.stcg?.profits.toLocaleString(undefined, { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 2
                  })}</div>
        <div className="text-right">{gain?.ltcg?.profits.toLocaleString(undefined, { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 2
                  })}</div>

        <div className="text-sm">Losses</div>
        <div className="text-right">{gain?.stcg?.losses.toLocaleString(undefined, { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 2
                  })}</div>
        <div className="text-right">{gain?.ltcg?.losses.toLocaleString(undefined, { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 2
                  })}</div>

        <div className="text-sm">Net Capital Gains</div>
        <div className="text-right">{(gain?.stcg?.profits - gain?.stcg?.losses).toLocaleString(undefined, { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 2
                  })}</div>
        <div className="text-right">{(gain?.ltcg?.profits - gain?.ltcg?.losses).toLocaleString(undefined, { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 2
                  })}</div>
      </div>

      <div className="mt-6 pt-4 border-blue-400">
        <div className="flex space-x-4 items-center">
          <div className="text-sm font-medium">Effective Capital Gains:</div>
          <div className="text-xl font-bold">{effectiveCapitalGains.toLocaleString(undefined, { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 2
                  })}</div>
        </div>
      </div>
      {inititalGain > effectiveCapitalGains ? <div className="mt-4 bg-blue-500 p-3 rounded-lg flex items-center">
        <span className="text-sm">🎉 You are going to save upto {(inititalGain-effectiveCapitalGains).toLocaleString(undefined, { 
                    style: 'currency', 
                    currency: 'USD',
                    maximumFractionDigits: 2
                  })}</span> 
      </div> : null}
      
    </div>
  );
};

export default PostHarvesting;
