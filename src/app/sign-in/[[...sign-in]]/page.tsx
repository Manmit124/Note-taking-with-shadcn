import { SignIn } from '@clerk/nextjs'
import { Metadata } from 'next'
import React from 'react'
export const metadata:Metadata={
    title:"Notus-Sign In"
}
const page = () => {
  return (
    <div className='flex h-screen items-center '>

      <SignIn appearance={{variables:{colorPrimary:"#0F172A"}}}/>

     
    </div>
  )
}

export default page
