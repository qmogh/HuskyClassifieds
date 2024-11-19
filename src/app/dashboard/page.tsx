import { auth, signOut } from "@/auth";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ListingForm from "@/components/listings/form";
import { PrismaAdapter } from "@auth/prisma-adapter"; 
import { prisma } from "@/lib/database"

const getUserId = async (session: any) => {
  if (!session?.user?.email) {
    throw new Error("No user email found in session");
  }

  // Query the user by email
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // Check if the user exists
  if (!user) {
    throw new Error("User not found");
  }

  // Return the user ID
  return user.id;
};

const DashboardPage = async () => {
  const session = await auth();
  
  let userId;
  if (session?.user?.email) {
    userId = await getUserId(session);
  }
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          {session ? (
            <>
              <h1 className="text-3xl font-bold text-center mb-4">Hi there, {session?.user?.email}!</h1>
              <h1 className="text-2xl font-bold text-left ml-4">Add Listing: </h1>
              <ListingForm userId={userId} /> {/* Pass the userId here */}
            </>
          ) : (
            <p className="text-3xl text-center mb-4">You're not signed in. <a className="underline" href="/sign-in">Want to?</a></p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
