import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Toast from "./Toast/Toast";
import { ToastContext } from "./ToastContext";
import "./index.scss";

interface IToast {
  id: number
  content: React.ReactNode
}

export const ToastProvider = (props) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const open = (content: React.ReactNode) =>
    setToasts((currentToasts) => [
      ...currentToasts,
      { id: Date.now(), content },
    ]);

  const close = (id: number) =>
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );

  const contextValue = useMemo(() => ({ open }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {props.children}

      {toasts.length > 0 && createPortal(
        <div className="toasts-container">
          {toasts.map(toast => (
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
