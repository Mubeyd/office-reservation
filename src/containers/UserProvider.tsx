import React, { createContext, useContext, useEffect } from "react"
import { IUser } from "../database/IUser"
import { useUser } from "../hooks/useUser"

interface UserContextType {
    loading: boolean
    currentUser: IUser | undefined | void
}

export const UserContext = createContext<UserContextType>({
    loading: true,
    currentUser: undefined,
})


interface Props {
    children: React.ReactChild
}

export const useUserContext = () => useContext(UserContext)

export default function UserProvider({ children }: Props) {

    const { localUser: currentUser, loading } = useUser()

    useEffect(() => {
        if (!currentUser) {
            // navigate("/")
        }
    }, [currentUser])

    return (
        <UserContext.Provider
            value={{
                loading,
                currentUser,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

