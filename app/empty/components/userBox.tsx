import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {  User } from "@prisma/client";

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/modals/LoadingModal";

interface UserBoxProps {
  data: User
}

const UserBox: React.FC<UserBoxProps> = ({ 
  data
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios.post('/api/conversations', { userId: data.id })
    .then((data) => {
      router.push(`/conversations/${data.data.id}`);
    })
    .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && (
        <LoadingModal />
      )}
      <div
        onClick={handleClick}
        className="
          w-full 
          relative 
          flex 
          flex-col
          items-center 
          space-y-3
          bg-white 
          p-3 
          rounded-lg
          transition
          cursor-pointer
        "
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">
                {data.name} IS NEAR YOU
              </p>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-500 hover:bg-green-600 text-white px-3 py-1 rounded">
            Accept
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
            Decline
          </button>
        </div>
      </div>
    </>
  );
}
 
export default UserBox;
