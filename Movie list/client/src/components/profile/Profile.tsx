import { Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext"
import { useGetOneUser } from "../../hooks/useAuth"
import { onProfileImageError } from "../../utils/imageError";

export default function Profile() {
    const initialvalues = {
        savedMovies: [],
        createdMovies: [],
        likedMovies: [],
        profileImage: "",
        username: "",
        email: ""
    }

    const { user } = useUserContext();
    const { curUser } = useGetOneUser(initialvalues, user?._id);

    return (
        <>
            {curUser.isAdmin
                ? <>
                    <section>
                        <img src={curUser.profileImage} alt={curUser.username} onError={onProfileImageError} />
                        <h2>{curUser.username}</h2>
                        <h3>{curUser.email}</h3>
                        <p>Created movies: {curUser.createdMovies.length}</p>
                        <button>Edit profile</button>
                    </section>
                    <Link to="/profile/createdMovies">
                        <section>
                            <p>Created Movies</p>
                        </section>
                    </Link>
                </>
                : <>
                    <section>
                        <img src={curUser.profileImage} alt={curUser.username} onError={onProfileImageError} />
                        <h2>{curUser.username}</h2>
                        <h3>{curUser.email}</h3>
                        <p>Saved movies count: {curUser.savedMovies.length}</p>
                        <p>Liked movies count: {curUser.likedMovies.length}</p>
                        <button>Edit profile</button>
                    </section>
                    <Link to="/profile/savedMovies">
                        <section>
                            <p>Saved movies</p>
                        </section>
                    </Link>
                    <Link to="/profile/likedMovies">
                        <section>
                            <p>Liked Movies</p>
                        </section>
                    </Link>
                </>
            }
        </>
    )
}