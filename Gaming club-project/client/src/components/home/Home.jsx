import styles from "./Home.module.css"

export default function Home() {
    return (
        <div className={styles.home}>
            <h1>Welcome to gaming club!</h1>
            <img src="../../assets/gaming-banner-for-games-with-glitch-effect-neon-light-on-text-illustration-design-free-vector.jpg" alt="gaming image" />
            <p>Here you can found most different and varied games!</p>
        </div>
    )
}