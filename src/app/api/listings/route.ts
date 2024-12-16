import { prisma } from "@/lib/database"
import { NextRequest, NextResponse } from "next/server";
import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const listings = await prisma.listing.findMany({
      where: userId ? { userId } : {},
    });

    return NextResponse.json(listings, { status: 200 });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json({ error: "Failed to retrieve listings" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const userId = formData.get('userId') as string;
    const image = formData.get('image') as File;

    console.log('Received form data:', {
      title,
      description,
      price: typeof price + ' -> ' + price,
      userId,
      image: image ? image.name : 'No image provided',
    });

    // Validate all required fields are present
    if (!title || !description || isNaN(price) || !userId || !image) {
      console.error('Missing required fields:', { title, description, price, userId, image });
      return NextResponse.json(
        { 
          error: "Missing required fields",
          missingFields: Object.entries({ title, description, price, userId, image })
            .filter(([_, value]) => !value)
            .map(([key]) => key)
        }, 
        { status: 400 }
      );
    }

    // Validate userId is a valid MongoDB ObjectId
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!objectIdRegex.test(userId)) {
      console.error('Invalid userId format:', userId);
      return NextResponse.json(
        { error: "Invalid userId format" },
        { status: 400 }
      );
    }

    // First check if the user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      console.error('User not found:', userId);
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Upload image to Vercel Blob
    console.log('Uploading image to Vercel Blob');
    const blob = await put(image.name, image, { access: 'public' });
    console.log('Image uploaded successfully:', blob.url);

    // Log attempt to create listing
    console.log('Attempting to create listing with data:', {
      title,
      description,
      price,
      imageUrl: blob.url,
      userId,
    });

    // Create the listing
    const newListing = await prisma.listing.create({
      data: {
        title,
        description,
        price,
        imageUrl: blob.url,
        userId,
      },
    });

    console.log('Successfully created listing:', newListing);

    revalidatePath('/') // Revalidate the home page
    revalidatePath('/dashboard') // Revalidate the dashboard

    return NextResponse.json(newListing, { status: 201 });
  } catch (error: any) {
    console.error('Listing creation error:', {
      error: error.message,
      code: error.code,
      stack: error.stack
    });
    
    // Check for specific Prisma errors
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: "Foreign key constraint failed on userId" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create listing", details: error.message },
      { status: 500 }
    );
  }
}