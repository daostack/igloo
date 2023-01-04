import { createPortal } from "react-dom";
import { t } from "i18next";
import TransactionInfo from "../TransactionInfo/TransactionInfo";
import "./index.scss";

interface Props {
  text?: string
  showTxInfo?: boolean
}

export default function Loading({ text, showTxInfo = false }: Props) {

  return (
    createPortal(
      <div className="loading">
        {showTxInfo && <TransactionInfo />}
        <h5>{text ? text : t("Shared.loading")}</h5>
      </div>,
      document.body
    )
  )
}
