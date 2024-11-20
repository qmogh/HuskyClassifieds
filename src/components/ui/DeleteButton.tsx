'use client'

import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import { deleteListings } from "@/actions/deleteListings"
import { useRouter } from 'next/navigation'

export default function DeleteButton({ listingId }: { listingId: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    const result = await deleteListings(listingId)
    if (result.success) {
      router.refresh()
    } else {
      console.error('Failed to delete listing')
      // You might want to show an error message to the user here
    }
  }

  return (
    <Button onClick={handleDelete} variant="destructive" size="sm" className="flex items-center">
      <Trash2 className="w-4 h-4 mr-2" />
      Delete
    </Button>
  )
}