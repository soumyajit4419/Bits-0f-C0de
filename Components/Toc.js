import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

function Toc({ headings }) {
  const [active, setActive] = useState("");
  const observerRef = useRef(null);

  useEffect(() => {
    // Collect all heading DOM elements that match the headings prop
    const headingElements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean);

    if (headingElements.length === 0) return;

    // Disconnect any previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // The navbar is fixed ~80px tall; offset the root margin so headings
    // are considered "in view" only after clearing the navbar
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observer.observe(el));
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className="sticky top-32 overflow-auto toc-inner">
      <ul>
        {headings.map((heading, index) => (
          <li
            key={heading.uid}
            className="mt-4 text-lg text-gray-700 dark:text-gray-400"
            style={{
              paddingLeft: heading.level === 3 ? "1rem" : "",
              color: heading.id === active ? "#6366f1" : "",
              fontWeight: heading.id === active ? "600" : "",
              transition: "color 0.2s ease, font-weight 0.2s ease",
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
