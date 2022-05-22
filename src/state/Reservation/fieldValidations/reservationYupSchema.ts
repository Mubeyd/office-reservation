import * as yup from 'yup'
import { ReservationItem } from '../ReservationSlice'

export const reservationYupSchema = yup.object().shape({
    id: yup.number().min(1).required(),
    officeId: yup.number().min(1).required(),
    userId: yup.number().min(1).required(),
    period: yup.number().min(1).max(24).required(),
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
