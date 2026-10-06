type childrenProps = Readonly< {children: React.ReactNode} >


export default function Heading ( {children} : childrenProps ) {

    return(
    
        <h1 className="text-2xl my-10 text-teal-950">{children}</h1>
    
    )
}