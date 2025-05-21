import { useMemo } from "react";
import { CapitalGains } from "@/Types";
import { useSelectedHoldings } from "@/Context/SelectedHoldingsContext";
interface PostHarvestingProps {
  gain: CapitalGains;
}

const PostHarvesting: React.FC<PostHarvestingProps> = ({ gain }) => {
  const { selectedHoldings, holdings } = useSelectedHoldings();

  const initialGain = (gain?.stcg?.profits - gain?.stcg?.losses) + (gain?.ltcg?.profits - gain?.ltcg?.losses);

  const effectiveCapitalGains = useMemo(() => {
    if (selectedHoldings.length === 0) {
      return initialGain;
    }

    const updatedGain = {
      stcg: {
        profits: gain?.stcg?.profits,
        losses: gain?.stcg?.losses,
      },
      ltcg: {
        profits: gain?.ltcg?.profits,
        losses: gain?.ltcg?.losses ,
      },
    };

    const calculatedHoldings = holdings.filter((holding) =>
      selectedHoldings.includes(holding.coinName)
    );

    calculatedHoldings.forEach((holding) => {
      // short-term
      if (holding.stcg.gain > 0) {
        updatedGain.stcg.profits += holding.stcg.gain;
      } else {
        updatedGain.stcg.losses += Math.abs(holding.stcg.gain);
      }

      // long-term
      if (holding.ltcg.gain > 0) {
        updatedGain.ltcg.profits += holding.ltcg.gain;
      } else {
        updatedGain.ltcg.losses += Math.abs(holding.ltcg.gain);
      }
    });

    return (
      (updatedGain.stcg.profits - updatedGain.stcg.losses) +
      (updatedGain.ltcg.profits - updatedGain.ltcg.losses)
    );
  }, [selectedHoldings, holdings, gain, initialGain]);

  return (
    <div className="rounded-lg shadow p-6 bg-gradient-to-r from-[#3C9AFF] to-[#0066FE] text-white">
      <h2 className="text-[20px] font-semibold mb-4">After Harvesting</h2>
      <div className="grid grid-cols-3 gap-4">
        <div></div>
        <div className="text-[16px] font-medium text-right">Short-term</div>
        <div className="text-[16px] font-medium text-right">Long-term</div>

        <div className="text-[16px]">Profits</div>
        <div className="text-right text-[16px]">
          {gain?.stcg?.profits.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="text-right text-[16px]">
          {gain?.ltcg?.profits.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </div>

        <div className="text-[16px]">Losses</div>
        <div className="text-right text-[16px]">
          {gain?.stcg?.losses.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="text-right text-[16px]">
          {gain?.ltcg?.losses.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </div>

        <div className="text-[16px]">Net Capital Gains</div>
        <div className="text-right text-[16px]">
          {(gain?.stcg?.profits - gain?.stcg?.losses).toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="text-right text-[16px]">
          {(gain?.ltcg?.profits - gain?.ltcg?.losses).toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </div>
      </div>

      <div className="mt-6 pt-4 border-blue-400">
        <div className="flex space-x-4 items-center">
          <div className="text-[20px] font-medium">Effective Capital Gains:</div>
          <div className="text-[28px] font-bold">
            {effectiveCapitalGains.toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      </div>

      {initialGain > effectiveCapitalGains && (
        <div className="mt-4 px-2 rounded-lg flex items-center">
          <span className="text-[16px]">
            🎉 You are going to save upto{" "}
            {(initialGain - effectiveCapitalGains).toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      )}
    </div>
  );
};

export default PostHarvesting