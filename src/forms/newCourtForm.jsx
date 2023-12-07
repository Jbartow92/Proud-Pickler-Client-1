import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forms.css";
import { createCourt } from "../services/courtService";

export const CourtForm = () => {
  const [court, setCourt] = useState({
    title: "",
    court_image_url: "",
    city: "",
    state: "",
    number_of_courts: 0,
    open_hours: ""
  });

  let navigate = useNavigate();

  const updateCourt = (e) => {
    const copy = { ...court };
    copy[e.target.id] = e.target.value;

    setCourt(copy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    const newCourt = {
      title: court.title,
      court_image_url: court.court_image_url,
      city: court.city,
      state: court.state,
      number_of_courts: court.number_of_courts,
      open_hours: court.open_hours
    };
    createCourt(newCourt).then(() => {
      navigate("/courts");
    });
  };

  return (
    <main className="form-parent">
      <form className="form-and-header">
        <div className="h1-div">
          <h1>New Court Form</h1>
        </div>
        <div className="form-container">
          <fieldset className="form-fieldset">
            <div className="form-field">
              <label>New Court:</label>
              <input
                className="input-field"
                id="title"
                onChange={updateCourt}
                type="text"
                placeholder="Court Name"
                value={court.title}
                required
              />
            </div>
            <div className="form-field">
              <label>Court Image:</label>
              <input
                className="input-field"
                id="court_image_url"
                onChange={updateCourt}
                type="text"
                placeholder="Court Image"
                value={court.court_image_url}
                required
              />
            </div>
            <div className="form-field">
              <label>City:</label>
              <input
                className="input-field"
                id="city"
                onChange={updateCourt}
                type="text"
                placeholder="Court City"
                value={court.city}
                required
              />
            </div>
            <div className="form-field">
              <label>State:</label>
              <input
                className="input-field"
                id="state"
                onChange={updateCourt}
                type="text"
                placeholder="Court State"
                value={court.state}
                required
              />
            </div>
            <div className="form-field">
              <label>Number of Courts:</label>
              <input
                className="input-field"
                id="number_of_courts"
                onChange={updateCourt}
                type="number"
                placeholder="0"
                value={court.number_of_courts}
                required
              />
            </div>
            <div className="form-field">
              <label>Open_Hours:</label>
              <input
                className="input-field"
                id="open_hours"
                onChange={updateCourt}
                type="text"
                placeholder="6am - 6pm"
                value={court.open_hours}
                required
              />
            </div>
          </fieldset>
          <div className="button-div">
            <button className="cancel-button" onClick={handleSave}>
              Submit Court
            </button>
            <button className="cancel-button" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};
