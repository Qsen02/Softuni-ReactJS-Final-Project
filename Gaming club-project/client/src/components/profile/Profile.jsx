import styles from "./Profile.module.css"

export default function Profile() {
    return (
        <>
            <div className={styles.profile}>
                <i className="fa-solid fa-circle-user"></i>
                <h2>Username: </h2>
                <p>Created posts: </p>
                <p>Saved posts:</p>
            </div>
            <div className={styles.profilePosts}>
                <div className={styles.profileSection}>
                        <h1>Created games</h1>
                        <div className={styles.profileContent}>
                            <p>No created games yet</p>
                        </div>
                </div>
                <div className={styles.profileSection}>
                    <h1>Saved games</h1>
                    <div className={styles.profileContent}>
                        <p>No saved games yet</p>
                    </div>
                </div>
            </div>
        </>
    )
}