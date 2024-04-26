import prisma from '@/app/libs/prismadb';
import { Notification } from '@prisma/client';
import { NextResponse } from "next/server";
import { pusherServer } from '@/app/libs/pusher';

export async function POST(request: Request) {
  console.log("inpost");
  try {
    const body = await request.json();
    const { recipientId, message } = body;

    // Create a new notification record
    const newNotification: Notification = await prisma.notification.create({
      data: {
        recipientId,
        message,
        read: false,
      },
    });

    console.log(`Notification created for user with ID ${recipientId}: "${message}"`);

    // Trigger the 'notifications:new' event on the 'notifications' channel
    pusherServer.trigger('notifications', 'notifications:new', newNotification);

    return NextResponse.json(newNotification);
  } catch (error) {
    console.error('Error creating notification:', error);
    return new NextResponse('Error', { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, message, read } = body;

    // Update the notification
    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: { message, read },
    });

    // Trigger the 'notifications:new' event on the 'notifications' channel
    pusherServer.trigger('notifications', 'notifications:new', updatedNotification);

    return NextResponse.json(updatedNotification);
  } catch (error) {
    console.error('Error updating notification:', error);
    return new NextResponse('Error', { status: 500 });
  }
}