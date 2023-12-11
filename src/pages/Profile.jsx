import { useEffect, useState } from "react";
import "./PickleballPaddle.css";
import { deletePost, getAllPosts } from "../services/postServices";

export const Profile = ({ setToken, token }) => {
  const [myPosts, setMyPosts] = useState([]);
  const [postToDelete, setPostToDelete] = useState(null);

  const getAndSetMyPosts = async () => {
    try {
      const postsArray = await getAllPosts();
      const filteredArray = postsArray.filter((post) => post.is_owner === true);
      const sortedArray = filteredArray.sort((a, b) => {
        return new Date(b.publication_date) - new Date(a.publication_date);
      });
      setMyPosts(sortedArray);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
  };

  useEffect(() => {
    if (postToDelete) {
      const handleDeleteConfirmation = async () => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this post?"
        );

        if (confirmDelete) {
          try {
            await deletePost(postToDelete.id);

            // Update the state immediately after successful deletion
            setMyPosts((prevPosts) =>
              prevPosts.filter((post) => post.id !== postToDelete.id)
            );
          } catch (error) {
            console.error("Error deleting post:", error);
          } finally {
            setPostToDelete(null);
          }
        }
      };

      handleDeleteConfirmation();
    }
  }, [postToDelete]);

  useEffect(() => {
    getAndSetMyPosts();
  }, [postToDelete]); // Fetch posts whenever postToDelete changes

  return (
    <>
      <div className="page-title">My Posts</div>
      <div className="content">
        {myPosts && myPosts.length ? (
          myPosts.map((post) => (
            <div className="pb-card-item" key={post.id}>
              <div className="pb-post-header">
                <div className="pb-post-title">{post.title}</div>
                <div className="pb-post-date">
                  Publication Date: {post.publication_date}
                </div>
              </div>
              <div className="pb-post-details">
                <img
                  className="pb-post-image"
                  src={post.image_url}
                  alt={post.title}
                  width="400px"
                />
                <div className="pb-post-content">{post.content}</div>
              </div>
              <div className="pb-post-footer">
                <div className="comment-buttons">
                  <button
                    className="pb-manage-tags"
                    onClick={() => handleDeleteClick(post)}
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </>
  );
};
