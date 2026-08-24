import { productT } from "@/src/schema";
import { FormatCurrency, isAvailableByStock } from "@/src/utils";
import Image from "next/image";
import AddProductButton from "./AddProductButton";


type productPropsT = {
    product : productT
}

export default function ProductCard ( {product} : productPropsT ) {

    const isOutOfStock = isAvailableByStock( product.inventory ) ;

    return(
    
        <main className='rounded bg-stone-100 shadow relative p-5'>
            
            <section className={!isOutOfStock ? "opacity-40" : "" } >

                <Image src={product.image} alt={product.name} width={200} height={400} priority />

                <article className="p-3 space-y-2">
                    <h3 className="text-xl font-bold text-gray-600"> {product.name} </h3>
                    <p className="text-gray-500">Stock: {product.inventory} </p>
                    <p className="text-2xl font-extrabold  text-gray-900"> { FormatCurrency( product.price )  } </p>
                </article>

            </section>

            {
                isOutOfStock 
                    ? ( <AddProductButton product={product} /> )
                    : ( <p className="out-stock">Out Of Stock</p> )
            }


        </main>
    
    )
    
}