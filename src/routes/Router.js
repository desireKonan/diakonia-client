import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

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


/** ***** Statistiques ***** */
const RapportEffectifZone = Loadable(lazy(() => import('../views/main/rapport/RapportBase')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Modern /> },
      { path: '/rapport/rencontre', exact: true, element: <RapportEffectifZone /> },
      { path: '/regions', exact: true, element: <ListeVille /> },
      { path: '/type-activites', exact: true, element: <ListeTypeActivite />},
      { path: '/activites', exact: true, element: <ListeActivites />},
      { path: '/activite/:id/participants', exact: true, element: <ListeParticipants />},
      { path: '/assemblees', exact: true, element: <ListeAssemblee />},
      { path: '/assemblee/:id/membres', exact: true, element: <ListeMembre />},
      { path: '/assemblee/:id/rencontres', exact: true, element: <ListeRencontreAssemblees />},
      { path: '/rencontre/:id/participants', exact: true, element: <ListeParticipantRencontres />},
      { path: '/rencontre/:id/ligne-financieres', exact: true, element: <LivreComptableRencontres />},
      { path: '/rubriques', exact: true, element: <ListeRubriques />},
      { path: '/type-rencontres', exact: true, element: <ListeTypeRencontre />},
      { path: '/roles', exact: true, element: <ListeRoles />},
      { path: '/utilisateurs', exact: true, element: <ListeUtilisateurs />},
      { path: '/rencontres', exact: true, element: <ListeRencontre />},
      { path: '/rencontre/:id/personnes', exact: true, element: <ListePersonnePresente />},
      { path: '/rencontre/:id/ames', exact: true, element: <ListeAmes />},
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
