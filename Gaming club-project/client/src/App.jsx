import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./components/home/Home";
import Catalog from "./components/catalog/Catalog";
import { Routes, Route } from "react-router-dom";

function App() {

    return (
        <>
            <Header/>
            <main>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/catalog" element={<Catalog />}/>
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
