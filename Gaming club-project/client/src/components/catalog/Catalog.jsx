import styles from "./Catalog.module.css"

import CatalogSearch from "./catalogSearch/CatalogSearch"
import CatalogContent from "./catalogContent/CatalogContent"

import { useState } from "react";

import { getNextGames, searching } from "../../api/gameService";

import { useGetAllGames } from "../../hooks/useGames.js";
import { useForm } from "../../hooks/useForm";

export default function Catalog() {
    const [isSearched, setIsSearched] = useState(false);
    const [page, setPage] = useState(0);
    const { games, setGameHandler, isLoading, loadingHandler, maxPage } = useGetAllGames([]);
    const initalvalues = {
        name: "",
        criteria: "name"
    };
    const { formValues, changeHandler, submitHandler } = useForm(initalvalues, onSearchHandler);

    async function onSearchHandler() {
        let name = formValues.name;
        const criteria = formValues.criteria;
        try {
            if (name == "") {
                name = " ";
            }
            loadingHandler(true);
            const data = await searching(name, criteria);
            setGameHandler({ type: "search", payload: data });
            setIsSearched(true);
            loadingHandler(false);
        } catch (err) {
            alert(err.message);
            return;
        }
    }

    async function nextPage() {
        loadingHandler(true);
        const data = await getNextGames(page+1);
        setGameHandler({ type: "getNext", payload: data.games });
        setPage(oldvalue => oldvalue + 1);
        loadingHandler(false);
    }

    async function previousPage(){
        loadingHandler(true);
        const data = await getNextGames(page-1);
        setGameHandler({ type: "getNext", payload: data.games });
        setPage(oldvalue => oldvalue - 1);
        loadingHandler(false);
    }

    return (
        <>
            {isLoading ?
                <div className={styles.loading}></div>
                : ""
            }
            <h1>Search for games here</h1>
            <CatalogSearch
                onSearch={submitHandler}
                formValues={formValues}
                onChangeHandler={changeHandler}
            />
            <h1>All available games</h1>
            <div className={styles.catalogWrapper}>
                {!isSearched && games.length == 0
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
            <div className={styles.paginationButtons}>
                <button>&lt;&lt;</button>
                <button onClick={previousPage} style={page+1 == 1 ? { visibility: "hidden" } : { visibility: "visible" }}>&lt;</button>
                <p>{page+1} of {maxPage}</p>
                <button onClick={nextPage} style={page+1 == maxPage ? { visibility: "hidden" } : { visibility: "visible" }}>&gt;</button>
                <button>&gt;&gt;</button>
            </div>
        </>
    )
}