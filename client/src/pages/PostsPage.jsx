import React, { useEffect, useState } from "react";
import axios from "axios";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err?.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="p-8 bg-white rounded-lg shadow-md card">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" />
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse delay-75" />
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse delay-150" />
          </div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center card">
          <h3 className="text-xl font-semibold">Unable to load posts</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center card">
          <div className="mx-auto h-12 w-12 text-gray-400">📝</div>
          <h3 className="mt-2 text-lg font-medium">No posts found</h3>
          <p className="mt-1 text-gray-500">Start by creating your first blog post.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto app-container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold page-title">Latest Blog Posts</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl page-subtitle">
            Discover our latest thoughts and insights
          </p>
        </div>

        <div className="grid gap-8 posts-grid">
          {posts.map((post) => (
            <article key={post._id} className="card">
              <div className="p-6">
                <div className="meta">
                  <div className="avatar">{(post.author && post.author[0]) || "?"}</div>
                  <div>
                    <p className="font-medium">{post.author || "Unknown Author"}</p>
                    <p className="muted text-sm">{new Date(post.createdAt || Date.now()).toLocaleDateString()}</p>
                  </div>
                </div>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-body">{post.content}</p>
                <div className="mt-4">
                  {post.tags?.map((tag, i) => (
                    <span key={i} className="tag">#{tag}</span>
                  ))}
                </div>
                <div className="mt-6 text-right">
                  <button className="cta">Read more →</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
