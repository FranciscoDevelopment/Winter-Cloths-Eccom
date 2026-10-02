import { useAuthStore } from "../store-zustand/store-auth-zustand";

export async function fetchWithAuth( input : RequestInfo | URL , init : RequestInit = {} ) {


    const accessToken = useAuthStore.getState().accessToken ;


    const response = await fetch( input, {

        ...init,
        headers: {
            ...init.headers,
            ...( accessToken  ?  {Authorization: `Bearer ${accessToken}`}  :  {} ) 
        }

    } );


    if( response.status !== 401 ) return response ;
    

        // el access token venció a mitad de camino: intentamos refrescar una vez
    const refreshRes = await fetch( "/api/auth/refresh", {method: "POST"} )


    if( !refreshRes.ok ) {

        useAuthStore.getState().clearSession() ;

        return response ; // devolvemos el 401 original, no hay nada más que hacer

    }


    const { access_token } = await refreshRes.json()


    if(!access_token) console.error("No llego el token, error de comunicación") ;

    useAuthStore.getState().setAccessToken( access_token )


    return fetch( input, {

        ...init,
        headers: {
            ...init.headers,
            Authorization: `Bearer ${access_token}`
        }

    } )

}