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
import React, { useCallback, useEffect, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useToggle from "react-use/lib/useToggle"
import AlertDialog from "../components/AlertDialog/AlertDialog"
import CircularIndeterminate from "../components/Spinner"
import { IOffice } from "../database/IOffice"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { useUser } from "../hooks/useUser"
import useFetch from "../services/useFetch"
import { reservationItemValidation } from "../state/Reservation/fieldValidations/reservationYupSchema"
import { FiledValueType, getCreateReservation, setSaveLoading, updateReservationField } from "../state/Reservation/ReservationSlice"

const OfficeDetails = () => {
    const { loading } = useUser()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { id } = useParams()

    const { data: office, loading: loadingOffice, error } = useFetch<IOffice>(`offices/${id}`)

    const reservationItem = useAppSelector((state) => state.reservationReducer.reservationItem)
    const loadingSavingReservation = useAppSelector((state) => state.reservationReducer.loading)

    const [dialogOpen, toggleDialogOpen] = useToggle(false)
    const [confirmCheckBox, toggleConfirmCheckBox] = useToggle(false)
    console.log("confirmCheckBox", confirmCheckBox)
    console.log("confirmCheckBox", reservationItem.id)

    useEffect(() => {
        if (loading) {
            navigate("/SignIn")
        }
    }, [loading, navigate])

    const updateField = useCallback(({ val, filedName }: { val: FiledValueType; filedName: keyof typeof reservationItem }) => dispatch(updateReservationField({ filedName: filedName, val: val })), [dispatch])

    const onChangePeriod = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault()
            const valueAsNumber = Number(event.target.value)
            updateField({ val: valueAsNumber, filedName: "period" })
        },
        [updateField]
    )

    const onChangeDate = useCallback(
        (newValue: Date | null) => {
            if (newValue) {
                updateField({ val: newValue, filedName: "startFrom" })
            }
        },
        [updateField]
    )

    const goToReservationsList = useCallback(() => {
        toggleDialogOpen()
        navigate("/ReservationsList")
    }, [navigate, toggleDialogOpen])

    const newReservation = useCallback(() => {
        toggleDialogOpen()
        navigate("/OfficesList")
    }, [navigate, toggleDialogOpen])

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()

            dispatch(setSaveLoading({ loading: true }))

            try {
                await dispatch(getCreateReservation(reservationItem))
                toggleDialogOpen()
            } catch (e) {
                console.error(e)
            }
        },
        [dispatch, reservationItem, toggleDialogOpen]
    )

    const isValidSync = useMemo(() => reservationItemValidation(reservationItem), [reservationItem])

    // const minDate = moment(new Date()).toDate();

    if (error) throw error
    if (loadingOffice) return <CircularIndeterminate />
    if (loadingSavingReservation) return <CircularIndeterminate />

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
                            <DesktopDatePicker
                                /* minDate={minDate} */ label="Start from"
                                inputFormat="MM/DD/YYYY"
                                value={reservationItem.startFrom}
                                onChange={onChangeDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                disabled={!isValidSync}
                                control={<Checkbox value={confirmCheckBox} onChange={toggleConfirmCheckBox} color="primary" />}
                                label="I confirm for reserving this office and it is under my responsibility ."
                            />
                        </Grid>
                    </Grid>
                    <Button disabled={!isValidSync || !confirmCheckBox} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Submit Reserve
                    </Button>

                    <AlertDialog dialogOpen={dialogOpen} toggleDialogOpen={toggleDialogOpen} goToReservationsList={goToReservationsList} newReservation={newReservation} />
                </Box>
            </Box>
        </Container>
    )
}

export default React.memo(OfficeDetails)
