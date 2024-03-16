import prisma from '@/app/libs/prismadb';
import { Notification } from '@prisma/client';
import { NextResponse } from "next/server";


export async function POST(
  request: Request,
) {  
  console.log("inpost");
  
  try {
    const body=await request.json();
    const { recipientId, message } = body;
    // Create a new notification record
    const newNotification: Notification = await prisma.notification.create({
      data: {
        recipientId,
        message,
        read: false, // Set read status to false by default
      },
    });

    console.log(`Notification created for user with ID ${recipientId}: "${message}"`);

    // Respond with a success message
    return NextResponse.json(newNotification)
  } catch (error) {
    console.error('Error creating notification:', error);
    // Respond with an error message
    return new NextResponse('Error', { status: 500 });
  }
}
