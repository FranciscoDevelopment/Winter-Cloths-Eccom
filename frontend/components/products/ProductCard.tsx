"use client"

import { useState } from "react";
import { productT } from "@/src/schema";
import { FormatCurrency, isAvailableByStock } from "@/src/utils";
import Image from "next/image";
import AddProductButton from "./AddProductButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type productPropsT = {
    product : productT
}

export default function ProductCard ( {product} : productPropsT ) {

    const isOutOfStock = isAvailableByStock( product.inventory ) ;

    const [ currentImageIndex, setCurrentImageIndex ] = useState(0)

    const hasMultipleImages = product.images.length > 1 ;

    const showPreviousImage = ( event : React.MouseEvent ) => {

        event.preventDefault() ;

        setCurrentImageIndex( (prev) => prev === 0 ? product.images.length - 1 : prev - 1 )

    }

    const showNextImage = ( event : React.MouseEvent ) => {

        event.preventDefault() ;

        setCurrentImageIndex( (prev) => prev === product.images.length - 1 ? 0 : prev + 1 )

    }

    return(

        <main className='rounded bg-stone-100 shadow relative p-5'>

            <section className={!isOutOfStock ? "opacity-40" : "" } >

                <article className="relative">

                    <Image src={product.images[currentImageIndex]} alt={product.name} width={200} height={400} priority />

                    {hasMultipleImages && (
                        <>
                            <button
                                type="button"
                                onClick={showPreviousImage}
                                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow"
                                aria-label="Previous image"
                            >
                                <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
                            </button>

                            <button
                                type="button"
                                onClick={showNextImage}
                                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow"
                                aria-label="Next image"
                            >
                                <ChevronRightIcon className="w-5 h-5 text-gray-700" />
                            </button>

                            <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1">
                                {product.images.map( (_, index) => (
                                    <span
                                        key={index}
                                        className={`w-1.5 h-1.5 rounded-full ${index === currentImageIndex ? "bg-gray-800" : "bg-gray-300"}`}
                                    />
                                ) )}
                            </div>
                        </>
                    )}

                </article>

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
