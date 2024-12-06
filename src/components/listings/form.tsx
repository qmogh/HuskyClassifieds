'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { formSchema } from "@/schemas"
import { createListing } from "@/actions/createListings"
// import { useNavigate } from 'react-router-dom';

type FormData = z.infer<typeof formSchema>

interface ListingFormProps {
  userId: string; // Changed to be required
}

const ListingForm: React.FC<ListingFormProps> = ({ userId }) => {
  // const navigate = useNavigate();

  // const handleViewListings = () => {
  //   navigate('/dashboard');
  // };
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
      const result = await createListing(formData)

      if ('error' in result) {
        throw new Error(result.error)
      }

      setSuccessMessage(result.success)
      reset()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Form submission error:', error)
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
    {/* <button
        type="button"
        disabled={isSubmitting}
        // onClick={handleViewListings}
        className="w-full bg-white text-blue-600 border border-blue-600 py-2 px-4 rounded-md shadow hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        View Your Listings
      </button> */}

    </form>
  )
}

export default ListingForm