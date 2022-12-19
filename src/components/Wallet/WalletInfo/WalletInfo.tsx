import { useEthers } from "@usedapp/core"
import { t } from "i18next";
import { HATS_IDS, TOP_HAT_ID } from "../../../data/hatsProtocolData";
import { useIsWearerOfHat, useIsWearerOfHats, useViewHats } from "../../../hooks/hatsProtocol/contractHooks";
import { getAllTrueIndexes } from "../../../utils/utils";
import "./index.scss";

export default function WalletInfo() {
  const { account } = useEthers();
  const isTopHat = useIsWearerOfHat(account, TOP_HAT_ID);
  const possibleHats = useIsWearerOfHats(account, HATS_IDS);
  const hatsIndexes = getAllTrueIndexes(possibleHats);
  const hatsIds: string[] = hatsIndexes.map(index => HATS_IDS[index]);
  const hats = useViewHats(hatsIds);

if (!hats || !account) return null;
if (isTopHat) return <span>Admin</span>;
  
  return (
    <div className="wallet-info">
      {hats.length === 0 ? t("WalletInfo.no-hats") : `${t("WalletInfo.your-hats")} ${hats.map(hat => hat?.details).join(', ')}`}
    </div>
  )
}
