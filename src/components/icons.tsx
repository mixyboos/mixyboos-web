import {
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandReddit,
  IconBrandTwitter,
} from '@tabler/icons-react'
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowLeftFromLine,
  ArrowRight,
  Bell,
  CalendarHeart,
  CassetteTape,
  ChartLine,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDashedIcon,
  ClipboardCheck,
  Copy,
  CreditCard,
  Dna,
  DownloadCloud,
  Euro,
  Eye,
  File,
  FileText,
  Globe,
  Heart,
  HeartIcon,
  HelpCircle,
  Home,
  Image,
  ImagePlus,
  Keyboard,
  Laptop,
  Link,
  Loader2,
  LocateFixed,
  Lock,
  LogIn,
  LogOut,
  Mail,
  Menu,
  MonitorPlay,
  Moon,
  MoreVertical,
  Paintbrush,
  PartyPopper,
  Pause,
  PauseCircle,
  Pencil,
  PersonStanding,
  Pin,
  Pizza,
  Play,
  PlayCircleIcon,
  Plus,
  RadioTower,
  RefreshCcw,
  Repeat2,
  Rocket,
  Save,
  SendHorizontal,
  Settings,
  Share2,
  SkipBack,
  SkipForward,
  SunMedium,
  Trash,
  TrendingUp,
  UploadCloud,
  User,
  UserCog,
  UserPlus,
  Users,
  UsersRound,
  Video,
  Voicemail,
  X,
} from 'lucide-react'
import type { LucideIcon, LucideProps } from 'lucide-react'

export type Icon = LucideIcon

