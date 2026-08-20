import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound () {

    return(
    
        <main className="text-center" >
            
            <Heading>
                Product not founded
            </Heading>

            <p>
                Maybe you want to comeback to {' '}
                    <Link className="bg-lime-400" href="/admin/products?page=1" >
                        Products
                    </Link>  
            </p>
        
        </main>
    
    )
}