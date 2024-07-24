import styles from "./Catalog.module.css"

import CatalogSearch from "./catalogSearch/CatalogSearch"
import CatalogContent from "./catalogContent/CatalogContent"

import { useState } from "react";

import { searching } from "../../api/gameService";

import { useGames } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";

export default function Catalog() {
    const [isSearched, setIsSearched] = useState(false);
    const { games, setGamesHanlder,isLoading,loadingHandler } = useGames([]);
    const initalvalues = {
        name: "",
        criteria: "name"
    };
    const { formValues, changeHandler, submitHandler } = useForm(initalvalues, onSearchHandler);

    async function onSearchHandler() {
        let name = formValues.name;
        let criteria = formValues.criteria;
        try {
            if (name == "") {
                name = " ";
            }
            loadingHandler(true);
            let data = await searching(name, criteria);
            setGamesHanlder(data);
            setIsSearched(true);
            loadingHandler(false);
        } catch (err) {
            alert(err.message);
            return;
        }
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
        </>
    )
}