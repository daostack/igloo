
import { useToggle } from './useToggle';

const useModal = () => {
  const [isShowing, setIsShowing] = useToggle(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  }
};

export default useModal;
