import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_BASE_URL;

const NewBookmarkForm = () => {
    const navigate = useNavigate()
    const [newBookmark, setNewBookmark] = useState({
        name: "",
        url: "",
        category: "",
        description: "",
        is_favorite: false
    })

    const handleChange = (event) => {
        // console.log(event.target.id)
        setNewBookmark((prev) => {
            return { ...prev, [event.target.id]: event.target.value }
        })
    }

    const handleCheckboxChange = (event) => {
        setNewBookmark((prev) => {
            return { ...prev, is_favorite: !newBookmark.is_favorite }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch(`${API}/bookmarks`, {
            method: "POST",
            body: JSON.stringify(newBookmark),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(() => navigate("/bookmarks"))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Bookmark Info</legend>
                    <label htmlFor="name">Name: </label>
                    <input 
                        id="name" 
                        type="text" 
                        placeholder="Website Name"
                        value={newBookmark.name}
                        required
                        onChange={handleChange}
                    /><br></br>
                    <label htmlFor="url">URL: </label>
                    <input 
                        id="url" 
                        type="text" 
                        placeholder="Website URL"
                        value={newBookmark.url}
                        required
                        onChange={handleChange}
                    /><br></br>
                    <label htmlFor="category">Category: </label>
                    <input 
                        id="category" 
                        type="text" 
                        placeholder="Website Category"
                        value={newBookmark.category}
                        required
                        onChange={handleChange}
                    /><br></br>
                    <label htmlFor="description">Description: </label>
                    <input 
                        id="description" 
                        type="text" 
                        placeholder="Website Description"
                        value={newBookmark.description}
                        required
                        onChange={handleChange}
                    /><br></br>
                    <label htmlFor='is_favorite'>Favorite: </label>
                    <input 
                        id="is_favorite"
                        type="checkbox" 
                        value={newBookmark.is_favorite}
                        onChange={handleCheckboxChange}
                    /><br></br>
                    <input type="submit" value="Add Bookmark"/>
                </fieldset>
            </form>
        </div>
    );
};

export default NewBookmarkForm;