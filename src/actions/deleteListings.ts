'use server'

import { prisma } from "@/lib/database"
import { revalidatePath } from "next/cache";

export async function deleteListings(listingId: string) {
  try {
    await prisma.listing.delete({
      where: { id: listingId },
    });
    revalidatePath('/dashboard')
    revalidatePath('/')
    console.log("Paths Revalidated!")
    return { success: true };
  } catch (error) {
    console.error('Error deleting listing:', error);
    return { success: false, error: 'Failed to delete listing' };
  }
}