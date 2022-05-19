import AdbIcon from "@mui/icons-material/Adb"
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Toolbar from "@mui/material/Toolbar"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import * as React from "react"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../hooks/useUser"

const ResponsiveAppBar = () => {
    const navigate = useNavigate()

    const { localUser: user } = useUser()

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

    const handleOpenNavMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }, [])
    const handleOpenUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }, [])

    const handleCloseNavMenu = useCallback(() => {
        setAnchorElNav(null)
    }, [])

    const handleCloseUserMenu = useCallback(() => {
        setAnchorElUser(null)
    }, [])

    const onClickProfile = useCallback(() => {
        setAnchorElUser(null)
    }, [])

    const onClickLogout = useCallback(() => {
        localStorage.removeItem("user")
        navigate("/")

        setAnchorElUser(null)
    }, [navigate])

    const onClickLogin = useCallback(async () => {
        navigate("/SignIn")

        setAnchorElUser(null)
    }, [navigate])

    const onNavigateToOfficesList = useCallback(() => {
        navigate("/OfficesList")
    }, [navigate])

    const onNavigateToReservationsList = useCallback(() => {
        navigate("/ReservationsList")
    }, [navigate])

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <MeetingRoomIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        TempOffice
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            <MenuItem onClick={onNavigateToOfficesList}>
                                <Typography textAlign="center">Offices</Typography>
                            </MenuItem>

                            <MenuItem onClick={onNavigateToReservationsList}>
                                <Typography textAlign="center">Reservations</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Button onClick={onNavigateToOfficesList} sx={{ my: 2, color: "white", display: "block" }}>
                            Offices
                        </Button>

                        <Button onClick={onNavigateToReservationsList} sx={{ my: 2, color: "white", display: "block" }}>
                            Reservations
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {user && (
                                <MenuItem onClick={onClickProfile}>
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem>
                            )}

                            {user && (
                                <MenuItem onClick={onClickLogout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            )}

                            {!user && (
                                <MenuItem onClick={onClickLogin}>
                                    <Typography textAlign="center">Login</Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default React.memo(ResponsiveAppBar)
