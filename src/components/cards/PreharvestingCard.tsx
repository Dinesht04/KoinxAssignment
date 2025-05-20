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
  console.log(gain)
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Pre Harvesting</h2>
      <div className="grid grid-cols-3 gap-4">
        <div></div>
        <div className="text-sm font-medium text-center">Short-term</div>
        <div className="text-sm font-medium text-center">Long-term</div>

        <div className="text-sm">Profits</div>
        <div className="text-right">${gain?.stcg?.profits}</div>
        <div className="text-right">${gain?.ltcg?.profits}</div>

        <div className="text-sm">Losses</div>
        <div className="text-right">${gain?.stcg?.losses}</div>
        <div className="text-right">${gain?.ltcg?.losses}</div>

        <div className="text-sm">Net Capital Gains</div>
        <div className="text-right">${gain?.stcg?.profits - gain?.stcg?.losses}</div>
        <div className="text-right">${gain?.ltcg?.profits - gain?.ltcg?.losses}</div>
      </div>
      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Realised Capital Gains:</div>
          <div className="text-xl font-bold">${gain?.stcg?.profits + gain?.ltcg?.profits}</div>
        </div>
      </div>
    </div>
  );
};

export default PreHarvesting;
