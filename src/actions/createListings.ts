'use server'

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


import { revalidatePath } from 'next/cache'
import { formSchema } from "@/schemas"
import { z } from "zod"

const serverFormSchema = formSchema.extend({
  userId: z.string(),
})



export async function createListing(formData: FormData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/createListing`, {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || "An unexpected error occurred.")
    }

    revalidatePath('/') // Revalidate the home page
    revalidatePath('/dashboard') // Revalidate the dashboard

    return { success: "Listing created successfully" }
  } catch (error) {
    console.error('Error creating listing:', error)
    return { error: "Failed to create listing" }
  }
}

// export async function createListing(data: ServerFormData) {
//   const validatedFields = serverFormSchema.safeParse(data)

//   if (!validatedFields.success) {
//     return { error: "Invalid form data" }
//   }

//   const { userId, ...listingData } = validatedFields.data

//   try {
//     const newListing = await prisma.listing.create({
//       data: {
//         ...listingData,
//         user: { connect: { id: userId } },
//       },
//     })

//     console.log(newListing)

//     revalidatePath('/') // Revalidate the home page
//     revalidatePath('/dashboard') // Revalidate the dashboard
//     console.log("Paths Revalidated!")

//     return { success: "Listing created successfully" }
//   } catch (error) {
//     console.error('Error creating listing:', error)
//     return { error: "Failed to create listing" }
//   }
// }



/* eslint-enable @typescript-eslint/no-unused-vars */
/* eslint-enable @typescript-eslint/no-explicit-any */