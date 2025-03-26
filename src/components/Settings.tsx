import { navigate } from "astro:transitions/client";
import React, { useEffect, useState } from "react";
import { FaRegSun, FaRegMoon } from "react-icons/fa6";

export default function Settings(props: { lang: "en" | "ko" }) {
  const { lang } = props;
  const [dark, setDark] = useState<boolean>(false);
  useEffect(() => {
    if (localStorage.getItem("dark") === "true") {
      setDark(true);
    } else {
      setDark(false);
    }
  }, []);
  const update = () => {
    if (!dark) {
      setDark(!dark);
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark", "true");
    } else {
      setDark(!dark);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark", "false");
    }
  };
  return (
    <div className="flex justify-center w-full">
      <span className="flex gap-2 justify-center">
        <button
          className="flex justify-center items-center p-2 mx-auto mt-2 w-12 h-12 text-2xl border border-gray-400 duration-500 dark:border-gray-600 hover:text-white dark:hover:bg-white dark:hover:text-black hover:bg-darkbg"
          aria-label="Toggle Dark Mode"
          onClick={update}
        >
          {dark ? <FaRegSun /> : <FaRegMoon />}
        </button>
        <button
          className="flex justify-center items-center p-2 mx-auto mt-2 w-12 h-12 text-2xl no-underline border border-gray-400 duration-500 dark:border-gray-600 hover:text-white dark:hover:bg-white dark:hover:text-black hover:bg-darkbg"
          onClick={() => navigate(lang === "ko" ? "/" : "/ko")}
        >
          {lang === "ko" ? "en" : "한"}
        </button>
      </span>
    </div>
  );
}
