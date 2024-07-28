import { useProfile } from "../../hooks/useGames";

import styles from "./Profile.module.css"

import ProfileGames from "./profile-games/ProfileGames";

export default function Profile() {
    const initialUser = {};
    const initialCreatedGames = [];
    const initialSavedGames = [];
    const { userData, createdGames, savedGames, isLoading } = useProfile(initialUser, initialCreatedGames, initialSavedGames)
    return (
        <>
            {isLoading
                ? <div className={styles.loading}></div>
                : ""
            }
            <div className={styles.profile}>
                <i className="fa-solid fa-circle-user"></i>
                <h2>Username: {userData.username}</h2>
                <h2>Email: {userData.email}</h2>
                <p>Created posts: {createdGames.length}</p>
                <p>Saved posts: {savedGames.length}</p>
            </div>
            <div className={styles.profilePosts}>
                <div className={styles.profileSection}>
                    <h1>Created games</h1>
                    <div className={styles.profileContent}>
                        {createdGames.length == 0
                            ? <p>No created games yet</p>
                            : createdGames.map(el =>
                                <ProfileGames
                                    key={el._id}
                                    id={el._id}
                                    name={el.name}
                                    category={el.category}
                                    image={el.image}
                                />
                            )
                        }
                    </div>
                </div>
                <div className={styles.profileSection}>
                    <h1>Saved games</h1>
                    <div className={styles.profileContent}>
                        {savedGames.length == 0
                            ? <p>No saved games yet</p>
                            : savedGames.map(el =>
                                <ProfileGames
                                    key={el._id}
                                    id={el._id}
                                    name={el.name}
                                    category={el.category}
                                    image={el.image}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}