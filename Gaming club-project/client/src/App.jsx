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
import GameDelete from "./components/game-delete/GameDelete";
import GameEdit from "./components/game-edit/GameEdit";

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
            <Header isUser={isUser} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/register" element={<Register setUser={setUserHandler} />} />
                    <Route path="/logout" element={<Logout clearUser={clearUserHandler} />} />
                    <Route path="/login" element={<Login setUser={setUserHandler} />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/catalog/:gameId" element={<GameDetails />} >
                        <Route path="/catalog/:gameId/delete" element={<GameDelete />} />
                    </Route>
                    <Route path="/catalog/:gameId/edit" element={<GameEdit/>} />
                    <Route path="*" element={<Status404 />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
