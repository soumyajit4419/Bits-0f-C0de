import React, { useEffect, useState } from "react";
import Link from "next/link";

function Toc({ headings }) {
  // useEffect(() => {
  //   const title = document.querySelectorAll("h2, h3");
  //   console.log(title);
  // }, []);

  const [active, setActive] = useState("");
  // console.log(active);

  return (
    <nav className="sticky top-32 overflow-auto toc-inner">
      <ul>
        {headings.map((heading, index) => (
          <li
            key={heading.id}
            className="mt-4 text-lg text-gray-700 dark:text-gray-400"
            style={{
              paddingLeft: heading.level === 3 ? "1rem" : "",
              color: heading.id === active ? "#6366f1" : "",
            }}
            onClick={(e) => {
              setActive(heading.id);
            }}
          >
            <Link href={`#${heading.id}`}>{heading.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Toc;
