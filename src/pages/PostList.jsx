import { useEffect, useState } from "react";
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
    <>
      <div className="page-title">All Posts</div>
      <button className="btn-div" onClick={() => navigate("/create-post")}>
        NEW POST
      </button>
      <div>
        {posts && posts.length ? (
          posts.map((post) => (
            <div className="card-item" key={post.id}>
              <Link to={`/postLists/${post.id}`}>
                <div className="post-details">
                  <div className="post-header">
                    <div className="post-title">Title: {post.title}</div>
                    <div className="post-date">
                      Date: {post.publication_date}
                    </div>
                    <div className="post-author">
                      Author: {post.pickle_user.user.username}
                    </div>
                  </div>
                  <div className="post-footer">
                    
                    <div className="post-tag-container">
                      <div>Categories: </div>
                      <div className="tag-div">
                      {post.categories.map((category, index) => (
                        <div className="category-label" key={category.id}>
                          {category.label}
                          {index < post.categories.length - 1 && ", "}
                        </div>
                      ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
                    {post?.is_owner ? (
                      <div className="manage-tags-div">
                        {/* <button
                          onClick={() =>
                            navigate(`/postList/${post.id}/edit-post`)
                          }
                        >
                          Edit
                        </button> */}
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
