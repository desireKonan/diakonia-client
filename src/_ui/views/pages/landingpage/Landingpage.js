import React from 'react';
import PageContainer from 'src/_ui/components/container/PageContainer';

// components
import Banner from '../../../_ui/assets/images/components/landingpage/banner/Banner';
import C2a from '../../../_ui/assets/images/components/landingpage/c2a/C2a';
import C2a2 from '../../../_ui/assets/images/components/landingpage/c2a/C2a2';
import DemoSlider from '../../../_ui/assets/images/components/landingpage/demo-slider/DemoSlider';
import Features from '../../../_ui/assets/images/components/landingpage/features/Features';
import Footer from '../../../_ui/assets/images/components/landingpage/footer/Footer';
import Frameworks from '../../../_ui/assets/images/components/landingpage/frameworks/Frameworks';
import LpHeader from '../../../_ui/assets/images/components/landingpage/header/Header';
import Testimonial from '../../../_ui/assets/images/components/landingpage/testimonial/Testimonial';

const Landingpage = () => {
  return (
    <PageContainer title="Landingpage" description="this is Landingpage">
      <LpHeader />
      <Banner />
      <DemoSlider />
      <Frameworks />
      <Testimonial />
      <Features />
      <C2a />
      <C2a2 />
      <Footer />
    </PageContainer>
  );
};

export default Landingpage;
