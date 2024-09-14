import { useNavigate } from "react-router-dom";

import LikesDetails from "./likes-details/LikesDetails";

import styles from "./MovieDetailsLikes.module.css"

type MovieDetailsLikesProps = {
    curMovie: {}
}

export default function MovieDetailsLikes({
    curMovie
}: MovieDetailsLikesProps) {
    const navigate=useNavigate();

    function onBack(){
navigate(`/catalog/${(curMovie as {_id:string})._id}`)
    }

    return (
        <div className={styles.modal}>
            <section>
                <button onClick={onBack}>X</button>
                <h2>User like list</h2>
                {(curMovie as {likes:[]}).likes.length > 0
                    ? (curMovie as {likes:[]}).likes.map(el => <LikesDetails
                        key={(el as {_id:string})._id}
                        userId={(el as {_id:string})._id}
                        username={(el as {username:string}).username}
                        image={(el as {profileImage:string}).profileImage} />)
                    : <h2>No user likes yet</h2>
                }
            </section>
        </div>
    )
}