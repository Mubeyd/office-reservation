import CardMedia from "@mui/material/CardMedia"
import React from "react"

const LandingPage = () => {
    return (
        <div>
            <h1>Welcome to Office Reservation App</h1>
            <h2>This project has aims to serve people and organizations to rent or reserve offices for short or long term usage.</h2>
            <CardMedia component="img" height="680" src="https://images.unsplash.com/photo-1622126807280-9b5b32b28e77?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2060" alt="green iguana" />

        </div>
    )
}

export default React.memo(LandingPage)
