
import { t } from "i18next";
import { HATS_IDS } from "../../../../data/hatsProtocolData";
import { useViewHats } from "../../../../hooks/hatsProtocol/contractHooks";
import RoleElement from "../RoleElement/RoleElement";
import "./index.scss";

export default function RolesList() {
  const hats = useViewHats(HATS_IDS);

  // TODO: need to check why getting array of undefined
  if (!hats) return <span>{t("Shared.loading")}</span>;

  return (
    <div className="roles-list">
      {hats.map((hat, index) => <RoleElement key={index} role={hat!} roleId={HATS_IDS[index]} />)}
    </div>
  )
}
