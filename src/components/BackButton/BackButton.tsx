import { t } from "i18next";
import { useNavigate } from "react-router";
import ArrowLeftIcon from "../../assets/icons/arrow-left.svg";

interface Props {
  path?: string
}

export default function BackButton({ path }: Props) {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(path ?? "..")}>
      <img src={ArrowLeftIcon} alt="back" />
      {t("Shared.back")}
    </button>
  )
}
