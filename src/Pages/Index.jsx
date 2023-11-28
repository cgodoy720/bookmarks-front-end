import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const API = import.meta.env.VITE_BASE_URL

const Index = () => {
    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        fetch(`${API}/bookmarks`)
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                setBookmarks(res)
            })
    }, [])

    return (
        <div>
            {bookmarks.map((bookmark) => <div key={bookmark.id}><Link to={`/bookmarks/${bookmark.id}`}>{bookmark.name}</Link></div>)}
        </div>
    );
};

export default Index;