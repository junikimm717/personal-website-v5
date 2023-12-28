import React, { useState } from "react";
import useMediaQuery from "@/lib/mediaquery";

export default function Navbar(props: { children: React.ReactNode }) {
  const small = useMediaQuery("(max-width: 700px)");
  const [open, setOpen] = useState<boolean>(false);
  return small ? (
    <div id="navone" className="column mx-1 p-3">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-extrabold">Juni C. Kim</h1>
        <button
          className="text-xl border border-gray-400 dark:border-gray-600 px-3 flex twocol:hidden items-center justify-center"
          aria-label="Toggle Navbar Items"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="14"
            width="14"
            viewBox="0 0 512 512"
            className={
              "dark:fill-white fill-black transition-all duration-500" +
              " " +
              (open ? "rotate-180" : "rotate-0")
            }
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </button>
      </div>
      <div className="block twocol:hidden font-mono">
        {!open ? null : props.children}
      </div>
    </div>
  ) : (
    <div id="navtwo" className="column mx-1 p-3 top-6 sticky">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-extrabold">Juni C. Kim</h1>
        <button
          className="text-xl border border-gray-400 dark:border-gray-600 px-3 flex twocol:hidden items-center justify-center"
          aria-label="Toggle Navbar Items"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="14"
            width="14"
            viewBox="0 0 512 512"
            className={
              "dark:fill-white fill-black transition-all duration-500" +
              " " +
              (open ? "rotate-180" : "rotate-0")
            }
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </button>
      </div>
      <div className="hidden twocol:block font-mono">{props.children}</div>
    </div>
  );
}
