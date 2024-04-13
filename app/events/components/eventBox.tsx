'use client'
import { Event } from "@prisma/client";
import { useEffect, useState } from 'react';
import { User } from "@prisma/client";
import getCurrentUserAsync from "../getcurru";
import axios from "axios";

interface EventBoxProps {
    data: Event;
}
const EventBox: React.FC<EventBoxProps> = ({ data}) => {
    const { id, title, startTime, participantIds, maxParticipants } = data;
    console.log(data);


    const [canDelete, setCanDelete] = useState(false);
    const [showDetails, setshowDetails] = useState(false);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const currentUser = await getCurrentUserAsync();
            if (currentUser && currentUser.eventIds.includes(id)) {
                setCanDelete(true);
            }
        };

        fetchCurrentUser();
    }, [id]);

    // Format the start time
    const formattedStartTime = new Date(startTime).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    });

    const handleJoin = async () => {
        try {
            const response = await axios.put(`/api/events/${id}`, {data});

            // Check if the participant was successfully added
            if (response.status === 200) {
                // Optionally, you can perform additional actions upon successful join
                console.log('Successfully joined the event');
            }
        } catch (error) {
            console.error('Error joining event:', error);
        }
    }

    const handleDetails = () => {
        setshowDetails(!showDetails);
    }

    const handleDelete = async () => {
        // Implement logic to delete the event
        console.log('Deleted event with ID:', id);
    }

    return (
        <>
        <div className="w-full relative flex flex-col items-center space-y-3 bg-white p-3 rounded-lg transition">
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

            {/* Date and Time */}
            <p className="text-sm font-medium text-gray-500">{formattedStartTime}</p>

            {/* Buttons */}
            <div className="flex space-x-3">
            {!canDelete && (
                <>
                    <button
                    onClick={handleJoin}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer transition duration-300"
                    >
                    Join
                    </button>
                    <button
                    onClick={handleDetails}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer transition duration-300"
                    >
                    Details
                    </button>
                </>
                )}
                {canDelete && (
                    <>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer transition duration-300"
                    >
                    Delete
                </button>
                <button
                onClick={handleDetails}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer transition duration-300"
                >
                Details
                </button>
                    </>
                )}

            </div>
        </div>
        {showDetails && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center">
                <div className="bg-white rounded-lg p-6 relative">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <p>Start Time: {formattedStartTime}</p>
                <p>
                    Participants: {participantIds.length} / {maxParticipants}
                </p>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleDetails}
                    >
                    Close
                </button>
                </div>
            </div>
            )}
            </>

    );
}

export default EventBox;
