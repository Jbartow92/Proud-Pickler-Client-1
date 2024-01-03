import React, { useEffect, useState } from "react";
import { deletePost, getAllPosts } from "../services/postServices";
import { useNavigate } from "react-router-dom";
import { UpdateUser, getUser } from "../services/userService";

export const Profile = ({ setToken, token }) => {
  const [myPosts, setMyPosts] = useState([]);
  const [postToDelete, setPostToDelete] = useState(null);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState({
    first_name: false,
    last_name: false,
    username: false,
    email: false,
  });

  useEffect(() => {
    getAndSetUser();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    getAndSetMyPosts();
  }, [postToDelete]);

  const getAndSetUser = () => {
    getUser().then((userData) => {
      setUser(userData);
    });
  };

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
        setMyPosts((prevPosts) => prevPosts.filter((prevPost) => prevPost.id !== post.id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleEditClick = (field) => {
    setIsEditing((prevEditing) => ({
      ...prevEditing,
      [field]: true,
    }));
  };

  const handleSaveClick = () => {
    setIsEditing({
      first_name: false,
      last_name: false,
      username: false,
      email: false,
      bio: false,
    });
    debugger
    UpdateUser(user.user).then(() => {
      // Handle any post-update logic here
    });
  };

  const updateProfileField = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
      user: {
        ...prevUser.user,
        [field]: value,
      },
    }));
  };
  
  

// Update first name
  const handleFirstNameChange = (e) => {
    updateProfileField("first_name", e.target.value);
  };

  // Update last name
  const handleLastNameChange = (e) => {
    updateProfileField("last_name", e.target.value);
  };

  // Update bio
  const handleBioChange = (e) => {
    updateProfileField("bio", e.target.value);
  };

  // Update username
  const handleUsernameChange = (e) => {
    updateProfileField("username", e.target.value);
  };

  // Update email
  const handleEmailChange = (e) => {
    updateProfileField("email", e.target.value);
  };


  const handleInputChange = (field, value) => {
    updateProfileField(field, value);
  };

  if (!user) {
    return null; // or a loading indicator
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500 via-teal-600 to-teal-700">
      <div className="container mx-auto p-8 bg-teal-300 text-white rounded-lg shadow-xl my-8">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center">
          <div className="col-span-1 text-center">
            {user.profile_image_url && (
              <>
                <img
                  className="w-48 h-48 rounded-full object-cover mx-auto mb-4"
                  src={user.profile_image_url}
                  alt="Profile"
                />
                <div>
                <h1 className="text-3xl font-bold mb-2">
                  {isEditing.first_name ? (
                    <>
                      <input
                        type="text"
                        value={user?.user?.first_name || ''}
                        onChange={(e) => handleInputChange("first_name", e.target.value)}
                        className="bg-green-500"
                      />
                      <input
                        type="text"
                        value={user.user.last_name}
                        onChange={(e) => handleInputChange("last_name", e.target.value)}
                        className="bg-green-500 mt-3"
                      />
                      <button
                        style={{ backgroundColor: "orange", color: "#000000" }}
                        onClick={() => handleSaveClick("first_name")}
                        className="font-bold py-1 px-2 rounded ml-2"
                      >
                        Save
                      </button>
                      <button
                        style={{ backgroundColor: "silver", color: "#000000" }}
                        onClick={() => handleEditClick("first_name")}
                        className="font-bold py-1 px-2 rounded ml-2"
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    <>
                      {user?.user?.first_name} {user?.user?.last_name}
                      <button
                        style={{ backgroundColor: "silver", color: "#000000" }}
                        onClick={() => handleEditClick("first_name")}
                        className="font-medium py-.5 px-1 rounded ml-2 bg-green-900"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </h1>
                </div>
              </>
            )}
          </div>
          <div className="col-span-2">
            <div className="grid gap-4">
              <p className="text-sm text-gray-500">
                {isEditing.username ? (
                  <input
                    type="text"
                    value={user?.user?.username || ''}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className="bg-pink"
                  />
                ) : (
                  <>
                      {user?.user?.username}
                      <button
                        style={{ backgroundColor: "silver", color: "#000000" }}
                        onClick={() => handleEditClick("username")}
                        className="font-bold py-2 px-4 rounded ml-2"
                      >
                        Edit
                      </button>
                    </>
                )}
                {isEditing.username && (
                  <>
                    <button
                      style={{ backgroundColor: "orange", color: "#000000" }}
                      onClick={() => handleSaveClick("username")}
                      className="font-bold py-2 px-4 rounded ml-2"
                    >
                      Save
                    </button>
                    <button
                      style={{ backgroundColor: "silver", color: "#000000" }}
                      onClick={() => handleEditClick("username")}
                      className="font-bold py-2 px-4 rounded ml-2"
                    >
                      Edit
                    </button>
                  </>
                )}
              </p>
              <p className="text-sm text-gray-500">
                {isEditing.email ? (
                  <input
                    type="text"
                    value={user?.user?.email || ''}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-pink"
                  />
                ) : (
                  <>
                      {user?.user?.email}
                      <button
                        style={{ backgroundColor: "silver", color: "#000000" }}
                        onClick={() => handleEditClick("email")}
                        className="font-bold py-2 px-4 rounded ml-2"
                      >
                        Edit
                      </button>
                    </>
                )}
                {isEditing.email && (
                  <>
                    <button
                      style={{ backgroundColor: "orange", color: "#000000" }}
                      onClick={() => handleSaveClick("email")}
                      className="font-bold py-2 px-4 rounded ml-2"
                    >
                      Save
                    </button>
                    <button
                      style={{ backgroundColor: "silver", color: "#000000" }}
                      onClick={() => handleEditClick("email")}
                      className="font-bold py-2 px-4 rounded ml-2"
                    >
                      Edit
                    </button>
                  </>
                )}
              </p>
              {isEditing.bio ? (
                <textarea
                  value={user.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="bg-green-500"
                />
              ) : (
                <>
                      {user?.bio}
                      <button
                        style={{ backgroundColor: "silver", color: "#000000" }}
                        onClick={() => handleEditClick("bio")}
                        className="font-bold py-2 px-4 rounded ml-2"
                      >
                        Edit
                      </button>
                    </>
              )}
              {isEditing.bio && (
                <>
                  <button
                    style={{ backgroundColor: "orange", color: "#000000" }}
                    onClick={() => handleSaveClick("bio")}
                    className="font-bold py-2 px-4 rounded ml-2"
                  >
                    Save
                  </button>
                  <button
                    style={{ backgroundColor: "silver", color: "#000000" }}
                    onClick={() => handleEditClick("bio")}
                    className="font-bold py-2 px-4 rounded ml-2"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {myPosts && myPosts.length ? (
          myPosts.map((post) => (
            <div key={post.id} className="rounded-lg overflow-hidden bg-teal-500 shadow-md">
              <div style={{ backgroundColor: "#B0D96D" }} className="p-4">
                <div className="text-lg font-semibold mb-2 text-white">{post.title}</div>
                <div className="text-sm text-gray-500 mb-2">
                  Publication Date: {post.publication_date}
                </div>
                <img
                  className="w-full h-48 object-cover mb-2"
                  src={post.image_url}
                  alt={post.title}
                />
                <div className="text-sm text-white">{post.content}</div>
                <div className="mt-4 flex justify-end">
                  <button
                    style={{ backgroundColor: "silver", color: "#000000" }}
                    onClick={() => navigate(`/posts/${post.id}/edit-post`)}
                    className="font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                  <button
                    style={{ color: "#FF0000" }}
                    className="text-sm hover:underline ml-4"
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
    </div>
  );
};

