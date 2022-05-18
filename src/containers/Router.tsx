import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import Header from "../components/Header"
import OfficesList from "../pages/OfficesList"
import Footer from "../components/Footer"
import Page404 from "../pages/Page404"
import LandingPage from "../pages/LandingPage"

export interface Props {}

const RouterComp = ({}: Props) => {
    return (
        <div>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/OfficesList" element={<OfficesList />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default RouterComp
