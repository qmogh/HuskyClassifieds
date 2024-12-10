import SignInForm from '@/components/auth/signin-with-email'
import React from 'react'
import { auth } from "@/auth";
import { redirect } from "next/navigation"; 
const SignInPage = async () => {
  const session = await auth();
  if (session?.user?.email){
    redirect("/dashboard")
  }
  return (
   <SignInForm />
  )
}

export default SignInPage