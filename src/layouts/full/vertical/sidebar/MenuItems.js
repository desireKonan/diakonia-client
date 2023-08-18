import {
  IconPoint,
  IconMail,
  IconUserCircle,
  IconList,
  IconHome,
  IconDashboard
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Home',
    icon: IconDashboard,
    href: '/dashboard',
    chipColor: 'secondary',
  },

  {
    navlabel: true,
    subheader: 'Apps',
  },
  {
    id: uniqueId(),
    title: 'Regions',
    icon: IconList,
    href: '/regions',
  },
  {
    id: uniqueId(),
    title: 'Assembly',
    icon: IconHome,
    href: '/assemblies',
  },
  {
    id: uniqueId(),
    title: 'Users',
    icon: IconUserCircle,
    href: '/user-profile',
    children: [
      {
        id: uniqueId(),
        title: 'Profile',
        icon: IconPoint,
        href: '/user-profile',
      },
      {
        id: uniqueId(),
        title: 'Gallery',
        icon: IconPoint,
        href: '/apps/gallery',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Email',
    icon: IconMail,
    href: '/apps/email',
  },
];

export default Menuitems;
