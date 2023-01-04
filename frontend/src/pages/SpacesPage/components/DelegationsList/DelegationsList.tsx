import { useEthers } from "@usedapp/core";
import { t } from "i18next";
import Modal from "../../../../components/Modal/Modal";
import useModal from "../../../../hooks/useModal";
import { Delegation } from "../../../../interfaces/igloo";
import DelegateApply from "../DelegateApply/DelegateApply";
import DelegationElement from "../DelegationElement/DelegationElement";
import "./index.scss";

const MOCK_DELEGATIONS: Delegation[] = [
  {
    userName: "user 1",
    userRole: "role 1"
  },
  {
    userName: "user 2",
    userRole: "role 2"
  }
]

export default function DelegationsList() {
  const { account } = useEthers();
  const { isShowing, toggle } = useModal();

  return (
    <div className="delegations-list">
      <div className="delegations-list__top">
        <button disabled={!account} onClick={toggle}>{t("DelegationsList.apply")}</button>
      </div>
      {MOCK_DELEGATIONS.map((delegation, index) => <DelegationElement key={index} delegation={delegation} />)}
      {isShowing && (
        <Modal isShowing={isShowing} toggle={toggle}>
          <DelegateApply />
        </Modal>
      )}
    </div>
  )
}
