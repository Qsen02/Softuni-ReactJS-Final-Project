import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./components/home/Home";
import Catalog from "./components/catalog/Catalog";
import Register from "./components/register/Register";
import Status404 from "./components/status404/Status404";
import Logout from "./components/logout/Logout";
import Login from "./components/login/Login";
import Create from "./components/games-create/GamesCreate";
import GameDetails from "./components/games-details/GameDetails";
import UserContextProvider from "./context/userContext";
import Profile from "./components/profile/Profile";

import { Routes, Route } from "react-router-dom";
import GusetGard from "./common/GuestGard";

function App() {

    return (
        <>
            <UserContextProvider>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/catalog/:gameId/*" element={<GameDetails />} />
                        <Route element={<GusetGard />}>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/create" element={<Create />} />
                            <Route path="/logout" element={<Logout />} />
                        </Route>
                        <Route path="*" element={<Status404 />} />
                    </Routes>
                </main>
                <Footer />
            </UserContextProvider>
        </>
    )
}

export default App
