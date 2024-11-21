"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { formSchema } from "@/schemas"

// Define form data type
type FormData = z.infer<typeof formSchema>

interface ListingFormProps {
  userId?: string; // Expecting the userId as a prop
}

const ListingForm: React.FC<ListingFormProps> = ({ userId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })


  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSuccessMessage(null)
    setErrorMessage(null)
  
    const formData = { ...data, userId }
  
    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
  
      const responseData = await response.json()
  
      if (!response.ok) {
        throw new Error(responseData.error || "Failed to submit the listing.")
      }
  
      setSuccessMessage("Listing submitted successfully!")
      reset()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    } catch (error: any) {
      console.error('Form submission error:', error);
      setErrorMessage(error.message || "An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto p-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className="block w-full mt-1 border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description & Contact Information
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="block w-full mt-1 border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          rows={4}
        />
        {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price ($)
        </label>
        <input
          id="price"
          type="number"
          {...register("price", { valueAsNumber: true })}
          className="block w-full mt-1 border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price.message}</p>}
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          id="imageUrl"
          type="text"
          {...register("imageUrl")}
          className="block w-full mt-1 border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.imageUrl && <p className="text-sm text-red-600 mt-1">{errors.imageUrl.message}</p>}
      </div>

      {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Listing"}
      </button>
    </form>
  )
}

export default ListingForm