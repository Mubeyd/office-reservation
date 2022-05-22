import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 } from 'uuid';
import { IOffice } from '../../database/IOffice';
import { reservationFieldsValidation } from './fieldValidations/reservationYupSchema';

export type FiledValueType = string | number | boolean | Date | undefined

interface User {
    id: string
    active: boolean
}

export interface OfficeItem {
    id: string
    active: boolean
}

export interface ReservationItem {
    id: string
    officeId: string
    userId: string
    period: number
    startFrom: Date | undefined
}

const userInitial: User = {
    id: v4(),
    active: true,
}

export interface State {
    user: User | undefined
    office: IOffice | undefined
    reservationItem: ReservationItem
    additionalInfo: boolean
}

const initialReservation: ReservationItem = {
    id:'',
    officeId: '',
    userId: '',
    period: 1,
    startFrom: new Date(),
}


const initialState: State = {
    user: undefined,
    office: undefined,
    reservationItem: initialReservation,
    additionalInfo: false
}

// First, create the thunk
export const getUpdateReservation = createAsyncThunk(
    'reservation/getUpdateReservation',
    async (reservation: ReservationItem, { dispatch /* , getState */ }) => {
        const isValid = await reservationFieldsValidation(reservation)
        if (!isValid) {
            throw new Error('!isValid :>> ')
        }
        dispatch(updateReservation({ id: v4() }))
    }
)

export const getCreateReservation = createAsyncThunk(
    'reservation/getCreateReservation',
    async (reservation: ReservationItem, { dispatch }) => {
        const isValid = await reservationFieldsValidation(reservation)
        if (!isValid) {
            throw new Error('!isValid :>> ')
        }
        dispatch(createReservation({ id: v4() }))
    }
)

const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        emptyState() {
            return initialState
        },
        toggleAdditionalInfoView(state: State, action: PayloadAction<{ type: 'hide' | 'view' }>) {
            if (action.payload.type === 'hide') {
                state.additionalInfo = false
            }
            if (action.payload.type === 'view') {
                state.additionalInfo = true
            }
        },
        updateReservationField(
            state: State,
            action: PayloadAction<{ filedName: keyof ReservationItem; val: FiledValueType }>
        ) {
            state.reservationItem = { ...state.reservationItem, [action.payload.filedName]: action.payload.val }
        },
        setCurrentOffice(state: State, action: PayloadAction<{ office: IOffice | undefined }>) {
            state.office = action.payload.office
        },
        updateReservation(state: State, action: PayloadAction<{ id: string }>) {
            return
        },
        createReservation(state: State, action: PayloadAction<{ id: string }>) {
            return
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCreateReservation.fulfilled, (state, action) => {
            console.log(state.user)
            console.log(action.meta.arg)
            console.log('fulfilled')
            state.user = undefined
            state.user = userInitial
        })
        builder.addCase(getCreateReservation.pending, (state, action) => {
            console.log(state.user)
            console.log(action.meta.arg)
            console.log('pending')
        })
        builder.addCase(getCreateReservation.rejected, (state, action) => {
            console.log(state.user)
            console.log(action.meta.arg)
            console.log(action.error.message)
            state.user = undefined
            console.log('rejected')
            throw new Error('rejected')
        })
        builder.addCase(getUpdateReservation.fulfilled, (state, action) => {
            console.log(state.user)
            console.log(action.meta.arg)
            console.log('fulfilled')
            state.user = undefined
            state.user = userInitial
        })
        builder.addCase(getUpdateReservation.pending, (state, action) => {
            console.log(state.user)
            console.log(action.meta.arg)
            console.log('pending')
        })
        builder.addCase(getUpdateReservation.rejected, (state, action) => {
            console.log(state.user)
            console.log(action.meta.arg)
            console.log(action.error.message)
            state.user = undefined
            console.log('rejected')
            throw new Error('rejected')
        })
    },
})

export const {
    emptyState,
    toggleAdditionalInfoView,
    updateReservationField,
    setCurrentOffice,
    updateReservation,
    createReservation,
} = reservationSlice.actions
export default reservationSlice.reducer
