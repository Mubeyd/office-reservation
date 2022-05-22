import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import * as React from "react"

interface Props {
    dialogOpen: boolean
    toggleDialogOpen: (nextValue?: any) => void
    newReservation: () => void
    goToReservationsList: () => void
}

export default function AlertDialog(props: Props) {
    const { dialogOpen, toggleDialogOpen, goToReservationsList, newReservation } = props

    return (
        <div>
            <Dialog open={dialogOpen} onClose={toggleDialogOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Successfully Reserved"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={newReservation}>New Reserve</Button>
                    <Button onClick={goToReservationsList} autoFocus>
                        Go to reservations list
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
