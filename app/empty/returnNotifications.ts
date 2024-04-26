'use server'
import getUserNotifications from '@/app/actions/getNotifications';
import { Notification } from '@prisma/client';

export default async function fetchNotifications(): Promise<Notification[]> {
    try {  
        // Fetch notifications
        const fetchedNotifications = await getUserNotifications();
        // Return the fetched notifications
        return fetchedNotifications;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        // Return an empty array or handle the error as needed
        return [];
    }
}
