import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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


    // Destiny code start -> imported useparams above

    const {id} = useParams()

    useEffect(() => {
        if(id){
            fetch(`${API}/bookmarks/${id}`)
            .then(res => res.json())
            .then(resJson => setNewBookmark(resJson)
            )
            .catch(err=>console.log(err))
        }
    },[])

    const handleEditSubmit = (event) => {
        event.preventDefault()
        fetch(`${API}/bookmarks/${id}`, {
            method: "PUT",
            body: JSON.stringify(newBookmark),
            headers: {
                "Content-Type": "application/json"
        }
    })
    .then(() => navigate(`/bookmarks/${id}`))
    .catch(err => console.log(err))

    }

    // Destiny code finished

    const handleChange = (event) => {
        // console.log(event.target.id)
        setNewBookmark((prev) => {
            return { ...prev, [event.target.id]: event.target.value }
        })
    }

    const handleCheckboxChange = (event) => {
        const isChecked = event.target.checked
        // setNewBookmark((prev) => {
        //     return { ...prev, is_favorite: !newBookmark.is_favorite }
        // })
        setNewBookmark((prev) => {
            return { ...prev, is_favorite: isChecked }
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
            .then((res) =>navigate("/bookmarks"))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <form onSubmit={!id ? handleSubmit: handleEditSubmit }>
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
                        // required
                        onChange={handleChange}
                    /><br></br>
                    <label htmlFor='is_favorite'>Favorite: </label>
                    <input 
                        id="is_favorite"
                        type="checkbox" 
                        value={newBookmark.is_favorite}
                        checked={newBookmark.is_favorite}
                        onChange={handleCheckboxChange}
                    /><br></br>

                    <input type="submit" value={ !id ? "Add Bookmark": "Update Bookmark"}/>
                </fieldset>
            </form>
        </div>
    );
};

export default NewBookmarkForm;