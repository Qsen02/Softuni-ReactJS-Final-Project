import { Route, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"
import UserContextProvider from "./context/userContext"

function App() {

    return (
        <>
            <UserContextProvider>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog />} />
                    </Routes>
                </main>
                <Footer />
            </UserContextProvider>
        </>
    )
}

export default App
