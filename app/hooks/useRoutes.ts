import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BiSolidNetworkChart } from "react-icons/bi";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(() => [
    {
      label: 'Events',
      href: '/events',
      icon: BiSolidNetworkChart,
      active: pathname === '/events'
    },
    {   
      label: 'Chat', 
      href: '/conversations', 
      icon: HiChat,
      active: pathname === '/conversations' || !!conversationId
    },
    { 
      label: 'Users', 
      href: '/users', 
      icon: HiUsers, 
      active: pathname === '/users'
    },
    {
      label: 'Empty Page', 
      href: '/empty', 
      icon:  BsFillPersonPlusFill,
      active: pathname === '/empty'
    },
    {
      label: 'Logout', 
      onClick: () => signOut(),
      href: '#',
      icon: HiArrowLeftOnRectangle, 
    }
  ], [pathname, conversationId]);

  return routes;
};

export default useRoutes;
