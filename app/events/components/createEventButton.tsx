'use client'
import React, { useState } from 'react';
import CreateEvent from './createEvent';

const CreateEventButton: React.FC = () => {
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-10">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full shadow-md"
        onClick={() => setShowCreateEvent(true)}
      >
        Create Event
      </button>
      {showCreateEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center">
          <div className="relative">
            <CreateEvent />
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setShowCreateEvent(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEventButton;
