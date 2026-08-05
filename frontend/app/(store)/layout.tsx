type childrenProps = Readonly< {children: React.ReactNode} >

export default function RootLayout( {children} : childrenProps ) {

    return (

        <main className="lg:flex lg:h-screen lg:overflow-y-hidden " >

            <section className="md:flex-1 md:h-screen md:overflow-y-scroll pt-10 pb-32 px-10" >
                {children}
            </section>

            <aside className="md:w-96 md:h-screen md:overflow-y-scroll pt-10 pb-32 px-5" >

            </aside>


        </main>

    )

}