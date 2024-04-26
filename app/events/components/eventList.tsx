'use client'
import EventBox from "./eventBox";
import React, { useState } from 'react';
import { Event } from "@prisma/client";

interface EventProps {
    items: Event[];
  }
  const EventList : React.FC<EventProps> = ({ 
    items, 
  }) => {
    const [showMyEvents, setShowMyEvents] = useState(false);
    return (
      <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-5">
        <div className="flex items-center justify-between space-x-1">
          <div className="text-2xl font-bold text-neutral-800 py-4">Events Near You</div>
        </div>
        {items.map((item) => (
          <EventBox key={item.id} data={item}/>
        ))}
      </div>
    </aside>
    );
  };
  
  export default EventList;
  