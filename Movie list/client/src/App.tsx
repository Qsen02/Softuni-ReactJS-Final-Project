import { Route, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"

function App() {

    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/catalog" element={<Catalog/>}/>
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
