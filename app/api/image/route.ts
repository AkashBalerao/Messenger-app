import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    // Convert the request body from a ReadableStream to a string
    const bodyString = await request.text();
    // Parse the string as JSON
    const body = JSON.parse(bodyString);

    const { image } = body;
    
    const currentUser = await getCurrentUser();
    
    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        image, // Directly assign the base64 string to the 'image' field
      },
    });

    console.log(updatedUser.image);
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error, 'ERROR_MESSAGES');
    return new NextResponse('Error', { status: 500 });
  }
}
