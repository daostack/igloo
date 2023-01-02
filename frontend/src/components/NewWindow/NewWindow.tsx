import NewWindowIcon from "../../assets/icons/new-window.svg";
import "./index.scss";

interface Props {
  link: string
  label?: string
}

export default function NewWindow({ link, label }: Props) {
  return (
    <div className="new-window" onClick={() => window.open(link)}>
      {label && <span className="new-window__label">{label}</span>}
      <img src={NewWindowIcon} alt="new window" />
    </div>
  )
}
