import React, { useCallback, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import CircularIndeterminate from "../components/Spinner"
import { IOffice } from "../database/IOffice"
import { useUser } from "../hooks/useUser"
import useFetch from "../services/useFetch"

const OfficesList = () => {
    const { localUser, loading } = useUser()
    const navigate = useNavigate()

    const { data: offices, loading: loadingOffices, error } = useFetch<IOffice[]>("offices")

    useEffect(() => {
        if (loading) {
            navigate("/SignIn")
        }
    }, [loading, navigate])

    if (error) throw error

    const renderRow = useCallback(({ item }: { item: IOffice }) => {
        return (
            <div key={item.id}>
                <Link to={`${item.id}`}>
                    {/* <img src={`/images/${item.image}`} alt={item.name} /> */}
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                </Link>
            </div>
        )
    }, [])

    return (
        <div>
            <h2>OfficesList</h2>
            {loadingOffices ? (
                <CircularIndeterminate />
            ) : (
                <div>
                    {offices?.map((item) => renderRow({ item }))}
                </div>
            )}
        </div>
    )
}

export default React.memo(OfficesList)
