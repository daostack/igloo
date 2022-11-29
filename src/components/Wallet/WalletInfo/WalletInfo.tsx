import { useEthers } from "@usedapp/core"
import { HATS_IDS, HATS_MAPPING } from "../../../data/hatsProtocolData";
import { useViewHat } from "../../../hooks/hatsProtocol/contractHooks";

export default function WalletInfo() {
  const { account } = useEthers();
  const hat = useViewHat(account && HATS_MAPPING.get(account));

  if (!hat || !account) return null;

  return (
    <div>
      {`${HATS_MAPPING.get(account) === HATS_IDS.TopHat ? "Admin" : hat.details} Hat 🧢`}
    </div>
  )
}
