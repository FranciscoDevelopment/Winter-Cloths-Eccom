import ShoppingCart from "@/components/cart/ShoppingCart"
import MainNav from "@/components/MainNav"

type childrenProps = Readonly< {children: React.ReactNode} >

export default function RootLayout( {children} : childrenProps ) {

    return (
        <main>

            <MainNav/>
            <section className="lg:flex lg:h-screen lg:overflow-y-hidden " >
                

                <article className="md:flex-1 md:h-screen md:overflow-y-scroll pt-10 pb-32 px-10" >
                    {children}
                </article>

                <aside 
                    className="md:w-96 md:h-screen md:overflow-y-scroll pt-10 pb-32 px-5 bg-white" 
                >

                    <ShoppingCart/>

                </aside>


            </section>
        </main>

    )

}