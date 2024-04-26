import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function DELETE(
    request: Request,
  ) {
    try {
      // Parse the request body
      const body = await request.json();
      console.log("Request body:", body);
  
      // Extract event ID from the request body
      const { id } = body;
      console.log("id", id);
  
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
  
      // Check if the current user is the owner of the event
      if (existingEvent.ownerId !== currentUser.id) {
        // If the current user is not the owner, return 403 Forbidden
        return new NextResponse('User is not the owner of this event', { status: 403 });
      }
  
      // Delete the event from the database
      await prisma.event.delete({
        where: { id }
      });
  
      // Return success message
      return new NextResponse('Event deleted', { status: 200 });
  
    } catch (error) {
      console.error(error, 'Error deleting event');
      // If an error occurs, return a 500 Internal Server Error response
      return new NextResponse('Error deleting event', { status: 500 });
    }
  }
  