import styles from "./Catalog.module.css"

import CatalogSearch from "./catalogSearch/CatalogSearch"
import CatalogContent from "./catalogContent/CatalogContent"

import {useState } from "react";

import { searching } from "../../api/gameService";

import { useGetAllGames } from "../../hooks/useGames.js";
import { usePagination } from "../../hooks/usePagination.js";
import CatalogPagination from "./catalogPagination/catalogPagination.jsx";

import { useSearchParams } from "react-router-dom";

export default function Catalog() {
    const [params, setParams] = useSearchParams();
    const [isSearched, setIsSearched] = useState(false);
    const [searchedResults, setSearchedResults] = useState([]);
    const { games, setGameHandler, isLoading, loadingHandler, maxPage, setMaxPageHanlder } = useGetAllGames([], params);
    const { paginationHandler, page, setPageHandler } = usePagination(isSearched, maxPage, setGameHandler, loadingHandler, searchedResults, setSearchedResults);

    async function onSearchHandler(values) {
        let name = values.name;
        const criteria = values.criteria;
        try {
            if (name == "") {
                name = " ";
            }
            loadingHandler(true);
            const data = await searching(name, criteria);
            setGameHandler({ type: "search", payload: data.games });
            setSearchedResults(data.games);
            setIsSearched(true);
            setMaxPageHanlder(data.maxPage);
            setPageHandler(0);
            params.set("name", name);
            params.set("criteria", criteria);
            setParams(params);
            loadingHandler(false);
        } catch (err) {
            alert(err.message);
            return;
        }
    }

    function nextPage() {
        paginationHandler(page + 1);
    }

    function previousPage() {
        paginationHandler(page - 1);
    }
    function finalPage() {
        paginationHandler(maxPage - 1);
    }

    function firstPage() {
        paginationHandler(0);
    }

    return (
        <>
            {isLoading ?
                <div className={styles.loading}></div>
                : ""
            }
            <h1>Search for games here</h1>
            <CatalogSearch
                onSearch={onSearchHandler}
            />
            <h1>All available games</h1>
            <div className={styles.catalogWrapper}>
                {isLoading && games.length == 0 ? <h1>Games loading...</h1> : ""}
                {!isSearched && games.length == 0 && !isLoading
                    ? <h1>No games yet :(</h1>
                    : games.map(el => <CatalogContent
                        key={el._id}
                        id={el._id}
                        name={el.name}
                        category={el.category}
                        image={el.image}
                        year={el.year}
                    />
                    )
                }
                {isSearched && games.length == 0 ? <h1>No results :(</h1> : ""}
            </div>
            {games.length != 0
                ? <CatalogPagination
                    nextPage={nextPage}
                    previousPage={previousPage}
                    finalPage={finalPage}
                    firstPage={firstPage}
                    page={page}
                    maxPage={maxPage}
                />
                : ""
            }
        </>
    )
}