// import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login"

export interface Props {}

const RouterComp = ({}: Props) => {
    return (
        <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default RouterComp
