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
import MovieDetails from "./components/movie-details/MoviesDetails"
import MovieCreate from "./components/movie-create/MovieCreate"
import Profile from "./components/profile/Profile"
import GuestComponent from "./commons/GuestGuard"
import UserGuard from "./commons/UserGuard"
import AdminGuard from "./commons/AdminGuard"
import ErrorBoundry from "./components/ErrorBoundary"

function App() {

    return (
        <>
            <UserContextProvider>
                <Header />
                <main>
                    <ErrorBoundry>
                        <Routes>
                            <Route element={<GuestComponent />}>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                            </Route>
                            <Route element={<UserGuard />}>
                                <Route path="/profile/*" element={<Profile />} />
                                <Route path="/logout" element={<Logout />} />
                            </Route>
                            <Route element={<AdminGuard />}>
                                <Route path="/create" element={<MovieCreate />} />
                            </Route>
                            <Route path="/" element={<Home />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/catalog/:movieId/*" element={<MovieDetails />} />
                            <Route path="*" element={<Status404 />} />
                        </Routes>
                    </ErrorBoundry>
                </main>
                <Footer />
            </UserContextProvider>
        </>
    )
}

export default App
