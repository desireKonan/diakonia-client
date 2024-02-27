import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

/* ****Pages***** */
const Modern = Loadable(lazy(() => import('../views/dashboard/Modern')));
const ListRegion = Loadable(lazy(() => import('../views/parameter/ville/VilleList')));
const FormulaireRegion = Loadable(lazy(() => import('../views/parameter/ville/VilleForm')));

const ListeAssemblee = Loadable(lazy(() => import('../views/parameter/assembly/AssemblyList')));
const FormulaireAssemblee = Loadable(lazy(() => import('../views/parameter/assembly/AssemblyForm')));
const ListeMembre = Loadable(lazy(() => import('../views/effective/member/AssemblyMemberList')));
const FormulaireMembre = Loadable(lazy(() => import('../views/effective/member/AssemblyMemberForm')));

const ListeTypeActivite = Loadable(lazy(() => import('../views/parameter/type-activite/TypeActiviteList')));
const FormulaireTypeActivite = Loadable(lazy(() => import('../views/parameter/type-activite/TypeActiviteForm')));

const ListeTypeRencontre = Loadable(lazy(() => import('../views/rencontre/TypeRencontreList')));

const ListeActivites = Loadable(lazy(() => import('../views/parameter/activite/ActiviteList')));
const FormulaireActivite = Loadable(lazy(() => import('../views/parameter/activite/ActiviteForm')));

const ListeParticipants = Loadable(lazy(() => import('../views/parameter/activite/participants/ParticipantList')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Modern /> },
      { path: '/regions', exact: true, element: <ListRegion /> },
      { path: '/region', exact: true, element: <FormulaireRegion />},
      { path: '/type-activites', exact: true, element: <ListeTypeActivite />},
      { path: '/type-activite', exact: true, element: <FormulaireTypeActivite />},
      { path: '/type-activite/:id', exact: true, element: <FormulaireTypeActivite />},
      { path: '/activites', exact: true, element: <ListeActivites />},
      { path: '/activite/:id/participants', exact: true, element: <ListeParticipants />},
      { path: '/activite', exact: true, element: <FormulaireActivite />},
      { path: '/activite/:id', exact: true, element: <FormulaireActivite />},
      { path: '/region/:id', exact: true, element: <FormulaireRegion />},
      { path: '/assemblees', exact: true, element: <ListeAssemblee />},
      { path: '/assemblee', exact: true, element: <FormulaireAssemblee />},
      { path: '/assemblee/:id', exact: true, element: <FormulaireAssemblee />},
      { path: '/assemblee/:id/membre', exact: true, element: <ListeMembre />},
      { path: '/assemblee/:assemblyId/membre/:membreId', exact: true, element: <FormulaireMembre />},
      { path: '/type-rencontres', exact: true, element: <ListeTypeRencontre />},
      { path: '/assemblee/:id/membres', exact: true, element: <ListeMembre /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
