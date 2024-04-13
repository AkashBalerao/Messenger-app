import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PUT(
  request: Request,
) {
  try {
    // Parse the request body
    const lbody = await request.json();
    const body = lbody.data;
    console.log("Request body:", body);

    // Extract event ID and maxParticipants from the request body
    const { id, maxParticipants } = body;

    // Retrieve the current user
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      // If current user is not found or does not have an ID, return 400 Bad Request
      return new NextResponse('Current user not found', { status: 400 });
    }

    // Retrieve the event to update
    const existingEvent = await prisma.event.findUnique({
      where: { id },
      include: { participants: true } // Include participants to access current participantIds
    });

    if (!existingEvent) {
      // If event with the provided ID is not found, return 404 Not Found
      return new NextResponse('Event not found', { status: 404 });
    }

    // Check if the current user is already a participant in the event
    const isParticipant = existingEvent.participants.some(participant => participant.id === currentUser.id);

    if (isParticipant) {
      // If the current user is already a participant, return 400 Bad Request (Optional: You can handle this differently based on your requirements)
      return new NextResponse('User is already a participant', { status: 400 });
    }

    // Check if the event has reached its maximum number of participants
    if (existingEvent.participants.length >= maxParticipants) {
      // If the event has reached its maximum participants, return 400 Bad Request (Optional: You can handle this differently based on your requirements)
      return new NextResponse('Event has reached maximum participants', { status: 400 });
    }

    // Update the event to add the current user's ID to participantIds
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        participants: {
          connect: { id: currentUser.id }
        }
      }
    });

    // Return the updated event as a JSON response
    return new NextResponse(JSON.stringify(updatedEvent), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error(error, 'Error updating event');
    // If an error occurs, return a 500 Internal Server Error response
    return new NextResponse('Error updating event', { status: 500 });
  }
}
