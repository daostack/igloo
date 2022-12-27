
import { shortenIfAddress } from "@usedapp/core";
import { t } from "i18next";
import { useParams } from "react-router";
import BackButton from "../../../../components/BackButton/BackButton";
import NewWindow from "../../../../components/NewWindow/NewWindow";
import { CHAINS } from "../../../../config/constants";
import { CHAIN_ID } from "../../../../config/env";
import { useViewHat } from "../../../../hooks/hatsProtocol/contractHooks";
import "./index.scss";

export default function Role() {
  const { roleId } = useParams();
  const hat = useViewHat(roleId);

  if (!hat) return <span>{t("Shared.loading")}</span>;

  return (
    <div className="role">
      <div className="role__top">
        <BackButton segments={2} />
      </div>
      <div className="role__content">
        <h3>{hat?.details}</h3>
        <div>Max Supply: {hat.maxSupply}</div>
        <div>Supply: {hat.supply}</div>
        <div className="role__content__eligibility">Eligibility:&nbsp;<NewWindow link={CHAINS[CHAIN_ID].getExplorerAddressLink(hat.eligibility)} label={shortenIfAddress(hat.eligibility)} /></div>
      </div>
    </div>
  )
}
