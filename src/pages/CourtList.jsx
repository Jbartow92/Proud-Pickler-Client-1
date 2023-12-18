import React, { useEffect, useState } from "react";
import { deleteCourt, getCourts } from "../services/courtService";
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

  const handleDeleteClick = async (court) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this court?");

    if (confirmDelete) {
      try {
        await deleteCourt(court.id);

        // Update the state immediately after successful deletion
        setCourts((prevCourts) => prevCourts.filter((prevCourt) => prevCourt.id !== court.id));
      } catch (error) {
        console.error("Error deleting court:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-500 via-teal-600 to-teal-700">
      <div className="p-8 rounded-lg shadow-lg max-w-[80%] mx-auto text-center mt-20 bg-teal-300 text-white">
        <div className="text-4xl font-bold mb-6">Courts</div>
        <button
          className="new-court-btn font-bold bg-yellow-300 text-black"
          onClick={() => navigate("/courts/create-court")}
        >
          ADD NEW COURT
        </button>
        {courts && courts.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {courts
              .slice()
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((court) => (
                <div style={{ backgroundColor: "#B0D96D" }} className="bg-white p-6 rounded-lg shadow-lg" key={court.id}>
                  <div className="text-xl font-semibold mb-2 text-teal-700">{court.title}</div>
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    {court.court_image_url && (
                      <img
                        src={court.court_image_url}
                        alt={`Image for court ${court.id}`}
                        className="object-cover rounded-lg h-48" // Set a fixed height
                      />
                    )}
                  </div>
                  <div className="text-gray-700">{court.city}, {court.state}</div>
                  <div className="text-gray-700 mb-2">Number of Courts: {court.number_of_courts}</div>
                  <div className="text-gray-700">Hours: {court.open_hours}</div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleDeleteClick(court)}
                      className="bg-orange-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p style={{ color: "#000000" }}>No courts found.</p>
        )}
      </div>
    </div>
  );
};
