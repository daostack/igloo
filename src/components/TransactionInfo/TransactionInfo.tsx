import { useTransactions } from "@usedapp/core";
import { t } from "i18next";
import { CHAINS } from "../../config/constants";
import { CHAIN_ID } from "../../config/env";
import NewWindow from "../NewWindow/NewWindow";
import "./index.scss";

export default function TransactionInfo() {
  const currentTransaction = useTransactions().transactions.find(tx => !tx.receipt);
  const transactionHash = currentTransaction?.transaction.hash;

  return (
    <div className="transaction-info">
      <h6>{currentTransaction?.transactionName}</h6>
      {transactionHash && <NewWindow link={CHAINS[CHAIN_ID].getExplorerTransactionLink(transactionHash)} label={t("TransactionInfo.show-in-explorer")!} />}
    </div>
  )
}
