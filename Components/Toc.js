import React from "react";
import Link from "next/link";

function Toc({ headings }) {
  return (
    <nav className="sticky top-36 overflow-auto">
      <h3 className="text-2xl uppercase text-gray-800 dark:text-gray-200">
        Table Of Contents
      </h3>
      <ul>
        {headings.map((heading, index) => (
          <li
            key={heading.id}
            className="mt-4 text-lg text-gray-700 dark:text-gray-400"
            style={{
              paddingLeft: heading.level === 3 ? "1rem" : "",
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
