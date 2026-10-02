"use client"

import { useRouter } from "next/router"
import { useEffect } from "react"
import { useCurrentUser } from "@/src/hooks/use-current-user"


type childrenProps = Readonly<{children: React.ReactNode}>;


export default function AdminGuard ( {children} : childrenProps ) {

    const router = useRouter() ;

    const { hasHydrated, isAdmin } = useCurrentUser() ;


    useEffect( () => {

        if( hasHydrated && !isAdmin ) router.replace('/')

    }, [ hasHydrated, isAdmin, router ] )


    if( !hasHydrated || !isAdmin ) return null ;    // feat: block checkout button when not authenticated


    return (
        <section>
            {children}
        </section>
    )

}