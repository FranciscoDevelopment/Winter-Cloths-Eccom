import StoreContent from "@/components/cart/CartAside"
import CartAside from "@/components/cart/CartAside"
import ShoppingCart from "@/components/cart/ShoppingCart"
import MainNav from "@/components/MainNav"
import ToastNotification from "@/components/ui/ToastNotification"

type childrenProps = Readonly< {children: React.ReactNode} >

export default function RootLayout( {children} : childrenProps ) {

    return (
        <main>

            <MainNav/>
            <section className="lg:flex lg:h-screen lg:overflow-y-hidden " >
                
                {/* 
                
                <article className="md:flex-1 md:h-screen md:overflow-y-scroll pt-10 pb-32 px-10" >
                    {children}
                </article>
                */}

                <StoreContent>
                    {children}
                </StoreContent>

            </section>

            <ToastNotification/>

        </main>

    )

}