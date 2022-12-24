import { t } from "i18next";
import { useLocation, useNavigate } from "react-router";
import ArrowLeftIcon from "../../assets/icons/arrow-left.svg";
import "./index.scss";

interface Props {
  segments?: number // Number of URL segments to go back
}

export default function BackButton({ segments }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <button className="back-button" onClick={() => navigate(segments ? location.pathname.split("/").slice(0, -segments).join("/") : "..")}>
      <img src={ArrowLeftIcon} alt="back" />
      {t("Shared.back")}
    </button>
  )
}
