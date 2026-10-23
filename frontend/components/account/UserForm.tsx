"use client"

import { useAuthStore } from "@/src/store-zustand/store-auth-zustand"

export default function UserForm () {

    const user = useAuthStore( (state) => state.user )

    return (

        <section className="space-y-5">

            <article className="space-y-2">

                <label
                    htmlFor="name"
                    className="block text-stone-800 font-semibold"
                >
                    Name
                </label>

                <input
                    id="name"
                    type="text"
                    name="name"
                    className="border border-gray-300 w-full p-2"
                    defaultValue={user?.name}
                />

            </article>

            <article className="space-y-2">

                <label
                    htmlFor="email"
                    className="block text-stone-800 font-semibold"
                >
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    name="email"
                    className="border border-gray-300 w-full p-2"
                    defaultValue={user?.email}
                />

            </article>

            <article className="space-y-2">

                <label
                    htmlFor="password"
                    className="block text-stone-800 font-semibold"
                >
                    New Password
                </label>

                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Leave blank to keep your current password"
                    className="border border-gray-300 w-full p-2"
                />

            </article>

        </section>

    )

}
