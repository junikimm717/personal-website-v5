import { navigate } from "astro:transitions/client";

export default function Settings(props: { lang: "en" | "ko" }) {
  const { lang } = props;
  return (
    <div className="flex justify-center w-full">
      <span className="flex gap-2 justify-center">
        <button
          className="flex justify-center items-center p-2 mx-auto mt-2 w-12 h-12 text-2xl no-underline border border-gray-400 duration-500 dark:border-gray-600 hover:text-white dark:hover:bg-white dark:hover:text-black hover:bg-darkbg"
          onClick={() => navigate(lang === "ko" ? "/en" : "/ko")}
        >
          {lang === "ko" ? "en" : "한"}
        </button>
      </span>
    </div>
  );
}
