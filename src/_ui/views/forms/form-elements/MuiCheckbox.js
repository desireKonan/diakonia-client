import React from 'react';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../_ui/assets/images/components/container/PageContainer';
import ParentCard from '../../../_ui/assets/images/components/shared/ParentCard';
import ChildCard from '../../../_ui/assets/images/components/shared/ChildCard';

import { Grid } from '@mui/material';

// custom components
import PositionCheckbox from "../../../_ui/assets/images/components/forms/form-elements/checkbox/Position";
import SizesCheckbox from "../../../_ui/assets/images/components/forms/form-elements/checkbox/Sizes";
import DefaultcolorsCheckbox from "../../../_ui/assets/images/components/forms/form-elements/checkbox/DefaultColors"
import CustomEleCheckbox from "../../../_ui/assets/images/components/forms/form-elements/checkbox/Custom";
import DefaultCheckbox from "../../../_ui/assets/images/components/forms/form-elements/checkbox/Default";
import ColorsCheckbox from "../../../_ui/assets/images/components/forms/form-elements/checkbox/Colors";


const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Checkbox',
  },
];

const ExCheckbox = () => {
 
  return (
    <PageContainer title="Checkbox" description="this is Checkbox page">
      {/* breadcrumb */}
      <Breadcrumb title="Checkbox" items={BCrumb} />
      {/* end breadcrumb */}
      <ParentCard title="Checkbox">
        <Grid container spacing={3}>
          {/* ------------------------------------------------------------------- */}
          {/* Custom  */}
          {/* ------------------------------------------------------------------- */}
          <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
            <ChildCard title="Custom">
              <CustomEleCheckbox />
            </ChildCard>
          </Grid>
          {/* ------------------------------------------------------------------- */}
          {/* Colors  */}
          {/* ------------------------------------------------------------------- */}
          <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
            <ChildCard title="Colors">
              <ColorsCheckbox />
            </ChildCard>
          </Grid>
          {/* ------------------------------------------------------------------- */}
          {/* Default Checkbox */}
          {/* ------------------------------------------------------------------- */}
          <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
            <ChildCard title="Default">
              <DefaultCheckbox />
            </ChildCard>
          </Grid>
          {/* ------------------------------------------------------------------- */}
          {/* Default with colors */}
          {/* ------------------------------------------------------------------- */}
          <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
            <ChildCard title="Default with Colors">
              <DefaultcolorsCheckbox />
            </ChildCard>
          </Grid>
          {/* ------------------------------------------------------------------- */}
          {/* Sizes */}
          {/* ------------------------------------------------------------------- */}
          <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
            <ChildCard title="Sizes & Custom Icon">
              <SizesCheckbox />
            </ChildCard>
          </Grid>
          {/* ------------------------------------------------------------------- */}
          {/* Position */}
          {/* ------------------------------------------------------------------- */}
          <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
            <ChildCard title="Position">
              <PositionCheckbox />
            </ChildCard>
          </Grid>
        </Grid>
      </ParentCard>
    </PageContainer>
  );
};

export default ExCheckbox;
