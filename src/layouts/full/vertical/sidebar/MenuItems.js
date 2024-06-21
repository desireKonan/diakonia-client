import {
  IconPoint,
  IconMail,
  IconDashboard
} from '@tabler/icons';

import { uniqueId } from 'lodash';
import { ROLES } from 'src/utils/utils';

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
    rolesAllowed: [ROLES.ADMIN, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]
  },
  {
    id: uniqueId(),
    title: 'Assemblée',
    icon: IconPoint,
    href: '/#/',
    children: [
      {
        id: uniqueId(),
        title: 'Assemblée',
        icon: IconPoint,
        href: '/assemblee',
      }
    ],
    rolesAllowed: [ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE]
  },
  {
    id: uniqueId(),
    title: 'Sous Zone',
    icon: IconPoint,
    href: '/#/',
    children: [
      {
        id: uniqueId(),
        title: 'Assemblées',
        icon: IconPoint,
        href: '/assemblees',
      },
      {
        id: uniqueId(),
        title: 'Rubriques financières',
        icon: IconPoint,
        href: '/rubriques',
        chipColor: 'secondary',
      }
    ],
    rolesAllowed: [ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]
  },
  {
    id: uniqueId(),
    title: 'Rapport',
    icon: IconPoint,
    href: '/#/',
    children: [
      {
        id: uniqueId(),
        title: 'Rapport de rencontres',
        icon: IconPoint,
        href: '/rapport/rencontre',
        chipColor: 'secondary',
      }
    ],
    rolesAllowed: [...Object.values(ROLES)]
  },
  {
    id: uniqueId(),
    title: 'Administration',
    icon: IconPoint,
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
        title: 'Profil',
        icon: IconPoint,
        href: '/user-profile',
      }
    ],
    rolesAllowed: [ROLES.ADMIN]
  },
];

export default Menuitems;
