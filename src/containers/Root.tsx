import { BrowserRouter } from "react-router-dom"
import Router from "./Router"

export interface Props {}

const Root = ({}: Props) => {
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    )
}

export default Root
