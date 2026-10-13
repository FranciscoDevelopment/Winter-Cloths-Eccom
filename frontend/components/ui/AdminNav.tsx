import Link from "next/link";
import Logo from "./Logo";

export default function AdminNav () {

    return(
    
        <header  className="px-10 py-5 bg-gray-700 flex justify-between">

            <article className="flex gap-5 text-slate-100" > 
                <Logo/> 
            </article>
        
            <section className="flex gap-4 items-center" >

                <Link
                    className="rounded text-white font-bold py-2 px-4 bg-gray-600/65 transition-all duration-300 hover:bg-gray-500/35 hover:shadow-inner"
                    href={'/admin/products'}
                >
                    Products
                </Link>

                <Link
                    className="rounded text-white font-bold py-2 px-4 bg-gray-600/65 transition-all duration-300 hover:bg-gray-500/35 hover:shadow-inner"
                    href={'/admin/sales'}
                >
                    Sales
                </Link>

                <Link
                    className="rounded bg-green-400 text-slate-800 font-bold py-2 px-8 transition-all duration-300 hover:bg-green-300/90"
                    href={'/'}
                >
                    Shop Main
                </Link>

            </section>

        </header>

    )
}