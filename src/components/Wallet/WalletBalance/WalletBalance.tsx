import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatNumber } from "../../../utils/utils";
import "./index.scss";

export default function WalletBalance() {
  const { account } = useEthers();
  const ethBalance = useEtherBalance(account);

  return (
    <div className="wallet-balance">
      {ethBalance && <span>{`${formatNumber(ethBalance)} ETH`}</span>}
    </div>
  )
}
