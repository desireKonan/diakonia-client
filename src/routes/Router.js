import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '../layouts/full/shared/loadable/Loadable';
import ProtectedRoute from './ProtectedRoute';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Login***** */
const Login = Loadable(lazy(() => import('../views/main/auth/Login')));

/* ****Pages***** */
const Modern = Loadable(lazy(() => import('../views/dashboard/Modern')));
const ListeVille = Loadable(lazy(() => import('../views/main/ville/VilleList')));

const ListeAssemblee = Loadable(lazy(() => import('../views/main/assembly/AssemblyList')));
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

const ListeActions = Loadable(lazy(() => import('../views/main/action/ActionList')));

const Error = Loadable(lazy(() => import('../views/main/auth/Error')));


/** ***** Statistiques ***** */
const RapportEffectifZone = Loadable(lazy(() => import('../views/main/rapport/RapportBase')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: (
          <ProtectedRoute>
            <Modern /> 
          </ProtectedRoute>
        )
      },
      { path: '/rapport/rencontre', exact: true, element: (
          <ProtectedRoute>
            <RapportEffectifZone />
          </ProtectedRoute>
        ) 
      },
      { path: '/regions', exact: true, element: (
          <ProtectedRoute>
            <ListeVille />
          </ProtectedRoute>
        ) 
      },
      { path: '/type-activites', exact: true, element: (
          <ProtectedRoute>
            <ListeTypeActivite />
          </ProtectedRoute>
        )
      },
      { path: '/activites', exact: true, element: (
          <ProtectedRoute>
            <ListeActivites />
          </ProtectedRoute>
        )
      },
      { path: '/activite/:id/participants', exact: true, element: (
          <ProtectedRoute>
            <ListeParticipants />
          </ProtectedRoute>
        )
      },
      { path: '/assemblees', exact: true, element: (
          <ProtectedRoute>
            <ListeAssemblee />
          </ProtectedRoute>
        )
      },
      { path: '/assemblee/:id/membres', exact: true, element: (
          <ProtectedRoute>
            <ListeMembre />
          </ProtectedRoute>
        )
      },
      { path: '/assemblee/:id/rencontres', exact: true, element: (
          <ProtectedRoute>
            <ListeRencontreAssemblees />
          </ProtectedRoute>
        )
      },
      { path: '/rencontre/:id/participants', exact: true, element: (
        <ProtectedRoute>
          <ListeParticipantRencontres />
        </ProtectedRoute>
        )
      },
      { path: '/rencontre/:id/ligne-financieres', exact: true, element: (
          <ProtectedRoute>
            <LivreComptableRencontres />
          </ProtectedRoute>
        )
      },
      { path: '/rubriques', exact: true, element: (
          <ProtectedRoute>
            <ListeRubriques />
          </ProtectedRoute>
        )
      },
      { path: '/type-rencontres', exact: true, element: (
          <ProtectedRoute>
            <ListeTypeRencontre />
          </ProtectedRoute>
        )
      },
      { path: '/roles', exact: true, element: (
          <ProtectedRoute>
            <ListeRoles />
          </ProtectedRoute>
        )
      },
      { path: '/utilisateurs', exact: true, element: (
          <ProtectedRoute>
            <ListeUtilisateurs />
          </ProtectedRoute>
        )
      },
      { path: '/actions', exact: true, element: (
          <ProtectedRoute>
            <ListeActions />
          </ProtectedRoute>
        )
      },
      { path: '/rencontres', exact: true, element: (
        <ProtectedRoute>
          <ListeRencontre />
        </ProtectedRoute>
        )
      },
      { path: '/rencontre/:id/personnes', exact: true, element: (
        <ProtectedRoute>
          <ListePersonnePresente />
        </ProtectedRoute>
        )
      },
      { path: '/rencontre/:id/ames', exact: true, element: (
          <ProtectedRoute>
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
      { path: '/auth/login', element: <Login /> },
    ]
  }
];

export default Router;
