import { configureStore } from "@reduxjs/toolkit"
import reservationReducer from "./Reservation/ReservationSlice"
import { setStore } from "./storeGetter"

export const store = configureStore({
    reducer: {
        reservationReducer: reservationReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            immutableCheck: true,
            serializableCheck: false,
        }),
})

setStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
