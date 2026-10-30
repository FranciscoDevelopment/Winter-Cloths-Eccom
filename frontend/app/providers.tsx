"use client"

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query" ;
import { useAuthBootstrap } from "@/src/hooks/use-auth-bootstrap";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";

type childrenProps = Readonly< {children: React.ReactNode} >

const muiTheme = createTheme()

function makeQueryClient () {

    return new QueryClient(
        {
            defaultOptions: {
                queries: {
                    staleTime: 60 * 1000,
                }
            }
        }
    )
}

let browserQueryClient : QueryClient | undefined = undefined ;


function getQueryClient () {

    if(isServer) return makeQueryClient() ;

    else {
        if( !browserQueryClient ) browserQueryClient = makeQueryClient() ;

        return browserQueryClient 
    }
}

export default function Providers( {children} : childrenProps ) {

    const queryClient = getQueryClient() ;

    useAuthBootstrap()

    return(
        <AppRouterCacheProvider>
            <ThemeProvider theme={muiTheme}>
                <QueryClientProvider
                    client={queryClient}
                >
                    {children}
                </QueryClientProvider>
            </ThemeProvider>
        </AppRouterCacheProvider>
    )

}


