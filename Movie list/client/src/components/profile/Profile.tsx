import { Link, Route, Routes } from "react-router-dom";

import { useUserContext } from "../../context/userContext"
import { useGetOneUser } from "../../hooks/useAuth"
import { onProfileImageError } from "../../utils/imageError";

import styles from "./Profile.module.css"
import LikedMovies from "./liked-movies/LikedMovies";

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
        <Routes>
            <Route path="likedMovies" element={<LikedMovies likedMovies={curUser.likedMovies}/>}/>
        </Routes>
            {curUser.isAdmin
                ? <>
                    <section className={styles.profileHeader}>
                        <img src={curUser.profileImage} alt={curUser.username} onError={onProfileImageError} />
                        <h2>{curUser.username}</h2>
                        <h3>{curUser.email}</h3>
                        <p>Created movies: {curUser.createdMovies.length}</p>
                        <button>Edit profile</button>
                    </section>
                    <section className={styles.profileBody}>
                        <Link to="/profile/createdMovies">
                            <article>
                                <p>Created Movies</p>
                            </article>
                        </Link>
                    </section>
                </>
                : <>
                    <section className={styles.profileHeader}>
                        <img src={curUser.profileImage} alt={curUser.username} onError={onProfileImageError} />
                        <h2>{curUser.username}</h2>
                        <h3>{curUser.email}</h3>
                        <p>Saved movies count: {curUser.savedMovies.length}</p>
                        <p>Liked movies count: {curUser.likedMovies.length}</p>
                        <button>Edit profile</button>
                    </section>
                    <section className={styles.profileBody}>
                        <Link to="/profile/savedMovies">
                            <article>
                                <p>Saved movies</p>
                            </article>
                        </Link>
                        <Link to="/profile/likedMovies">
                            <article>
                                <p>Liked Movies</p>
                            </article>
                        </Link>
                    </section>
                </>
            }
        </>
    )
}