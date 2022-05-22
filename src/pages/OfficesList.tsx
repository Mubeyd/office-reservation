import React, { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import OfficeCard from "../components/OfficeCard/OfficeCard"
import CircularIndeterminate from "../components/Spinner"
import { IOffice } from "../database/IOffice"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useUser } from "../hooks/useUser"
import { getAllReservations } from "../services/reservationService"
import useFetch from "../services/useFetch"
import { setCurrentOffice, updateReservationField } from "../state/Reservation/ReservationSlice"

const OfficesList = () => {
    const { loading } = useUser()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { data: offices, loading: loadingOffices, error } = useFetch<IOffice[]>("offices")

    useEffect(() => {
        if (loading) {
            navigate("/SignIn")
        }
    }, [loading, navigate])

    if (error) throw error

    const onClick = useCallback(
        async (item: IOffice) => {
            dispatch(setCurrentOffice({ currentOffice: item }))

            const allData = await getAllReservations()
            dispatch(updateReservationField({ filedName: "id", val: allData.length + 1 }))
        },
        [dispatch]
    )

    const renderRow = useCallback(
        ({ item }: { item: IOffice }) => {
            return <OfficeCard key={item.id} item={item} onClick={onClick} />
        },
        [onClick]
    )

    return (
        <div>
            <h2>OfficesList</h2>
            {loadingOffices ? <CircularIndeterminate /> : <div>{offices?.map((item) => renderRow({ item }))}</div>}
        </div>
    )
}

export default React.memo(OfficesList)
