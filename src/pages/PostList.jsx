import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postServices";
import { Link, useNavigate } from "react-router-dom";
import "./PickleballPaddle.css";

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
    <>
      <div className="page-title">All Posts</div>
      <button className="new-btn-div" onClick={() => navigate("/posts/create-post")}>
        NEW POST
      </button>
      <div>
        {posts && posts.length ? (
          posts.map((post) => (
            <div className="pb-card-item" key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <div className="pb-post-details">
                  <div className="pb-post-header">
                    <div className="pb-post-author">
                      Author: {post.pickle_user.user.username}
                    </div>
                    <div className="pb-post-title">Title: {post.title}</div>
                    <div className="pb-post-date">
                      Date: {post.publication_date}
                    </div>
                  </div>
                  <div className="pb-content">
                    <div className="pb-post-content">{post.content}</div>
                    <div className="pb-post-image">
                      {post.image_url && (
                        <img src={post.image_url} alt={`Image for post ${post.id}`} />
                      )}
                    </div>
                  </div>
                  <div className="pb-post-footer">
                    <div className="pb-post-tag-container">
                      <div>Categories: </div>
                      <div className="pb-tag-div">
                        {post.categories.map((category, index) => (
                          <div className="pb-category-label" key={category.id}>
                            {category.label}
                            {index < post.categories.length - 1 && ", "}
                          </div>
                        ))}
                      </div>
                      <div>Location: {post.court ? post.court.title : "N/A"}</div>
                    </div>
                  </div>
                </div>
              </Link>
              {post?.is_owner ? (
                <div className="pb-manage-tags-div">
                  <button
                    onClick={() =>
                      navigate(`/posts/${post.id}/edit-post`)
                    }
                  >
                    Edit
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </>
  );
};
