import * as yup from 'yup'
import { Reservation } from '../ReservationSlice'

export const reservationYupSchema = yup.object().shape({
    id: yup.string().min(32).required(),
    officeId: yup.string().min(32).required(),
    userId: yup.string().min(32).required(),
})

// check validity

export const reservationItemValidation = (reservationItem: Reservation) =>
    reservationYupSchema.isValidSync({ ...reservationItem })

export const reservationFieldsValidation = (reservationItem: Reservation) =>
    reservationYupSchema
        .isValid({
            ...reservationItem,
        })
        .then(function (valid) {
            return valid // => true
        })

// you can try and type cast objects to the defined schema
export const reservationFieldsCasting = (reservationItem: Reservation) =>
    reservationYupSchema.cast({
        ...reservationItem,
    })
