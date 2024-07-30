import styles from "./Catalog.module.css"

import CatalogSearch from "./catalogSearch/CatalogSearch"
import CatalogContent from "./catalogContent/CatalogContent"

import { useState } from "react";

import { getNextGames, searching } from "../../api/gameService";

import { useGetAllGames } from "../../hooks/useGames.js";
import { useForm } from "../../hooks/useForm";
import { set } from "react-hook-form";

export default function Catalog() {
    const [searchedResults, setSearchedResults] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const [page, setPage] = useState(0);
    const { games, setGameHandler, isLoading, loadingHandler, maxPage, setMaxPageHanlder } = useGetAllGames([]);
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
            setGameHandler({ type: "search", payload: data.games });
            setSearchedResults(data.games);
            setIsSearched(true);
            setMaxPageHanlder(data.maxPage);
            setPage(0);
            loadingHandler(false);
        } catch (err) {
            alert(err.message);
            return;
        }
    }

    async function nextPage() {
        setPage(oldvalue => oldvalue + 1);
        loadingHandler(true);
        if (!isSearched) {
            const data = await getNextGames(page + 1);
            setGameHandler({ type: "getNext", payload: data.games });
        } else {
            const curResults = [...searchedResults];
            setSearchedResults(curResults);
            const games = [];
            for (let i = 0; i < maxPage; i++) {
                const curGames = [];
                for (let j = 0; j < 3; j++) {
                    const game = curResults.shift();
                    if(game==undefined){
                        break;
                    }
                    curGames.push(game);
                }
                games.push(curGames);
            }
            setGameHandler({ type: "getNext", payload: games[page + 1] });
            setSearchedResults(oldvalue => [...searchedResults]);
            console.log(searchedResults)
            console.log(games);
        }
        loadingHandler(false);
    }

    async function previousPage() {
        setPage(oldvalue => oldvalue - 1);
        loadingHandler(true);
        if (!isSearched) {
            const data = await getNextGames(page - 1);
            setGameHandler({ type: "getNext", payload: data.games });
        } else {
            const curResults = [...searchedResults];
            const games = [];
            for (let i = 0; i < maxPage; i++) {
                const curGames = [];
                for (let j = 0; j < 3; j++) {
                    const game = curResults.shift();
                    if(game==undefined){
                        break;
                    }
                    curGames.push(game);
                }
                games.push(curGames);
            }
            setGameHandler({ type: "getNext", payload: games[page - 1] });
            setSearchedResults(oldvalue => [...searchedResults]);
        }
        loadingHandler(false);
    }

    async function finalPage() {
        setPage(maxPage-1);
        loadingHandler(true);
        if (!isSearched) {
            const data = await getNextGames(maxPage-1);
            setGameHandler({ type: "getNext", payload: data.games });
        } else {
            const curResults = [...searchedResults];
            setSearchedResults(curResults);
            const games = [];
            for (let i = 0; i < maxPage; i++) {
                const curGames = [];
                for (let j = 0; j < 3; j++) {
                    const game = curResults.shift();
                    if(game==undefined){
                        break;
                    }
                    curGames.push(game);
                }
                games.push(curGames);
            }
            setGameHandler({ type: "getNext", payload: games[maxPage - 1] });
            setSearchedResults(oldvalue => [...searchedResults]);
        }
        loadingHandler(false);
    }

    async function firstPage() {
        setPage(0);
        loadingHandler(true);
        if (!isSearched) {
            const data = await getNextGames(0);
            setGameHandler({ type: "getNext", payload: data.games });
        } else {
            const curResults = [...searchedResults];
            setSearchedResults(curResults);
            const games = [];
            for (let i = 0; i < maxPage; i++) {
                const curGames = [];
                for (let j = 0; j < 3; j++) {
                    const game = curResults.shift();
                    if(game==undefined){
                        break;
                    }
                    curGames.push(game);
                }
                games.push(curGames);
            }
            setGameHandler({ type: "getNext", payload: games[0] });
            setSearchedResults(oldvalue => [...searchedResults]);
        }
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
                <button onClick={firstPage}>&lt;&lt;</button>
                <button onClick={previousPage} style={page + 1 == 1 ? { visibility: "hidden" } : { visibility: "visible" }}>&lt;</button>
                <p>{page + 1} of {maxPage}</p>
                <button onClick={nextPage} style={page + 1 == maxPage ? { visibility: "hidden" } : { visibility: "visible" }}>&gt;</button>
                <button onClick={finalPage}>&gt;&gt;</button>
            </div>
        </>
    )
}