import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '../layouts/full/shared/loadable/Loadable';
import ProtectedRoute from './ProtectedRoute';
import { ROLES } from 'src/utils/utils';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Login***** */
const Login = Loadable(lazy(() => import('../views/main/auth/Login')));

/* ****Pages***** */
const Modern = Loadable(lazy(() => import('../views/dashboard/Modern')));
const ListeVille = Loadable(lazy(() => import('../views/main/ville/VilleList')));

const ListeAssemblee = Loadable(lazy(() => import('../views/main/assembly/AssemblyList')));
const Assemblee = Loadable(lazy(() => import('../views/main/assembly/Assembly')));
const ListeMembre = Loadable(lazy(() => import('../views/main/member/MembreList')));
const ListeRencontreAssemblees = Loadable(lazy(() => import('../views/main/assembly/rencontre/RencontreAssembleeList')));
const ListeParticipantRencontres = Loadable(lazy(() => import('../views/main/assembly/participant/ParticipantRencontreList')));
const LivreComptableRencontres = Loadable(lazy(() => import('../views/main/assembly/ligne-financiere/LigneFinanciereRencontreList')));

const ListeTypeActivite = Loadable(lazy(() => import('../views/main/type-activite/TypeActiviteList')));

const ListeTypeRencontre = Loadable(lazy(() => import('../views/main/rencontre/TypeRencontreList')));
const ListeRencontre = Loadable(lazy(() => import('../views/main/rencontre/RencontreList')));
const ListeRoles = Loadable(lazy(() => import('../views/main/role/RoleList')));

const ListePersonnePresente = Loadable(lazy(() => import('../views/main/rencontre/PersonnePresenteList')));
const ListeAmes = Loadable(lazy(() => import('../views/main/rencontre/AmeList')));

const ListeRubriques = Loadable(lazy(() => import('../views/main/finance/RubriqueList')));

const ListeActivites = Loadable(lazy(() => import('../views/main/activite/ActiviteList')));
const ListeParticipants = Loadable(lazy(() => import('../views/main/activite/participants/ParticipantList')));

const ListeUtilisateurs = Loadable(lazy(() => import('../views/main/utilisateur/UtilisateurList')));

const Error = Loadable(lazy(() => import('../views/main/auth/Error')));

const Unauthorized = Loadable(lazy(() => import('../views/main/auth/Unauthorized')));

/** ***** Statistiques ***** */
const RapportEffectifZone = Loadable(lazy(() => import('../views/main/rapport/RapportBase')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: (
          <ProtectedRoute routesAllowed={[...Object.values(ROLES)]}>
            <Modern /> 
          </ProtectedRoute>
        )
      },
      { path: '/rapport/rencontre', exact: true, element: (
          <ProtectedRoute routesAllowed={[ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]}>
            <RapportEffectifZone />
          </ProtectedRoute>
        ) 
      },
      { path: '/regions', exact: true, element: (
          <ProtectedRoute routesAllowed={[ROLES.ADMIN, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]}>
            <ListeVille />
          </ProtectedRoute>
        ) 
      },
      { path: '/type-activites', exact: true, element: (
          <ProtectedRoute routesAllowed={[ROLES.ADMIN, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]}>
            <ListeTypeActivite />
          </ProtectedRoute>
        )
      },
      { path: '/activites', exact: true, element: (
          <ProtectedRoute routesAllowed={[ROLES.ADMIN, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]}>
            <ListeActivites />
          </ProtectedRoute>
        )
      },
      { path: '/activite/:id/participants', exact: true, element: (
          <ProtectedRoute routesAllowed={[ROLES.ADMIN, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]}>
            <ListeParticipants />
          </ProtectedRoute>
        )
      },
      { path: '/assemblees', exact: true, element: (
          <ProtectedRoute routesAllowed={[ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]}>
            <ListeAssemblee />
          </ProtectedRoute>
        )
      },
      { path: '/assemblee', exact: true, element: (
        <ProtectedRoute routesAllowed={[ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE]}>
          <Assemblee />
        </ProtectedRoute>
      )
      },
      { path: '/assemblee/:id/membres', exact: true, element: (
          <ProtectedRoute routesAllowed={[ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]}>
            <ListeMembre />
          </ProtectedRoute>
        )
      },
      { path: '/assemblee/:id/rencontres', exact: true, element: (
          <ProtectedRoute routesAllowed={[ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]}>
            <ListeRencontreAssemblees />
          </ProtectedRoute>
        )
      },
      { path: '/rencontre/:id/participants', exact: true, element: (
        <ProtectedRoute routesAllowed={[ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE]}>
          <ListeParticipantRencontres />
        </ProtectedRoute>
        )
      },
      { path: '/rencontre/:id/ligne-financieres', exact: true, element: (
          <ProtectedRoute routesAllowed={[ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE]}>
            <LivreComptableRencontres />
          </ProtectedRoute>
        )
      },
      { path: '/rubriques', exact: true, element: (
          <ProtectedRoute routesAllowed={[ROLES.ADMIN, ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE]}>
            <ListeRubriques />
          </ProtectedRoute>
        )
      },
      { path: '/type-rencontres', exact: true, element: (
          <ProtectedRoute routesAllowed={[ROLES.ADMIN, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]}>
            <ListeTypeRencontre />
          </ProtectedRoute>
        )
      },
      { path: '/roles', exact: true, element: (
          <ProtectedRoute routesAllowed={[ROLES.ADMIN]}>
            <ListeRoles />
          </ProtectedRoute>
        )
      },
      { path: '/utilisateurs', exact: true, element: (
          <ProtectedRoute  routesAllowed={[ROLES.ADMIN]}>
            <ListeUtilisateurs />
          </ProtectedRoute>
        )
      },
      { path: '/rencontres', exact: true, element: (
        <ProtectedRoute  routesAllowed={[ROLES.ADMIN, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]}>
          <ListeRencontre />
        </ProtectedRoute>
        )
      },
      { path: '/rencontre/:id/personnes', exact: true, element: (
        <ProtectedRoute routesAllowed={[ROLES.ADMIN, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]}>
          <ListePersonnePresente />
        </ProtectedRoute>
        )
      },
      { path: '/rencontre/:id/ames', exact: true, element: (
          <ProtectedRoute routesAllowed={[ROLES.ADMIN, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]}>
            <ListeAmes />
          </ProtectedRoute>
        )
      },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/404', element: <Error /> },
      { path: '/auth/non-authorise', element: <Unauthorized /> },
      { path: '/auth/login', element: <Login /> },
    ]
  }
];

export default Router;
