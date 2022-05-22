import { baseUrl } from "../constants/constants"
import { IReservation } from "../database/IReservation"

export async function getAllReservations(): Promise<IReservation[]> {
    const response = await fetch(baseUrl + "reservations")
    if (response.ok) return response.json()
    throw response
}

export async function getReservationsByUser(userId: number): Promise<IReservation[]> {
    const response = await fetch(baseUrl + "reservations")
    if (response.ok) return response.json()
    throw response
}