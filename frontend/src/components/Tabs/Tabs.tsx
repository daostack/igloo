import classNames from "classnames";
import "./index.scss";

export interface Tab {
  label: string
  value: string
}
interface Props {
  tabs: Tab[],
  value: string,
  onClick: (value) => void
}

export default function Tabs({ tabs, value, onClick }: Props) {
  return (
    <div className="tabs">
      {tabs.map((tab, index) => (
        <div key={index} onClick={() => onClick(tab.value)} className={classNames("tab", { "active": tab.value === value })}>
          {tab.label}
        </div>
      ))}
    </div>
  )
}
