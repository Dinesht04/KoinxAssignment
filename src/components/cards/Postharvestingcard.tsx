import React from "react";
import { Check } from "lucide-react";
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
  effectiveCapitalGains: string;
  savings: string;
}

interface PostHarvestingProps {
  gain: CapitalGains;
}

const PostHarvesting: React.FC<PostHarvestingProps> = ({ gain }) => {
  return (
    <div className="rounded-lg shadow p-6 bg-gradient-to-r from-[#3C9AFF] to-[#0066FE] text-white">
      <h2 className="text-lg font-semibold mb-4">After Harvesting</h2>
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

      <div className="mt-6 pt-4 border-t border-blue-400">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Effective Capital Gains:</div>
          <div className="text-xl font-bold">{}</div>
        </div>
      </div>

      <div className="mt-4 bg-blue-500 p-3 rounded-lg flex items-center">
        <div className="bg-orange-400 rounded-full p-1 mr-2">
          <Check className="w-4 h-4" />
        </div>
        <span className="text-sm">You are going to save upto {}</span> 
      </div>
    </div>
  );
};

export default PostHarvesting;
