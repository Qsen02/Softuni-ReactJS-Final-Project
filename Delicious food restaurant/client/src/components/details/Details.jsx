import DetailsButtons from "./details-buttons/DetailsButtons";

import styles from "./Details.module.css"

export default function Details() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.detailsHeader}>
                <img src="https://svetispas.com/wp-content/uploads/2018/02/%D0%9F%D0%B8%D1%86%D0%B0-%D0%9C%D0%B0%D1%80%D0%B3%D0%B0%D1%80%D0%B8%D1%82%D0%B0-%D0%91%D0%B0%D0%BB%D0%BD%D0%B5%D0%BE-%D0%A5%D0%BE%D1%82%D0%B5%D0%BB-%D0%A1%D0%B2%D0%B5%D1%82%D0%B8-%D0%A1%D0%BF%D0%B0%D1%81-%D0%92%D0%B5%D0%BB%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4.jpg" alt="pizza"/>
                <div>
                    <h2>asdasdasd</h2>
                    <p>Category: adfsdfsdf</p>
                    <DetailsButtons/>
                </div>
            </div>
            <div className={styles.detailsBody}>
                <p>asdasdaasasda</p>
            </div>
        </div>
    )
}