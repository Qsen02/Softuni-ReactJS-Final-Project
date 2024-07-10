import Home from "./home/Home"
import Catalog from "./catalog/Catalog"
import { useEffect, useState } from "react"

export default function Main({
    link
}) {
    let [links, setLinks] = useState("/");

    useEffect(() => {
        setLinks(link);
    }, [])

    return (
        <main>
            {links == "/"
                ? <Home />
                : ""
            }
            {links=="/catalog"
               ?<Catalog />
               :""
            }
        </main>
    )
}