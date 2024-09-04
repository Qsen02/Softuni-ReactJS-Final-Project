import styles from "../../game-delete/GameDelete.module.css"

export default function DeleteAnswer() {
    return (
        <div className={styles.modal}>
            <div className={styles.deleteWrapper}>
                <h1>Are you sure you want to delete this answer?</h1>
                <button>Yes</button>
                <button>No</button>
            </div>
        </div>
    )
}