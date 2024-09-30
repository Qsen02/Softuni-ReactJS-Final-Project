import { useNavigate, useParams } from "react-router-dom"

import { useGetOneAnswer } from "../../../hooks/useAnswers"
import AnswerLikesDetails from "./answer-likes-details/AnswerLikesDetails";

import styles from "../movie-details-likes/MovieDetailsLikes.module.css"

export default function AnswerLikes() {
    const initialvalues = {
        _id: "",
        username: "",
        content: "",
        ownerId: {
            _id: "",
            username: "",
            email: "",
            isAdmin: false,
            accessToken: "",
            profileImage: ""
        },
        likes: []
    }
    const { movieId, commentId, answerId } = useParams();
    const { answer, loading, fetchError, setFetchError } = useGetOneAnswer(initialvalues, answerId);
    const navigate = useNavigate();

    function onBack() {
        try {
            navigate(`/catalog/${movieId}/comment/${commentId}/answers`);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate("/404");
                return;
            }
            setFetchError(true);
            return;
        }
    }

    return (
        <>
            {loading && !fetchError
                ? <div className={styles.loadingSpinner}></div>
                : ""
            }
            <div className={styles.modal}>
                <section>
                    <button onClick={onBack}>X</button>
                    <h2>Answer like list</h2>
                    {answer.likes.length == 0 && !loading && !fetchError
                        ? <h2>No likes yet</h2>
                        : loading && !fetchError
                            ? <h2>Likes loading...</h2>
                            : fetchError
                                ? <h2>Likes can't be loaded, please try again later.</h2>
                                : answer.likes.map(el => <AnswerLikesDetails
                                    key={(el as { _id: string })._id}
                                    userId={(el as { _id: string })._id}
                                    profileImage={(el as { profileImage: string }).profileImage}
                                    username={(el as { username: string }).username}
                                />
                                )
                    }
                </section>
            </div>
        </>
    )
}