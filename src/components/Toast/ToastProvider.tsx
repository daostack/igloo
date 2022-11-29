import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useNotifications } from "@usedapp/core";
import Toast from "./Toast/Toast";
import { ToastContext } from "./ToastContext";
import "./index.scss";

interface IToast {
  id: string
  content: React.ReactNode
}

export const ToastProvider = (props) => {
  const [toasts, setToasts] = useState<IToast[]>([]);
  const useDappNotifications = useNotifications().notifications.map((notification): IToast => {
    switch (notification.type) {
      case "transactionStarted":
        return { id: notification.id, content: "Transaction Started" };
      case "transactionFailed":
        return { id: notification.id, content: "Transaction Failed" };
      case "transactionSucceed":
        return { id: notification.id, content: "Transaction Succeeded" };
      default:
        return { id: "", content: "unknown" }
    }
  })

  const open = (content: React.ReactNode) =>
    setToasts((currentToasts) => [
      ...currentToasts,
      { id: String(Date.now()), content },
    ]);

  const close = (id: string) =>
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );

  const contextValue = useMemo(() => ({ open }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {props.children}

      {(toasts.length > 0 || useDappNotifications.length > 0) && createPortal(
        <div className="toasts-container">
          {toasts.map(toast => (
            <Toast key={toast.id} close={() => close(toast.id)}>
              {toast.content}
            </Toast>
          ))}

          {useDappNotifications.map(toast => (
            <Toast key={toasts.length + toast.id} close={() => close(toast.id)}>
              {toast.content}
            </Toast>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}
