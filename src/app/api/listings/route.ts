import { PrismaAdapter } from "@auth/prisma-adapter"; 
import { prisma } from "@/lib/database"
import { NextResponse } from "next/server";

// Get listings (optionally by a specific userId)
export async function GET(request: Request, { params }: { params: { userId?: string } }) {
  try {
    const { userId } = params; // Get the userId from URL params (optional)

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


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Get the ID from the URL params
    const data = await request.json();

    const updatedListing = await prisma.listing.update({
      where: { id },
      data, 
    });

    return NextResponse.json(updatedListing, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
  }
}



