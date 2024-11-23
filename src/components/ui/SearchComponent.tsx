'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex max-w-md mx-auto">
      <Input
        className="rounded-r-none"
        placeholder="Search for furniture..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button type="submit" className="rounded-l-none bg-[#0e1837]">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  )
}