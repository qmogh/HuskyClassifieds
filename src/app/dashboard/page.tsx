import { auth, signOut } from "@/auth";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer"
const DashboardPage = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="mb-8">
        {session ? (
          <h1 className="text-3xl font-bold text-center mb-4">Hi there, {session?.user?.email}!</h1>
        ): (
          <p className = "text-3xl text-center mb-4">You're not signed in. <a className="underline" href="/sign-in">Want to?</a></p>
        )}
      </div>
    </main>
    <Footer />
  </div>
)
};


export default DashboardPage;
