import { Form, Formik } from "formik";
import { useGetAllMovies, usePagination, useSearchMovies } from "../../hooks/useMovies"

import CatalogContent from "./catalog-content/CatalogContent";

import styles from "./Catalog.module.css"
import CustomInput from "../../commons/CustomInput";
import { useState } from "react";

export default function Catalog() {
    const { movies, setMovies, loading, setLoading, fetchError, setFetchError,maxPage,setMaxPage } = useGetAllMovies([]);
    const searchMovies = useSearchMovies();
    const [isSearched, setIsSearched] = useState(false);
    const [searchedResults,setSerchedResults]=useState([]);
    const {paginationHandler,page,setPage}=usePagination(isSearched,maxPage,setMovies,setLoading,searchedResults,setSerchedResults)

    async function onSearch(values: { title: string }) {
        let title = values.title;
        try {
            if (title == "") {
                title = "empty";
            }
            setLoading(true);
            const data = await searchMovies(title);
            setMovies(data.results);
            setSerchedResults(data.results);
            setMaxPage(data.maxPage)
            setIsSearched(true);
            setLoading(false);
        } catch (err) {
            setFetchError(true);
            return;
        }

    }

    return (
        <>
            {loading && !fetchError
                ? <div className={styles.loadingSpinner}></div>
                : ""
            }
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
            <section className={styles.catalogContent}>
                <h2>All available movies</h2>
                <section>
                    {movies.length > 0 && !loading
                        ? movies.map(el => <CatalogContent key={el._id} id={el._id} title={el.title} genre={el.genre} image={el.image} />)
                        : isSearched && !loading && !fetchError
                            ? <h2 className={styles.errorMessage}>No results</h2>
                            : loading && !fetchError
                                ? <h2 className={styles.errorMessage}>Movies loading...</h2>
                                : fetchError
                                    ? <h2 className={styles.errorMessage}>Movies cannot be loaded please try again later.</h2>
                                    : <h2 className={styles.errorMessage}>No movies yet</h2>
                    }
                </section>
                <div className={styles.pagination}>
                    <p>1 of {maxPage}</p>
                    <button>&lt;</button>
                    <button>&lt;&lt;</button>
                    <button>&gt;&gt;</button>
                    <button>&gt;</button>
                </div>
            </section>
        </>
    )
}