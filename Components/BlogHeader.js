import { AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";

function BlogHeader({ data, content }) {
  return (
    <div className="px-6 py-6 md:px-10 md:w-1/2 flex flex-col items-start rounded transform hover:scale-105">
      <span className="inline-block py-1 px-2 rounded bg-gray-100 dark:bg-indigo-900 text-indigo-700 dark:text-gray-200 text-sm font-medium tracking-widest">
        {data.Tags.split(" ")[0]}
      </span>
      <h2 className="sm:text-2xl text-xl title-font font-semibold text-gray-700 mt-4 mb-4 dark:text-gray-100 ">
        {data.Title}
      </h2>
      <p className="leading-relaxed mb-5 text-gray-800 dark:text-gray-200">{data.Abstract}..</p>

      <div className="flex items-center flex-wrap pb-2 border-b-2 border-gray-200 mt-auto w-full justify-between dark:border-indigo-200">
        <Link
          href={`/blogs/${String(
            data.Title.split(" ").join("-").toLowerCase()
          )}`}
        >
          <a className="text-indigo-700 inline-flex items-center dark:text-indigo-200">
            Learn More{" "}
            <span className="pl-1">
              <AiOutlineArrowRight />
            </span>
          </a>
        </Link>
        <a className="inline-flex items-center">
          <span className="flex-grow flex flex-col pl-4">
            <span className="title-font font-medium text-gray-600 dark:text-indigo-200">Author</span>
            <span className="text-gray-900 text-xs tracking-widest mt-0.5 dark:text-indigo-300">
              {data.Author}
            </span>
          </span>
        </a>
      </div>
    </div>
  );
}

export default BlogHeader;
