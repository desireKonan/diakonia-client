import React from 'react';
import { Grid } from '@mui/material';

import ParentCard from '../../../_ui/assets/images/components/shared/ParentCard';
import ChildCard from '../../../_ui/assets/images/components/shared/ChildCard';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../_ui/assets/images/components/container/PageContainer';

import CustomExSwitch from '../../../_ui/assets/images/components/forms/form-elements/switch/Custom';
import DefaultSwitch from '../../../_ui/assets/images/components/forms/form-elements/switch/Default';
import DefaultLabelSwitch from '../../../_ui/assets/images/components/forms/form-elements/switch/DefaultLabel';
import SizesSwitch from '../../../_ui/assets/images/components/forms/form-elements/switch/Sizes';
import ColorsSwitch from '../../../_ui/assets/images/components/forms/form-elements/switch/Colors';
import PositionSwitch from '../../../_ui/assets/images/components/forms/form-elements/switch/Position';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Switch',
  },
];

const ExSwitch = () => (
  // 2
  <PageContainer title="Switch" description="this is Switch page">
    {/* breadcrumb */}
    <Breadcrumb title="Switch" items={BCrumb} />
    {/* end breadcrumb */}
    <ParentCard title="Switch">
      <Grid container spacing={3}>
         {/* ------------------------------------------------------------------- */}
          {/* Custom */}
          {/* ------------------------------------------------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Custom">
            <CustomExSwitch />
          </ChildCard>
        </Grid>
         {/* ------------------------------------------------------------------- */}
          {/* Default */}
          {/* ------------------------------------------------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Default">
            <DefaultSwitch />
          </ChildCard>
        </Grid>
         {/* ------------------------------------------------------------------- */}
          {/* Default with label */}
          {/* ------------------------------------------------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Default with Label">
            <DefaultLabelSwitch />
          </ChildCard>
        </Grid>
         {/* ------------------------------------------------------------------- */}
          {/* Sizes */}
          {/* ------------------------------------------------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Sizes">
            <SizesSwitch />
          </ChildCard>
        </Grid>
         {/* ------------------------------------------------------------------- */}
          {/* Default Colors */}
          {/* ------------------------------------------------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Default Colors">
            <ColorsSwitch />
          </ChildCard>
        </Grid>
         {/* ------------------------------------------------------------------- */}
          {/* Placement */}
          {/* ------------------------------------------------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Placement">
          <PositionSwitch />
          </ChildCard>
        </Grid>
      </Grid>
    </ParentCard>
  </PageContainer>
);
export default ExSwitch;
