import React, { useEffect, useState } from "react";
import { getAllPosts } from "../services/postServices";
import { Link, useNavigate } from "react-router-dom";

export const PostList = ({ setToken, token }) => {
  const [posts, setPosts] = useState({});
  const navigate = useNavigate();

  const getAndSetPosts = () => {
    getAllPosts().then((postsArray) => {
      const filteredPosts = postsArray.filter(
        (post) => new Date(post.publication_date) < new Date()
      );

      const sortedPosts = filteredPosts.sort(
        (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
      );

      setPosts(sortedPosts);
    });
  };

  useEffect(() => {
    getAndSetPosts();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-teal-500 via-teal-600 to-teal-700">
      <div className="max-w-3xl mx-auto rounded-lg shadow-lg p-8 bg-teal-300">
        <h1 className="text-4xl font-bold mb-8 text-black">All Posts</h1>
        <button
          className="font-bold py-2 px-4 rounded mb-4"
          style={{ backgroundColor: "orange", color: "#000000" }}
          onClick={() => navigate("/posts/create-post")}
        >
          NEW POST
        </button>
        {posts && posts.length ? (
          posts.map((post) => (
            <div key={post.id} className="rounded-lg shadow-lg mb-4 p-4 relative" style={{ backgroundColor: "#B0D96D" }}>
              <Link to={`/posts/${post.id}`} className="no-underline text-black">
                <div className="pb-post-details">
                  <div className="pb-post-header">
                    <div className="pb-post-author">
                      Author: {post.pickle_user.user.username}
                    </div>
                    <div className="pb-post-title">Title: {post.title}</div>
                    <div className="pb-post-date">Date: {post.publication_date}</div>
                  </div>
                  <div className="pb-content">
                    <div className="pb-post-content">{post.content}</div>
                  </div>
                  <div className="pb-post-footer">
                    <div className="pb-post-tag-container">
                      <div className="font-bold mb-1">Categories:</div>
                      <div className="pb-tag-div flex flex-wrap">
                        {post.categories.map((category, index) => (
                          <div key={category.id} className="pb-category-label mr-2 mb-2">
                            {category.label}
                          </div>
                        ))}
                      </div>
                      <div className="font-bold">
                        Location: {post.court ? post.court.title : "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              {post.image_url && (
                <div className="absolute top-4 right-4 max-w-1/4 h-40 rounded-md overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={`Image for post ${post.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-xl" style={{ color: "#000000" }}>No posts found.</p>
        )}
      </div>
    </div>
  );
};
