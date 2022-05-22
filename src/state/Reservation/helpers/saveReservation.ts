import { baseUrl } from "../../../constants/constants";
import { ReservationItem } from "../ReservationSlice";

export async function saveReservation(reservation: ReservationItem) {
    return fetch(baseUrl + "reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    });
  }