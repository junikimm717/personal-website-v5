import React, { useEffect, useState } from "react";
import { FaRegSun, FaRegMoon } from "react-icons/fa6";

export default function DarkMode() {
  const [dark, setDark] = useState<boolean>(false);
  useEffect(() => {
    if (localStorage.getItem("dark") === "true") {
      setDark(true);
    } else {
      setDark(false);
    }
  }, []);
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark", "false");
    }
  }, [dark]);
  return (
    <div className="w-full flex justify-center">
      <button
        className="duration-200 text-xl border border-gray-400 dark:border-gray-600 hover:bg-darkbg hover:text-white dark:hover:bg-white dark:hover:text-black p-2 mx-auto mt-2"
        aria-label="Toggle Dark Mode"
        onClick={() => setDark(!dark)}
      >
        {dark ? <FaRegSun /> : <FaRegMoon />}
      </button>
    </div>
  );
}
