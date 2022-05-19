import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import CircularIndeterminate from "../components/Spinner"
import LandingPage from "../pages/LandingPage"
import OfficesList from "../pages/OfficesList"
import Page404 from "../pages/Page404"
import ReservationsList from "../pages/ReservationsList"
import SignIn from "../pages/SignIn"
import SignUpPage from "../pages/SignUpPage"

export interface Props {}

const RouterComp = ({}: Props) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }, [])

    if (isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularIndeterminate />
            </div>
        )
    }

    return (
        <div>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/LandingPage" element={<LandingPage />} />
                    <Route path="/SignUpPage" element={<SignUpPage />} />
                    <Route path="/SignIn" element={<SignIn />} />
                    <Route path="*" element={<Page404 />} />

                    <Route path="/OfficesList" element={<OfficesList />} />
                    <Route path="/ReservationsList" element={<ReservationsList />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default RouterComp
