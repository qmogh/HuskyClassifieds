'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { formSchema } from "@/schemas"
import { Upload, X } from 'lucide-react'

const updatedFormSchema = formSchema.omit({ imageUrl: true }).extend({
  image: z.instanceof(File).optional(),
})

type FormData = z.infer<typeof updatedFormSchema>

interface ListingFormProps {
  userId: string;
}

export default function ListingForm({ userId }: ListingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(updatedFormSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSuccessMessage(null)
    setErrorMessage(null)

    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          if (key === 'price') {
            formData.append(key, value.toString())
          } else if (value instanceof File) {
            formData.append(key, value)
          } else {
            formData.append(key, value as string)
          }
        }
      })
      formData.append('userId', userId)

      const response = await fetch('/api/listings', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "An unexpected error occurred.")
      }

      setSuccessMessage("Listing created successfully")
      reset()
      setPreviewImage(null)
    } catch (error: any) {
      console.error('Form submission error:', error)
      setErrorMessage(error.message || "An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0])
    }
  }

  const handleImageChange = (file: File) => {
    setValue("image", file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setValue("image", undefined)
    setPreviewImage(null)
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

      <div
        className={`relative border-2 border-dashed rounded-md p-4 ${
          dragActive ? "border-blue-500" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="image"
          accept="image/*"
          className="hidden"
          {...register("image")}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleImageChange(e.target.files[0])
            }
          }}
        />
        {previewImage ? (
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full h-auto rounded-md"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">
              Drag and drop an image here, or click to select a file
            </span>
          </label>
        )}
      </div>
      {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image.message}</p>}

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