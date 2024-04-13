'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    startTime: '',
    latitude: 0,
    longitude: 0,
    maxParticipants: 0, // Add maxParticipants to the initial state
  });

  const [eventCreated, setEventCreated] = useState(false); // State for tracking event creation


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // If the input is for the start time field, format the value as ISO-8601 DateTime
    const formattedValue = name === 'startTime' ? value.slice(0, 16) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));

    if (name === 'latitude') {
      setLat(parseFloat(value));
    }
    if (name === 'longitude') {
      setLon(parseFloat(value));
    }
    if (name === 'maxParticipants') {
      setFormData((prevData) => ({
        ...prevData,
        maxParticipants: parseInt(value),
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert latitude and longitude strings to number
    // Convert startTime to ISO-8601 DateTime format
    const isoStartTime = new Date(formData.startTime).toISOString();

    // Update formData with the converted latitude, longitude, and startTime
    const updatedFormData = {
      ...formData,
      latitude: lat,
      longitude: lon,
      startTime: isoStartTime,
      maxParticipents: formData.maxParticipants
    };

    try {
      const response = await axios.post('/api/events', updatedFormData);
      console.log('Event created:', response.data);
      setEventCreated(true);
      // Optionally, you can redirect the user to another page or perform other actions upon successful event creation
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="w-96 h-auto bg-white rounded-lg p-8 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold" htmlFor="startTime">
            Start Time:
          </label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold" htmlFor="latitude">
            Latitude:
          </label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold" htmlFor="longitude">
            Longitude:
          </label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold" htmlFor="maxParticipants">
            Max Participants:
          </label>
          <input
            type="number"
            id="maxParticipants"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Create Event
        </button>
      </form>
      {eventCreated && (
        <p className="mt-4 text-green-500">Event created!</p>
      )}
    </div>
  );
};

export default CreateEvent;
