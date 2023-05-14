"use client";
import { SessionProvider } from 'next-auth/react'


function Provider({children}) {
   
  return (
    <SessionProvider basePath='espace-personnel/api/auth'>{children}</SessionProvider>
  )
}

export default Provider