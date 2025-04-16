import React from 'react';
import { Grid } from '@mui/material';
import ParentCard from '../../../_ui/assets/images/components/shared/ParentCard';
import ChildCard from '../../../_ui/assets/images/components/shared/ChildCard';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../_ui/assets/images/components/container/PageContainer';

// custom
import ColorLabelRadio from "../../../_ui/assets/images/components/forms/form-elements/radio/ColorLabel";
import DefaultRadio from "../../../_ui/assets/images/components/forms/form-elements/radio/Default";
import ColorsRadio from "../../../_ui/assets/images/components/forms/form-elements/radio/Colors";
import SizesRadio from "../../../_ui/assets/images/components/forms/form-elements/radio/Sizes";
import CustomExRadio from "../../../_ui/assets/images/components/forms/form-elements/radio/Custom";
import PositionRadio from "../../../_ui/assets/images/components/forms/form-elements/radio/Position";

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Radio',
  },
];

const ExRadio = () => {
  
  return (
    <PageContainer title="Radio" description="this is Radio page">
      {/* breadcrumb */}
      <Breadcrumb title="Radio" items={BCrumb} />
      {/* end breadcrumb */}
      <ParentCard title="Radio">
        <Grid container spacing={3}>
          {/* ------------------------------------------------------------------- */}
          {/* Custom */}
          {/* ------------------------------------------------------------------- */}
          <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
            <ChildCard title="Custom">
              <CustomExRadio />           
            </ChildCard>
          </Grid>
          {/* ------------------------------------------------------------------- */}
          {/* Color with label */}
          {/* ------------------------------------------------------------------- */}
          <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
            <ChildCard title="Color with Label">
              <ColorLabelRadio />
            </ChildCard>
          </Grid>
          {/* ------------------------------------------------------------------- */}
          {/* Default */}
          {/* ------------------------------------------------------------------- */}
          <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
            <ChildCard title="Default">
              <DefaultRadio />
            </ChildCard>
          </Grid>
          {/* ------------------------------------------------------------------- */}
          {/* Default Colors */}
          {/* ------------------------------------------------------------------- */}
          <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
            <ChildCard title="Default Colors">
              <ColorsRadio />
            </ChildCard>
          </Grid>
          {/* ------------------------------------------------------------------- */}
          {/* Sizes */}
          {/* ------------------------------------------------------------------- */}
          <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
            <ChildCard title="Sizes">
              <SizesRadio />              
            </ChildCard>
          </Grid>
          {/* ------------------------------------------------------------------- */}
          {/* Position */}
          {/* ------------------------------------------------------------------- */}
          <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
            <ChildCard title="Position">
              <PositionRadio />
            </ChildCard>
          </Grid>
        </Grid>
      </ParentCard>
    </PageContainer>
  );
};

export default ExRadio;
