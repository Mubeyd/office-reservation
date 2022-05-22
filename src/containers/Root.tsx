import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { Provider as ReduxProvider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import theme from "../configs/theme"
import { store } from "../state/store"
import ErrorBoundary from "./ErrorBoundary"
import Router from "./Router"
import UserProvider from "./UserProvider"

export interface Props {}

const Root = ({}: Props) => {
    return (
        <ErrorBoundary>
            <ReduxProvider store={store}>
                <UserProvider>
                    <BrowserRouter>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <Router />
                        </ThemeProvider>
                    </BrowserRouter>
                </UserProvider>
            </ReduxProvider>
        </ErrorBoundary>
    )
}

export default Root
