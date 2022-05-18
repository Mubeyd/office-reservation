import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import Header from "../components/Header"
import OfficesList from "../pages/OfficesList"
import Footer from "../components/Footer"

export interface Props {}

const RouterComp = ({}: Props) => {
    return (
        <div>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<h1>Welcome to Office Reservation App</h1>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/OfficesList" element={<OfficesList />} />
                    <Route path="*" element={<h1>Page Not Found 404</h1>} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default RouterComp
