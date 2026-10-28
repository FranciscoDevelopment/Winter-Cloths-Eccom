"use client"

import { useAuthStore } from "../store-zustand/store-auth-zustand"

export function useCurrentUser() {

    const user = useAuthStore( (state) => state.user ) ;

    const accessToken = useAuthStore( (state) => state.accessToken ) ;

    const hasHydrated = useAuthStore( (state) => state.hasHydrated ) ;


    return {
        user,
        hasHydrated,
        isAuthenticated: !!accessToken,
        isAdmin: user?.role === "ADMIN"
    }

}