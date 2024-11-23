import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import Header from "@/components/ui/Header"
import Footer from "@/components/ui/Footer"
import Link from "next/link"
import { prisma } from "@/lib/database"
import SearchComponent from "@/components/ui/SearchComponent"
import { searchListings } from "@/actions/searchListings"
import { auth } from "@/auth"
import Title from "@/components/ui/Title"
export default async function Home({
  searchParams,
}: {
  searchParams: { search?: string }
}) {
  const session = await auth()
  const searchQuery = await searchParams.search

  let listings
  if (searchQuery) {
    listings = await searchListings(searchQuery)
  } else {
    listings = await prisma.listing.findMany({})
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Title />
          <SearchComponent />
          {listings.length > 0 ? (
            <div className="pt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {listings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-xl">{listing.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {listing.imageUrl && (
                        <img
                          src={listing.imageUrl}
                          alt={listing.title}
                          className="w-full h-48 object-cover rounded-md mb-4"
                        />
                      )}
                      <p className="text-gray-600 mb-2">{listing.description}</p>
                      <p className="text-2xl font-semibold text-[#0e1837]">${listing.price.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card className="max-w-md mx-auto mt-8">
              <CardContent className="text-center py-6">
                <p className="text-gray-600 mb-4">No listings found. Be the first to post!</p>
                <Link href="/sell">
                  <Button className="bg-[#0e1837] hover:bg-[#1a2a4a] text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Listing
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
        {!session ? (
          <div className="mt-12 text-center">
            <Link href="/sign-in">
              <Button className="bg-[#0e1837] hover:bg-[#1a2a4a] text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
                Want to sell your item? Sign in here!
              </Button>
            </Link>
          </div>
        ) : (
          <div className="mt-12 text-center">
            <Link href="/sell">
              <Button className="bg-[#0e1837] hover:bg-[#1a2a4a] text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
                Want to sell your item?
              </Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}