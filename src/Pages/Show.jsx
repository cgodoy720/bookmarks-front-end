import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const API = import.meta.env.VITE_BASE_URL;

const Show = () => {
    const { id } = useParams()
    const [bookmark, setBookmark] = useState({})

    const navigate = useNavigate()

    // handle delete
    const handleDelete = () => {
        fetch(`${API}/bookmarks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(() => navigate("/bookmarks"))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch(`${API}/bookmarks/${id}`)
            .then(res => res.json())
            .then((res) => {
                setBookmark(res)
            })
            .catch(err => console.log(err))
    }, [id])

    return (
        <div>
            <h2>{bookmark.name} Page</h2>
            <h4>{bookmark.category}</h4>
            <h4>{bookmark.description}</h4>
            <a href={bookmark.url} target="_blank">Go to: {bookmark.name}</a>

        <div>
            {/* edit */}
            <button
            onClick={() => navigate(`/bookmarks/${id}/edit`)}>Edit</button>

            {/* delete */}
            <button
            onClick={handleDelete}
            >Delete</button>
        </div>

        </div>
    );
};

export default Show;