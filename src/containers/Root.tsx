import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { BrowserRouter } from "react-router-dom"
import theme from "../configs/theme"
import Router from "./Router"
import UserProvider from "./UserProvider"

export interface Props {}

const Root = ({}: Props) => {
    return (
        <UserProvider>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Router />
                </ThemeProvider>
            </BrowserRouter>
        </UserProvider>
    )
}

export default Root
