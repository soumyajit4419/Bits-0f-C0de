import { getAllBlogPosts } from "../../Lib/Data";

export default (req, res) => {
  const { q } = req.query;

  const allBlogs = getAllBlogPosts();

  const publishedBlogs = allBlogs
    .filter((blog) => blog.data.isPublished)
    .map((blog) => ({
      title: blog.data.Title,
      abstract: blog.data.Abstract,
      tags: blog.data.Tags,
      topic: blog.data.Topic,
      headerImage: blog.data.HeaderImage,
      slug: String(blog.data.Title.split(" ").join("-").toLowerCase()),
    }));

  if (!q || q.trim() === "") {
    return res.status(200).json({ results: publishedBlogs });
  }

  const query = q.toLowerCase().trim();

  const filtered = publishedBlogs.filter((blog) => {
    return (
      blog.title.toLowerCase().includes(query) ||
      blog.abstract.toLowerCase().includes(query) ||
      blog.tags.toLowerCase().includes(query) ||
      blog.topic.toLowerCase().includes(query)
    );
  });

  res.status(200).json({ results: filtered });
};
