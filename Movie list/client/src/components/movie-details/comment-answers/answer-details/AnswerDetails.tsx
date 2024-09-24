import { onProfileImageError } from "../../../../utils/imageError"

type AnswerDetailsProps = {
    id: string,
    username: string,
    content: string,
    profileImage: string | undefined
}

export default function AnswerDetails({
    id, username, content, profileImage
}: AnswerDetailsProps) {
    return (
        <article>
            <img src={profileImage} alt={username} onError={onProfileImageError} />
            <h3>{username}</h3>
            <p>{content}</p>
        </article>
    )
}