import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Menu, ShoppingCart, Plus } from 'lucide-react'
import Link from "next/link"

export default function Component() {
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
            <Link href="/sign-in" className="hover:text-gray-300">
              Sign-In
            </Link>
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
// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
