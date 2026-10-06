"use client"

import { uploadImage } from "@/actions/upload-image-action";
import { useAuthStore } from "@/src/store-zustand/store-auth-zustand";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone" ;
import { toast } from "react-toastify";

type uploadProductImagePropsT = {
    currentImage? : string
}

export default function UploadProductImage ( {currentImage} : uploadProductImagePropsT ) {

    const [ imageUrl, setImageUrl ] = useState("") ;

    const accessToken = useAuthStore( (state) => state.accessToken ) ;

    const handleOnDrop = useCallback( async ( files : File[] ) => {

        const formData = new FormData() ;

        files.forEach( (file) => {

            formData.append( "file", file )

        } )

        try {

            const image = await uploadImage( formData, accessToken ) ;
    
            setImageUrl(image)
            
        } catch {
            
            toast.error( "Can't upload the image" )
            
        }


    }, [accessToken] )

    const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({

        accept: {
            "image/jpeg": [".jpeg"],
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
                            priority
                        />
                    </aside>

                </article>
            )}

            {currentImage && !imageUrl && (
                <article className="py-5 space-y-3" >

                    <p className="font-bold">Current Image</p>
                    <aside className="w-[200px] h-[320px] relative">
                        <Image
                            src={currentImage}
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
                defaultValue={imageUrl ? imageUrl : currentImage }
            />

        </main>
    
    )
}