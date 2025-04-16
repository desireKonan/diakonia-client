import React from 'react';
import { Grid } from '@mui/material';
import Breadcrumb from 'src/_ui/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/_ui/components/container/PageContainer';
import YearlyBreakup from '../../../_ui/assets/images/components/dashboards/modern/YearlyBreakup';
import Projects from '../../../_ui/assets/images/components/dashboards/modern/Projects';
import Customers from '../../../_ui/assets/images/components/dashboards/modern/Customers';
import TotalEarning from '../../../_ui/assets/images/components/dashboards/ecommerce/TotalEarning';
import MonthlyEarnings from '../../../_ui/assets/images/components/dashboards/ecommerce/MonthlyEarnings';
import SalesOverview from '../../../_ui/assets/images/components/dashboards/ecommerce/SalesOverview';
import RevenueUpdates from '../../../_ui/assets/images/components/dashboards/ecommerce/RevenueUpdates';
import YearlySales from '../../../_ui/assets/images/components/dashboards/ecommerce/YearlySales';
import MostVisited from '../../../_ui/assets/images/components/widgets/charts/MostVisited';
import PageImpressions from '../../../_ui/assets/images/components/widgets/charts/PageImpressions';
import Followers from '../../../_ui/assets/images/components/widgets/charts/Followers';
import Views from '../../../_ui/assets/images/components/widgets/charts/Views';
import Earned from '../../../_ui/assets/images/components/widgets/charts/Earned';
import CurrentValue from '../../../_ui/assets/images/components/widgets/charts/CurrentValue';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Charts',
  },
];

const WidgetCharts = () => {
  return (
    <PageContainer title="Charts" description="this is Charts page">
      {/* breadcrumb */}
      <Breadcrumb title="Charts" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Followers />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Views />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Earned />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12}>
          <CurrentValue />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <YearlyBreakup />
            </Grid>
            <Grid item xs={12}>
              <MonthlyEarnings />
            </Grid>
            <Grid item xs={12}>
              <MostVisited />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <YearlySales />
            </Grid>
            <Grid item xs={12}>
              <PageImpressions />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Customers />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Projects />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <RevenueUpdates />
            </Grid>
            <Grid item xs={12}>
              <SalesOverview />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default WidgetCharts;
