import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteModal from '../Components/DeleteModal/DeleteModal';
const API = import.meta.env.VITE_BASE_URL;

const Show = () => {
    const { id } = useParams()
    const [bookmark, setBookmark] = useState({})
    const [modal, setModal] = useState(false)

    // going to add edit and delete buttons
    const navigate = useNavigate()

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
            <br/>
            <span>Favorite : {bookmark.is_favorite ? "⭐" :" ❌ "}</span>

            <div className='bookmarksShow_buttons'>
                <button 
                className='show_button'
                onClick={() => navigate(`/bookmarks/${id}/edit`)}>
                    Edit
                </button>

                <button 
                className='show_button'
                onClick={() => setModal(true)}
                >
                    Delete
                </button>
            </div>
{/* toggle to trigger delete modal component or not */}
            {
            modal && 
            <DeleteModal 
            setModal ={setModal} />
            }
        </div>
    );
};

export default Show;