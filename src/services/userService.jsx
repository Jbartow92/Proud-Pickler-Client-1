export const getUser = () => {
    return fetch(`http://localhost:8000/users/pickleusers`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };