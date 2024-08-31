import { useState } from "react";
import { useGetAllDishes, useSearch } from "../../hooks/useDishes";

import CatalogContent from "./catalog-content/CatalogContent";
import CatalogSearch from "./catalog-search/CatalogSearch";

import styles from "./Catalog.module.css"
import { usePagination } from "../../hooks/usePagination";
import { useUserContext } from "../../context/UserContext";

export default function Catalog() {
    const [isSearched, setIsSearched] = useState(false);
    const [searchedResults,setSearchedResults]=useState([]);
    const { dishes, setDishesHandler, isFetchFailed, setFetchFailedHandler, isLoading, setIsLoading, maxPage,setMaxPageHandler } = useGetAllDishes([]);
    const searchDishes = useSearch();
    const {clearUserHandler}=useUserContext();
    const {paginationHandler,page,setPageHandler}=usePagination(isSearched,maxPage,setDishesHandler,setIsLoading,searchedResults,setSearchedResults);

    async function onSearch(values) {
        let title = values.title;
        try {
            if (title == "") {
                title = "empty";
            }
            setIsLoading(true);
            const results = await searchDishes(title);
            setIsSearched(true);
            setSearchedResults(results.dishes);
            setPageHandler(0);
            setMaxPageHandler(results.maxPage);
            setDishesHandler({ type: "onSearch", payload: results.dishes });
            setIsLoading(false);
        } catch (err) {
            if (err.message == "You don't have credentials, please login or register!") {
                clearUserHandler();
                return;
            }
            setFetchFailedHandler(true);
            return;
        }
    }

    function nextPage() {
        paginationHandler(page+1);
    }

    function previousPage() {
        paginationHandler(page-1);
    }

    function lastPage() {
        paginationHandler(maxPage-1);
    }

    function firstPage() {
        paginationHandler(0);
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
                    : dishes.length > 0 && !isLoading
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
            {dishes.length && !isLoading > 0
                ? <div className={styles.pagination}>
                    <i onClick={firstPage} className="fa-solid fa-angles-left"></i>
                    <i onClick={previousPage} className={`fa-solid fa-chevron-left ${page + 1 == 1 || maxPage==1 ? styles.invisible : ""}`}></i>
                    <p>{page + 1} of {maxPage}</p>
                    <i onClick={nextPage} className={`fa-solid fa-chevron-right ${page + 1 == maxPage || maxPage==1?styles.invisible:""}`}></i>
                    <i onClick={lastPage} className="fa-solid fa-angles-right"></i>
                </div>
                : ""
            }
        </>
    )
}