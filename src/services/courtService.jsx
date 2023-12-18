export const getCourts = () => {
    return fetch(`http://localhost:8000/courts`,
    {
        method: "GET",
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        }
      }).then((res) => res.json())
  }

export const createCourt = (court) => {
  return fetch(`http://localhost:8000/courts`,
  {
      method: "POST",
      headers: {
          Authorization: `Token ${localStorage.getItem("auth_token")}`,
          "Content-Type": "application/json"
      },
          body: JSON.stringify(court)
      }).then((res) => res.json())
  }

  export const deleteCourt = (courtId) => {
    return fetch(`http://localhost:8000/courts/${courtId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    })
  };