import { Form, Formik } from "formik";

import CustomInput from "../../../common/CustomInput";

import styles from "./CatalogSearch.module.css";

export default function CatalogSearch() {
    return (
        <>
            <Formik initialValues={{ title: "" }}>
                {
                    (props) => (
                        <Form className={styles.searchForm}>
                            <h1>Search for dishes here</h1>
                            <CustomInput type="text" name="title" placeholder="Enter dish title..." />
                            <button type="submit">Search</button>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}