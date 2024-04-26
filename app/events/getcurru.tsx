'use server'
import { User } from "@prisma/client";
import getCurrentUser from "../actions/getCurrentUser";
const getCurrentUserAsync = async () => {
    try {
        // Call the function to get the current user
        const currentUser = await getCurrentUser();
        return currentUser;
    } catch (error) {
        // Handle errors if any
        console.error('Error fetching current user:', error);
        return null;
    }
};

export default getCurrentUserAsync;