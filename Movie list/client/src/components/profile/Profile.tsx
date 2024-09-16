import { Link, Route, Routes } from "react-router-dom";

import { useUserContext } from "../../context/userContext"
import { useGetOneUser } from "../../hooks/useAuth"
import { onProfileImageError } from "../../utils/imageError";

import styles from "./Profile.module.css"
import LikedMovies from "./liked-movies/LikedMovies";
import SavedMovies from "./saved-movies/SavedMovies";

export default function Profile() {
    const { user } = useUserContext();
    const { curUser } = useGetOneUser({likedMovies:[],savedMovies:[],createdMovies:[]}, user?._id);

    return (
        <>
        <Routes>
            <Route path="likedMovies" element={<LikedMovies likedMovies={(curUser as {likedMovies:[]}).likedMovies}/>}/>
            <Route path="savedMovies" element={<SavedMovies savedMovies={(curUser as {savedMovies:[]}).savedMovies}/>}/>
        </Routes>
            {(curUser as {isAdmin:boolean}).isAdmin
                ? <>
                    <section className={styles.profileHeader}>
                        <img src={(curUser as {profileImage:string}).profileImage} alt={(curUser as {username:string}).username} onError={onProfileImageError} />
                        <h2>{(curUser as {username:string}).username}</h2>
                        <h3>{(curUser as {email:string}).email}</h3>
                        <p>Created movies: {(curUser as {createdMovies:[]}).createdMovies.length}</p>
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
                        <img src={(curUser as {profileImage:string}).profileImage} alt={(curUser as {username:string}).username} onError={onProfileImageError} />
                        <h2>{(curUser as {username:string}).username}</h2>
                        <h3>{(curUser as {email:string}).email}</h3>
                        <p>Saved movies count: {(curUser as {savedMovies:[]}).savedMovies.length}</p>
                        <p>Liked movies count: {(curUser as {likedMovies:[]}).likedMovies.length}</p>
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