import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../hooks/useUser"

const OfficesList = () => {
    const { localUser, loading } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) {
            navigate("/SignIn")
        }
    }, [loading, navigate])

    return (
        <div>
            <div>OfficesList</div>
            <div>{localUser?.firstName}</div>
        </div>
    )
}

export default React.memo(OfficesList)
