import { PrismaAdapter } from "@auth/prisma-adapter"; 
import { prisma } from "@/lib/database"
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { userId?: string } }) {
  try {
    const { userId } = params; // Get the userId from URL params (optional)

    // If userId is provided, filter listings by userId, otherwise get all listings
    const listings = await prisma.listing.findMany({
      where: userId ? { userId } : {}, // If userId is provided, use it for filtering
    });

    return NextResponse.json(listings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve listings" }, { status: 500 });
  }
}



// Delete a listing by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Get the ID from the URL params

    const deletedListing = await prisma.listing.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Listing deleted successfully", deletedListing }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete listing" }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received request body:', JSON.stringify(data, null, 2));
    
    const { title, description, price, imageUrl, userId } = data;
    
    // Log individual fields
    console.log('Parsed fields:', {
      title,
      description,
      price: typeof price + ' -> ' + price,
      imageUrl,
      userId,
    });

    // Validate all required fields are present
    if (!title || !description || price === undefined || !imageUrl || !userId) {
      console.error('Missing required fields:', { title, description, price, imageUrl, userId });
      return NextResponse.json(
        { 
          error: "Missing required fields",
          missingFields: Object.entries({ title, description, price, imageUrl, userId })
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

    // Validate price is a number
    if (typeof price !== 'number') {
      console.error('Invalid price format:', {
        value: price,
        type: typeof price
      });
      return NextResponse.json(
        { error: "Price must be a number" },
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

    // Log attempt to create listing
    console.log('Attempting to create listing with data:', {
      title,
      description,
      price,
      imageUrl,
      userId,
    });

    // Create the listing
    const newListing = await prisma.listing.create({
      data: {
        title,
        description,
        price,
        imageUrl,
        userId,
      },
    });

    console.log('Successfully created listing:', newListing);

    return NextResponse.json(newListing, { status: 201 });
  } catch (error) {
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


// Old route
// export async function POST(request: Request) {
//   try {
//     const { title, description, price, imageUrl, userId } = await request.json();

//     const newListing = await prisma.listing.create({
//       data: {
//         title,
//         description,
//         price,
//         imageUrl,
//         userId, // Ensure you're passing the authenticated user's ID here
//       },
//     });

//     return NextResponse.json(newListing, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
//   }
// }


// Not implementing yet.
// export async function PUT(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const { id } = params; // Get the ID from the URL params
//     const data = await request.json();

//     const updatedListing = await prisma.listing.update({
//       where: { id },
//       data, 
//     });

//     return NextResponse.json(updatedListing, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
//   }
// }



