"use client"

import { uploadImage } from "@/actions/upload-image-action";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone" ;


export default function UploadProductImage () {

    const [ imageUrl, setImageUrl ] = useState("")

    const handleOnDrop = useCallback( async ( files : File[] ) => {

        console.log("Drop done...\n" + files ) ;

        const formData = new FormData() ;

        files.forEach( (file) => {

            formData.append( "file", file )

        } )

        const image = await uploadImage( formData ) ;

        console.log(image);

        setImageUrl(image)

    }, [] )

    // la importancia useCallback para persistir tras re-renders

    const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({

        accept: {
            "image/jpeg": [".jpeg"],    // SIEMPRE LO + IMPORTANTE EL Mind-Type image/jpeg 
            "image/jpg": [".jpg"],
            "image/png": [".png"]
        },

        onDrop: handleOnDrop,

        maxFiles: 1

    })

    return(
    
        <main className="space-y-1">
                
            <label className="block text-sm font-medium leading-6 text-gray-900">
                Product Image
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
                
                {isDragAccept && (<p>Drop the Image</p>)}

                {isDragReject && (<p>Invalid File</p>)}

                {!isDragActive && (<p>Drag and drop an image here</p>)}
            
            </article>

            {imageUrl && (
                <article className="py-5 space-y-3" >

                    <p className="font-bold">ProductImage</p>
                    <aside className="w-[200px] h-[320px] relative">
                        <Image
                            src={imageUrl}
                            alt="Image Uploaded"
                            className="object-cover"
                            fill
                        />
                    </aside>

                </article>
            )}
    
            <input
                type="hidden"
                name="image"
                defaultValue={imageUrl}
            />

        </main>
    
    )
}