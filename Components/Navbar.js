import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { BiTerminal } from "react-icons/bi";
import { SiAboutDotMe, SiTwitter, SiGithub } from "react-icons/si";
import { BiSun, BiMoon } from "react-icons/bi";

function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  return (
    <header className="fixed w-full shadow border-t-4 border-indigo-600 bg-white dark:bg-gray-900 dark:border-gray-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
              <a className="flex items-center text-gray-800 hover:text-indigo-600 dark:text-gray-50">
                <span className="text-xl font-semibold">
                  <BiTerminal />
                </span>
                <span className="mx-3 font-semibold text-base md:text-base">
                  Bits-0f-C0de
                </span>
              </a>
            </Link>
          </div>

          <div className="flex items-center -mx-2">
            <button
              className="flex items-center mx-2 text-base text-gray-800 hover:text-indigo-600 dark:text-gray-50"
              onClick={toggleTheme}
            >
              <span className="text-lg">
                {theme === "dark" ? <BiMoon /> : <BiSun />}
              </span>
            </button>

            <Link href="/about">
              <a className="flex items-center mx-2 text-base text-gray-800 hover:text-indigo-600 dark:text-gray-50">
                <span className="text-xl ">
                  <SiAboutDotMe />
                </span>
              </a>
            </Link>

            <a
              className="flex items-center mx-2 text-gray-800 hover:text-indigo-600 dark:text-gray-50"
              href="https://twitter.com/soumyajit4419"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="text-lg">
                <SiTwitter />
              </span>
            </a>

            <a
              className="flex items-center mx-2 text-gray-800 hover:text-indigo-600 dark:text-gray-50"
              href="https://github.com/soumyajit4419"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="text-lg">
                <SiGithub />
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
