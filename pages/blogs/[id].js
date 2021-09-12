import { getAllBlogPosts } from "../../Lib/Data";
import { serialize } from "next-mdx-remote/serialize";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Head from "next/head";
import BlogInner from "../../Components/BlogInner";
import BlogShare from "../../Components/BlogShare";
import Comments from "../../Components/Comments";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import { useRouter } from "next/router";

// export const getStaticPaths = () => {
//   const allBlogs = getAllBlogPosts();
//   return {
//     paths: allBlogs.map((blog) => ({
//       params: {
//         id: String(blog.data.Title.split(" ").join("-").toLowerCase()),
//       },
//     })),
//     fallback: false,
//   };
// };

export const getServerSideProps = async (context) => {
  const params = context.params;
  const allBlogs = getAllBlogPosts();

  const page = allBlogs.find(
    (blog) =>
      String(blog.data.Title.split(" ").join("-").toLowerCase()) === params.id
  );

  const res = [];
  const docRef = collection(db, "posts", params.id, "comments");
  const q = query(docRef, orderBy("date", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = {
      id: doc.id,
      comment: doc.data().comment,
      userName: doc.data().userName,
      userImage: doc.data().userImage,
      date: doc.data().date.toDate().toDateString(),
    };
    res.push(data);
  });

  const { data, content } = page;
  const mdxSource = await serialize(content, { scope: data });

  const api_key = process.env.API_KEY;

  return {
    props: {
      data: data,
      content: mdxSource,
      api_key: api_key,
      id: params.id,
      comments: res,
    },
  };
};

function id({ data, content, api_key, id, comments }) {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <>
      <Head>
        <title>{data.Title}</title>
        <meta name="title" content={data.Title} />
        <meta name="description" content={data.Abstract} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blogs.soumyajit.tech/" />
        <meta property="og:title" content={data.Title} />
        <meta property="og:description" content={data.Abstract} />
        <meta
          property="og:image"
          content={`https://raw.githubusercontent.com/soumyajit4419/Bits-0f-C0de/main/public${data.HeaderImage}`}
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://blogs.soumyajit.tech/" />
        <meta property="twitter:title" content={data.Title} />
        <meta property="twitter:description" content={data.Abstract} />
        <meta
          property="twitter:image"
          content={`https://raw.githubusercontent.com/soumyajit4419/Bits-0f-C0de/main/public${data.HeaderImage}`}
        />
      </Head>

      <div className="min-h-screen relative bg-white dark:bg-gray-900">
        <Navbar />
        <div className="py-24">
          <BlogInner data={data} content={content} api_key={api_key} />
          <BlogShare data={data} />
          <Comments id={id} comments={comments} refresh={refreshData} />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default id;
