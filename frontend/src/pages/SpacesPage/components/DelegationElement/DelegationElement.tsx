import Modal from "../../../../components/Modal/Modal";
import useModal from "../../../../hooks/useModal";
import { Delegation } from "../../../../interfaces/igloo";
import "./index.scss";

interface Props {
  delegation: Delegation
}

export default function DelegationElement({ delegation }: Props) {
  const { isShowing, toggle } = useModal();

  return (
    <>
      <div className="delegation-element" onClick={toggle}>
        <b>{delegation.userName}</b>
        <i>{delegation.userRole}</i>
      </div>
      {
        isShowing && (
          <Modal isShowing={isShowing} toggle={toggle}>
            <b>{delegation.userName}</b>
          </Modal>
        )
      }
    </>
  )
}
