import { Route, Routes } from "react-router-dom"

import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import UserContext from "./context/UserContext"
import Login from "./components/login/login"
import Register from "./components/register/Register"
import Logout from "./components/logout/Lougout"
import Catalog from "./components/catalog/Catalog"
import CreateForm from "./components/createForm/CreateForm"
import Cart from "./components/cart/Cart"
import Status404 from "./components/status404/Status404"
import Profile from "./components/profile/Profile"
import OrderDetails from "./components/orderDetails/OrderDetails"
import UserGuard from "./common/UserGuard"
import GuestGuard from "./common/GuestGuard"
import DishDetails from "./components/details/DishDetails"
import AdminGuard from "./common/AdminGuard"
import ErrorBoundary from "./components/ErrorBoundary"

function App() {

    return (
        <UserContext>
            <Header />
            <main>
                <ErrorBoundary>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog/:dishId/*" element={< DishDetails />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route element={<UserGuard />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>
                        <Route element={<GuestGuard />}>
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/profile/order/:orderId" element={<OrderDetails />} />
                        </Route>
                        <Route element={<AdminGuard />}>
                            <Route path="/create" element={<CreateForm />} />
                        </Route>
                        <Route path="*" element={<Status404 />} />
                    </Routes>
                </ErrorBoundary>
            </main>
            <Footer />
        </UserContext>
    )
}

export default App
