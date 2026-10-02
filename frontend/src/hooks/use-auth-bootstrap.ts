"use client"

import { useEffect } from "react";
import { useAuthStore } from "../store-zustand/store-auth-zustand";

export function useAuthBootstrap () {

    useEffect( () => {

        let cancelled = false ;

        const bootstrap = async () => {

            const refreshRes = await fetch("/api/auth/refresh", {method: "POST" })

            if( !refreshRes.ok ) {
                
                if(!cancelled) useAuthStore.getState().setHydrated() ;

                return ;

            }

            const {access_token} = await refreshRes.json() ;


            const meRes = await fetch("/api/auth/me", {
                headers: {Authorization: `Bearer ${access_token}` }
            });


            if( !meRes.ok ) {

                if( !cancelled ) useAuthStore.getState().setHydrated() ;
                
                return ;

            }


            const user = await meRes.json()


            if( !cancelled ) {

                useAuthStore.getState().setSession( user, access_token ) ;

                useAuthStore.getState().setHydrated()

            }

        }


        bootstrap()

        
        return () => {
            cancelled = true
        }

    }, [] )

}