import { useNavigate } from "react-router-dom";

import styles from "../movie-details-likes/MovieDetailsLikes.module.css"

import SavesDetails from "./saves-details/SavesDetails";

type MovieDetailsSavesProps = {
    curMovie: {}
}

export default function MovieDetailsSaves({
    curMovie
}: MovieDetailsSavesProps) {
    const navigate = useNavigate();

    function onBack() {
        navigate(`/catalog/${(curMovie as { _id: string })._id}`)
    }

    return (
        <div className={styles.modal}>
            <section>
                <button onClick={onBack}>X</button>
                <h2>User saves list</h2>
                {(curMovie as { saves: [] }).saves.length > 0
                    ? (curMovie as { saves: [] }).saves.map(el => <SavesDetails
                        key={(el as { _id: string })._id}
                        userId={(el as { _id: string })._id}
                        username={(el as { username: string }).username}
                        image={(el as { profileImage: string }).profileImage} />)
                    : <h2>No user saves yet</h2>
                }
            </section>
        </div>
    )
}