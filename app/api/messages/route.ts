import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from '@/app/libs/pusher'
import prisma from "@/app/libs/prismadb";

// export async function POST(
//   request: Request,
// ) {
//   try {
//     const currentUser = await getCurrentUser();
//     const body = await request.json();
//     const {
//       message,
//       image,
//       conversationId
//     } = body;
//     console.log(message);

//     if (!currentUser?.id || !currentUser?.email) {
//       return new NextResponse('Unauthorized', { status: 401 });
//     }

//     const newMessage = await prisma.message.create({
//       include: {
//         seen: true,
//         sender: true
//       },
//       data: {
//         body: message,
//         image: image,
//         conversation: {
//           connect: { id: conversationId }
//         },
//         sender: {
//           connect: { id: currentUser.id }
//         },
//         seen: {
//           connect: {
//             id: currentUser.id
//           }
//         },
//       }
//     });

    
//     const updatedConversation = await prisma.conversation.update({
//       where: {
//         id: conversationId
//       },
//       data: {
//         lastMessageAt: new Date(),
//         messages: {
//           connect: {
//             id: newMessage.id
//           }
//         }
//       },
//       include: {
//         users: true,
//         messages: {
//           include: {
//             seen: true
//           }
//         }
//       }
//     });

//     await pusherServer.trigger(conversationId, 'messages:new', newMessage);


//     const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

//     updatedConversation.users.map((user) => {
//       pusherServer.trigger(user.email!, 'conversation:update', {
//         id: conversationId,
//         messages: lastMessage
//       });
//     });

//     return NextResponse.json(newMessage)
//   } catch (error) {
//     console.log(error, 'ERROR_MESSAGES')
//     return new NextResponse('Error', { status: 500 });
//   }
// }

export async function POST(request: Request) {
  try {
    console.log('Start POST function');

    const currentUser = await getCurrentUser();
    console.log('currentUser:', currentUser);

    const body = await request.json();
    console.log('Body:', body);
    
    const {
      message,
      image,
      conversationId
    } = body;
    console.log('Message:', message);
    console.log('Image:', image);
    console.log('Conversation ID:', conversationId);

    if (!currentUser?.id || !currentUser?.email) {
      console.log('Unauthorized user');
      return new NextResponse('Unauthorized', { status: 401 });
    }

    console.log('Creating new message...');
    const newMessage = await prisma.message.create({
      include: {
        seen: true,
        sender: true
      },
      data: {
        body: message,
        image: image,
        conversation: {
          connect: { id: conversationId }
        },
        sender: {
          connect: { id: currentUser.id }
        },
        seen: {
          connect: {
            id: currentUser.id
          }
        },
      }
    });

    console.log('New message created:', newMessage);

    // Rest of your existing code
    const updatedConversation = await prisma.conversation.update({
            where: {
              id: conversationId
            },
            data: {
              lastMessageAt: new Date(),
              messages: {
                connect: {
                  id: newMessage.id
                }
              }
            },
            include: {
              users: true,
              messages: {
                include: {
                  seen: true
                }
              }
            }
          });

    console.log('Triggering Pusher server...');
    await pusherServer.trigger(conversationId, 'messages:new', newMessage);

    console.log('Pusher server triggered successfully');

    const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

    console.log('Last message:', lastMessage);

    updatedConversation.users.map((user) => {
      console.log('Triggering conversation update for user:', user.email);
      pusherServer.trigger(user.email!, 'conversation:update', {
        id: conversationId,
        messages: lastMessage
      });
    });

    console.log('All triggers completed successfully');

    return NextResponse.json(newMessage)
  } catch (error) {
    // Log the error to identify the exact line
    console.error('Error occurred in POST function:', error);
    return new NextResponse('Error', { status: 500 });
  }
}
