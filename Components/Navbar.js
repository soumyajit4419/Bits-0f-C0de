import Link from "next/link";
import { BiTerminal } from "react-icons/bi";
import { SiAboutDotMe, SiTwitter, SiGithub } from "react-icons/si";

function Navbar() {
  return (
    <header className="fixed w-full bg-white shadow border-t-4 border-indigo-600">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
              <a className="flex items-center  text-gray-800 hover:text-indigo-600">
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
            <Link href="/about">
              <a className="flex items-center mx-2 text-base text-gray-800 hover:text-indigo-600">
                <span className="text-xl ">
                  <SiAboutDotMe />
                </span>
              </a>
            </Link>

            <a
              className="flex items-center mx-2 text-gray-800 hover:text-indigo-600"
              href="https://twitter.com/soumyajit4419"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="text-lg">
                <SiTwitter />
              </span>
            </a>

            <a
              className="flex items-center mx-2 text-gray-800 hover:text-indigo-600"
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
