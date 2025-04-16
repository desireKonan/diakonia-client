import React from 'react';
import { Grid } from '@mui/material';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../_ui/assets/images/components/container/PageContainer';
import ParentCard from '../../../_ui/assets/images/components/shared/ParentCard';
import ChildCard from '../../../_ui/assets/images/components/shared/ChildCard';

import DefaultButtons from '../../../_ui/assets/images/components/forms/form-elements/button/DefaultButtons';
import ColorButtons from '../../../_ui/assets/images/components/forms/form-elements/button/ColorButtons';
import IconLoadingButtons from '../../../_ui/assets/images/components/forms/form-elements/button/IconLoadingButtons';
import SizeButton from '../../../_ui/assets/images/components/forms/form-elements/button/SizeButton';

import OutlinedDefaultButtons from '../../../_ui/assets/images/components/forms/form-elements/button/OutlinedDefaultButtons';
import OutlinedIconButtons from '../../../_ui/assets/images/components/forms/form-elements/button/OutlinedIconButtons';
import OutlinedSizeButton from '../../../_ui/assets/images/components/forms/form-elements/button/OutlinedSizeButton';

import TextDefaultButtons from '../../../_ui/assets/images/components/forms/form-elements/button/TextDefaultButtons';
import TextColorButtons from '../../../_ui/assets/images/components/forms/form-elements/button/TextColorButtons';
import TextIconButtons from '../../../_ui/assets/images/components/forms/form-elements/button/TextIconButtons';
import TextSizeButton from '../../../_ui/assets/images/components/forms/form-elements/button/TextSizeButton';

import IconColorButtons from '../../../_ui/assets/images/components/forms/form-elements/button/IconColorButtons';
import IconSizeButtons from '../../../_ui/assets/images/components/forms/form-elements/button/IconSizeButtons';

import FabDefaultButton from '../../../_ui/assets/images/components/forms/form-elements/button/FabDefaultButton';
import FabColorButtons from '../../../_ui/assets/images/components/forms/form-elements/button/FabColorButtons';
import FabSizeButtons from '../../../_ui/assets/images/components/forms/form-elements/button/FabSizeButtons';

import DefaultButtonGroup from '../../../_ui/assets/images/components/forms/form-elements/button/DefaultButtonGroup';
import SizeButtonGroup from '../../../_ui/assets/images/components/forms/form-elements/button/SizeButtonGroup';
import VerticalButtonGroup from '../../../_ui/assets/images/components/forms/form-elements/button/VerticalButtonGroup';
import ColorButtonGroup from '../../../_ui/assets/images/components/forms/form-elements/button/ColorButtonGroup';
import TextButtonGroup from '../../../_ui/assets/images/components/forms/form-elements/button/TextButtonGroup';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Button',
  },
];

const ExButton = () => (
  // 2

  <PageContainer title="Buttons" description="this is Buttons page">
    {/* breadcrumb */}
    <Breadcrumb title="Button" items={BCrumb} />
    {/* end breadcrumb */}
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ParentCard title="Buttons">
          <Grid container spacing={3}>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="Default">
                <DefaultButtons />
              </ChildCard>
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="Colors">
                <ColorButtons />
              </ChildCard>
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="Loading Buttons">
                <IconLoadingButtons />
              </ChildCard>
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="Sizes">
                <SizeButton />
              </ChildCard>
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="Outlined">
                <OutlinedDefaultButtons />
              </ChildCard>
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="Outlined Icon">
                <OutlinedIconButtons />
              </ChildCard>
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="Outline Size">
                <OutlinedSizeButton />
              </ChildCard>
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="Text">
                <TextDefaultButtons />
              </ChildCard>
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="Text Color">
                <TextColorButtons />
              </ChildCard>
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="Text Icon">
                <TextIconButtons />
              </ChildCard>
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="Text Sizes">
                <TextSizeButton />
              </ChildCard>
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="Icon Color">
                <IconColorButtons />
              </ChildCard>
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="Icon Sizes">
                <IconSizeButtons />
              </ChildCard>
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="FAB">
                <FabDefaultButton />
              </ChildCard>
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="FAB Color">
                <FabColorButtons />
              </ChildCard>
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="FAB Size">
                <FabSizeButtons />
              </ChildCard>
            </Grid>
          </Grid>
        </ParentCard>
      </Grid>
      <Grid item xs={12}>
        <ParentCard title="Button Group">
          <Grid container spacing={3}>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="Default">
                <DefaultButtonGroup />
              </ChildCard>
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="Sizes">
                <SizeButtonGroup />
              </ChildCard>
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="Verical">
                <VerticalButtonGroup />
              </ChildCard>
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
              <ChildCard title="Text">
                <TextButtonGroup />
              </ChildCard>
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} display="flex" alignItems="stretch">
              <ChildCard title="Color">
                <ColorButtonGroup />
              </ChildCard>
            </Grid>
          </Grid>
        </ParentCard>
      </Grid>
    </Grid>
  </PageContainer>
);
export default ExButton;
