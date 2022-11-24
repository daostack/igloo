import { createPortal } from "react-dom";
import { t } from "i18next";
import "./index.scss";

interface Props {
  text?: string
}

export default function Loading({ text }: Props) {
  return (
    createPortal(
      <div className="loading">
        {text ? text : t("Shared.loading")}
      </div>,
      document.body
    )
  )
}
