import { useEffect, useState } from "react";

/**
 *
 * @param query Formatted media query to match
 * @returns intentionally returns opposite value because
 * of how the media queries are used here - as in tailwindcss
 */
export function useMediaQuery(query: `(min-width: ${number}px)`) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const matchQueryList = window.matchMedia(query);

    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }

    matchQueryList.addEventListener("change", handleChange);
    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return !matches;
}

/**
 * @description Use this whenever you need to match a screen size
 */
export const BREAKPOINTS = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
} as const;
