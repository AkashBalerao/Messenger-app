// 'use client'
// import { Event } from "@prisma/client";
// import { useEffect, useState } from 'react';
// import { User } from "@prisma/client";
// import getCurrentUserAsync from "../getcurru";
// import Map from "./Map";
// import axios from "axios";
// import { FaClipboardList } from "react-icons/fa";
// import { AiTwotoneCalendar } from "react-icons/ai";
// import { AiFillClockCircle } from "react-icons/ai";
// import { FaLocationDot } from "react-icons/fa6";

// interface EventBoxProps {
//     data: Event;
// }

// const EventBox: React.FC<EventBoxProps> = ({ data }) => {
//     const { id, title, startTime, type, duration, latitude, longitude, participantIds, maxParticipants } = data;

//     const [canDelete, setCanDelete] = useState(false);
//     const [showDetails, setShowDetails] = useState(false);

//     useEffect(() => {
//         const fetchCurrentUser = async () => {
//             const currentUser = await getCurrentUserAsync();
//             if (currentUser && currentUser.eventIds.includes(id)) {
//                 setCanDelete(true);
//             }
//         };

//         fetchCurrentUser();
//     }, [id]);

//     // Format the start time
//     const formattedStartTime = new Date(startTime).toLocaleString(undefined, {
//         dateStyle: "medium",
//         timeStyle: "short",
//     });

//     const handleJoin = async () => {
//         try {
//             const response = await axios.put(`/api/events/${id}`, { data });

//             // Check if the participant was successfully added
//             if (response.status === 200) {
//                 // Optionally, you can perform additional actions upon successful join
//                 console.log('Successfully joined the event');
//             }
//         } catch (error) {
//             console.error('Error joining event:', error);
//         }
//     }

//     const handleDetails = () => {
//         setShowDetails(!showDetails);
//     }

//     const handleDelete = async () => {
//         try {
//             const response = await axios.delete(`/api/events/${id}`, { data });
//             console.log('Event deleted:', response.data);
//         } catch (error) {
//             console.error('Error deleting event:', error);
//         }
//     }

//     return (
//         <>
//         <div className="w-full relative flex flex-col items-start space-y-3 bg-white p-3 rounded-lg transition">
//             <div className="w-full">
//             <h2 className="relative text-xl font-semibold text-gray-900">{title}</h2>

//             </div>
//             <div className="relaive align-items-center space-x-3">
//                 {!canDelete && (
//                     <>
//                         <button
//                             onClick={handleJoin}
//                             className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-1 rounded cursor-pointer transition duration-300"
//                             >
//                             Join    
//                         </button>
//                         <button
//                             onClick={handleDetails}
//                             className="bg-green-500 hover:bg-green-600 text-white px-8 py-1 rounded cursor-pointer transition duration-300"
//                             >
//                             Details
//                         </button>
//                     </>
//                 )}
//                 {canDelete && (
//                     <>
//                         <button
//                             onClick={handleDelete}
//                             className="bg-red-500 hover:bg-red-600 text-white px-8 py-1 rounded cursor-pointer transition duration-300"
//                             >
//                             Remove
//                         </button>
//                         <button
//                             onClick={handleDetails}
//                             className="bg-green-500 hover:bg-green-600 text-white px-8 py-1 rounded cursor-pointer transition duration-300"
//                             >
//                             Details
//                         </button>
//                     </>
//                 )}
//             </div>

//             <hr className="w-full border border-gray-300" />
//             <div className="flex flex-col space-y-2">
//                 <div className="flex flex-row space-x-2 items-center">
//                     <p className="text-sm font-medium text-gray-500"><FaClipboardList/></p>
//                     <p className="text-sm font-medium text-gray-500">{type}</p>
//                 </div>
//                 <div className="flex flex-row space-x-2 items-center">
//                     <p className="text-sm font-medium text-gray-500"><AiTwotoneCalendar /></p>
//                     <p className="text-sm font-medium text-gray-500">{formattedStartTime}</p>
//                 </div>
//                 <div className="flex flex-row space-x-2 items-center">
//                     <p className="text-sm font-medium text-gray-500"><AiFillClockCircle /></p>
//                     <p className="text-sm font-medium text-gray-500">{duration}</p>
//                 </div>
//                 <div className="flex flex-row space-x-2 items-center">
//                     <p className="text-sm font-medium text-gray-500"><FaLocationDot /></p>
//                     <p className="text-sm font-medium text-gray-500">{latitude}, {longitude}</p>
//                 </div>
//             </div>
//             {showDetails && (
//                 <>
//                 <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center">
//                     <div className="bg-white rounded-lg p-6 relative">
//                         <h2 className="text-xl font-semibold mb-4">{title}</h2>
//                         <p>Start Time: {formattedStartTime}</p>
//                         <p>Type:       {type}</p>
//                         <p>Duration:   {duration}</p>
//                         <p>Location:   {latitude}, {longitude}</p>
//                         <p>Participants: {participantIds.length} / {maxParticipants}</p>
//                         <button
//                             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
//                             onClick={handleDetails}
//                             >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//                             </>
//             )}


