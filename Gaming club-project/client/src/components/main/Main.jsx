import Home from "./home/Home"
import Catalog from "./catalog/Catalog"

export default function Main({
    link
}) {
    return (
        <main>
            {link == "/"
                ? <Home />
                : ""
            }
            {link == "/catalog"
                ? <Catalog />
                : ""
            }
        </main>
    )
}