import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getCurrentUserWithLocation = async ()=> {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUserWithLocation = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      },
      select: {
        state: true, // Include state field
        district: true // Include district field
      }
    });

    if (!currentUserWithLocation) {
      return null;
    }

    return currentUserWithLocation;
  } catch (error: any) {
    console.error("Error retrieving current user:", error);
    return null;
  }
};

export default getCurrentUserWithLocation;
