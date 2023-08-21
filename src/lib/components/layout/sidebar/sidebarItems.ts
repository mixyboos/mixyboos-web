interface ISidebarItem {
  id: number;
  title: string;
  path?: string;
  icon?: any;
}

import { HiAcademicCap } from "react-icons/hi2";
import {
  HiThumbUp,
  HiLogin,
  HiPencil,
  HiShoppingBag,
  HiOutlineDeviceMobile,
  HiPresentationChartBar,
} from "react-icons/hi";

const sidebarItems: ISidebarItem[] = [
  {
    id: 0,
    icon: HiShoppingBag,
    path: "dashboard/shows",
    title: "My Farts",
  },
  {
    id: 2,
    icon: HiPencil,
    path: "/dashboard/mixes",
    title: "My Mixes",
  },
  {
    id: 3,
    icon: HiLogin,
    path: "/stats",
    title: "Stats",
  },
  {
    id: 4,
    title: "SPACER",
  },
  {
    id: 5,
    icon: HiPencil,
    path: "feed",
    title: "Feed",
  },
  {
    id: 6,
    icon: HiPencil,
    path: "/shows/new",
    title: "New Shows",
  },
  {
    id: 8,
    title: "SPACER",
  },
  {
    id: 9,
    icon: HiThumbUp,
    path: "/favourites",
    title: "Favourites",
  },
  {
    id: 10,
    icon: HiAcademicCap,
    path: "/dashboard/listen-later",
    title: "Listen Later",
  },
  {
    id: 11,
    icon: HiShoppingBag,
    path: "history",
    title: "History",
  },
  {
    id: 12,
    title: "SPACER",
  },
  {
    id: 13,
    icon: HiOutlineDeviceMobile,
    path: "/categories",
    title: "Categories",
  },
  {
    id: 14,
    icon: "HiPhotograph",
    path: "trending",
    title: "Trending",
  },
  {
    id: 15,
    icon: HiPresentationChartBar,
    path: "/livenow",
    title: "Live Now",
  },
];

export default sidebarItems;
