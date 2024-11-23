'use server'

import { prisma } from "@/lib/database"

export async function searchListings(query: string) {
  try {
    const listings = await prisma.listing.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
    })
    return listings
  } catch (error) {
    console.error('Error searching listings:', error)
    throw new Error('Failed to search listings')
  }
}