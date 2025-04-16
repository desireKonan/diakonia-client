import React from 'react';
import { useAuth } from 'src/app/services/useAuth';
import SousZoneDashboard from './SousZoneDashboard';
import AssembleeDashboard from './AssembleeDashboard';
import AdminDashboard from './AdminDashboard';
import { ROLES } from 'src/_ui/utils/utils';

const Modern = () => {
  const { user } = useAuth();

  if (user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_SOUS_ZONE)) {
    return <SousZoneDashboard />;
  } else if (user.roles.includes(ROLES.RESPONSABLE_EFFECTIF_ASSEMBLEE)) {
    return <AssembleeDashboard />;
  } else {
    return <AdminDashboard />;
  }
};

export default Modern;
