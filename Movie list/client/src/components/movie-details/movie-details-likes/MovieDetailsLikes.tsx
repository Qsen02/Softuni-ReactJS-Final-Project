import LikesDetails from "./likes-details/LikesDetails"

type MovieDetailsLikesProps = {
    curMovie: {}
}

export default function MovieDetailsLikes({
    curMovie
}: MovieDetailsLikesProps) {
    return (
        <div>
            <section>
                <h2>User like list</h2>
                {(curMovie as {likes:[]}).likes.length > 0
                    ? (curMovie as {likes:[]}).likes.map(el => <LikesDetails
                        key={(el as {_id:string})._id}
                        username={(el as {username:string}).username}
                        image={(el as {profileImage:string}).profileImage} />)
                    : <h2>No user likes yet</h2>
                }
            </section>
        </div>
    )
}