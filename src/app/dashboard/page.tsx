import { auth, signOut } from "@/auth";
import SignoutButton from "@/components/auth/sign-out-button";

const DashboardPage = async () => {
  const session = await auth();
  return (
    <section className="items-center flex h-screen justify-center">
      {session ? (
        <div className="space-y-8">
          <h1 className="text-4xl font-bold">Hi {session.user?.email}</h1>
          <SignoutButton />
        </div>
      ) : (
        <p className="text-lg font-bold">
          No user is logged in. {" "}
          <a href="/sign-in" className="underline">
            Sign in?
          </a>
        </p>
      )}
    </section>
  );
};

export default DashboardPage;
