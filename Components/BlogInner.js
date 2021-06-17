import { MDXRemote } from "next-mdx-remote";
import { BsThreeDots } from "react-icons/bs";
import LikeBtn from "./LikeBtn";

function BlogInner({ data, content, api_key }) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <img
        className="object-cover w-full h-72"
        src={data.HeaderImage}
        alt="Article Image"
      />

      <div className="p-2">
        <div className="flex flex-col items-center">
          <div className="flex justify-around">
            {data.Tags.split(" ").map((tag) => (
              <p
                key={tag}
                className="inline-block px-3 ml-3 py-1 mb-4 text-xs font-semibold tracking-wider text-gray-50 uppercase rounded-full bg-indigo-500"
              >
                {tag}
              </p>
            ))}
          </div>
          <a className="block mt-2 text-2xl sm:text-4xl font-semibold text-gray-800">
            {data.Title}
          </a>

          <p className="text-5xl pt-2">
            <BsThreeDots />
          </p>

          <article className="prose lg:prose-lg py-7">
            <MDXRemote {...content} />
          </article>

          <div className="mt-3">
            <div className="flex items-center flex-col">
              <p className="text-5xl pb-2">
                <BsThreeDots />
              </p>
              <p className="text-2xl pb-2">Thanks for reading!!!</p>
              <p className="mx-2 font-semibold text-gray-700">{data.Author}</p>
              <p className="text-sm font-medium leading-4 text-gray-600">
                Author
              </p>
            </div>
          </div>
          <LikeBtn api_key={api_key} data={data} />
        </div>
      </div>
    </div>
  );
}

export default BlogInner;
