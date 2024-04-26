// 'use client'
// import React, { useEffect, useState } from 'react';
// import { Notification } from '@prisma/client';
// import axios from 'axios'; // Import Axios for making HTTP requests
// import fetchNotifications from '../returnNotifications';

// interface NotificationsComponentProps {
//   notifications: Notification[];
// }

// const NotificationsComponent: React.FC<NotificationsComponentProps> = ({ notifications }) => {
//   const [updatedNotifications, setUpdatedNotifications] = useState(notifications);
//   useEffect(() => {  
//     const intervalId = setInterval(async () => {
//       console.log('k');
//       try {
//     //     // Fetch notifications every second
//         const fetchedNotifications = await fetchNotifications();
//         setUpdatedNotifications(fetchedNotifications);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     }, 100); // Fetch every second (1000 milliseconds)

//     return () => clearInterval(intervalId); // Cleanup on component unmount
//   }, []); 

//   const handleAccepted = async (notificationId: string) => {
//     console.log('Marked as read');
//     try {
//       // Make a DELETE request to update the notification as read
//       await axios.delete(`/api/notification/${notificationId}`);
//       // Filter out the deleted notification from the state
//       const updatedList = updatedNotifications.filter(notification => notification.id !== notificationId);
//       setUpdatedNotifications(updatedList);
//       // fetchNotifications();
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//       // Handle errors if necessary
//     }
//   };

//   const handleRejected = async (notificationId: string) => {
//     console.log('Marked as read');
//     try {
//       // Make a DELETE request to update the notification as read
//       await axios.delete(`/api/notification/${notificationId}`);
//       // Filter out the deleted notification from the state
//       const updatedList = updatedNotifications.filter(notification => notification.id !== notificationId);
//       setUpdatedNotifications(updatedList);
//       // fetchNotifications();
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//       // Handle errors if necessary
//     }
//   };

//   return (
//     <>
//       {updatedNotifications.length > 0 && (
//         <div>
//           <h2>Notifications</h2>
//           <ul className="notification-list">
//             {updatedNotifications.map(notification => (
//               <li key={notification.id} className="notification-item">
//                 <span>{notification.message}</span>
//                 <button onClick={() => handleAccepted(notification.id)}>✅</button>
//                 <button onClick={() => handleRejected(notification.id)}>❌</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </>
//   );
// };

// export default NotificationsComponent;

'use client'
import React, { useEffect, useState } from 'react';
import { Notification } from '@prisma/client';
import axios from 'axios';
import { pusherClient } from "@/app/libs/pusher";

interface NotificationsComponentProps {
  notifications: Notification[];
}

const NotificationsComponent: React.FC<NotificationsComponentProps> = ({ notifications }) => {
  const [updatedNotifications, setUpdatedNotifications] = useState(notifications);

  useEffect(() => {
    // Subscribe to the 'notifications' channel
    const notificationsChannel = pusherClient.subscribe('notifications');

    // Event handler for new or updated notifications
    const handleNewNotification = (newNotification: Notification) => {
      setUpdatedNotifications((prevNotifications) => {
        const existingIndex = prevNotifications.findIndex(
          (notification) => notification.id === newNotification.id
        );

        if (existingIndex !== -1) {
          // If the notification already exists, update it
          const updatedNotifications = [...prevNotifications];
          updatedNotifications[existingIndex] = newNotification;
          return updatedNotifications;
        } else {
          // If the notification is new, add it to the list
          return [...prevNotifications, newNotification];
        }
      });
    };

    // Bind the event handler to the 'notifications:new' event
    notificationsChannel.bind('notifications:new', handleNewNotification);

    // Clean up event listeners and channel subscription on component unmount
    return () => {
      notificationsChannel.unbind('notifications:new', handleNewNotification);
      notificationsChannel.unsubscribe();
    };
  }, []);

  const handleAccepted = async (notificationId: string) => {
    console.log('Notification accepted:', notificationId);
    try {
      await axios.delete(`/api/notification/${notificationId}`);
      const updatedList = updatedNotifications.filter(notification => notification.id !== notificationId);
      setUpdatedNotifications(updatedList);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleRejected = async (notificationId: string) => {
    console.log('Notification rejected:', notificationId);
    try {
      await axios.delete(`/api/notification/${notificationId}`);
      const updatedList = updatedNotifications.filter(notification => notification.id !== notificationId);
      setUpdatedNotifications(updatedList);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <>
        <div>
          <h2>Notifications</h2>
          <ul className="notification-list">
            {updatedNotifications.map(notification => (
              <li key={notification.id} className="notification-item">
                <span>{notification.message}</span>
                <button onClick={() => handleAccepted(notification.id)}>✅</button>
                <button onClick={() => handleRejected(notification.id)}>❌</button>
              </li>
            ))}
          </ul>
        </div>
    </>
  );
};

export default NotificationsComponent;