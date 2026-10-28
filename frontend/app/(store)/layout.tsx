import StoreContent from "@/components/cart/CartAside"
import MainNav from "@/components/MainNav"
import ToastNotification from "@/components/ui/ToastNotification"

type childrenProps = Readonly< {children: React.ReactNode} >

export default function RootLayout( {children} : childrenProps ) {

    return (
        <main>

            <MainNav/>

            <StoreContent>
                {children}
            </StoreContent>

            <ToastNotification/>

        </main>

    )

}