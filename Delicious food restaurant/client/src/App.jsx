import { Route, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import UserContext from "./context/UserContext"
import Login from "./components/login/login"

function App() {

    return (
        <UserContext>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
            <Footer />
        </UserContext>
    )
}

export default App
