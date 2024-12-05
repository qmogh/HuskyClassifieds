"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginSchema } from "@/schemas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { login } from "@/actions/login"
import Link from "next/link"

const SignInForm = () => {
  const [success, setSuccess] = useState("")

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
    },
  })

  // const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
  //   login(values).then((data) => {
  //     setSuccess(data.success)
  //   })
  // }

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const result = await login(values);
      setSuccess(result.success);
    } catch (error) {
      console.error('Error in form submission:', error);
      // You might want to set an error state here and display it to the user
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-[#0e1837] text-white p-4">
        <div className="container mx-auto">
          <Link href="/" className="text-2xl font-bold">
            Husky Housing
          </Link>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="johndoe@uconn.edu" type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {success && (
                  <p className="bg-green-500/20 rounded-lg text-green-700 w-full p-2.5 text-center">
                    {success}
                  </p>
                )}
                <Button type="submit" className="w-full bg-[#0e1837] hover:bg-[#1a2a4a]">
                  Continue with Email
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <footer className="bg-[#0e1837] text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Husky Housing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default SignInForm