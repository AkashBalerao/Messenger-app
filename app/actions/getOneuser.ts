import { getUsersByLocation } from "./getUsersByLocation";
import prisma, { User } from "@prisma/client"; // Import the User type from Prisma
import getUsers from "./getUsers";
import getSession from "./getSession";

// Define a function to get one user where available is true from the provided array
const getOneUser = async (state: string, district: string) => {
  try {
    // Get users by location
    const users = await getUsersByLocation(state, district);

    let foundUser: User | null = null; // Explicitly type foundUser as User | null

    // Iterate over the array of users
    for (const user of users) {
      // Check if the user's available property is true
      if (user.available === true) {
        // Store the user if available is true
        let d=true;
        const otherUser = await getUsers();
          for (const thisuser of otherUser) {
            if (thisuser.id === user.id) {
              // Handle the condition where the user is found in other users
              d=false;
              break;
            }
          }
          if (d==false) {
            continue;
          }
        foundUser = user;
        // await prisma.user.update({
        //     where: { id: user.id },
        //     data: { available: false }
        // });
        break; // Exit the loop once a user is found
      }
    }
    
    // Return the found user (or an empty array if not found)
    return foundUser ? [{ ...foundUser, location: [foundUser.latitude, foundUser.longitude] }] : [];
  } catch (error) {
    console.error('Error fetching user:', error);
    return []; // Return an empty array in case of error
  }
};

export default getOneUser;
