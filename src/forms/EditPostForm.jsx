import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./forms.css";
import { getCourts } from "../services/courtService";
import { editPost, getPostById } from "../services/postServices";

export const EditPostForm = () => {
  // State variables
  const [courtLabel, setCourtLabel] = useState([]);
  const [post, setPost] = useState({
    title: "",
    image_url: "",
    content: "",
    publication_date: new Date(),
    court: 0,
  });

  // Router parameters
  const { postId } = useParams();

  // Navigation hook
  let navigate = useNavigate();

  // Fetch court labels on component mount
  useEffect(() => {
    getCourts().then((categoryArray) => {
      setCourtLabel(categoryArray);
    });
  }, []);

  // Fetch post details when postId changes
  useEffect(() => {
    getPostById(postId).then((postObj) => {
      setPost(postObj);
    });
  }, [postId]);

  // Update post state on input change
  const updatePost = (e) => {
    const copy = { ...post };
    copy[e.target.id] = e.target.value;
    setPost(copy);
  };

  // Update court details in post state on category selection
  const updateCategory = (e) => {
    const selectedCourtId = e.target.value;
    const selectedCourt = courtLabel.find((court) => court.id === selectedCourtId);

    if (selectedCourt) {
      const copy = { ...post };
      copy.court = {
        id: selectedCourt.id,
        title: selectedCourt.title,
        court_image_url: selectedCourt.court_image_url,
        city: selectedCourt.city,
        state: selectedCourt.state,
        number_of_courts: selectedCourt.number_of_courts,
        open_hours: selectedCourt.open_hours,
      };
      setPost(copy);
    }
  };

  // Handle form cancel
  const handleCancel = () => {
    navigate("/posts");
  };

  // Handle form save
  const handleSave = (event) => {
    event.preventDefault();

    const updatedItem = {
      id: post.id,
      title: post.title,
      image_url: post.image_url,
      content: post.content,
      court: {
        id: post.court.id,
        title: post.court.title,
        court_image_url: post.court.court_image_url,
        city: post.court.city,
        state: post.court.state,
        number_of_courts: post.court.number_of_courts,
        open_hours: post.court.open_hours,
      },
      categories: post.categories.map((category) => category.id),
    };

    // Send updated item to server
    editPost(updatedItem).then(() => {
      navigate(`/posts/${postId}`);
    });
  };

  // JSX structure
  return (
    <main className="form-parent">
      <form className="form-and-header">
        <div className="h1-div">
          <h1>Edit Post Form</h1>
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
                placeholder=""
                value={post.image_url}
                required
                maxLength={200}
              />
              Max Characters 200
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
              />
            </div>
            <fieldset className="fieldset-div">
              <div className="box-input">
                <div>Court:</div>
                <select
                  className="input"
                  name="court"
                  onChange={updateCategory}
                  value={post.court.id}
                >
                  {courtLabel.map((typeObj) => (
                    <option key={typeObj.id} value={typeObj.id}>
                      {typeObj.title}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
          </fieldset>
        </div>
        <div className="button-div">
          <button className="cancel-button" onClick={handleSave}>
            Edit Post
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

