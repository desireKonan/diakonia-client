import React from 'react';
import PageContainer from 'src/_ui/components/container/PageContainer';
import Breadcrumb from 'src/_ui/layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid } from '@mui/material';

import Questions from '../../../_ui/assets/images/components/pages/faq/Questions';
import StillQuestions from '../../../_ui/assets/images/components/pages/faq/StillQuestions';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'FAQ',
  },
];

const Faq = () => {
  return (
    <PageContainer title="Faq" description="this is Faq page">
      {/* breadcrumb */}
      <Breadcrumb title="FAQ" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Questions />
          <StillQuestions />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Faq;
