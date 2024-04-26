import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const setUserAvailability = async () => {
    const currentUser = await getCurrentUser();
    try {
        if (!currentUser) {
            throw new Error("No current user found");
        }
        await prisma.user.update({
            where: { id: currentUser.id },
            data: { available: !currentUser.available }
        });
        } catch (error: any) {
        throw new Error("Error toggling user availability: " + error.message);
      }
};

export default setUserAvailability;