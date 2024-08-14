import { Form, Formik } from "formik"
import { useEffect } from "react"

import styles from "./CatalogSearch.module.css"
import CustomInput from "../../../common/CustomInput"
import CustomSelect from "../../../common/CustomSelect"

export default function CatalogSearch({
    onSearch,
}) {

    return (
        <Formik initialValues={{ name: "", criteria: "name" }} onSubmit={onSearch}>
            {
                (props) => (
                <Form className={styles.search}>
                        <CustomInput name="name" type="text" placeholder="Enter search value..." />
                        <CustomSelect name="criteria">
                            <option value="name">Name</option>
                            <option value="year">Year</option>
                            <option value="category">Category</option>
                        </CustomSelect>
                        <button type="submit">Search</button>
                    </Form>
                    )
                }
        </Formik>
    )
}