import { Link, Route, Routes } from "react-router-dom";

import { useUserContext } from "../../context/userContext"
import { useGetOneUser } from "../../hooks/useAuth"
import { onProfileImageError } from "../../utils/imageError";

import styles from "./Profile.module.css"
import LikedMovies from "./liked-movies/LikedMovies";
import SavedMovies from "./saved-movies/SavedMovies";
import CreatedMovies from "./created-movies/CreatedMovies";
import ProfileEdit from "./profile-edit/ProfileEdit";
import ProfileChangePassword from "./profile-change-password/ProfileChangePassword";
import SuccessfullyChangedPassword from "./successfully-changed-password/SuccessfullyChangedPassword";
import FullImage from "./full-image/FullImage";

export default function Profile() {
    const { user } = useUserContext();
    const { curUser, setCurUser } = useGetOneUser({ likedMovies: [], savedMovies: [], createdMovies: [] }, user?._id);

    return (
        <>
            <Routes>
                <Route path="likedMovies" element={<LikedMovies likedMovies={(curUser as { likedMovies: [] }).likedMovies} />} />
                <Route path="savedMovies" element={<SavedMovies savedMovies={(curUser as { savedMovies: [] }).savedMovies} />} />
                <Route path="createdMovies" element={<CreatedMovies createdMovies={(curUser as { createdMovies: [] }).createdMovies} />} />
                <Route path=":userId/edit" element={<ProfileEdit user={curUser} setUser={setCurUser} />} />
                <Route path=":userId/changePassword" element={<ProfileChangePassword setCurUser={setCurUser} />} />
                <Route path="successfullyChanged" element={<SuccessfullyChangedPassword />} />
                <Route path="fullImage" element={<FullImage image={(curUser as { profileImage: string }).profileImage} username={(curUser as { username: string }).username} />} />
            </Routes>
            {(curUser as { isAdmin: boolean }).isAdmin
                ? <>
                    <section className={styles.profileHeader}>
                        <Link to={`/profile/fullImage`}><img src={(curUser as { profileImage: string }).profileImage} alt={(curUser as { username: string }).username} onError={onProfileImageError} /></Link>
                        <h2>{(curUser as { username: string }).username}</h2>
                        <h3>{(curUser as { email: string }).email}</h3>
                        <p>Created movies: {(curUser as { createdMovies: [] }).createdMovies.length}</p>
                        <Link to={`/profile/${(curUser as { _id: string })._id}/edit`}><button>Edit profile</button></Link>
                        <Link to={`/profile/${(curUser as { _id: string })._id}/changePassword`}><button>Change password</button></Link>
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
                        <Link to={`/profile/fullImage`}><img src={(curUser as { profileImage: string }).profileImage} alt={(curUser as { username: string }).username} onError={onProfileImageError} /></Link>
                        <h2>{(curUser as { username: string }).username}</h2>
                        <h3>{(curUser as { email: string }).email}</h3>
                        <p>Saved movies count: {(curUser as { savedMovies: [] }).savedMovies.length}</p>
                        <p>Liked movies count: {(curUser as { likedMovies: [] }).likedMovies.length}</p>
                        <Link to={`/profile/${(curUser as { _id: string })._id}/edit`}><button>Edit profile</button></Link>
                        <Link to={`/profile/${(curUser as { _id: string })._id}/changePassword`}><button>Change password</button></Link>
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