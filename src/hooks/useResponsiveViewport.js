import { useEffect } from "react";

export function useResponsiveViewport() {
  useEffect(() => {
    const root = document.documentElement;

    const updateViewportVars = () => {
      const vv = window.visualViewport;
      const width = vv?.width ?? window.innerWidth;
      const height = vv?.height ?? window.innerHeight;

      root.style.setProperty("--vw", `${width * 0.01}px`);
      root.style.setProperty("--vh", `${height * 0.01}px`);
      root.style.setProperty("--app-height", `${height}px`);
    };

    updateViewportVars();
    window.addEventListener("resize", updateViewportVars);
    window.addEventListener("orientationchange", updateViewportVars);
    window.addEventListener("pageshow", updateViewportVars);

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateViewportVars);
      window.visualViewport.addEventListener("scroll", updateViewportVars);
    }

    return () => {
      window.removeEventListener("resize", updateViewportVars);
      window.removeEventListener("orientationchange", updateViewportVars);
      window.removeEventListener("pageshow", updateViewportVars);

      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateViewportVars);
        window.visualViewport.removeEventListener("scroll", updateViewportVars);
      }
    };
  }, []);
}
