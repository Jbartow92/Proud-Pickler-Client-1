export const getTags = () => {
    return fetch(`http://localhost:8000/tags`,
    {
        method: "GET",
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        }
      }).then((res) => res.json())
  }

  export const getTagsByID = (tagId) => {
      return fetch(`http://localhost:8000/tags/${tagId}`,
      {
          method: "GET",
          headers: {
              Authorization: `Token ${localStorage.getItem("auth_token")}`,
              "Content-Type": "application/json"
          }
          }).then((res) => res.json())
  }

  export const createTag = (tag) => {
    return fetch(`http://localhost:8000/tags`,
    {
        method: "POST",
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
            body: JSON.stringify(tag)
        }).then((res) => res.json())
    }

  export const editTag = (tag) => {
    return fetch(`http://localhost:8000/tags/${tag.id}`,
    {
        method: "PUT",
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
            body: JSON.stringify(tag)
        })
    }

    export const deleteTag = (tagId) => {
        return fetch(`http://localhost:8000/tags/${tagId}`, 
        {
            method: "DELETE",
            headers: {
                Authorization: `Token ${localStorage.getItem("auth_token")}`,
            },
        })
    }