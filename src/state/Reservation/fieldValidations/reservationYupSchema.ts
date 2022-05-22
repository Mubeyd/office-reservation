import * as yup from 'yup'
import { ReservationItem } from '../ReservationSlice'

export const reservationYupSchema = yup.object().shape({
    id: yup.string().min(32).required(),
    officeId: yup.string().min(32).required(),
    userId: yup.string().min(32).required(),
})

// check validity

export const reservationItemValidation = (reservationItem: ReservationItem) =>
    reservationYupSchema.isValidSync({ ...reservationItem })

export const reservationFieldsValidation = (reservationItem: ReservationItem) =>
    reservationYupSchema
        .isValid({
            ...reservationItem,
        })
        .then(function (valid) {
            return valid // => true
        })

// you can try and type cast objects to the defined schema
export const reservationFieldsCasting = (reservationItem: ReservationItem) =>
    reservationYupSchema.cast({
        ...reservationItem,
    })
