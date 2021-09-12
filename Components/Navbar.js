import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { BiTerminal } from "react-icons/bi";
import { SiAboutDotMe } from "react-icons/si";
import { BiSun, BiMoon } from "react-icons/bi";
import { VscGithub } from "react-icons/vsc";
import { AiOutlineGoogle } from "react-icons/ai";
import { auth, provider } from "../Firebase/Firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { IoLogOutOutline } from "react-icons/io5";
import Alert from "./Alert";

function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const { theme, setTheme } = useTheme();
  const [viewAlert, setViewAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    setIsMounted(true);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLogin(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };
  const handelSignOut = () => {
    signOut(auth)
      .then((res) => {
        setLogin(false);
        localStorage.removeItem("user");

        setViewAlert(true);
        setAlertMessage("Hope to see you again !!");
        setTimeout(() => {
          setViewAlert(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handelSignIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: res.user.displayName,
            photo: res.user.photoURL,
            token: res.user.accessToken,
            uid: res.user.uid,
          })
        );
        setLogin(true);
        setViewAlert(true);
        setAlertMessage(`Hello ${res.user.displayName}`);
        setTimeout(() => {
          setViewAlert(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Alert show={viewAlert} type="success" message={alertMessage} />
      <header className="fixed w-full border-t-4 bg-white dark:bg-gray-900 border-indigo-600 dark:border-indigo-900 shadow dark:shadow-2 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/">
                <a className="flex items-center hover:text-indigo-600 text-gray-800 dark:text-gray-50">
                  <span className="text-xl font-semibold">
                    <BiTerminal className="text-xl" />
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
                  {isMounted && theme === "dark" ? (
                    <BiSun className="text-xl" />
                  ) : (
                    <BiMoon className="text-xl" />
                  )}
                </span>
              </button>

              <a
                className="flex items-center mx-2 text-gray-800 hover:text-indigo-600 dark:text-gray-50"
                href="https://github.com/soumyajit4419"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-lg">
                  <VscGithub className="text-lg" />
                </span>
              </a>

              <button className="flex items-center mx-2 text-base text-gray-800 hover:text-indigo-600 dark:text-gray-50">
                <span className="text-lg">
                  {isLogin ? (
                    <IoLogOutOutline
                      className="text-xl"
                      onClick={handelSignOut}
                    />
                  ) : (
                    <AiOutlineGoogle
                      className="text-xl"
                      onClick={handelSignIn}
                    />
                  )}
                </span>
              </button>

              <Link href="/about">
                <a className="flex items-center mx-2 text-base text-gray-800 hover:text-indigo-600 dark:text-gray-50">
                  <span className="text-xl ">
                    <SiAboutDotMe className="text-xl" />
                  </span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
