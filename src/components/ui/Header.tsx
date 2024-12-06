import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'
import Link from "next/link"
import { auth, signOut } from "@/auth"
import { MobileMenu } from "./MobileMenu"

export default async function Header() {
    const session = await auth();
    // const session = {
    //     user: {
    //       name: null,
    //       email: 'chaubeyamogh@gmail.com',
    //       image: null,
    //     },
    //     expires: '2024-12-20T19:46:36.312Z',
    //   };
    const handleSignOut = async () => {
        "use server";
        await signOut();
    };

    return (
        <header className="bg-[#0e1837] text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    Husky Classifieds
                </Link>
                <nav className="hidden md:flex items-center space-x-10">
                    <Link href="/free" className="hover:text-gray-100">
                    Free!
                    </Link>
                    <Link href="/sell" className="hover:text-gray-300">
                        Sell
                    </Link>
                    <Link href="/dashboard" className="hover:text-gray-300">
                        Dashboard
                    </Link>
                    {session && (
                        <Button
                            onClick={handleSignOut}
                            variant="ghost"
                            size="icon"
                            className="text-white"
                        >
                            <LogOut className="h-6 w-6" />
                            <span className="sr-only">Log Out</span>
                        </Button>
                    )}
                </nav>
                <MobileMenu session={session} onSignOut={handleSignOut} />
            </div>
        </header>
    )
}