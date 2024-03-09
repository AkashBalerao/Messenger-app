'use client'
import React, { useEffect, useState } from 'react';
import { CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import getUserAvailability from '@/app/actions/getAvaliability';
import { MapContainer, TileLayer } from 'react-leaflet';
import clsx from "clsx";
import setUserAvailability from '@/app/actions/setAvaliability';


function MapComponent({ availability }: { availability: boolean }) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [available, setAvailable] = useState(availability);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser');
      return;
    }
    navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
      if (permissionStatus.state === 'granted') {
        // If permission is granted, get user's location
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else if (permissionStatus.state === 'prompt') {
        // If permission is prompt, show a notification asking for permission
        Notification.requestPermission().then((result) => {
          if (result === 'granted') {
            // If permission is granted, get user's location
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);
              },
              (error) => {
                console.error('Error getting user location:', error);
              }
            );
          } else if (result === 'denied') {
            // If permission is denied, set state to indicate permission denied
            setPermissionDenied(true);
          }
        });
      } else if (permissionStatus.state === 'denied') {
        // If permission is denied, set state to indicate permission denied
        setPermissionDenied(true);
      }
    });
  }, []); // Run this effect only once, when the component mounts
  
  const markerClassyou = clsx('map-marker', 'bg-blue-500', 'text-white', 'p-3', 'shadow-md', 'hover:shadow-lg');
  const markerClassother = clsx('map-marker', 'bg-green-500', 'text-white', 'p-3', 'shadow-md', 'hover:shadow-lg');

  const handleToggle = () => {
    // console.log(available);
    setAvailable((prevState) => !prevState);
    // console.log(available);
  };

  return (
    <>
    {permissionDenied && <p>Please enable location access to use this feature.</p>}
      {!permissionDenied && (
      <div className="lg:pl-80 h-full relative"> {/* Add relative positioning */}
        <div className="h-full flex flex-col">
        {userLocation && (
          <>
          <MapContainer
            center={userLocation || [51.505, -0.09]} // Center the map on user's location if available, otherwise use default coordinates
            zoom={13}
            scrollWheelZoom={false}
            className="h-full"
            style={{ zIndex: 0 }} // Ensure map has lower z-index
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userLocation && ( // Render user's location marker only if available
            <>
              <CircleMarker center={userLocation} radius={10}>
              <Tooltip permanent direction="top" offset={[0, -10]}>
                <span className={markerClassyou}>YOU</span>
              </Tooltip>
                <Popup>
                  <h2>User's Location</h2>
                  <p>Latitude: {userLocation[0]}</p>
                  <p>Longitude: {userLocation[1]}</p>
                </Popup>
              </CircleMarker>
              <CircleMarker center={[17.405311, 78.507334]} radius={10} pathOptions={{ color: 'green' }} className=''>
              <div style={{ position: 'relative' }}>
                  <Tooltip 
                    permanent 
                    direction="top" 
                    offset={[0, -10]} 
                  >
                    <div>
                      <span className={markerClassother}>Other</span>
                    </div>
                  </Tooltip>
                </div>  
              <Popup>
                <h2>User's Location</h2>
                <p>Latitude: {userLocation[0]}</p>
                <p>Longitude: {userLocation[1]}</p>
              </Popup>
            </CircleMarker>
            </>
            )}
          </MapContainer>
          {/* <div className="absolute top-0 right-0 m-4 z-10 p-4 bg-white rounded-lg shadow-md">
            <label className="flex items-center">
              <span className="mr-2">{available ? "I'm Available" : "I'm Unavailable"}</span>
              <div className="ml-auto">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={available}
                  onChange={handleToggle}
                />
                <div className={`w-14 h-8 rounded-full p-1 flex items-center ${available ? 'bg-green-500' : 'bg-gray-400'}`}>
                  <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${available ? 'translate-x-6 bg-green': ' '}`}></div>
                </div>
              </div>
            </label>
          </div> */}
          </>
          )}
        </div>
      </div>
      )}
    </>
  );
}

export default MapComponent;
