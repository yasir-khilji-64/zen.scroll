import { ReactNode } from 'react';
import { Bell, Home, Layers3, PenBox, Search } from 'lucide-react';

type SidebarLinkType = {
  label: string;
  route: string;
  icon: ReactNode;
};

const SidebarLinks: SidebarLinkType[] = [
  {
    label: 'Home',
    route: '/',
    icon: <Home className="size-6" />,
  },
  {
    label: 'Spaces',
    route: '/spaces',
    icon: <Layers3 className="size-6" />,
  },
  {
    label: 'Zencast',
    route: '/post',
    icon: <PenBox className="size-6" />,
  },
  {
    label: 'Search',
    route: '/search',
    icon: <Search className="size-6" />,
  },
  {
    label: 'Notifications',
    route: '/notifications',
    icon: <Bell className="size-6" />,
  },
];

export default SidebarLinks;
