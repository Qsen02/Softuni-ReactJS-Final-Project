import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./components/home/Home";
import Catalog from "./components/catalog/Catalog";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserData } from "./utils/userDataHelper";
import Register from "./components/register/Register";

function App() {
    let [isUser, setIsUser] = useState(null);
    let user = getUserData();

    useEffect(() => {
        if (user) {
            setIsUser(user);
        } else {
            setIsUser(null);
        }
    }, [])

    function setUserHandler(user){
        setIsUser(user);
    }

    return (
        <>
            <Header isUser={isUser} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/register" element={<Register setUser={setUserHandler}/>} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
