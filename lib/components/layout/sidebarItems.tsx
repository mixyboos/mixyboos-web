import {
  MdHistory,
  MdOutlineCategory,
  MdOutlineDynamicFeed,
  MdOutlinePersonRemoveAlt1,
  MdOutlineQueryStats,
  MdOutlineQueueMusic,
  MdOutlineThumbUp,
  MdOutlineTrendingUp,
  MdOutlineWbIridescent,
  MdSpaceDashboard,
} from 'react-icons/md';
import { GrAssistListening } from 'react-icons/gr';
import { RiBroadcastFill } from 'react-icons/ri';
import { ReactElement } from 'react';

interface ISidebarItem {
  id: number;
  title: string;
  path?: string;
  icon?: ReactElement;
}
const sidebarItems: ISidebarItem[] = [
  {
    id: 0,
    icon: <MdSpaceDashboard className="w-6 h-6" />,
    path: '/dashboard',
    title: 'Dashboard',
  },
  {
    id: 1,
    icon: <MdOutlinePersonRemoveAlt1 className="w-6 h-6" />,
    path: '/dashboard/my/shows',
    title: 'My Shows',
  },
  {
    id: 2,
    icon: <MdOutlineQueueMusic className="w-6 h-6" />,
    path: '/dashboard/tracks',
    title: 'My Tracks',
  },
  {
    id: 3,
    icon: <MdOutlineQueryStats className="w-6 h-6" />,
    path: '/stats',
    title: 'Stats',
  },
  {
    id: 4,
    title: 'SPACER',
  },
  {
    id: 5,
    icon: <MdOutlineDynamicFeed className="w-6 h-6" />,
    path: '/feed',
    title: 'Feed',
  },
  {
    id: 6,
    icon: <MdOutlineWbIridescent className="w-6 h-6" />,
    path: '/shows/new',
    title: 'New Shows',
  },
  {
    id: 8,
    title: 'SPACER',
  },
  {
    id: 9,
    icon: <MdOutlineThumbUp className="w-6 h-6" />,
    path: '/favourites',
    title: 'Favourites',
  },
  {
    id: 10,
    icon: <GrAssistListening className="w-6 h-6" />,
    path: '/dashboard/listen-later',
    title: 'Listen Later',
  },
  {
    id: 11,
    icon: <MdHistory className="w-6 h-6" />,
    path: '/history',
    title: 'History',
  },
  {
    id: 12,
    title: 'SPACER',
  },
  {
    id: 13,
    icon: <MdOutlineCategory className="w-6 h-6" />,
    path: '/categories',
    title: 'Categories',
  },
  {
    id: 14,
    icon: <MdOutlineTrendingUp className="w-6 h-6" />,
    path: '/trending',
    title: 'Trending',
  },
  {
    id: 15,
    icon: <RiBroadcastFill className="w-6 h-6" />,
    path: '/livenow',
    title: 'Live Now',
  },
];
export default sidebarItems;
