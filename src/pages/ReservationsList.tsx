import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import React, { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CircularIndeterminate from "../components/Spinner"
import { IOffice } from "../database/IOffice"
import { IReservation } from "../database/IReservation"
import { useUser } from "../hooks/useUser"
import useFetch from "../services/useFetch"

const ReservationsList = () => {
    const { localUser, loading } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) {
            navigate("/SignIn")
        }
    }, [loading, navigate])

    const { data: reservations, loading: loadingReservations, error } = useFetch<IReservation[]>("reservations?userId" + localUser?.id)
    const { data: offices } = useFetch<IOffice[]>("offices")

    console.log("reservations", reservations)


    const getOfficeName = useCallback(
        (id: number) => {
            return offices?.find((x) => x.id === id)?.name
        },
        [offices]
    )

    if (error) throw error
    if (loadingReservations) return <CircularIndeterminate />


    return (
        <div>
            <div style={{ margin: 4 }}>Reservations List</div>
            <div style={{ margin: 4 }}>{localUser?.firstName}'s Reservations</div>

            <TableContainer style={{ margin: 0 }} component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Office Name</TableCell>
                            <TableCell align="right">Office Name</TableCell>
                            <TableCell align="right">Reservation Date</TableCell>
                            <TableCell align="right">Period</TableCell>
                            <TableCell align="right">Cost&nbsp;($)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations?.map((row) => (
                            <TableRow key={row.userId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{getOfficeName(row.officeId)}</TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                                <TableCell align="right">{row.period} &nbsp;({row.periodType})</TableCell>
                                <TableCell align="right">{row.cost}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default React.memo(ReservationsList)
