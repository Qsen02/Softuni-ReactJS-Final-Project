import { useUserContext } from "../../../context/userContext"

import MovieDetailsComments from "./movie-details-comments/MovieDetailsComments"

import styles from "../MovieDetails.module.css";

type MovieDetailsCommentSectionTypes = {
    ownerId: string,
    comments: []
}

export default function MovieDetailsCommentSection({
    ownerId, comments
}: MovieDetailsCommentSectionTypes) {
    const { user } = useUserContext();
    return (
            <details className={styles.commentWrapper}>
                <summary>Comments: {comments.length}</summary>
                {user
                    ? <form>
                        <input type="text" name="content" placeholder="Enter comment here..." />
                        <button type="submit">Comment</button>
                    </form>
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
                    />)
                    : <h2>No comments yet</h2>
                }
            </details>
    )
}