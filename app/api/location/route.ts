import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request,
) {
  console.log("here");
  try {
    const body = await request.json();
    console.log(body);
    const state=body[0];
    const district=body[1];

    // Retrieve the current user
    const currentUser = await getCurrentUser();
    
    if (!currentUser?.id) {
      // If current user is not found or does not have an ID, return 400 Bad Request
      return new NextResponse('Current user not found', { status: 400 });
    }
    console.log("User ID: " + currentUser.id);

    // Update the state and district fields of the current user
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        state,
        district
      }
    });

    // Print the updated user
    console.log("Updated User: ", updatedUser);

    // Return the updated user as a JSON response
    return new NextResponse(JSON.stringify(updatedUser), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error(error, 'ERROR_Location')
    // If an error occurs, return a 500 Internal Server Error response
    return new NextResponse('Error', { status: 500 });
  }
}
