// PostDetail.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../services/categoryService";
import { getPostByPostId } from "../services/postServices";

export const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCats, setSelectedCats] = useState(new Set());
  const navigate = useNavigate();
  const manageCats = useRef();

  useEffect(() => {
    getCategories().then((catsArray) => setCategories(catsArray));
  }, []);

  useEffect(() => {
    getPostByPostId(postId).then((post) => {
      setPost(post);
      if (post.categories) {
        setSelectedCats(new Set(post.categories.map((cat) => cat.id)));
      }
    });
  }, [postId, categories]);

  const handleSelectedTag = (cat) => {
    const copy = new Set(selectedCats);
    copy.has(cat.id) ? copy.delete(cat.id) : copy.add(cat.id);
    setSelectedCats(copy);
  };

  const saveNewTags = async (event) => {
    event.preventDefault();
    const postCopy = { ...post };
    postCopy.categories = Array.from(selectedCats);

    const updatedPost = {
      title: postCopy.title,
      image_url: postCopy.image_url,
      content: postCopy.content,
      categories: postCopy.categories,
      court: postCopy.court,
    };

    await fetch(`http://localhost:8000/posts/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });

    getCategories().then((catsArray) => setCategories(catsArray));
    manageCats.current.close();
  };

  const handleManageCats = () => {
    if (manageCats.current) {
      manageCats.current.showModal();
    }
  };

  const handleCloseCats = () => {
    if (manageCats.current) {
      manageCats.current.close();
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "#8BBF63" }} className="p-4 rounded shadow-md">
        {post ? (
          <>
            <div key={post.id}>
              <div className="text-xl font-semibold mb-4" style={{ color: "#FFFFFF" }}>
                Title: {post.title}
              </div>
              <div className="text-sm text-gray-500 mb-4" style={{ color: "#FFFFFF" }}>
                Author: {post.pickle_user.user.username}
              </div>
              <div className="text-base mb-4" style={{ color: "#FFFFFF" }}>
                Content: {post.content}
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 pb-cat-main"></div>
                <div className="ml-4">
                  <div className="text-sm font-semibold mb-2" style={{ color: "#FFFFFF" }}>
                    Categories:
                  </div>
                  <div className="flex flex-wrap">
                    {post.categories.map((cat) => (
                      <div
                        key={cat.id}
                        className="mr-2 mb-2 bg-green-500 text-white py-1 px-2 rounded"
                      >
                        {cat.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>No post found.</p>
        )}
      </div>
      {post?.is_owner ? (
        <div className="mt-4">
          <button
            style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}
            className="py-2 px-4 rounded"
            onClick={handleManageCats}
          >
            Manage Tags
          </button>
        </div>
      ) : (
        ""
      )}
      <dialog className="pb-manage-categories" ref={manageCats}>
        <div className="pb-cat-container">
          {categories
            ? categories.map((cat) => (
                <div key={cat.id} className="mb-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox text-green-500"
                      checked={selectedCats.has(cat.id)}
                      onChange={() => handleSelectedTag(cat)}
                    />
                    <span className="ml-2">{cat.label}</span>
                  </label>
                </div>
              ))
            : "No categories found"}
        </div>

        <div className="mt-4 flex justify-between">
          <button
            style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}
            className="py-2 px-4 rounded"
            onClick={saveNewTags}
          >
            Save Category Selection
          </button>
          <button
            style={{ backgroundColor: "#95a5a6", color: "#FFFFFF" }}
            className="py-2 px-4 rounded"
            onClick={handleCloseCats}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
};
