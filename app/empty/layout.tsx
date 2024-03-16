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
    <div className=" rounded-md p-4">
      
        <label className="flex items-center">
          <span className="mr-2">{availability ? "I'm Available" : "I'm Unavailable"}</span>
          <div className="ml-auto">
            <input
              type="checkbox"
              className="hidden"
              checked={availability}
              />
            <div className={`w-14 h-8 rounded-full p-1 flex items-center ${availability ? 'bg-green-500' : 'bg-gray-400'}`}>
              <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${availability ? 'translate-x-6 bg-green': ' '}`}></div>
            </div>
          </div>
        </label>
              </div>
              <div>

          <LocationBox/>
              </div>
      </div>
      
        <div className="absolute bottom-0 right-0 m-4 z-10 p-4 bg-white rounded-lg shadow-md">
          <NotificationsComponent notifications={notifications} />
        </div>
      
 </Sidebar>
  );
}




