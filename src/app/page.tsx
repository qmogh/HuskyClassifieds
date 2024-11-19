import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from 'lucide-react'
import { auth } from "@/auth";
import Header from "@/components/ui/Header"
import Footer from "@/components/ui/Footer"
import Link from "next/link"

export default async function Home() {
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
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">Find and Sell Furniture for UConn Students</h1>
          <div className="flex max-w-md mx-auto">
            <Input className="rounded-r-none" placeholder="Search for furniture..." />
            <Button className="rounded-l-none bg-[#0e1837]">
              <Search className="h-4 w-4 mr-2" />
              Search
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
        {!session ? (
        <div className="mt-12 text-center">
        <Link href="/sign-in">
          <Button className="bg-[#0e1837] hover:bg-[#1a2a4a] text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
            Want to sell your item? Sign in here!
          </Button>
        </Link>
      </div>
        ): (
          <></>
        )
        }
      </main>
      <Footer />
    </div>
  )
}