import AdminNav from "@/components/ui/AdminNav"
import AdminGuard from "@/components/ui/guards/AdminGuard"
import ToastNotification from "@/components/ui/ToastNotification"

type childrenProps = Readonly< {children: React.ReactNode} >

export default function RootLayout ( {children} : childrenProps ) {

    return (

        <main>
            <AdminNav/>
            <section className="lg-min-h-screen container mx-auto mt-10 px-10 lg:px-0" >

                <article className="bg-slate-200 shadow w-full mx-auto p-10 my-10 lg:w-3/5" >
                    <AdminGuard>
                        {children}
                    </AdminGuard>
                </article>

            </section>

            <ToastNotification/>
        
        </main>
    
    )


}