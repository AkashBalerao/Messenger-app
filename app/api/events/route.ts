import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request,
) {
  try {
    // Parse the request body
    const body = await request.json();
    console.log("Request body:", body);

    // Extract event data from the request body
    const { title, startTime, latitude, longitude, maxParticipants } = body;

    // Retrieve the current user
    const currentUser = await getCurrentUser();
    
    if (!currentUser?.id) {
      // If current user is not found or does not have an ID, return 400 Bad Request
      return new NextResponse('Current user not found', { status: 400 });
    }
    console.log("User ID: " + currentUser.id);

    // Create the event
    const createdEvent = await prisma.event.create({
      data: {
        title,
        startTime,
        latitude,
        longitude,
        // Associate the event with the current user
        participants: {
          connect: { id: currentUser.id }
        },
        maxParticipants,
      }
    });

    // Print the created event
    console.log("Created Event:", createdEvent);

    // Return the created event as a JSON response
    return new NextResponse(JSON.stringify(createdEvent), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error(error, 'Error creating event');
    // If an error occurs, return a 500 Internal Server Error response
    return new NextResponse('Error creating event', { status: 500 });
  }
}
