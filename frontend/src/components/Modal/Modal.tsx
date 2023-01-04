
import { createPortal } from "react-dom";
import "./index.scss";

interface Props {
  isShowing: boolean
  toggle: () => void
  children: React.ReactNode
}

export default function Modal({ isShowing, toggle, children }: Props) {

  return createPortal(
    isShowing ? (
      <>
        <div className="modal-overlay" />
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
          <div className="modal">
            <div className="modal-header">
              <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={toggle}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {children}
          </div>
        </div>
      </>
    ) : null, document.body
  )
}
