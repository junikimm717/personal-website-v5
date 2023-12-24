import React, { useEffect, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";

export default function Navbar(props: { children: React.ReactNode }) {
  const small = useMediaQuery("(max-width: 700px)");
  const [open, setOpen] = useState<boolean>(false);
  return small ? (
    <div className="column mx-1 p-3">
      <div className="flex flex-row justify-between">
        <h1 className="text-lg font-extrabold">Juni C. Kim</h1>
        <button
          className="text-xl border border-gray-400 dark:border-gray-600 px-3"
          aria-label="Toggle Navbar Items"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      <div className="block twocol:hidden">{!open ? null : props.children}</div>
    </div>
  ) : (
    <div className="column mx-1 p-3 top-6 sticky">
      <h1 className="text-xl font-extrabold">Juni C. Kim</h1>
      <div className="hidden twocol:block">{props.children}</div>
    </div>
  );
}

function useMediaQuery(mediaQueryString: string) {
  const [matches, setMatches] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString);
    const listener = () => setMatches(!!mediaQueryList.matches);
    listener();
    mediaQueryList.addListener(listener);
    return () => mediaQueryList.removeListener(listener);
  }, [mediaQueryString]);

  return matches;
}
