import { useParams, useNavigate } from "react-router-dom";
import "./DeleteModal.css"

const API = import.meta.env.VITE_BASE_URL

export default function DeleteModal({setModal}){
    const {id} = useParams()
    const navigate = useNavigate()

    const handleDelete = (event) => {
        fetch(`${API}/bookmarks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
        }
        })
        .then((res) => navigate("/bookmarks"))
        .catch(err => console.log(err))
    }

    return (
        <div className="deleteModal_container">
            <div className="deleteModal">
                <h2>Confirm Delete?</h2>
                <button
                onClick={handleDelete}>Yes, Delete</button>
                <button
                onClick={() => setModal(false)}>Nevermind</button>
            </div>
        </div>
    )
}