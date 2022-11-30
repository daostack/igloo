import { useEthers } from "@usedapp/core"
import { t } from "i18next";
import { HAT_IDS } from "../../../data/hatsProtocolData";
import { useIsWearerOfHats, useViewHats } from "../../../hooks/hatsProtocol/contractHooks";
import { getAllTrueIndexes } from "../../../utils/utils";

export default function WalletInfo() {
  const { account } = useEthers();
  const possibleHats = useIsWearerOfHats(account, HAT_IDS);
  const hatsIndexes = getAllTrueIndexes(possibleHats);
  const hatsIds: string[] = hatsIndexes.map(index => HAT_IDS[index]);
  const hats = useViewHats(hatsIds);

  if (!hats || !account) return null;
  
  return (
    <div>
      {hats.length === 0 ? t("WalletInfo.no-hats") : `${t("WalletInfo.your-hats")} ${hats.map(hat => hat?.details).join(', ')}`}
    </div>
  )
}