export const Icons = {
  activity: Activity,
  add: Plus,
  arrowRight: ArrowRight,
  back: ArrowLeftFromLine,
  bell: Bell,
  billing: CreditCard,
  broadcast: RadioTower,
  check: Check,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  close: X,
  copy: Copy,
  copyDone: ClipboardCheck,
  creditCard: CreditCard,
  delete: Trash,
  discover: LocateFixed,
  download: DownloadCloud,
  ellipsis: MoreVertical,
  error: AlertCircle,
  eye: Eye,
  facebook: IconBrandFacebook,
  follow: UserPlus,
  genre: Dna,
  globe: Globe,
  graph: ChartLine,
  heart: Heart,
  help: HelpCircle,
  home: Home,
  imagePlus: ImagePlus,
  keyboard: Keyboard,
  laptop: Laptop,
  link: Link,
  liveNow: RadioTower,
  liveStream: MonitorPlay,
  loading: Loader2,
  lock: Lock,
  login: LogIn,
  logout: LogOut,
  love: HeartIcon,
  media: Image,
  menu: Menu,
  message: Mail,
  mix: CassetteTape,
  money: Euro,
  moon: Moon,
  next: SkipForward,
  page: File,
  paintbrush: Paintbrush,
  pause: Pause,
  pauseCircle: PauseCircle,
  pencil: Pencil,
  person: PersonStanding,
  people: UsersRound,
  pizza: Pizza,
  play: Play,
  playCircle: PlayCircleIcon,
  post: FileText,
  previous: SkipBack,
  recent: PartyPopper,
  record: Voicemail,
  refresh: RefreshCcw,
  register: UserPlus,
  retweet: Repeat2,
  remind: Pin,
  save: Save,
  schedule: CalendarHeart,
  send: SendHorizontal,
  settings: Settings,
  share: Share2,
  submit: Rocket,
  sun: SunMedium,
  trash: Trash,
  trending: TrendingUp,
  twitter: IconBrandTwitter,
  upload: UploadCloud,
  user: User,
  users: Users,
  userSettings: UserCog,
  verticalDots: MoreVertical,
  video: Video,
  waiting: CircleDashedIcon,
  warning: AlertTriangle,
  instagram: IconBrandInstagram,
  github: IconBrandGithub,
  discord: IconBrandDiscord,
  reddit: IconBrandReddit,

  google: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="24px"
      height="24px"
      {...props}
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.712,34.464,44,28.756,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  ),
  mixyboos: (props: LucideProps) => (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 2000 2500"
    >
      <g>
        <path d="M1577.2,799.5c-23-54.3-53.1-104.5-90-150l101.2-119.8c2.3-2.7,3.5-6.1,3.5-9.7V345.3c0-8.3-6.7-15-15-15s-15,6.7-15,15   v169.2l-94.4,111.8c-7.9-8.9-16.1-17.5-24.5-26c-57.5-57.5-124.5-102.7-199.1-134.2c-77.2-32.7-159.3-49.2-243.8-49.2   s-166.6,16.6-243.8,49.2c-74.6,31.5-141.6,76.7-199.1,134.2S454.4,724.9,422.8,799.5c-32.7,77.2-49.2,159.3-49.2,243.8   s16.6,166.6,49.2,243.8c31.5,74.6,76.7,141.6,134.2,199.1s124.5,102.7,199.1,134.2c77.2,32.7,159.3,49.2,243.8,49.2   s166.6-16.6,243.8-49.2c74.6-31.5,141.6-76.7,199.1-134.2c57.5-57.5,102.7-124.5,134.2-199.1c32.7-77.2,49.2-159.3,49.2-243.8   C1626.4,958.7,1609.8,876.7,1577.2,799.5z M1000,1639.7c-328.8,0-596.4-267.5-596.4-596.4S671.2,446.9,1000,446.9   c178.2,0,338.3,78.5,447.7,202.8l-85.1,100.8c-9.8-5.2-20.9-8.1-32.7-8.1c-38.6,0-70,31.4-70,70s31.4,70,70,70s70-31.4,70-70   c0-16-5.4-30.8-14.5-42.6l81.7-96.8c80.8,101.8,129.1,230.5,129.1,370.2C1596.4,1372.1,1328.8,1639.7,1000,1639.7z M1370,812.4   c0,22.1-18,40-40,40s-40-18-40-40s18-40,40-40S1370,790.3,1370,812.4z" />
        <path d="M1201.8,1043.3c0-111.3-90.5-201.8-201.8-201.8S798.2,932,798.2,1043.3c0,111.3,90.5,201.8,201.8,201.8   S1201.8,1154.6,1201.8,1043.3z M1000,1215.1c-94.7,0-171.8-77.1-171.8-171.8c0-94.7,77.1-171.8,171.8-171.8s171.8,77.1,171.8,171.8   C1171.8,1138,1094.7,1215.1,1000,1215.1z" />
        <path d="M1000,951.2c-50.8,0-92.1,41.3-92.1,92.1s41.3,92.1,92.1,92.1c50.8,0,92.1-41.3,92.1-92.1S1050.8,951.2,1000,951.2z    M1000,1105.4c-34.2,0-62.1-27.9-62.1-62.1s27.9-62.1,62.1-62.1c34.2,0,62.1,27.9,62.1,62.1S1034.2,1105.4,1000,1105.4z" />
        <path d="M1480.2,1163.3c-6.7-1.8-13.5,2.1-15.4,8.7c-22,79.9-64.9,153.3-123.8,212.2c-59,59-132.3,101.8-212.2,123.8   c-6.7,1.8-10.6,8.7-8.7,15.4c1.5,5.5,6.6,9.2,12,9.2c1.1,0,2.2-0.1,3.3-0.5c84-23.2,161.2-68.2,223.2-130.2   c62-62,107-139.2,130.2-223.2C1490.8,1172.1,1486.9,1165.2,1480.2,1163.3z" />
        <path d="M871.2,578.5c6.7-1.8,10.6-8.7,8.7-15.4c-1.8-6.7-8.7-10.6-15.4-8.7c-84,23.2-161.2,68.2-223.2,130.2   c-62,62-107,139.2-130.2,223.2c-1.8,6.7,2.1,13.5,8.7,15.4c1.1,0.3,2.2,0.5,3.3,0.5c5.5,0,10.5-3.6,12-9.2   c22-79.9,64.9-153.3,123.8-212.2S791.3,600.5,871.2,578.5z" />
        <path d="M871.8,653.5c6.6-2.2,10.1-9.2,8-15.8c-2.2-6.6-9.2-10.1-15.8-8c-65.1,21.4-122.9,57-171.8,105.8   c-48.8,48.8-84.4,106.6-105.8,171.8c-2.2,6.6,1.4,13.6,8,15.8c1.3,0.4,2.6,0.6,3.9,0.6c5.3,0,10.1-3.3,11.9-8.6   c20.1-61.4,53.7-115.8,99.7-161.9C755.9,707.2,810.4,673.6,871.8,653.5z" />
        <path d="M1132.1,1457.5c1.3,0,2.6-0.2,3.9-0.6c65.1-21.4,122.9-57,171.8-105.8c48.8-48.8,84.4-106.6,105.8-171.8   c2.2-6.6-1.4-13.6-8-15.8c-6.6-2.2-13.6,1.4-15.8,8c-20.1,61.4-53.7,115.8-99.7,161.9c-46,46-100.5,79.6-161.9,99.7   c-6.6,2.2-10.1,9.2-8,15.8C1122,1454.1,1126.9,1457.5,1132.1,1457.5z" />
        <path d="M1120.5,1377.9c2,4.9,6.6,7.9,11.6,7.9c1.5,0,3.1-0.3,4.6-0.9c46.3-18.5,87.8-45.9,123.3-81.5   c35.6-35.6,63-77.1,81.5-123.3c2.6-6.4-0.6-13.7-7-16.2c-6.4-2.6-13.7,0.6-16.2,7c-17.2,43.1-42.8,81.8-75.9,115   c-33.1,33.1-71.8,58.7-115,75.9C1121.1,1364.2,1117.9,1371.5,1120.5,1377.9z" />
        <path d="M879.5,708.7c-2.6-6.4-9.8-9.5-16.2-7c-46.3,18.5-87.8,45.9-123.3,81.5c-35.6,35.6-63,77.1-81.5,123.3   c-2.6,6.4,0.6,13.7,7,16.2c1.5,0.6,3.1,0.9,4.6,0.9c5,0,9.7-3,11.6-7.9c17.2-43.1,42.8-81.8,75.9-115c33.1-33.1,71.8-58.7,115-75.9   C878.9,722.4,882.1,715.1,879.5,708.7z" />
      </g>
    </svg>
  ),
}
