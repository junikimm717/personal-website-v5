import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export interface NavbarProps {
  children: React.ReactNode;
  lang: "en" | "ko";
}

export default function Navbar(props: NavbarProps) {
  const [open, setOpen] = useState<boolean>(false);
  const menuId = `site-nav-menu-${props.lang}`;
  const title = props.lang === "ko" ? "김준희" : "Juni C. Kim";
  const menuLabel = props.lang === "ko" ? "메뉴" : "Menu";
  const toggleLabel =
    props.lang === "ko"
      ? open
        ? "내비게이션 메뉴 닫기"
        : "내비게이션 메뉴 열기"
      : open
        ? "Close navigation menu"
        : "Open navigation menu";

  return (
    <>
      <nav id="navone" className="site-nav p-3 mx-1 site-panel twocol:hidden">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl font-extrabold leading-none">{title}</h1>
          <button
            type="button"
            className="flex justify-center items-center gap-2 px-3 py-1 min-h-9 font-mono text-base border border-gray-400 dark:border-gray-600 twocol:hidden"
            aria-label={toggleLabel}
            aria-controls={menuId}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span>{menuLabel}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="14"
              width="14"
              viewBox="0 0 512 512"
              aria-hidden="true"
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
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={menuId}
              key="mobile-navbar"
              exit="exit"
              animate="visible"
              initial="hidden"
              variants={{
                hidden: { height: 0, opacity: 0 },
                visible: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="block overflow-y-hidden font-mono twocol:hidden"
            >
              {props.children}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <nav
        id="navtwo"
        className="site-nav hidden sticky top-6 p-3 mx-1 site-panel twocol:block"
      >
        <h1 className="text-xl font-extrabold">{title}</h1>
        <div className="font-mono">{props.children}</div>
      </nav>
    </>
  );
}