//         </div>
//         </>
//     );
// }

// export default EventBox;

'use client'
import { Event } from "@prisma/client";
import { useEffect, useState } from 'react';
import getCurrentUserAsync from "../getcurru";
import axios from "axios";
import { FaClipboardList } from "react-icons/fa";
import { AiTwotoneCalendar } from "react-icons/ai";
import { AiFillClockCircle } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";

interface EventBoxProps {
  data: Event;
}

const EventBox: React.FC<EventBoxProps> = ({ data }) => {
  const { id, title, startTime, type, duration, latitude, longitude, participantIds, maxParticipants, ownerId } = data;

  const [canDelete, setCanDelete] = useState(false);
  const [imIn, setImIn] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [formattedDuration, setFormattedDuration] = useState('');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await getCurrentUserAsync();
      if(currentUser && currentUser.id === ownerId) {
        setCanDelete(true);
      }
      if(currentUser && participantIds.includes(currentUser.id)) {
        setImIn(true);
      }
    };

    fetchCurrentUser();
  }, [id]);

  useEffect(() => {
    // Convert duration to hours and minutes
    const totalMinutes = parseInt(String(duration), 10);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    setFormattedDuration(`${hours} hr ${minutes} min`);
  }, [duration]);

  const formattedStartTime = new Date(startTime).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const handleJoin = async () => {
    try {
      const response = await axios.put(`/api/events/${id}`, { data });
      if (response.status === 200) {
        console.log('Successfully joined the event');
      }
    } catch (error) {
      console.error('Error joining event:', error);
    }
  };

  const handleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleRemove = async () => {
    try {
      const response = await axios.delete(`/api/events/${id}`, { data});
      console.log("Successfully removed from event:", response.data);
    } catch (error) {
      console.error("Error removing from event:", error);
    }
  };
  
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/events/delete/${id}`, { data});
      console.log('Event deleted:', response.data);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <>
      <div className="w-full relative flex flex-col items-start space-y-3 bg-white p-3 transition z-50">
        <div className="w-full">
          <h2 className="relative text-xl font-semibold text-gray-900">{title}</h2>
        </div>
        <div className="relative align-items-center space-x-3 ">
                {!imIn && (
                    <>
                        <button
                            onClick={handleJoin}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-1 rounded cursor-pointer transition duration-300"
                            >
                            Join    
                        </button>
                        <button
                            onClick={handleDetails}
                            className="bg-green-500 hover:bg-green-600 text-white px-8 py-1 rounded cursor-pointer transition duration-300"
                            >
                            Details
                        </button>
                    </>
                )}
                {imIn && (
                    <>
                        <button
                            onClick={handleRemove}
                            className="bg-red-500 hover:bg-red-600 text-white px-8 py-1 rounded cursor-pointer transition duration-300"
                            >
                            Remove
                        </button>
                        <button
                            onClick={handleDetails}
                            className="bg-green-500 hover:bg-green-600 text-white px-8 py-1 rounded cursor-pointer transition duration-300"
                            >
                            Details
                        </button>
                    </>
                )}
        </div>
        <hr className="w-full border border-gray-300" />
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row space-x-2 items-center">
            <p className="text-sm font-medium text-gray-500"><FaClipboardList /></p>
            <p className="text-sm font-medium text-gray-500">{type}</p>
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <p className="text-sm font-medium text-gray-500"><AiTwotoneCalendar /></p>
            <p className="text-sm font-medium text-gray-500">{formattedStartTime}</p>
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <p className="text-sm font-medium text-gray-500"><AiFillClockCircle /></p>
            <p className="text-sm font-medium text-gray-500">{formattedDuration}</p>
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <p className="text-sm font-medium text-gray-500"><FaLocationDot /></p>
            <p className="text-sm font-medium text-gray-500">{latitude}, {longitude}</p>
          </div>
        </div>
      </div>
      {canDelete && (
        <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-600 text-white px-8 py-1 rounded cursor-pointer transition duration-300 w-full"
        >
        Delete this event
      </button>
      )}
      {showDetails && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center">
              <div className="bg-white rounded-lg p-6 relative">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <p>Start Time: {formattedStartTime}</p>
                <p>Type:       {type}</p>
                <p>Duration:   {formattedDuration}</p>
                <p>Location:   {latitude}, {longitude}</p>
                <p>Participants: {participantIds.length} / {maxParticipants}</p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
                  onClick={handleDetails}
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )}
    </>
  );
};

export default EventBox;
