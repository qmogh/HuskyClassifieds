import { auth } from "@/auth"
import Header from "@/components/ui/Header"
import Footer from "@/components/ui/Footer"
import { prisma } from "@/lib/database"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Edit } from 'lucide-react'
import { Link } from "lucide-react"
const getUserId = async (session: any) => {
  if (!session?.user?.email) {
    throw new Error("No user email found in session")
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!user) {
    throw new Error("User not found")
  }

  return user.id
}

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user?.email) {
    redirect("/sign-in")
  }

  const userId = await getUserId(session)

  const listings = await prisma.listing.findMany({
    where: { userId },
  })

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-6">Your Dashboard</h1>
          <p className="text-center text-gray-600 mb-8">Welcome back, {session.user.email}</p>
          {listings.length > 0 ? (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" className="flex items-center">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className = "pt-20">
            <Card className="max-w-md mx-auto">
            <CardContent className="text-center py-6">
                <p className="text-gray-600 mb-4">Want to list another?</p>
                <Button className="bg-[#0e1837] hover:bg-[#1a2a4a]">
                  Yes I do!
                </Button>
              </CardContent>
          </Card>
          </div>
            </>
          ) : (
            <div className = "pt-20">
            <Card className="pt-20 max-w-md mx-auto">
              <CardContent className="text-center py-6">
                <p className="text-gray-600 mb-4">You haven't posted any listings yet.</p>
                <Link href="/sell">
                <Button className="bg-[#0e1837] hover:bg-[#1a2a4a]">
                  Create Your First Listing
                </Button>
                </Link>
              </CardContent>
            </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}