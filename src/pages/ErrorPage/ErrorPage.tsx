import { t } from "i18next";
import "./index.scss";

export default function ErrorPage() {
  return (
    <div className="error-page">
      {t("ErrorPage.message")}
    </div>
  )
}
