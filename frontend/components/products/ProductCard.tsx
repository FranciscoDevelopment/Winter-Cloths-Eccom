import { productT } from "@/src/schema";
import { FormatCurrency } from "@/src/utils";
import Image from "next/image";

type productPropsT = {
    product : productT
}

export default function ProductCard ( {product} : productPropsT ) {

    return(
    
        <main
            className='rounded bg-white shadow relative p-5'
        >
            <section>

                <Image src={product.image} alt={product.name} width={200} height={400} />

                <article className="p-3 space-y-2">
                    <h3 className="text-xl font-bold text-gray-600"> {product.name} </h3>
                    <p className="text-gray-500">Disponibles: {product.inventory} </p>
                    <p className="text-2xl font-extrabold  text-gray-900"> { FormatCurrency( product.price )  } </p>
                </article>

            </section>

            <button
                type="button"
                className="absolute top-5 -right-3"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 bg-indigo-600 rounded-full text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>

        </main>
    
    )
    
}