// import prisma from "@/app/libs/prismadb";
// import getSession from "./getSession";

// const getUsers = async () => {
//   const session = await getSession();

//   if (!session?.user?.email) {
//     return [];
//   }

//   try {
//     const users = await prisma.conversation.findMany({
//       orderBy: {
//         createdAt: 'desc'
//       },
//       where: {
//         NOT: {
//           email: session.user.email
//         }
//       }
//     });

//     return users;
//   } catch (error: any) {
//     return [];
//   }
// };

// export default getUsers;
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getUsers = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        userIds: {
          has: currentUser.id
        }
      },
      include: {
        users: true
      }
    });

    // Extract other users from conversations
    const otherUsers = conversations.flatMap(conversation =>
      conversation.users.filter(user => user.id !== currentUser.id)
    );

    // Deduplicate users
    const uniqueUsers = otherUsers.filter((user, index) => otherUsers.findIndex(u => u.id === user.id) === index);
    console.log('uniqueUsers', uniqueUsers);

    return uniqueUsers;
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export default getUsers;

