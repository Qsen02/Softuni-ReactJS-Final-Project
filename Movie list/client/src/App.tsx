import { Route, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"
import UserContextProvider from "./context/userContext"
import Login from "./components/login/Login"
import Logout from "./components/logout/Logout"
import Register from "./components/register/Register"
import Status404 from "./components/status404/Status404"

function App() {

    return (
        <>
            <UserContextProvider>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="*" element={<Status404/>}/>
                    </Routes>
                </main>
                <Footer />
            </UserContextProvider>
        </>
    )
}

export default App
