"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const sampleListings = [
  {
    id: 1,
    title: "Vintage UConn Hoodie",
    price: 25.0,
    imageUrl:
      "https://images.footballfanatics.com/uconn-huskies/mens-mitchell-and-ness-gry-university-of-connecticut-vintage-logo-satin-fleece-crew_ss10_p-101406084+u-crjnbvjgclvoantl0xgk+v-afwftxmk9vw78e3oqvee.jpg?_hv=2",
  },
  {
    id: 2,
    title: "Cool Vintage Jacket",
    price: 40.0,
    imageUrl: "https://i.ebayimg.com/images/g/A68AAOSwMAxj5eoP/s-l400.jpg",
  },
  {
    id: 3,
    title: "Dorm Room Decor Set",
    price: 15.0,
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
  },
  {
    id: 4,
    title: "UConn Basketball Jersey",
    price: 30.0,
    imageUrl: "https://images.unsplash.com/photo-1518281420975-50db6e5d0a97?w=500&h=500&fit=crop",
  },
  {
    id: 5,
    title: "Study Desk and Chair",
    price: 50.0,
    imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&h=500&fit=crop",
  },
  {
    id: 6,
    title: "Winter Coat",
    price: 35.0,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
  },
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-green-600">
            UConn Thrift Den
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-green-600 transition-colors">
              Contact
            </Link>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="md:hidden bg-white py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-green-600 transition-colors">
                Contact
              </Link>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Discover Campus Treasures</h1>
          <p className="text-xl mb-8 text-gray-600">Find amazing deals on student essentials and more</p>
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for items..."
              className="w-full px-4 py-2 rounded-full bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 rounded-full p-2">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Featured Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleListings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden transition-transform hover:scale-105">
                <Image
                  src={listing.imageUrl || "/placeholder.svg"}
                  alt={listing.title}
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
                  <p className="text-2xl font-bold text-green-600">${listing.price.toFixed(2)}</p>
                  <Button className="mt-4 w-full bg-gray-800 hover:bg-gray-900 text-white">View Item</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center bg-green-50 py-16 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Come shop in person, or drop off your clothes!</h2>
          <p className="text-xl mb-8 text-gray-600">Come visit us in....</p>
          <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
            Email us!
          </Button>
        </section>
      </main>

      <footer className="bg-gray-100 text-gray-600 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 UConn Thrift Den. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link href="/privacy" className="hover:text-green-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-green-600 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

