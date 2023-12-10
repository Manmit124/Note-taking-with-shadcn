import {  SignUp } from '@clerk/nextjs'
import { Metadata } from 'next'
import React from 'react'
export const metadata:Metadata={
    title:"Notus-Sign Up"
}
const page = () => {
  return (
    <div className=''>

      <SignUp appearance={{variables:{colorPrimary:"#0F172A"}}}/>
    </div>
  )
}

export default page
