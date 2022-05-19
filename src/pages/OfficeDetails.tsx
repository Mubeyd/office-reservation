import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import CircularIndeterminate from "../components/Spinner"
import { IOffice } from "../database/IOffice"
import { useUser } from "../hooks/useUser"
import useFetch from "../services/useFetch"

const OfficeDetails = () => {
    const { loading } = useUser()
    const navigate = useNavigate()
    const { id } = useParams()

    const { data: office, loading: loadingOffices, error } = useFetch<IOffice>(`offices/${id}`)

    useEffect(() => {
        if (loading) {
            navigate("/SignIn")
        }
    }, [loading, navigate])

    if (error) throw error

    return (
        <div>
            <div>OfficeDetails</div>
            {loadingOffices ? (
                <CircularIndeterminate />
            ) : (
                <div>
                    {office?.name}
                </div>
            )}
        </div>
    )
}

export default React.memo(OfficeDetails)
