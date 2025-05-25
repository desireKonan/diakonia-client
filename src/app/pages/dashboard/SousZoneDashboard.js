import React from 'react';
import Welcome from 'src/_ui/layouts/full/shared/welcome/Welcome';
import { Box, Grid } from '@mui/material';
import icon1 from 'src/_ui/assets/images/svgs/icon-connect.svg';
import useFetch from 'src/app/services/useFetch';
import { useAuth } from 'src/app/services/useAuth';
import { uniqueId } from 'lodash';
import { DiakoniaCard } from 'src/app/components/custom/ComponentUtils';
import PersonsOverview from 'src/app/components/custom/PersonsOverview';

const SousZoneDashboard = () => {
    const { user } = useAuth();
    const { data } = useFetch(`/api/statistics/sous-zone/${user.place['sub_zone']}`);

    return (
        <Box>
            <Grid container spacing={3}>
                {/* column */}
                <Grid item sm={12} lg={12}>
                    <Grid container spacing={3} mt={3}>
                        <DiakoniaCard
                            icon={icon1}
                            key={uniqueId()}
                            xs={12}
                            sm={4}
                            lg={2}
                            textAlign='center'
                            bgColor={`primary.light`}
                            color={`primary.main`}
                            link={'#'}
                            title={`Membres`}
                            data={data?.assembly_count}
                        />
                        <DiakoniaCard
                            icon={icon1}
                            key={uniqueId()}
                            xs={12}
                            sm={4}
                            lg={2}
                            textAlign='center'
                            bgColor={`warning.light`}
                            color={`warning.main`}
                            link={'#'}
                            title={`Disciples`}
                            data={data?.disciple_count}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                    <PersonsOverview />
                </Grid>
                {/* column */}
                <Welcome />
            </Grid>
        </Box>
    );
}


export default SousZoneDashboard;