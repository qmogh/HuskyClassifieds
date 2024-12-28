/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
import Header from "@/components/ui/Header"
import Footer from "@/components/ui/Footer"
import { prisma } from "@/lib/database"
import { redirect } from "next/navigation"
import { Button,  } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from 'lucide-react'
import Link from "next/link"
import DeleteButton from "@/components/ui/DeleteButton"
import { Session } from "next-auth";
import { auth } from "@/auth"
import { Metadata } from 'next'




export const metadata: Metadata = {
  title: 'Dashboard',
}
const getUserId = async (session: Session) => {
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

export const revalidate = 60

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user?.email) {
    redirect("/sign-in")
  }

  const userId = await getUserId(session)

  const listings = await prisma.listing.findMany({
    where: { userId },
  
  })
  // const num = listings.length;
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-6">Your Dashboard</h1>
          <p className="text-center text-gray-600 mb-8">Welcome back, {session.user.email}</p>
          {listings.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {listings.map((listing) => (
                  <Card key={listing.id} className="flex flex-col h-full">
                    <CardHeader>
                      <CardTitle className="text-xl truncate">{listing.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                      {listing.imageUrl && (
                        <img
                          src={listing.imageUrl}
                          alt={listing.title}
                          className="w-full h-48 object-cover rounded-md mb-4"
                        />
                      )}
                      <p className="text-gray-600 mb-2 flex-grow overflow-y-auto max-h-24">{listing.description}</p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between mt-auto">
                      <p className="text-2xl font-semibold text-[#0e1837]">${listing.price.toFixed(2)}</p>
                      <div className="flex space-x-2">
                        {/* <Button variant="outline" size="sm" className="flex items-center">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button> */}
                        <DeleteButton listingId={listing.id} />
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center">
                <Link href="/sell">
                  <Button className="bg-[#0e1837] hover:bg-[#1a2a4a] text-white px-6 py-2 rounded-md flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Another Listing
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <Card className="max-w-md mx-auto">
              <CardContent className="text-center py-6">
                <p className="text-gray-600 mb-4">You haven&apos;t posted any listings yet.</p>
                <Link href="/sell">
                  <Button className="bg-[#0e1837] hover:bg-[#1a2a4a] text-white px-6 py-2 rounded-md flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Listing
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */