import { useCallback } from "react";
import CopyIcon from "../../assets/icons/copy-to-clipboard.svg";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import "./index.scss";

interface Props {
  value: string
}

export default function CopyToClipboard({ value }: Props) {
  const [copy] = useCopyToClipboard();

  const handleCopy = useCallback(() => {
    copy(value);
  }, [copy, value])

  return (
    <img src={CopyIcon} onClick={handleCopy} className="copy-to-clipboard" alt="copy" />
  )
}
