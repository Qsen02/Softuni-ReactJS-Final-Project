import { useState } from "react";
import { useGetAllDishes, useSearch } from "../../hooks/useDishes";

import CatalogContent from "./catalog-content/CatalogContent";
import CatalogSearch from "./catalog-search/CatalogSearch";

import styles from "./Catalog.module.css"

export default function Catalog() {
    const [isSearched, setIsSearched] = useState(false);
    const { dishes, dispatch, isFetchFailed, setFetchFailedHandler, isLoading, setIsLoading } = useGetAllDishes([]);
    const searchDishes = useSearch();

    async function onSearch(values) {
        let title = values.title;
        try {
            if (title == "") {
                title = "empty";
            }
            setIsLoading(true);
            const searchedResults = await searchDishes(title);
            setIsSearched(true);
            dispatch({ type: "onSearch", payload: searchedResults });
            setIsLoading(false);
        } catch (err) {
            setFetchFailedHandler(true);
            return;
        }
    }

    return (
        <>
            {isLoading && !isFetchFailed
                ? <div className={styles.loadingSpinner}></div>
                : ""
            }
            <CatalogSearch onSearch={onSearch} />
            <h1 className={styles.title}>All available dishes</h1>
            <div className={styles.catalog}>
                {isFetchFailed
                    ? <h1 className={styles.message}>Failed to fetch</h1>
                    : dishes.length > 0
                        ? dishes.map(el => <CatalogContent key={el._id} id={el._id} title={el.title} price={el.price} image={el.image} />)
                        : !isSearched && !isLoading ? <h1 className={styles.message}>No dishes yet</h1> : ""
                }
                {
                    isSearched && dishes.length == 0 && !isLoading
                        ? <h1 className={styles.message}>No results</h1>
                        : ""
                }
                {
                    isLoading && !isFetchFailed
                        ? <h1 className={styles.message}>Loading dishes...</h1>
                        : ""
                }
            </div>
            <div className={styles.pagination}>
                <i className="fa-solid fa-angles-left"></i>
                <i className="fa-solid fa-chevron-left"></i>
                <p>1 of 1</p>
                <i className="fa-solid fa-chevron-right"></i>
                <i className="fa-solid fa-angles-right"></i>
            </div>
        </>
    )
}