import { useEffect, useState } from "react";
import { getUser } from "../services/userService";

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
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-blue-100 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          Welcome to Proud Picklers!
        </h1>
        {user && (
          <div className="bg-white p-4 rounded-md mb-4">
            <h2 className="text-xl font-semibold">{user.user.first_name} {user.user.last_name}</h2>
          </div>
        )}
      </div>
    </div>
  );
};
