import { FaTwitter } from "react-icons/fa";

function BlogShare({ data }) {
  return (
    <>
      <div className="text-center pt-5">
        <button className="bg-indigo-500 px-3 py-1 font-semibold text-white inline-flex items-center space-x-2 rounded">
          <FaTwitter />
          <a
            className="twitter-share-button"
            rel="noopener noreferrer"
            target="_blank"
            href={`https://twitter.com/intent/tweet?text=${
              data.Title
            } by @soumyajit4419&url=https://blogs.soumyajit.tech/blogs/${
              data.Id
            }&hashtags=${data.Tags.split(" ")}`}
          >
            Tweet
          </a>
        </button>
      </div>
    </>
  );
}

export default BlogShare;
