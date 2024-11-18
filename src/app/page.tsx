import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { auth } from "@/auth";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Menu, ShoppingCart, Plus } from 'lucide-react'
import Link from "next/link"

export default async function Component() {
  const session = await auth();
  const furnitureItems = [
    { id: 1, name: "Comfortable Sofa", price: 150, image: "/placeholder.svg?height=100&width=200" },
    { id: 2, name: "Study Desk", price: 80, image: "/placeholder.svg?height=100&width=200" },
    { id: 3, name: "Bookshelf", price: 60, image: "/placeholder.svg?height=100&width=200" },
    { id: 4, name: "Bed Frame", price: 100, image: "/placeholder.svg?height=100&width=200" },
    { id: 5, name: "Dining Table", price: 120, image: "/placeholder.svg?height=100&width=200" },
    { id: 6, name: "Drawer Set", price: 90, image: "/placeholder.svg?height=100&width=200" },
  ]

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
          <h1 className="text-3xl font-bold text-center mb-4">Find and Sell Furniture for UConn Students</h1>
          <div className="flex max-w-md mx-auto">
            <Input className="rounded-r-none" placeholder="Search for furniture..." />
            <Button className="rounded-l-none bg-[#0e1837]">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button className="=rounded-l-none bg-[#f1e7c8] text-#0e1837">
            <Plus />
              <Link href="/listing/new">Add Listing</Link>
              </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {furnitureItems.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md" />
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-lg font-bold">${item.price}</span>
                <Button>Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <footer className="bg-[#0e1837] text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Husky Housing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}