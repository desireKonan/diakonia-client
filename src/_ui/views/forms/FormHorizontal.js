import React from 'react';
import { Grid, Typography } from '@mui/material';

// components
import Breadcrumb from 'src/_ui/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/_ui/components/container/PageContainer';
import ParentCard from 'src/_ui/components/shared/ParentCard';
import BasicLayout from '../../_ui/assets/images/components/forms/form-horizontal/BasicLayout';
import BasicIcons from '../../_ui/assets/images/components/forms/form-horizontal/BasicIcons';
import FormSeparator from '../../_ui/assets/images/components/forms/form-horizontal/FormSeparator';
import FormLabelAlignment from '../../_ui/assets/images/components/forms/form-horizontal/FormLabelAlignment';
import CollapsibleForm from '../../_ui/assets/images/components/forms/form-horizontal/CollapsibleForm';
import FormTabs from '../../_ui/assets/images/components/forms/form-horizontal/FormTabs';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Horizontal Form',
  },
];

const FormHorizontal = () => {
  return (
    <PageContainer title="Horizontal Form" description="this is Horizontal Form page">
      {/* breadcrumb */}
      <Breadcrumb title="Horizontal Form" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <ParentCard title="Basic Layout">
            <BasicLayout />
          </ParentCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ParentCard title="Basic with Icons">
            <BasicIcons />
          </ParentCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ParentCard title="Form Separator">
            <FormSeparator />
          </ParentCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ParentCard title="Form Label Alignment">
            <FormLabelAlignment />
          </ParentCard>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" mb={3}>Collapsible Section</Typography>
          <CollapsibleForm />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" mb={3}>Form with Tabs</Typography>
          <FormTabs />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default FormHorizontal;
