'use client';
import { User } from "@prisma/client";
import UserBox from "./userBox";

interface NearUsersProps {
  items: User[];
}

const UserList: React.FC<NearUsersProps> = ({ 
  items, 
}) => {
  return ( 
    <aside 
      className="
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200
        block w-full left-0
      "
    >
      <div className="px-5">
        <div className="flex-col">
          <div 
            className="
              text-2xl 
              font-bold 
              text-neutral-800 
              py-4
            "
          >
            People Near You
          </div>
        </div>
        {items.map((item) => (
          <UserBox
            data={item}
          />
        ))}
      </div>
    </aside>
  );
}
 
export default UserList;
