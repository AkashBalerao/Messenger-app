'use client'
import React, { useEffect, useState } from 'react';
import { CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import clsx from "clsx";
import { Event } from '@prisma/client';


function MapComponent({ events }: { events: Event[] }) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

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
              {events.map(event => (
                <CircleMarker key={event.id} center={[event.latitude, event.longitude]} radius={10}>
                    <Tooltip permanent direction="top" offset={[0, -10]}>
                        <span className={markerClassother}>{event.title}</span>
                    </Tooltip>
                    <Popup>
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-semibold text-gray-900">{event.title}</h2>
                        </div>                        
                            <p>Start Time: {new Date(event.startTime).toLocaleString()}</p>
                            <p>Latitude: {event.latitude}</p>
                            <p>Longitude: {event.longitude}</p>
                    </Popup>
                </CircleMarker>
            ))}


            {userLocation && ( // Render user's location marker only if available
            <>
              <CircleMarker center={userLocation} radius={10}>
              <Tooltip permanent direction="top" offset={[0, -10]}>
                <span className={markerClassyou}>YOU</span>
              </Tooltip>
                <Popup>
                <h2>User&apos;s Location</h2>
                  <p>Latitude: {userLocation[0]}</p>
                  <p>Longitude: {userLocation[1]}</p>
                </Popup>
              </CircleMarker>

            </>
            )}
          </MapContainer>
          </>
          )}
        </div>
      </div>
      )}
    </>
  );
}

export default MapComponent;
