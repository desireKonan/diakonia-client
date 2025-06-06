import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '../../_ui/layouts/full/shared/loadable/Loadable';
import ProtectedRoute from './ProtectedRoute';
import { ROLES } from 'src/app/services/utils';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../../_ui/layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../../_ui/layouts/blank/BlankLayout')));

/* ****Login***** */
const Login = Loadable(lazy(() => import('../pages/auth/Login')));

/* ****Pages***** */
const Modern = Loadable(lazy(() => import('../pages/dashboard/Modern')));
const ListeVille = Loadable(lazy(() => import('../pages/ville/VilleList')));

const ListeAssemblee = Loadable(lazy(() => import('../pages/assembly/AssemblyList')));
const Assemblee = Loadable(lazy(() => import('../pages/assembly/Assembly')));
const ListeMembre = Loadable(lazy(() => import('../pages/member/MembreList')));
const ListeRencontreAssemblees = Loadable(lazy(() => import('../pages/assembly/rencontre/RencontreAssembleeList')));
const ListeParticipantRencontres = Loadable(lazy(() => import('../pages/assembly/participant/ParticipantRencontreList')));
const LivreComptableRencontres = Loadable(lazy(() => import('../pages/assembly/ligne-financiere/LigneFinanciereRencontreList')));

const ListeTypeActivite = Loadable(lazy(() => import('../pages/type-activite/TypeActiviteList')));

const ListeTypeRencontre = Loadable(lazy(() => import('../pages/rencontre/TypeRencontreList')));
const ListeRencontre = Loadable(lazy(() => import('../pages/rencontre/RencontreList')));
const ListeRoles = Loadable(lazy(() => import('../pages/role/RoleList')));

const ListePersonnePresente = Loadable(lazy(() => import('../pages/rencontre/PersonnePresenteList')));
const ListeAmes = Loadable(lazy(() => import('../pages/rencontre/AmeList')));

const ListeRubriques = Loadable(lazy(() => import('../pages/finance/RubriqueList')));

const ListeActivites = Loadable(lazy(() => import('../pages/activite/ActiviteList')));
const ListeParticipants = Loadable(lazy(() => import('../pages/activite/participants/ParticipantList')));

const ListeUtilisateurs = Loadable(lazy(() => import('../pages/utilisateur/UtilisateurList')));

const Error = Loadable(lazy(() => import('../pages/auth/Error')));

const Unauthorized = Loadable(lazy(() => import('../pages/auth/Unauthorized')));


/** ***** Statistiques ***** */
const RapportEffectifZone = Loadable(lazy(() => import('../pages/rapport/RapportBase')));


export const routeConfig = {
  public: [
    { path: '/auth/404', element: <Error /> },
    { path: '/auth/non-authorise', element: <Unauthorized /> },
    { path: '/auth/login', element: <Login /> },
  ],
  protected: [
    {
      path: '/dashboard', 
      exact: true, 
      element: <Modern />,
      roles: Object.values(ROLES)
    },
    {
        path: '/rapport/rencontre', 
        exact: true, 
        element: <RapportEffectifZone />,
        roles: [ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]
      },
      {
        path: '/regions', 
        exact: true, 
        element: <ListeVille />,
        roles: [ROLES.ADMIN, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]
      },
      {
        path: '/type-activites', 
        exact: true, 
        element: <ListeTypeActivite />,
        roles: [ROLES.ADMIN, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]
      },
      {
        path: '/activites', 
        exact: true, 
        element: <ListeActivites />,
        roles: [ROLES.ADMIN, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE] 
      },
      {
        path: '/activite/:id/participants', 
        exact: true, 
        element: <ListeParticipants />,
        roles: [ROLES.ADMIN, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE] 
      },
      {
        path: '/assemblees', 
        exact: true, 
        element: <ListeAssemblee />,
        roles: [ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]
      },
      {
        path: '/assemblee', 
        exact: true, 
        element: <Assemblee />,
        roles: [ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE]
      },
      {
        path: '/assemblee/:id/membres', 
        exact: true, 
        element: <ListeMembre />,
        roles: [ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]
      },
      {
        path: '/assemblee/:id/rencontres', 
        exact: true, 
        element: <ListeRencontreAssemblees />,
        roles: [ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]
      },
      {
        path: '/rencontre/:id/participants', 
        exact: true, 
        element: <ListeParticipantRencontres />,
        roles: [ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE]
      },
      {
        path: '/rencontre/:id/ligne-financieres', 
        exact: true, 
        element: <LivreComptableRencontres />,
        roles: [ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE]
      },
      {
        path: '/rubriques', 
        exact: true, 
        element: <ListeRubriques />,
        roles: [ROLES.ADMIN, ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE]
      },
      {
        path: '/type-rencontres', 
        exact: true, 
        element: <ListeTypeRencontre />,
        roles: [ROLES.ADMIN, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]
      },
      {
        path: '/roles', 
        exact: true, 
        element: <ListeRoles />,
        roles: [ROLES.ADMIN] 
      },
      {
        path: '/utilisateurs', 
        exact: true, 
        element: <ListeUtilisateurs />,
        roles: [ROLES.ADMIN]
      },
      {
        path: '/rencontres', 
        exact: true, 
        element: <ListeRencontre />,
        roles: [ROLES.ADMIN, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]
      },
      {
        path: '/rencontre/:id/personnes', 
        exact: true, 
        element: <ListePersonnePresente />,
        roles: [ROLES.ADMIN, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]
      },
      {
        path: '/rencontre/:id/ames', 
        exact: true, 
        element: <ListeAmes />,
        roles: [ROLES.ADMIN, ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE]
      },
  ],
  layouts: {
    full: FullLayout,
    blank: BlankLayout
  }
};

const generateRoutes = () => {
  const fullLayoutRoutes = [
    { path: '/', element: <Navigate to="/dashboard" /> },
    ...routeConfig.protected.map(route => ({
      path: route.path,
      exact: route.exact,
      element: (
        <ProtectedRoute roles={route.roles}>
          {route.element}
        </ProtectedRoute>
      )
    })),
    { path: '*', element: <Navigate to="/auth/404" /> }
  ];

  const blankLayoutRoutes = routeConfig.public.map(route => ({
    path: route.path,
    element: route.element
  }));

  return [
    {
      path: '/',
      element: <routeConfig.layouts.full />,
      children: fullLayoutRoutes
    },
    {
      path: '/',
      element: <routeConfig.layouts.blank />,
      children: blankLayoutRoutes
    }
  ];
};

const Router = generateRoutes();

export default Router;
