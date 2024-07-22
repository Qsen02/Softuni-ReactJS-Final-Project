import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./components/home/Home";
import Catalog from "./components/catalog/Catalog";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserData, removeUserData } from "./utils/userDataHelper";
import Register from "./components/register/Register";
import Status404 from "./components/status404/Status404";
import Logout from "./components/logout/Lougout";
import Login from "./components/login/Login";
import Create from "./components/games-create/GamesCreate";
import GameDetails from "./components/games-details/GameDetails";
import { UserContext } from "./context/userContext";

function App() {
    const [isUser, setIsUser] = useState(null);
    const user = getUserData();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setIsUser(user);
        } else {
            setIsUser(null);
        }
    }, [])

    function setUserHandler(user) {
        setIsUser(user);
    }

    function clearUserHandler() {
        removeUserData();
        setIsUser(null);
        navigate("/login");
    }

    return (
        <>
            <UserContext.Provider value={{user:isUser,setUserHandler,clearUserHandler }}>
                <Header/>
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/catalog/:gameId/*" element={<GameDetails />} />
                        <Route path="*" element={<Status404 />} />
                    </Routes>
                </main>
                <Footer />
            </UserContext.Provider>
        </>
    )
}

export default App
