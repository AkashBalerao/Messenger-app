import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/modals/LoadingModal";

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(
    (shouldHandleClick: boolean) => {
      if (shouldHandleClick) {
        setIsLoading(true);

        axios.post("/api/notification", {
          recipientId: data.id,
          message: `You have a friend request from ${data.name}. Click to view.`
        });

        axios
          .post("/api/conversations", { userId: data.id })
          .then((response) => {
            router.push(`/conversations/${response.data.id}`);
          })
          .finally(() => setIsLoading(false));
      }
    },
    [data, router]
  );

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
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
        "
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">
                {data.name} IS NEAR YOU
              </p>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => handleClick(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer transition duration-300"
          >
            Accept
          </button>
          <button
            onClick={() => handleClick(false)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer transition duration-300"
          >
            Decline
          </button>
        </div>
      </div>
    </>
  );
};

export default UserBox;