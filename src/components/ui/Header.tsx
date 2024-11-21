import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'
import Link from "next/link"
import { signOut } from "@/auth"

export default async function Header() {
    // const session = await auth();
    const session = {
        user: {
          name: null,
          email: 'chaubeyamogh@gmail.com',
          image: null,
        },
        expires: '2024-12-20T19:46:36.312Z',
      };
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
                <nav className="hidden md:flex items-center space-x-10">
                    <Link href="/sell" className="hover:text-gray-300">
                        Sell!
                    </Link>
                    <Link href="/dashboard" className="hover:text-gray-300">
                        Dashboard
                    </Link>
                {/* </nav> */}
                {/* <div className="flex items-center space-x-4"> */}
                    {session ? (                
                        <Button
                            onClick={handleSignOut}
                            variant="ghost"
                            size="icon"
                            className="text-white"
                        >
                            <LogOut className="h-6 w-6" />
                            <span className="sr-only">Log Out</span>
                        </Button>
                    ) : (
                        <></>
                    )}
                {/* </div> */}
                </nav>
            </div>
        </header>
    )
}