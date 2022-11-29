import { ChainId, getExplorerTransactionLink, useEthers, useTransactions } from "@usedapp/core";
import { t } from "i18next";
import "./index.scss";

export default function TransactionInfo() {
  const currentTransaction = useTransactions().transactions.find(tx => !tx.receipt);
  const transactionHash = currentTransaction?.transaction.hash;
  const { chainId } = useEthers();

  return (
    <div className="transaction-info">
      <h6>{currentTransaction?.transactionName}</h6>
      {/* TODO: check why getExplorerTransactionLink is deprecated */}
      {transactionHash && <button onClick={() => window.open(getExplorerTransactionLink(transactionHash, chainId as ChainId))}>{t("TransactionInfo.show-in-explorer")}</button>}
    </div>
  )
}
