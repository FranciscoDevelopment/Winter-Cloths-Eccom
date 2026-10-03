import { create } from "zustand"
import type { UserT } from "../types/auth-responses.type"
import { devtools } from "zustand/middleware"

type authStoreT = {

    user : UserT | null,

    accessToken : string | null ,

    setSession: ( user : UserT, accessToken : string ) => void ,

    setAccessToken: ( accessToken : string ) => void ,

    clearSession: () => void,

    hasHydrated: boolean,

    setHydrated: () => void

}

const initialState : Pick< authStoreT, 'user' | 'accessToken' | 'hasHydrated' > = {

    user : null ,

    accessToken: null,

    hasHydrated: false

}


export const useAuthStore = create<authStoreT>()( devtools( ( set ) => {

    return {
        ...initialState
        ,
        setSession: ( user, accessToken ) => {

            set( () => {
                return {
                    user,
                    accessToken
                }
            })

        }
        ,
        setAccessToken: (accessToken) => {
            set( () => ({accessToken}) )
        }
        ,
        clearSession: () => {

            set( () => {
                return {
                    user: null,
                    accessToken: null
                    // hasHydrated NO se resetea: ya sabemos con certeza que no hay sesión
                }
            } )

        }
        ,
        setHydrated: () => {
            set( () => ( {hasHydrated: true } ) )
        }

    }

} ) ) 