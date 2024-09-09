import { Form, Formik } from "formik";
import { useGetAllMovies, useSearchMovies } from "../../hooks/useMovies"

import CatalogContent from "./catalog-content/CatalogContent";

import styles from "./Catalog.module.css"
import CustomInput from "../../commons/customInput";
import { useState } from "react";

export default function Catalog() {
    const { movies, setMovies } = useGetAllMovies([]);
    const searchMovies = useSearchMovies();
    const [isSearched, setIsSearched] = useState(false);

    async function onSearch(values: { title: string }) {
        let title = values.title;
        try {
            if(title==""){
                title="empty";
            }
            const results = await searchMovies(title);
            setMovies(results);
            setIsSearched(true);
        } catch (err) {
            alert((err as { message: string }).message);
            return;
        }

    }

    return (
        <>
            <Formik initialValues={{ title: "" }} onSubmit={onSearch}>
                {
                    (props) => (
                        <Form className={styles.catalogForm}>
                            <CustomInput type="text" name="title" placeholder="Search for movies..." />
                            <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                        </Form>
                    )
                }
            </Formik>
            <div className={styles.catalogContent}>
                <h2>All available movies</h2>
                <div>
                    {movies.length > 0
                        ? movies.map(el => <CatalogContent key={el._id} id={el._id} title={el.title} genre={el.genre} image={el.image} />)
                        : isSearched
                            ? <h2>No results</h2>
                            : <h2>No movies yet</h2>
                    }
                </div>
            </div>
        </>
    )
}