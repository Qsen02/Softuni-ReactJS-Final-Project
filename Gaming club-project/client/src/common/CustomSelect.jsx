import { useField } from "formik"

export default function CustomSelect({...props }) {
    const [field,meta]=useField(props)
    return (
        <select {...field} {...props}>
            <option value="name">Name</option>
            <option value="year">Year</option>
            <option value="category">Category</option>
        </select>
    )
}