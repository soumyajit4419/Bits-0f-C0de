import { getAllBlogPosts } from "../../Lib/Data";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { BsThreeDots } from "react-icons/bs";

export const getStaticPaths = () => {
  const allBlogs = getAllBlogPosts();
  return {
    paths: allBlogs.map((blog) => ({ params: { id: String(blog.data.Id) } })),
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const params = context.params;
  const allBlogs = getAllBlogPosts();

  const page = allBlogs.find((blog) => String(blog.data.Id) === params.id);

  const { data, content } = page;
  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      data: data,
      content: mdxSource,
    },
  };
};

function id({ data, content }) {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <div className="py-24">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg ">
          <img
            className="object-cover w-full h-72"
            src={data.HeaderImage}
            alt="Article Image"
          />

          <div className="p-6">
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
              <div className="mt-4">
                <div className="flex items-center flex-col">
                  <p className="mx-2 font-semibold text-gray-700">
                    {data.Author}
                  </p>
                  <p className="text-sm font-medium leading-4 text-gray-600">
                    Author
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default id;
