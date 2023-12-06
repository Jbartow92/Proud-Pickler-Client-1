import { useEffect, useState } from "react";
import "./pages.css";
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
    <>
      <div className="page-title">Courts</div>
      <button className="btn-div" onClick={() => navigate("/create-court")}>
        ADD NEW COURT
      </button>
        {courts && courts.length ? (
          courts
            .slice() // Create a copy of the array to avoid modifying the original
            .sort((a, b) => a.title.localeCompare(b.title)) // Sort alphabetically
            .map((court) => (
              <div className="card-item" key={court.id}>
                <div className="card-label">{court.title}</div>
                <div className="card-label">{court.court_image_url}</div>
                <div className="card-label">{court.city}</div>
                <div className="card-label">{court.state}</div>
                <div className="card-label">{court.number_of_courts}</div>
                <div className="card-label">{court.open_hours}</div>
                <div className="cat-btn-div">
                  <button onClick={() => handleUpdate(court.id)}>
                    Edit
                  </button>
                </div>
              </div>
            ))
        ) : (
          <p>No courts found.</p>
        )}
      </>
  );
};
