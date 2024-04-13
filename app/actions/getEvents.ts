import prisma from "@/app/libs/prismadb";

const getAllEvents = async () => {
  try {
    const events = await prisma.event.findMany({
      // Optionally, you can add any filtering or sorting criteria here
      orderBy: {
        startTime: 'asc', // Order events by start time, ascending
      },
    });

    return events;
  } catch (error: any) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export default getAllEvents;
