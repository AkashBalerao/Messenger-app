import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getUserNotifications = async () => {
    const currUser = await getCurrentUser();
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        recipientId: currUser?.id,
        read: false, // Optionally, you can filter unread notifications
      },
      orderBy: {
        createdAt: 'desc', // Order notifications by creation date, newest first
      },
    });

    return notifications;
  } catch (error: any) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

export default getUserNotifications;
