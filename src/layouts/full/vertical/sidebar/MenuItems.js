import {
  IconPoint,
  IconMail,
  IconUserCircle,
  //IconList,
  IconHome,
  IconDashboard,
  IconMeteor
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
    icon: IconPoint,
    href: '#',
    children: [
      {
        id: uniqueId(),
        title: 'Zones',
        icon: IconPoint,
        href: '/regions'
      },
      {
        id: uniqueId(),
        title: 'Assemblées',
        icon: IconPoint,
        href: '/assemblees',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Activité',
    icon: IconHome,
    href: '/#/',
    children: [
      {
        id: uniqueId(),
        title: 'Type d\'activité',
        icon: IconPoint,
        href: '/type-activites',
        chipColor: 'secondary',
      },
      {
        id: uniqueId(),
        title: 'Activité',
        icon: IconPoint,
        href: '/activites',
        chipColor: 'secondary',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Rubriques',
    icon: IconHome,
    href: '/#/',
    children: [
      {
        id: uniqueId(),
        title: 'Rubriques financières',
        icon: IconPoint,
        href: '/rubriques',
        chipColor: 'secondary',
      }
    ],
  },
  {
    id: uniqueId(),
    title: 'Rencontre',
    icon: IconMeteor,
    href: '/#/',
    children: [
      {
        id: uniqueId(),
        title: 'Rencontres',
        icon: IconPoint,
        href: '/rencontres',
        chipColor: 'secondary',
      },
      {
        id: uniqueId(),
        title: 'Type de rencontres',
        icon: IconPoint,
        href: '/type-rencontres',
        chipColor: 'secondary',
      }
    ],
  },
  {
    id: uniqueId(),
    title: 'Rapport',
    icon: IconMeteor,
    href: '/#/',
    children: [
      {
        id: uniqueId(),
        title: 'Rapport de rencontres',
        icon: IconPoint,
        href: '/rapport/rencontre?type_zone=sous_zone',
        chipColor: 'secondary',
      }
    ],
  },
  {
    id: uniqueId(),
    title: 'Gestion des utilisateurs',
    icon: IconUserCircle,
    href: '/user-profile',
    children: [
      {
        id: uniqueId(),
        title: 'Role',
        icon: IconPoint,
        href: '/roles',
      },
      {
        id: uniqueId(),
        title: 'Utilisateurs',
        icon: IconPoint,
        href: '/utilisateurs',
      },
      {
        id: uniqueId(),
        title: 'Actions',
        icon: IconPoint,
        href: '/actions',
      },
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
