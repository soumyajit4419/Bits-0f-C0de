import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiTerminal } from "react-icons/bi";
import { HiSun, HiMoon } from "react-icons/hi";
import { CgUserlane } from "react-icons/cg";
import { AiOutlineGoogle, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { auth, provider } from "../Firebase/Firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { IoLogOutOutline } from "react-icons/io5";
import { SiCodefactor } from "react-icons/si";
import { IoMdArrowDropdown } from "react-icons/io";
import Alert from "./Alert";
import { useDispatch } from "react-redux";

function Navbar({ topics }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const { theme, setTheme } = useTheme();
  const [viewAlert, setViewAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "STORE_USER", payload: user });
      setLogin(true);
    }
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch search results as user types
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setSearchResults(data.results);
        setShowResults(true);
      } catch (err) {
        console.log(err);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearchClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  const handleResultClick = (slug) => {
    setSearchQuery("");
    setShowResults(false);
    router.push(`/blogs/${slug}`);
  };

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
        dispatch({ type: "REMOVE_USER" });
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
        const userObj = {
          name: res.user.displayName,
          photo: res.user.photoURL,
          token: res.user.accessToken,
          uid: res.user.uid,
        };

        localStorage.setItem("user", JSON.stringify(userObj));
        dispatch({ type: "STORE_USER", payload: userObj });

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
      <header className="fixed w-full border-t-4 bg-white dark:bg-dark border-indigo-600 dark:border-indigo-900 shadow dark:shadow-2 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex">
              <Link href="/">
                <a className="flex items-center hover:text-indigo-600 text-gray-800 dark:text-gray-50">
                  <span className="text-xl font-semibold">
                    <BiTerminal className="text-xl" />
                  </span>
                  <span className="mx-1 font-semibold text-base md:text-base">
                    Latest
                  </span>
                </a>
              </Link>

              <div className="dropdown inline-block relative mx-2">
                <a className="flex items-center hover:text-indigo-600 text-gray-800 dark:text-gray-50 mx-6 cursor-pointer">
                  <span className="text-xl font-semibold">
                    <SiCodefactor className="text-sm" />
                  </span>
                  <span className="mx-1 font-semibold text-base md:text-base">
                    Posts
                  </span>

                  <span className="text-xl font-semibold">
                    <IoMdArrowDropdown className="text-xl" />
                  </span>
                </a>
                <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 bg-white dark:bg-dark w-40 pt-6 rounded-xl left-1/3">
                  {topics.map((topic) => (
                    <Link href={`/topic/${topic}`} key={topic}>
                      <li className="cursor-pointer">
                        <a className="rounded-xl bg-white dark:bg-dark text-gray-800 dark:text-gray-50 py-2 px-4 block whitespace-no-wrap">
                          {topic}
                        </a>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center -mx-3">
              {/* Search Bar */}
              <div className="relative mx-2 lg:mx-4" ref={searchRef}>
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1.5">
                  <AiOutlineSearch className="text-gray-500 dark:text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        handleSearchClear();
                      }
                    }}
                    className="bg-transparent border-none outline-none ml-2 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 w-32 md:w-48"
                  />
                  {searchQuery && (
                    <button onClick={handleSearchClear}>
                      <AiOutlineClose className="text-gray-500 dark:text-gray-400 text-sm hover:text-indigo-600" />
                    </button>
                  )}
                </div>

                {/* Search Results Dropdown */}
                {showResults && (
                  <div className="absolute top-full mt-2 w-72 md:w-96 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-80 overflow-y-auto z-50">
                    {searchResults.length > 0 ? (
                      searchResults.map((result) => (
                        <div
                          key={result.slug}
                          className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                          onClick={() => handleResultClick(result.slug)}
                        >
                          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                            {result.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                            {result.abstract}
                          </p>
                          <div className="flex items-center mt-1 space-x-2">
                            <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded">
                              {result.topic}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          No articles found for &quot;{searchQuery}&quot;
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                className="flex items-center mx-2 lg:mx-4 text-base text-gray-800 hover:text-indigo-600 dark:text-gray-50"
                onClick={toggleTheme}
              >
                <span className="text-lg">
                  {isMounted && theme === "dark" ? (
                    <HiSun className="text-xl" />
                  ) : (
                    <HiMoon className="text-xl" />
                  )}
                </span>
              </button>

              <Link href="/about">
                <a className="flex items-center mx-2 lg:mx-4 text-base text-gray-800 hover:text-indigo-600 dark:text-gray-50">
                  <span className="text-xl">
                    <CgUserlane className="text-xl" />
                  </span>
                </a>
              </Link>

              <button className="flex items-center mx-2 lg:mx-4 text-base text-gray-800 hover:text-indigo-600 dark:text-gray-50">
                {isLogin ? (
                  <span
                    className="md:flex items-center"
                    onClick={handelSignOut}
                  >
                    <span className="hidden md:block text-sm font-medium">Sign Out</span>
                    <IoLogOutOutline className="text-xl mx-1" />
                  </span>
                ) : (
                  <span className="md:flex items-center" onClick={handelSignIn}>
                    <span className="hidden md:block text-sm font-medium"> Sign In</span>
                    <AiOutlineGoogle className="text-xl mx-1" />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
