import Link from "next/link";
import Logo from "./Logo";

export default function AdminNav () {

    return(
    
        <header  className="px-10 py-5 bg-gray-700 flex justify-between">

            <article className="flex gap-5 text-slate-100" > 
                <Logo/> 
            </article>
        
            <section className="flex gap-2 items-center" >

                <Link
                    className="rounded text-white font-bold p-2"
                    href={'/admin/products'}
                >
                    Products
                </Link>

                <Link
                    className="rounded text-white font-bold p-2"
                    href={'/admin/sales'}
                >
                    Sales
                </Link>
                
                <Link
                    className="rounded bg-green-400 text-slate-800 font-bold py-2 px-10"
                    href={'/'}
                >
                    Shop Main
                </Link>

            </section>

        </header>

    )
}