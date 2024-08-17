import { useGetAllDishes } from "../../hooks/useDishes";

import CatalogContent from "./catalog-content/CatalogContent";
import CatalogSearch from "./catalog-search/CatalogSearch";

import styles from "./Catalog.module.css"

export default function Catalog() {
    const { dishes, setDishesHandler, isFetchFailed } = useGetAllDishes([]);

    return (
        <>
            <CatalogSearch />
            <h1 className={styles.title}>All available dishes</h1>
            <div className={styles.catalog}>
                {isFetchFailed
                    ? <h1 className={styles.message}>Failed to fetch</h1>
                    : dishes.length > 0
                        ? dishes.map(el => <CatalogContent key={el._id} id={el._id} title={el.title} price={el.price} image={el.image} />)
                        : <h1 className={styles.message}>No dishes yet...</h1>
                }
            </div>
        </>
    )
}