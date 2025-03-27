import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import useMediaQuery from "@lib/mediaquery";

export interface NavbarProps {
  children: React.ReactNode;
  lang: "en" | "ko";
}

export default function Navbar(props: NavbarProps) {
  const small = useMediaQuery("(max-width: 700px)");
  const [open, setOpen] = useState<boolean>(false);
  return small ? (
    <nav id="navone" className="p-3 mx-1 column">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-extrabold">
          {props.lang === "ko" ? "김준희" : "Juni C. Kim"}
        </h1>
        <button
          className="flex justify-center items-center px-3 text-xl border border-gray-400 dark:border-gray-600 twocol:hidden"
          aria-label="Toggle Navbar Items"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="14"
            width="14"
            viewBox="0 0 512 512"
            className={
              "dark:fill-white fill-black transition-all duration-300" +
              " " +
              (open ? "rotate-180" : "rotate-0")
            }
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            key="navbar"
            exit="exit"
            animate="visible"
            initial="hidden"
            variants={{
              hidden: { height: 0, opacity: 0 }, // Initially collapsed and invisible
              visible: { height: "auto", opacity: 1 }, // Fully expanded and visible
              exit: { height: 0, opacity: 0 }, // Collapse back to 0 height and invisible
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="block overflow-y-hidden font-mono twocol:hidden"
          >
            {props.children}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  ) : (
    <nav id="navtwo" className="sticky top-6 p-3 mx-1 column">
      <h1 className="text-xl font-extrabold">
        {props.lang === "ko" ? "김준희" : "Juni C. Kim"}
      </h1>
      <div className="hidden font-mono twocol:block">{props.children}</div>
    </nav>
  );
}
