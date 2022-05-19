import { IUser } from "../database/IUser"

interface lol {
    localUser: IUser | undefined
    loading: boolean
}

export const useUser = (): lol => {
    let localUser: IUser | undefined
    let loading: boolean = true
    try {
        const userAsString = localStorage.getItem("user")
        if (userAsString) {
            localUser = JSON.parse(userAsString)
            loading = false
        }
    } catch (error) {
        localUser = undefined
    }
    return { localUser, loading }
}
