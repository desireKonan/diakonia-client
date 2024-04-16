import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

/* ****Pages***** */
const Modern = Loadable(lazy(() => import('../views/dashboard/Modern')));
const ListeVille = Loadable(lazy(() => import('../views/parameter/ville/VilleList')));

const ListeAssemblee = Loadable(lazy(() => import('../views/parameter/assembly/AssemblyList')));
const ListeMembre = Loadable(lazy(() => import('../views/effective/member/MembreList')));
//const ListeRencontresAssemblee = Loadable(() => import('../views/parameter/assembly/rencontre/RencontreAssembleeTest'));

const ListeTypeActivite = Loadable(lazy(() => import('../views/parameter/type-activite/TypeActiviteList')));

const ListeTypeRencontre = Loadable(lazy(() => import('../views/rencontre/TypeRencontreList')));
const ListeRencontre = Loadable(lazy(() => import('../views/rencontre/RencontreList')));

const ListePersonnePresente = Loadable(lazy(() => import('../views/rencontre/PersonnePresenteList')));
const ListeAmes = Loadable(lazy(() => import('../views/rencontre/AmeList')));

const ListeRubriques = Loadable(lazy(() => import('../views/finance/RubriqueList')));
//const ListeLigneFinancieres = Loadable(lazy(() => import('../views/finance/LigneFinanciereListe'))); 

const ListeActivites = Loadable(lazy(() => import('../views/parameter/activite/ActiviteList')));
const ListeParticipants = Loadable(lazy(() => import('../views/parameter/activite/participants/ParticipantList')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Modern /> },
      { path: '/regions', exact: true, element: <ListeVille /> },
      { path: '/type-activites', exact: true, element: <ListeTypeActivite />},
      { path: '/activites', exact: true, element: <ListeActivites />},
      { path: '/activite/:id/participants', exact: true, element: <ListeParticipants />},
      { path: '/assemblees', exact: true, element: <ListeAssemblee />},
      { path: '/assemblee/:id/membres', exact: true, element: <ListeMembre />},
      // { path: '/assemblee/:id/evenements', exact: true, element: <ListeRencontresAssemblee />},
      // { path: '/rencontre/:id/ligne-financiere', exact: true, element: <ListeLigneFinancieres />},
      // { path: '/recnontre/:id/personne-presente', exact: true, element: <ListeLigneFinancieres />},
      { path: '/rubriques', exact: true, element: <ListeRubriques />},
      { path: '/type-rencontres', exact: true, element: <ListeTypeRencontre />},
      { path: '/rencontres', exact: true, element: <ListeRencontre />},
      { path: '/rencontre/:id/personnes', exact: true, element: <ListePersonnePresente />},
      { path: '/rencontre/:id/ames', exact: true, element: <ListeAmes />},
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
