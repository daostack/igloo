import { useEffect, useState } from "react";
import { Breakpoint } from "../constants";

export function useWindowSize(): Breakpoint {
  const [windowSize, setWindowSize] = useState<Breakpoint>();
  useEffect(() => {
    function handleResize() {
      let breakpoint: Breakpoint;

      if (window.innerWidth > 1366) breakpoint = "high-res";
      else if (window.innerWidth > 768 && window.innerWidth <= 1366) breakpoint = "laptop";
      else breakpoint = "mobile";
      
      setWindowSize(breakpoint);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return windowSize;
}
