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
    subheader: 'Accueil',
  },
  {
    id: uniqueId(),
    title: 'Accueil',
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
    title: 'Assemblées',
    icon: IconHome,
    href: '/assemblees',
  },
  {
    id: uniqueId(),
    title: 'Utilisateurs',
    icon: IconUserCircle,
    href: '/user-profile',
    children: [
      {
        id: uniqueId(),
        title: 'Profil',
        icon: IconPoint,
        href: '/user-profile',
      },
      {
        id: uniqueId(),
        title: 'Gallerie',
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
