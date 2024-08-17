import { useState } from "react";
import { useGetAllDishes, useSearch } from "../../hooks/useDishes";

import CatalogContent from "./catalog-content/CatalogContent";
import CatalogSearch from "./catalog-search/CatalogSearch";

import styles from "./Catalog.module.css"

export default function Catalog() {
    const [isSearched, setIsSearched] = useState(false);
    const { dishes, dispatch, isFetchFailed } = useGetAllDishes([]);
    const searchDishes = useSearch();

    async function onSearch(values, action) {
        let title = values.title;
        try {
            if (title == "") {
                title = "empty";
            }
            const searchedResults = await searchDishes(title);
            setIsSearched(true);
            dispatch({ type: "onSearch", payload: searchedResults });
        } catch (err) {
            alert(err.message);
            return;
        }
    }

    return (
        <>
            <CatalogSearch onSearch={onSearch} />
            <h1 className={styles.title}>All available dishes</h1>
            <div className={styles.catalog}>
                {isFetchFailed
                    ? <h1 className={styles.message}>Failed to fetch</h1>
                    : dishes.length > 0
                        ? dishes.map(el => <CatalogContent key={el._id} id={el._id} title={el.title} price={el.price} image={el.image} />)
                        : !isSearched ? <h1 className={styles.message}>No dishes yet...</h1> : ""
                }
                {
                    isSearched && dishes.length == 0
                        ? <h1 className={styles.message}>No results</h1>
                        : ""
                }
            </div>
        </>
    )
}