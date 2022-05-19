import { baseUrl } from "../constants/constants"

export async function getUser(id: number) {
    const response = await fetch(baseUrl + "users/" + id)
    if (response.ok) return response.json()
    throw response
}
