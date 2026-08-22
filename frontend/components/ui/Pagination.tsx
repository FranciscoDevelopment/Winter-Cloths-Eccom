import Link from "next/link";

type paginationPropsT = {
    currentPage : number ;
    totalPages : number ;
    baseUrl : string
}


export default function Pagination ( {currentPage, totalPages, baseUrl} : paginationPropsT ) {

    const pages = Array.from( {length: totalPages}, ( _ , i ) => i + 1 )

    return(
    
        <nav className="flex justify-center py-10" >
            {
                currentPage > 1 && (

                    <Link
                        href={`${baseUrl}?page=${currentPage - 1}`}
                        className="px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                    >
                        &laquo;
                    </Link>
                )
            }

            {
                pages.map( (pageNum) => (
                    
                    <Link
                        key={pageNum}
                        href={`${baseUrl}?page=${pageNum}`}
                        className={`${currentPage === pageNum && 'font-black'} px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                    >
                        {pageNum}
                    </Link>

                ) )
            }

            {
                currentPage < totalPages && (

                    <Link
                        href={`${baseUrl}?page=${currentPage + 1}`}
                        className="px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                    >
                        &raquo;
                    </Link>
                )
            }

        </nav>

    
    )
}