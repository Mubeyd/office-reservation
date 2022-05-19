import { baseUrl } from "../constants/constants"
import { OfficeType } from "../database/IOffice"

export async function getOfficesByType({ officeType }: { officeType: OfficeType }) {
    const response = await fetch(baseUrl + "products?officeType=" + officeType)
    if (response.ok) return response.json()
    throw response
}

export async function getOffices({ officeType }: { officeType: OfficeType }) {
    const response = await fetch(baseUrl + "products?officeType=" + officeType)
    if (response.ok) return response.json()
    throw response
}
