import { useEffect } from "react";
import "./index.scss";

interface Props {
  close?: () => void;
  children: React.ReactNode
}

const TOAST_TIMEOUT = 3000;

export default function Toast({ close, children }: Props) {

  useEffect(() => {
    if (close) {
      const timer = setTimeout(close, TOAST_TIMEOUT);
      return () => clearTimeout(timer);
    }
  }, [close]);

  return (
    <div className="toast">
      <div className="toast__content">{children}</div>
      {close && (
        <button onClick={close} className="toast__close-btn">
          &times;
        </button>
      )}
    </div>
  );
}
