import styles from "./Home.module.css"

export default function Home() {
    return (
        <div className={styles.home}>
            <h2>Welcome to our restaurant!</h2>
            <img src="https://yustinavillas.com/storage/2021/01/th-26776985869-1664x1040-2.jpg" alt="restaurant photo" />
            <p>Here you can order varied and delicious food for your home or office! What are you waiting for? Order now!</p>
        </div>
    )
}