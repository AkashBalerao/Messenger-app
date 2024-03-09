// Import Prisma
import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

// Define a server-side function to fetch users by location
export const getUsersByLocation = async (state: string, district: string) => {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return [];
        }

        const currentUserEmail = session.user.email as string;

        // Use Prisma to query the database for users with the specified state and district
        const users = await prisma.user.findMany({
            where: {
                state,
                district,
                email: {
                    not: currentUserEmail // Exclude the current user
                }
            }
        });
        
        return users;
    } catch (error) {
        console.error('Error fetching users by location:', error);
        return [];
    }
};
