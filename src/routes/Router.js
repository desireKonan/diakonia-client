import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Modern = Loadable(lazy(() => import('../views/dashboard/Modern')));
const ListRegion = Loadable(lazy(() => import('../views/parameter/region/RegionList')));
const FormulaireRegion = Loadable(lazy(() => import('../views/parameter/region/RegionForm')));

const ListeAssemblee = Loadable(lazy(() => import('../views/parameter/assembly/AssemblyList')));
const FormulaireAssemblee = Loadable(lazy(() => import('../views/parameter/assembly/AssemblyForm')));
const ListeMembre = Loadable(lazy(() => import('../views/effective/member/AssemblyMemberList')));
const FormulaireMembre = Loadable(lazy(() => import('../views/effective/member/AssemblyMemberForm')));


// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login2')));
const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register2')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const ForgotPassword2 = Loadable(
  lazy(() => import('../views/authentication/auth2/ForgotPassword2')),
);
const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
const TwoSteps2 = Loadable(lazy(() => import('../views/authentication/auth2/TwoSteps2')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Maintenance = Loadable(lazy(() => import('../views/authentication/Maintenance')));

// landingpage
const Landingpage = Loadable(lazy(() => import('../views/pages/landingpage/Landingpage')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Modern /> },
      { path: '/regions', exact: true, element: <ListRegion /> },
      { path: '/region', exact: true, element: <FormulaireRegion />},
      { path: '/region/:id', exact: true, element: <FormulaireRegion />},
      { path: '/assemblees', exact: true, element: <ListeAssemblee />},
      { path: '/assemblee', exact: true, element: <FormulaireAssemblee />},
      { path: '/assemblee/:id', exact: true, element: <FormulaireAssemblee />},
      { path: '/assemblee/:id/membre', exact: true, element: <ListeMembre />},
      { path: '/assemblee/:assemblyId/membre/:membreId', exact: true, element: <FormulaireMembre />},
      { path: '/assemblee/:id/membres', exact: true, element: <ListeMembre /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/404', element: <Error /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/login2', element: <Login2 /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/register2', element: <Register2 /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/forgot-password2', element: <ForgotPassword2 /> },
      { path: '/auth/two-steps', element: <TwoSteps /> },
      { path: '/auth/two-steps2', element: <TwoSteps2 /> },
      { path: '/auth/maintenance', element: <Maintenance /> },
      { path: '/landingpage', element: <Landingpage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
