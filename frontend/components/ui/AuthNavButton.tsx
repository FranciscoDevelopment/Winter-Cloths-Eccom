"use client"

import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "@/src/store-zustand/store-auth-zustand";


export default function AuthNavButton () {

    const user = useAuthStore( (state) => state.user )

    const hasHydrated = useAuthStore( (state) => state.hasHydrated ) ;


    if( !hasHydrated ) return null ; // evita el parpadeo mientras el bootstrap todavía está chequeando


    if( !user ) {

        return (
            <Link href="/login" className="text-slate-100 rounded-full hover:text-teal-600 p-2" aria-label="Sign in">
                <UserIcon className="w-9 h-9 p-1.5 rounded-full border-2 border-slate-400/60 hover:border-teal-600" />
            </Link>
        )

    }


    return (
        <Link href="/account" className="text-slate-100 hover:text-teal-600 p-2 flex items-center gap-1" aria-label="My Account">
            <UserIcon className="w-9 h-9 p-1.5 rounded-full border border-slate-400/60 hover:border-teal-600" />
            <span className="text-sm">{user.name}</span>
        </Link>
    )

}
