import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forms.css";
import { getCourts } from "../services/courtService";
import { getCategories } from "../services/categoryService";

export const PostForm = () => {
  const [courtLabel, setCourtLabel] = useState([]);
  const [chosenCategories, updateChosen] = useState(new Set());
  const [categoryLabels, setCategoryLabels] = useState([]);
  const [post, setPost] = useState({
    title: "",
    image_url: "",
    content: "",
    publication_date: new Date(),
    court: 0,
  });

  let navigate = useNavigate();

  useEffect(() => {
    getCourts().then((courtArray) => {
      setCourtLabel(courtArray);
    });

    getCategories().then((catArray) => {
      setCategoryLabels(catArray);
    });
  }, []);

  const updatePost = (e) => {
    const copy = { ...post };
    copy[e.target.id] = e.target.value;
    setPost(copy);
  };

  const updateCourt = (e) => {
    const copy = { ...post };
    copy.court = e.target.value;
    setPost(copy);
  };

  const handleCategoryChosen = (c) => {
    const copy = new Set(chosenCategories);
    copy.has(c.id) ? copy.delete(c.id) : copy.add(c.id);
    updateChosen(copy);
  };

  const postPost = async (evt) => {
    evt.preventDefault();

    // Retrieve the token from localStorage
    const authToken = localStorage.getItem("auth_token");

    // Check if the token is present
    if (!authToken) {
      console.error("Rock token not found in localStorage");
      return;
    }

    try {
      // Send a POST request to create a new post
      const response = await fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("auth_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...post, categories: Array.from(chosenCategories) }),
      });

      if (!response.ok) {
        console.error("Error posting post:", response.statusText);
        return;
      }

      // Parse the response to get the newly created post's ID
      const createdPost = await response.json();
      const postId = createdPost.id;

      // Navigate to the detail page of the created post
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error("Error posting post:", error);
    }
  };

  return (
    <main className="form-parent">
      <form className="form-and-header">
        <div className="h1-div">
          <h1>New Post Form</h1>
        </div>
        <div className="form-container">
          <fieldset className="form-fieldset">
            <div className="form-field">
              <label>Title:</label>
              <input
                className="input-field"
                id="title"
                onChange={updatePost}
                type="text"
                placeholder=""
                value={post.title}
                required
              />
            </div>
            <div className="form-field">
              <label>Image:</label>
              <input
                className="input-field"
                id="image_url"
                onChange={updatePost}
                type="text"
                placeholder="https://example.com"
                value={post.image_url}
              />
            </div>
            <div className="form-field">
              <label>Content:</label>
              <textarea
                className="textarea-field"
                id="content"
                onChange={updatePost}
                placeholder=""
                value={post.content}
                required
                maxLength={200}
              />
              Max Characters 200
            </div>
            <fieldset className="fieldset-div">
              <div className="box-input">
                <div>Court:</div>
                <select
                  className="input"
                  name="court"
                  onChange={updateCourt}
                  value={post.court.id}
                  required
                >
                  <option value={0}>Please select a Court</option>
                  {courtLabel.map((typeObj) => {
                    return (
                      <option key={typeObj.id} value={typeObj.id}>
                        {typeObj.title}
                      </option>
                    );
                  })}
                </select>
              </div>
            </fieldset>
            <fieldset className="fieldset-div">
              <div className="tags-group">
                <div className="tags-label">Categories:</div>
                {/* Map through categories and render checkboxes */}
                <div className="tags">
                  {categoryLabels.map((c) => (
                    <div className="tag" key={c.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={chosenCategories.has(c.id)}
                          onChange={() => handleCategoryChosen(c)}
                        />
                        {c.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </fieldset>
          </fieldset>
        </div>
        <div className="button-div">
          <button className="cancel-button" onClick={postPost}>Add Post</button>
          <button className="cancel-button" onClick={() => navigate(-1)}>
              Cancel
            </button>
        </div>
      </form>
    </main>
  );
};
