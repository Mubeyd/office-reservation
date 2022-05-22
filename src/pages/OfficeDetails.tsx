import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CardMedia from "@mui/material/CardMedia"
import Checkbox from "@mui/material/Checkbox"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import FormControlLabel from "@mui/material/FormControlLabel"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import React, { useCallback, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import CircularIndeterminate from "../components/Spinner"
import { IOffice } from "../database/IOffice"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { useUser } from "../hooks/useUser"
import useFetch from "../services/useFetch"
import { FiledValueType, updateReservationField } from "../state/Reservation/ReservationSlice"

const OfficeDetails = () => {
    const { loading } = useUser()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { id } = useParams()

    const { data: office, loading: loadingOffices, error } = useFetch<IOffice>(`offices/${id}`)

    const reservationItem = useAppSelector((state) => state.reservationReducer.reservationItem)

    console.log("reservationItem?.period", reservationItem?.startFrom)

    useEffect(() => {
        if (loading) {
            navigate("/SignIn")
        }
    }, [loading, navigate])

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }, [])

    const updateField = useCallback(({ val, filedName }: { val: FiledValueType; filedName: keyof typeof reservationItem }) => dispatch(updateReservationField({ filedName: filedName, val: val })), [dispatch])

    const onChangePeriod = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault()
            const valueAsNumber = Number(event.target.value)
            updateField({ val: valueAsNumber, filedName: "period" })
        },
        [updateField]
    )


    const onChangeDate = (newValue: Date | null) => {
        if(newValue) {
            updateField({ val: newValue, filedName: "startFrom" })
        }
    }

    if (error) throw error
    if (loadingOffices) return <CircularIndeterminate />

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="header" variant="h5" style={{ margin: 4 }}>
                    Office Details
                </Typography>
                <Typography component="h1" variant="h6">
                    Reserve now
                </Typography>
                <Typography component="h1" variant="h6">
                    {office?.name}
                </Typography>

                <CardMedia component="img" height="140" src={office?.imageUrl} alt="green iguana" />

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                value={reservationItem.period}
                                onChange={onChangePeriod}
                                error={reservationItem.period > 24}
                                helperText="less than 24"
                                // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                type="number"
                                required
                                fullWidth
                                id="period"
                                label="Period"
                                name="period"
                            />
                        </Grid>
                        <Grid item xs={12} margin={2}>
                            <DesktopDatePicker label="Start from" inputFormat="MM/DD/YYYY" value={reservationItem.startFrom} onChange={onChangeDate} renderInput={(params) => <TextField {...params} />} />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="I confirm for reserving this office and it is under my responsibility ." />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Submit Reserve
                    </Button>
                    {/* <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid> */}
                </Box>
            </Box>
        </Container>
    )
}

export default React.memo(OfficeDetails)
