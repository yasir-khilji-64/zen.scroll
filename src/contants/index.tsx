import { ReactNode } from 'react';
import { Bell, Home, Layers, PenBox, Search } from 'lucide-react';

type SidebarLinkType = {
  label: string;
  route: string;
  icon: ReactNode;
};

export const SidebarLinks: SidebarLinkType[] = [
  {
    label: 'Home',
    route: '/',
    icon: <Home className="h-5 w-5" />,
  },
  {
    label: 'Spaces',
    route: '/space',
    icon: <Layers className="h-5 w-5" />,
  },
  {
    label: 'Zencast',
    route: '/post',
    icon: <PenBox className="h-5 w-5" />,
  },
  {
    label: 'Search',
    route: '/search',
    icon: <Search className="h-5 w-5" />,
  },
  {
    label: 'Notifications',
    route: '/notifications',
    icon: <Bell className="h-5 w-5" />,
  },
];
