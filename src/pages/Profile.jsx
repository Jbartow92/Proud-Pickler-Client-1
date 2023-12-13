import { useEffect, useState } from "react";
import { deletePost, getAllPosts } from "../services/postServices";

export const Profile = ({ setToken, token }) => {
  const [myPosts, setMyPosts] = useState([]);
  const [postToDelete, setPostToDelete] = useState(null);

  const getAndSetMyPosts = async () => {
    try {
      const postsArray = await getAllPosts();
      const filteredArray = postsArray.filter((post) => post.is_owner === true);
      const sortedArray = filteredArray.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date));
      setMyPosts(sortedArray);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDeleteClick = async (post) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");

    if (confirmDelete) {
      try {
        await deletePost(post.id);

        // Update the state immediately after successful deletion
        setMyPosts((prevPosts) => prevPosts.filter((prevPost) => prevPost.id !== post.id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  useEffect(() => {
    if (postToDelete) {
      const handleDeleteConfirmation = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");

        if (confirmDelete) {
          try {
            await deletePost(postToDelete.id);

            // Update the state immediately after successful deletion
            setMyPosts((prevPosts) => prevPosts.filter((post) => post.id !== postToDelete.id));
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
  }, [postToDelete]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Posts</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {myPosts && myPosts.length ? (
          myPosts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded shadow-md">
              <div className="text-lg font-semibold mb-2">{post.title}</div>
              <div className="text-sm text-gray-500 mb-2">
                Publication Date: {post.publication_date}
              </div>
              <img
                className="w-full h-40 object-cover mb-2"
                src={post.image_url}
                alt={post.title}
              />
              <div className="text-sm text-gray-700">{post.content}</div>
              <div className="mt-4">
                <button
                  className="text-sm text-red-500 hover:underline"
                  onClick={() => handleDeleteClick(post)}
                >
                  Delete Post
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};
