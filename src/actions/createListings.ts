'use server'

import { prisma } from "@/lib/database"
import { revalidatePath } from 'next/cache'
import { formSchema } from "@/schemas"
import { z } from "zod"

const serverFormSchema = formSchema.extend({
  userId: z.string(),
})

type ServerFormData = z.infer<typeof serverFormSchema>

export async function createListing(data: ServerFormData) {
  const validatedFields = serverFormSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: "Invalid form data" }
  }

  const { userId, ...listingData } = validatedFields.data

  try {
    const newListing = await prisma.listing.create({
      data: {
        ...listingData,
        user: { connect: { id: userId } },
      },
    })

    revalidatePath('/') // Revalidate the home page
    revalidatePath('/dashboard') // Revalidate the dashboard
    console.log("Paths Revalidated!")

    return { success: "Listing created successfully" }
  } catch (error) {
    console.error('Error creating listing:', error)
    return { error: "Failed to create listing" }
  }
}