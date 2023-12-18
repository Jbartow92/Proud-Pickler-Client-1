import { useEffect, useState } from "react";
import { getUser } from "../services/userService";
import "/home/josh/workspace/ClientPickleProject/src/pages/PickleballPaddle.css"; // Adjust the path accordingly

export const Home = () => {
  const [user, setUser] = useState(null);

  const getAndSetUser = () => {
    getUser().then((userData) => {
      setUser(userData);
    });
  };

  useEffect(() => {
    getAndSetUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-500 via-teal-600 to-teal-700">
      <div className="p-8 rounded-lg shadow-lg max-w-md w-full text-center bg-teal-300">
        <h1 className="text-4xl font-bold mb-6 text-black">
          Welcome to Proud Picklers!
        </h1>
        {user && (
          <div className="p-4 rounded-md mb-4 bg-blue-700 shadow-md">
            <h2 className="text-xl font-semibold text-white">
              {user.user.first_name} {user.user.last_name}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};
 
