import { useToast } from '../components/Toast';

type CopyFn = (text: string) => Promise<boolean>;

function useCopyToClipboard(): [CopyFn] {
  //const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const toast = useToast();

  const copy: CopyFn = async text => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      //setCopiedText(text);
      toast.open("Copied to clipboard!");
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      //setCopiedText(null);
      return false;
    }
  }

  return [copy];
}

export default useCopyToClipboard;
