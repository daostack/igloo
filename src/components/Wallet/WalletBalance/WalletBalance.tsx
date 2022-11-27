import { useEtherBalance, useEthers } from "@usedapp/core";
import { t } from "i18next";
import { formatNumber } from "../../../utils/utils";

export default function WalletBalance() {
  const { account } = useEthers();
  const ethBalance = useEtherBalance(account);

  return (
    <div>
      {ethBalance && <span>{`${t("WalletBalance.eth-balance")} ${formatNumber(ethBalance)}`}</span>}
    </div>
  )
}
