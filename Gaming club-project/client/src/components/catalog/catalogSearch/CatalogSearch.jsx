import styles from "./CatalogSearch.module.css"

export default function CatalogSearch({
    onSearch,
    onChangeHandler,
    formValues
}) {
    return (
        <form onSubmit={onSearch} className={styles.search}>
            <input name="name" type="text" placeholder="Enter search value..." value={formValues.name} onChange={onChangeHandler}/>
            <select name="criteria" value={formValues.criteria} onChange={onChangeHandler}>
                <option value="name">Name</option>
                <option value="year">Year</option>
                <option value="category">Category</option>
            </select>
            <button type="submit">Search</button>
        </form>
    )
}