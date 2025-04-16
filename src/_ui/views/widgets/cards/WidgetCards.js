import React from 'react';
import { Grid } from '@mui/material';
import Breadcrumb from 'src/_ui/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/_ui/components/container/PageContainer';

import PaymentGateways from '../../../_ui/assets/images/components/dashboards/ecommerce/PaymentGateways';
import RecentTransactions from '../../../_ui/assets/images/components/dashboards/ecommerce/RecentTransactions';
import TopCards from '../../../_ui/assets/images/components/dashboards/modern/TopCards';
import UpcomingAcitivity from '../../../_ui/assets/images/components/widgets/cards/UpcomingActivity';
import ComplexCard from '../../../_ui/assets/images/components/widgets/cards/ComplexCard';
import MusicCard from '../../../_ui/assets/images/components/widgets/cards/MusicCard';
import EcommerceCard from '../../../_ui/assets/images/components/widgets/cards/EcommerceCard';
import FollowerCard from '../../../_ui/assets/images/components/widgets/cards/FollowerCard';
import FriendCard from '../../../_ui/assets/images/components/widgets/cards/FriendCard';
import ProfileCard from '../../../_ui/assets/images/components/widgets/cards/ProfileCard';

import Settings from '../../../_ui/assets/images/components/widgets/cards/Settings';
import GiftCard from '../../../_ui/assets/images/components/widgets/cards/GiftCard';


const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Cards',
  },
];

const WidgetCards = () => {
  return (
    <PageContainer title="Cards" description="this is Cards page">
    {/* breadcrumb */}
    <Breadcrumb title="Cards" items={BCrumb} />
    {/* end breadcrumb */}
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TopCards />
      </Grid>
      <Grid item xs={12}>
        <ComplexCard />
      </Grid>
      <Grid item xs={12}>
        <EcommerceCard />
      </Grid>
      <Grid item xs={12}>
        <MusicCard />
      </Grid>
      <Grid item xs={12}>
        <FollowerCard />
      </Grid>
      <Grid item xs={12}>
        <FriendCard />
      </Grid>
      <Grid item xs={12}>
        <ProfileCard />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Settings />
      </Grid>
      <Grid item xs={12} lg={8}>
        <GiftCard />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <PaymentGateways />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <UpcomingAcitivity />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <RecentTransactions />
      </Grid>
    </Grid>
    </PageContainer>
  );
};

export default WidgetCards;
