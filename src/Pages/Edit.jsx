import NewBookmarkForm from "../Components/NewBookmarkForm"
import { useNavigate } from "react-router-dom"

export default function Edit() {
const navigate = useNavigate()
    return (
        <>
        <NewBookmarkForm />
        <button onClick={() => navigate(-1)}>Go Back</button>
        </>
    )
}