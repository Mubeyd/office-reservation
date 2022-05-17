import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { BrowserRouter } from "react-router-dom"
import theme from "../configs/theme"
import Router from "./Router"

export interface Props {}

const Root = ({}: Props) => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router />
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default Root
