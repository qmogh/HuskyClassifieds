import { auth, signOut } from "@/auth";
import SignoutButton from "@/components/auth/sign-out-button";
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Menu, ShoppingCart, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
const DashboardPage = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
    <header className="bg-[#0e1837] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Husky Housing
        </Link>
        <nav className="hidden md:flex space-x-4">
          {session ? (
            <Link href="/dashboard" className="hover:text-gray-300">
            View Dashboard
          </Link>
          ): (
            <Link href="/sign-in" className="hover:text-gray-300">
            Sign-In
          </Link>
          )
          }
    
          <Link href="/sell" className="hover:text-gray-300">
            Sell
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            About
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          {/* <Button variant="ghost" size="icon" className="text-white">
            <ShoppingCart className="h-6 w-6" />
            <span className="sr-only">Shopping Cart</span>
          </Button> */}
          {/* <Button variant="ghost" size="icon" className="md:hidden text-white">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button> */}
        </div>
      </div>
    </header>
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-4">Hi there, {session?.user?.email}!</h1>
      </div>
    </main>
    <footer className="bg-[#0e1837] text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Husky Housing. All rights reserved.</p>
      </div>
    </footer>
  </div>
)
};
    // <section className="items-center flex h-screen justify-center">
    //   {session ? (
    //     <div className="space-y-8">
    //       <h1 className="text-4xl font-bold">Hi {session.user?.email}</h1>
    //       <SignoutButton />
    //     </div>
    //   ) : (
    //     <p className="text-lg font-bold">
    //       No user is logged in. {" "}
    //       <a href="/sign-in" className="underline">
    //         Sign in?
    //       </a>
    //     </p>
    //   )}
    // </section>


export default DashboardPage;
