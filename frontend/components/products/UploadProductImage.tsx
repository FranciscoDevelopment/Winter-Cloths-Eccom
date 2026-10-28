"use client"

import { uploadImage } from "@/actions/upload-image-action";
import { useAuthStore } from "@/src/store-zustand/store-auth-zustand";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone" ;
import { toast } from "react-toastify";

type uploadProductImagePropsT = {
    currentImages? : string[]
}

const MAX_PRODUCT_IMAGES = 3 as const ;

export default function UploadProductImage ( {currentImages} : uploadProductImagePropsT ) {

    const [ imageUrls, setImageUrls ] = useState<string[]>( currentImages ?? [] ) ;

    
    const accessToken = useAuthStore( (state) => state.accessToken ) ;

    
    const handleOnDrop = useCallback( async ( files : File[] ) => {

        const remainingSlots = MAX_PRODUCT_IMAGES - imageUrls.length ;

        if( remainingSlots <= 0 ) {
            
            toast.error( `You can only upload up to ${MAX_PRODUCT_IMAGES} images` )
            
            return
        }

        
        const formData = new FormData() ;

        files.slice( 0, remainingSlots ).forEach( (file) => {

            formData.append( "files", file )

        } )

        try {

            const uploadedUrls = await uploadImage( formData, accessToken ) ;

            setImageUrls( (prev) => [...prev, ...uploadedUrls ] )

        } catch {

            toast.error( "Can't upload the images" )

        }


    }, [accessToken, imageUrls.length] )


    const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({

        accept: {
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
            "image/png": [".png"]
        },

        onDrop: handleOnDrop,

        maxFiles: MAX_PRODUCT_IMAGES,

        disabled: imageUrls.length >= MAX_PRODUCT_IMAGES

    })

    const handleRemoveImage = ( urlToRemove : string ) => {

        setImageUrls( (prev) => prev.filter( (url) => url !== urlToRemove ) )

    }


    const handleMoveImage = (index : number, direction : -1 | 1 ) => {

        setImageUrls( (prev) => {

            const newIndex = index + direction ;

            if( newIndex < 0 || newIndex >= prev.length ) return prev ;


            const updated = [...prev ] ;

            [ updated[index], updated[newIndex] ] = [ updated[ newIndex ], updated[index] ] 


            return updated; 

        } )

    }


    return(

        <main className="space-y-1">

            <label className="block text-md leading-6 text-stone-800 font-semibold">
                Product Images (up to {MAX_PRODUCT_IMAGES})
            </label>

            <article
                {...getRootProps({
                    className: `
                    py-20 border-2 border-dashed  text-center
                    ${isDragActive ? 'border-gray-900 text-gray-900 bg-gray-200 ' : 'border-gray-400 text-gray-400 bg-white'}
                    ${isDragReject ? 'border-none bg-white' : 'cursor-not-allowed'}
                `})}
            >

                <input {...getInputProps()} />

                {isDragAccept && (<p>Drop the images</p>)}

                {isDragReject && (<p>Invalid File</p>)}

                {!isDragActive && 
                    (
                        <p>
                            { imageUrls.length >= MAX_PRODUCT_IMAGES
                                                ? "Maxium images reached"
                                                : `Drag and drop up to ${MAX_PRODUCT_IMAGES - imageUrls.length} more image(s) here`
                            }
                        </p>
                        
                    )
                }

            </article>

            {imageUrls.length > 0 && (
                <article className="py-5 space-y-3" >

                    <p className="font-bold text-teal-950">Product Images — first one is the cover</p>

                    <div className="flex gap-3">

                        {imageUrls.map( (url, index) => (

                            <aside key={url} className="w-[150px] h-[220px] relative">
                                
                                <Image
                                    src={url}
                                    alt={`Product image ${index + 1}`}
                                    className="object-cover"
                                    sizes="150px"
                                    fill
                                />


                                <button
                                    type="button"
                                    onClick={ () => handleRemoveImage(url) }
                                    className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow"
                                    aria-label="Remove image"
                                >
                                    <XMarkIcon className="w-4 h-4" />
                                </button>


                                <div className="absolute bottom-1 left-1 right-1 flex justify-between" >

                                    <button
                                        type="button"
                                        onClick={ () => handleMoveImage( index, -1 ) }
                                        disabled={index === 0}
                                        className="bg-amber-100/90 rounded-full p-1 shadow disabled:opacity-30"
                                        aria-label="Move left"
                                    >

                                        <ChevronLeftIcon className="w-4 h-4 text-gray-700" />
                                    
                                    </button>


                                    <button
                                        type="button"
                                        onClick={ () => handleMoveImage( index, 1 ) }
                                        disabled={index === imageUrls.length - 1}
                                        className="bg-white/90 rounded-full p-1 shadow disabled:opacity-30"
                                        aria-label="Move right"
                                    >
                                        <ChevronRightIcon className="w-4 h-4 text-gray-700" />
                                    </button>

                                </div>

                            </aside>

                        ) )}

                    </div>

                </article>
            )}

            {imageUrls.map( (url) => (
                <input key={url} type="hidden" name="images" value={url} />
            ) )}

        </main>

    )
}
