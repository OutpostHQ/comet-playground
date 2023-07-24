import { useCallback } from "react";
import { useTheme as useNextTheme } from "next-themes";

export default function useTheme() {
  const { setTheme: setNextTheme, theme } = useNextTheme();

  const removeTransitions = useCallback(() => {
    const css = document.createElement("style");
    css.appendChild(
      document.createTextNode(
        `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
      )
    );
    document.head.appendChild(css);
    return css;
  }, []);

  const addTransitions = useCallback((css: HTMLStyleElement) => {
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  }, []);

  const setTheme = useCallback(
    (theme: string) => {
      const node = removeTransitions();
      setNextTheme(theme);
      addTransitions(node);
    },
    [addTransitions, removeTransitions, setNextTheme]
  );

  return { theme, setTheme };
}
