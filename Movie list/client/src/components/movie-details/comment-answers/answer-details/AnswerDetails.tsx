import { useGetOneAnswer } from "../../../../hooks/useAnswers"
import { onProfileImageError } from "../../../../utils/imageError"

type User = {
    _id: string,
    username: string,
    email: string,
    isAdmin: boolean,
    accessToken: string,
    profileImage: string
}

type AnswerDetailsProps = {
    id: string,
    username: string,
    content: string,
    owner: User
}

export default function AnswerDetails({
    id, username, content, owner
}: AnswerDetailsProps) {
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
    const { answer } = useGetOneAnswer(initialvalues, id);
    return (
        <article>
            <img src={answer.ownerId.profileImage} alt={username} onError={onProfileImageError} />
            <h3>{username}</h3>
            <p>{content}</p>
        </article>
    )
}