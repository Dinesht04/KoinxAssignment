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
      <h2 className="text-lg font-semibold mb-4">After Harvesting</h2>
      <div className="grid grid-cols-3 gap-4">
        <div></div>
        <div className="text-sm font-medium text-right">Short-term</div>
        <div className="text-sm font-medium text-right">Long-term</div>

        <div className="text-sm">Profits</div>
        <div className="text-right">
          {gain?.stcg?.profits.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="text-right">
          {gain?.ltcg?.profits.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </div>

        <div className="text-sm">Losses</div>
        <div className="text-right">
          {gain?.stcg?.losses.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="text-right">
          {gain?.ltcg?.losses.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </div>

        <div className="text-sm">Net Capital Gains</div>
        <div className="text-right">
          {(gain?.stcg?.profits - gain?.stcg?.losses).toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="text-right">
          {(gain?.ltcg?.profits - gain?.ltcg?.losses).toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </div>
      </div>

      <div className="mt-6 pt-4 border-blue-400">
        <div className="flex space-x-4 items-center">
          <div className="text-sm font-medium">Effective Capital Gains:</div>
          <div className="text-xl font-bold">
            {effectiveCapitalGains.toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      </div>

      {initialGain > effectiveCapitalGains && (
        <div className="mt-4 bg-blue-500 p-3 rounded-lg flex items-center">
          <span className="text-sm">
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