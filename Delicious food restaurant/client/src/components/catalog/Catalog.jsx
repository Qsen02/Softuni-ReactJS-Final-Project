import { useGetAllDishes } from "../../hooks/useDishes";
import CatalogSearch from "./catalog-search/CatalogSearch";

export default function Catalog() {
    const {dishes,setDishesHandler,isFetchFailed}=useGetAllDishes([]);

    return (
        <>
            <CatalogSearch />
        </>
    )
}