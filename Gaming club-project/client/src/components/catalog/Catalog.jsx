import styles from "./Catalog.module.css"
import CatalogSearch from "./catalogSearch/CatalogSearch"
import CatalogContent from "./catalogContent/CatalogContent"
import { useEffect, useState } from "react";
import { getImage } from "../../api/imageService";
import { getAllGames, searching } from "../../api/gameService";

export default function Catalog() {
    let [games, setGames] = useState([]);
    let [isSearched, setIsSearched] = useState(false);
    let [formValues, setFormValues] = useState({
        name: "",
        criteria: "name"
    })
    useEffect(() => {
        (async function getGames() {
                let data = await getAllGames();
                for (let el of data) {
                    let imgName = await getImage(el.image);
                    el.image = imgName;
                }
                setGames(data);
        })()
    }, [])

    function onChangeHandler(event) {
        setFormValues(oldValues => ({ ...oldValues, [event.target.name]: event.target.value }));
    }

    async function onSearchHandler(event) {
        event.preventDefault();
        try {
            if(!formValues.name){
                throw new Error("Please fill the search field");
            }
            let data = await searching(formValues.name,formValues.criteria);
            for (let el of data) {
                let imgName = await getImage(el.image);
                el.image = imgName;
            }
            setGames(data);
            event.target.reset();
            setIsSearched(true);
        } catch (err) {
            alert(err.message);
            return;
        }
    }

    return (
        <>
            <h1>Search for games here</h1>
            <CatalogSearch
                onSearch={onSearchHandler}
                formValues={formValues}
                onChangeHandler={onChangeHandler}
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