import Sidebar from "../components/sidebar/Sidebar";
import UserList from "./components/userList";
import getCurrentUserWithLocation from "@/app/actions/getCurrentUserLocation";
import { getUsersByLocation } from "../actions/getUsersByLocation";
import getUserAvailability from '@/app/actions/getAvaliability';
import Map from "./components/Map";
import getOneUser from "../actions/getOneuser";
import LocationBox from "./components/LocationBox";
import getUserNotifications from "../actions/getNotifications";
import NotificationsComponent from "./components/Request";

export default async function UsersLayout({
  children
}: {
  children: React.ReactNode,
}) {
  const loc = await getCurrentUserWithLocation();
  // const users = await getUsersByLocation(loc?.state as string, loc?.district as string);
  const users = await getOneUser(loc?.state as string, loc?.district as string) || [];
  const availability = await getUserAvailability() || false;

  const notifications = await getUserNotifications(); 

  let name = '';
  let location: [number, number] | null = null;

  if (users.length > 0) {
    name = users[0]?.name || '';
    const latitude = users[0]?.latitude;
    const longitude = users[0]?.longitude;
    
    if (latitude !== null && longitude !== null) {
      location = [latitude, longitude];
    }
  }

  return (
   // @ts-expect-error Server Component
   <Sidebar>
   <div className="h-full relative">  
     <Map name={name} location= {location} availability={availability} />
     <UserList items={users} />
   </div>
   <div className="absolute top-0 right-0 m-4 z-10 p-4 bg-white rounded-lg shadow-md mb-8">
      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2 text-black-700">Your Set Location</h2>
        <p className="text-gray-600">State: {loc?.state || 'None'}</p>
        <p className="text-gray-600">District: {loc?.district || 'None'}</p>
      </div>
      <div className="mt-4">
        <LocationBox/>
      </div>
    </div>


      
        <div className="absolute bottom-0 right-0 m-4 z-10 p-4 bg-white rounded-lg shadow-md">
          <NotificationsComponent notifications={notifications} />
        </div>
      
 </Sidebar>
  );
}




