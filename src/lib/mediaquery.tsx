import { useState, useEffect } from "react";

export default function useMediaQuery(mediaQueryString: string) {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(!!event.matches);
    };

    // Use addEventListener with the "change" event
    mediaQueryList.addEventListener("change", handleChange);

    // Initial sync (in case the query changed)
    setMatches(mediaQueryList.matches);

    // Clean up using removeEventListener
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [mediaQueryString]);

  return matches;
}
