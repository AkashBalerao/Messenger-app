import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getUserAvailability = async () => {
    const currentUser = await getCurrentUser();
    try {
        if (!currentUser) {
          return null;
        }
        return currentUser.available;
        } catch (error: any) {
        return null;
      }
};

export default getUserAvailability;