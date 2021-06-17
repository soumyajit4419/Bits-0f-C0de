import { getAllBlogPosts } from "../../Lib/Data";
import { serialize } from "next-mdx-remote/serialize";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Head from "next/head";
import BlogInner from "../../Components/BlogInner";
import BlogShare from "../../Components/BlogShare";
import Comments from "../../Components/Comments";

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

  const api_key = process.env.API_KEY;

  return {
    props: {
      data: data,
      content: mdxSource,
      api_key: api_key,
    },
  };
};

function id({ data, content, api_key }) {
  return (
    <>
      <Head>
        <title>{data.Title}</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@soumyajit4419" />
      </Head>

      <div className="min-h-screen relative">
        <Navbar />
        <div className="py-24">
          <BlogInner data={data} content={content} api_key={api_key} />
          <BlogShare data={data} />
          <Comments />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default id;
