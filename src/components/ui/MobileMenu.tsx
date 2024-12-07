/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface MobileMenuProps {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
  onSignOut: () => void;
}



export function MobileMenu({ session, onSignOut }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#0e1837] p-4 z-50">
          <nav className="flex flex-col space-y-4">
          <Link href="/free" className="text-white hover:text-gray-300">
              Free!
            </Link>
            <Link href="/sell" className="text-white hover:text-gray-300">
              Sell
            </Link>
            <Link href="/dashboard" className="text-white hover:text-gray-300">
              Dashboard
            </Link>
            {session && (
              <Button
                onClick={onSignOut}
                variant="ghost"
                className="text-white hover:text-gray-300 justify-start p-0"
              >
                Log Out
              </Button>
            )}
          </nav>
        </div>
      )}
    </div>
  )
}/* eslint-enable @typescript-eslint/no-unused-vars */