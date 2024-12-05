import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ListingForm from "@/components/listings/form";
import { prisma } from "@/lib/database"
import { redirect } from "next/navigation"; 
import { auth } from "@/auth";

const getUserId = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.id;
};

const SellPage = async () => {
  const session = await auth();
  // const session = {
  //   user: {
  //     name: null,
  //     email: 'chaubeyamogh@gmail.com',
  //     image: null,
  //   },
  //   expires: '2024-12-20T19:46:36.312Z',
  // };
  
  if (!session?.user?.email) {
    redirect("/sign-in");
  }

  try {
    const userId = await getUserId(session.user.email);

    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-center mb-4">Let&apos;s get rid of that couch, {session.user.email}!</h1>
            <ListingForm userId={userId} />
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error fetching user ID:", error);
    redirect("/error"); // Redirect to an error page
  }
};

export default SellPage;