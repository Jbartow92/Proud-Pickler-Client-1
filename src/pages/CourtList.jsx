import { useEffect, useState } from "react";
import "./PickleballPaddle.css";
import { getCourts } from "../services/courtService";
import { useNavigate } from "react-router-dom";

export const CourtList = ({ setToken, token }) => {
  const [courts, setCourts] = useState([]);

  let navigate = useNavigate();

  const getAndSetCategories = () => {
    getCourts().then((courtsArray) => {
      setCourts(courtsArray);
    });
  };

  useEffect(() => {
    getAndSetCategories();
  }, []);

  return (
    <div className="court-list">
      <div className="court-list-title">Courts</div>
      <button className="new-court-btn" onClick={() => navigate("/courts/create-court")}>
        ADD NEW COURT
      </button>
      {courts && courts.length ? (
        <div className="center-container">
          {courts
            .slice()
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((court) => (
              <div className="court-card" key={court.id}>
                <div className="card-label">{court.title}</div>
                <div className="court-image-container">
                  {court.court_image_url && (
                    <img src={court.court_image_url} alt={`Image for court ${court.id}`} />
                  )}
                </div>
                <div className="card-label">{court.city}</div>
                <div className="card-label">{court.state}</div>
                <div className="card-label">{court.number_of_courts}</div>
                <div className="card-label">Hours: {court.open_hours}</div>
                {/* <div className="cat-btn-div">
                  <button onClick={() => handleUpdate(court.id)}>
                    Edit
                  </button>
                </div> */}
              </div>
            ))}
        </div>
      ) : (
        <p>No courts found.</p>
      )}
    </div>
  );
};
