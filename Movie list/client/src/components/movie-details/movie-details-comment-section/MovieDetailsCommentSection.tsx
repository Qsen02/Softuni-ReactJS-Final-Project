import { useUserContext } from "../../../context/userContext"

import MovieDetailsComments from "./movie-details-comments/MovieDetailsComments"

import styles from "../MovieDetails.module.css";
import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "../../../commons/CustomInput";

type MovieDetailsCommentSectionTypes = {
    ownerId: string,
    comments: [],
    onCreateComment: (values: { content: string }, actions: FormikHelpers<{ content: string }>) => void,
    errMsg: string,
    movieId:string|undefined,
    setMovie:React.Dispatch<React.SetStateAction<{}>>
}

export default function MovieDetailsCommentSection({
    ownerId, comments, onCreateComment, errMsg,movieId,setMovie
}: MovieDetailsCommentSectionTypes) {
    const { user } = useUserContext();
    return (
        <details className={styles.commentWrapper}>
            <summary>Comments: {comments.length}</summary>
            {user
                ? <Formik initialValues={{ content: "" }} onSubmit={onCreateComment}>
                    {
                        (props) => (
                            <Form>
                                {errMsg ? <p className={styles.errorMessage}>{errMsg}</p> : ""}
                                <CustomInput type="text" name="content" placeholder="Enter comment here..." />
                                <button type="submit">Comment</button>
                            </Form>
                        )
                    }
                </Formik>
                : ""
            }
            {comments.length > 0
                ? comments.map(el => <MovieDetailsComments
                    key={(el as { _id: string })._id}
                    id={(el as { _id: string })._id}
                    username={(el as { username: string }).username}
                    content={(el as { content: string }).content}
                    commentOwnerId={(el as { ownerId: string }).ownerId}
                    movieOwnerId={ownerId}
                    user={user}
                    likes={(el as { likes: [] }).likes}
                    movieId={movieId}
                    setMovie={setMovie}
                />)
                : <h2>No comments yet</h2>
            }
        </details>
    )
}