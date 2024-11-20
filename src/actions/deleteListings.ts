'use server'

import { prisma } from "@/lib/database"

export async function deleteListings(listingId: string) {
  try {
    await prisma.listing.delete({
      where: { id: listingId },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting listing:', error);
    return { success: false, error: 'Failed to delete listing' };
  }
}