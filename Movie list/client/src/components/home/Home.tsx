import styles from "./Home.module.css"

export default function Home() {
    return (
        <>
            <div className={styles.homeHeader}>
                <h2>Welcome to movie list!</h2>
                <p>Here you can find most various movies!</p>
            </div>
            <div className={styles.homeBody}>
                <h2>Top 3 movies</h2>
                <div>

                </div>
            </div>
        </>
    )
}