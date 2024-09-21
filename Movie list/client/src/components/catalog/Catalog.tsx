import { Form, Formik } from "formik";
import { useState } from "react";

import { useGetAllMovies, usePagination, useSearchMovies } from "../../hooks/useMovies";
import CatalogContent from "./catalog-content/CatalogContent";
import CustomInput from "../../commons/CustomInput";

import styles from "./Catalog.module.css";

export default function Catalog() {
    const searchMovies = useSearchMovies();
    const [isSearched, setIsSearched] = useState(false);
    const [searchedResults, setSerchedResults] = useState<{}[]>([]);
    const { movies, setMovies, loading, setLoading, fetchError, setFetchError, maxPage, setMaxPage } = useGetAllMovies([]);
    const { paginationHandler, page, setPage } = usePagination(isSearched, maxPage, setMovies, setLoading, searchedResults, setSerchedResults)

    async function onSearch(values: { title: string }) {
        let title = values.title;
        try {
            if (title == "") {
                title = "empty";
            }
            setLoading(true);
            const data = await searchMovies(title);
            setMovies({ type: "search", payload: data.results });
            setSerchedResults(data.results);
            setIsSearched(true);
            setMaxPage(data.maxPage);
            setPage(0);
            setLoading(false);
        } catch (err) {
            setFetchError(true);
            return;
        }

    }

    function nextPage() {
        paginationHandler(page + 1);
    }

    function previousPage() {
        paginationHandler(page - 1);
    }

    function firstPage() {
        paginationHandler(0);
    }
    function lastPage() {
        paginationHandler(maxPage - 1);
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
                {movies.length > 0
                    ? <div className={styles.pagination}>
                        <p>{page + 1} of {maxPage}</p>
                        <button onClick={firstPage}>&lt;&lt;</button>
                        <button onClick={previousPage} className={page + 1 == 1 ? styles.invisible : ""}>&lt;</button>
                        <button onClick={nextPage} className={page + 1 == maxPage ? styles.invisible : ""}>&gt;</button>
                        <button onClick={lastPage}>&gt;&gt;</button>
                    </div>
                    : ""
                }
            </section>
        </>
    )
}