type paramsT = Promise< {categoryId : string} > ;

type paramsPropT = {
    params: paramsT
}

export default async function StorePage ( {params} : paramsPropT ) {

    const { categoryId } = await params ;

    console.log( categoryId )

    

    return(
    
        <div>
            Hi from StorePage
        </div>
    
    )
}