import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { auth } from "@/auth";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Menu, LogOut, Plus } from 'lucide-react'
import Link from "next/link"
import { signOut } from "@/auth"

export default async function Header() {
    const session = await auth();
    const handleSignOut = async () => {
        "use server";
        await signOut();
      };

    return (
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
                Sign in!
                </Link>
                )
                }
            <Link href="/about" className="hover:text-gray-300">
                About
            </Link>
            </nav>
            <div className="flex items-center space-x-4">
                { session ? (                
                    <Button
                        onClick={handleSignOut}
                        variant="ghost" size="icon" className="text-white"
                    >
                        <LogOut className="h-6 w-6" />
                        <span className="sr-only">Log Out</span>
                    </Button>
            ): (
                <></>
            )
            }
            </div>
        </div>
        </header>
  )
}