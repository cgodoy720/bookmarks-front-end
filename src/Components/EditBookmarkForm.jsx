import { useState , useEffect} from "react"
import { useParams, useNavigate } from "react-router-dom"

const API = import.meta.env.VITE_BASE_URL


export default function EditBookmarkForm () {
    const [editBookmark, setEditBookmark] = useState({
       name: "",
       url: "",
       category: "",
       description: "",
       is_favorite: false 
    })

    const { id } = useParams()
    const navigate = useNavigate()

    // on Change
    const handleChange = (event) => {
        const idValue = event.target.id
        const inputValue = event.target.value

        setEditBookmark((prev) => {
            return { ...prev, [idValue] : inputValue }
        })
    }

    // handle checkbox
    const handleCheckbox = (event) => {
        const isChecked = event.target.checked

        setEditBookmark((prev) => {
            return {...prev, is_favorite : isChecked }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch(`${API}/bookmarks/${id}`, {
            method: "PUT",
            body: JSON.stringify(editBookmark),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(() => navigate(`/bookmarks/${id}`))
        .catch(err => console.log(err))
    }


    useEffect(() => {
        fetch(`${API}/bookmarks/${id}`)
        .then(res => res.json())
        .then(res => setEditBookmark(res))
        .catch(err => console.log(err))
    }, [])

    return (
       <div class="editBookmarkForm">

        <form
        onSubmit={handleSubmit}>
            {/* name */}
            <label htmlFor="name"> Bookmark Name: 
                <input 
                type="text"
                id="name"
                value={editBookmark.name}
                onChange={handleChange}
                />
            </label>
            
            <br/><br/>

            {/* url */}
            <label htmlFor="url"> Bookmark Url: 
                <input 
                type="url"
                id= "url"
                value={editBookmark.url}
                onChange={handleChange}
                />
            </label>

            <br/><br/>
        {/* category */}
            <label htmlFor="category"> Category:
                <input
                type="text"
                id="category"
                value={editBookmark.category}
                onChange={handleChange} />
            </label>

            <br/><br/>

        {/* description */}
        <label htmlFor="description"> Description: 
            <input 
            type="text"
            id="description"
            value={editBookmark.description}
            onChange={handleChange}/>
        </label>

        <br/><br/>

        {/* is_favorite checkbox */}
        <label htmlFor="is_favorite"> Favorite:
            <input 
            type="checkbox"
            id="is_favorite"
            value={editBookmark.is_favorite}
            checked ={editBookmark.is_favorite}
            onChange={handleCheckbox}
            />

        </label>

        <br/> <br/>

        {/* submit button */}
        <input 
        type="submit"
        value="Update Bookmark" />


        </form>

       </div>
    )
}