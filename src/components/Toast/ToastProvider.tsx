import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Toast from "./Toast/Toast";
import { ToastContext } from "./ToastContext";
import "./index.scss";

// TODO: better types
export const ToastProvider = (props) => {
  const [toasts, setToasts] = useState<any>([]);

  const open = (content) =>
    setToasts((currentToasts) => [
      ...currentToasts,
      { id: Date.now(), content },
    ]);

  const close = (id) =>
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );

  const contextValue = useMemo(() => ({ open }), []);

  return (
    <ToastContext.Provider value={contextValue as any}>
      {props.children}

      {createPortal(
        <div className="toasts-container">
          {toasts.map((toast) => (
            <Toast key={toast.id} close={() => close(toast.id)}>
              {toast.content}
            </Toast>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}
