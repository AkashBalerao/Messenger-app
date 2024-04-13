'use server'
import Sidebar from "../components/sidebar/Sidebar";
import EventList from "./components/eventList";
import Map from "./components/Map";
import getAllEvents from "../actions/getEvents";
import CreateEventButton from "./components/createEventButton";
export default async function EventsLayout({
  children
}: {
  children: React.ReactNode,
}) {
    const events = await getAllEvents();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
        <Map events={events}/>
        <EventList items={events}/>
        <CreateEventButton/>
        
    </Sidebar>
  );
}
