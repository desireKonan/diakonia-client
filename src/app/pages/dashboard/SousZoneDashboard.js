import React from 'react';
import Welcome from 'src/_ui/layouts/full/shared/welcome/Welcome';
import { Box, Grid, useTheme } from '@mui/material';
import useFetch from 'src/app/services/useFetch';
import { useAuth } from 'src/app/services/useAuth';
import { uniqueId } from 'lodash';
import { DiakoniaCard } from 'src/app/components/custom/ComponentUtils';
import PersonsOverview from 'src/app/components/custom/PersonsOverview';
import { IconUser, IconUserCircle, IconReportMoney } from "@tabler/icons";

const SousZoneDashboard = () => {
    const { user } = useAuth();
    const { data } = useFetch(`/api/statistics/sous-zone/${user.place['sub_zone']}`);

    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
    const primarylight = theme.palette.primary.light;
    const warning = theme.palette.warning.light;

    return (
        <Box>
            <Grid container spacing={3}>
                {/* column */}
                <Grid item sm={12} lg={12}>
                    <Grid container spacing={3} mt={3}>
                        <DiakoniaCard
                            icon={<IconUser width={30} color='blue' />}
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
                            icon={<IconUserCircle width={30} color='yellow' />}
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
                        <DiakoniaCard
                            icon={<IconReportMoney width={30} color='green' />}
                            key={uniqueId()}
                            xs={12}
                            sm={4}
                            lg={2}
                            textAlign='center'
                            bgColor={`success.light`}
                            color={`success.main`}
                            link={'#'}
                            title={`Dons`}
                            data={(data?.tithe_gifts.tithe_gift + data?.tithe_gifts.attiekoi_gift)}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                    <PersonsOverview
                        labels={[
                            "Nombres d'adultes", "Nombres d'enfants", "Nombres d'invites", "Nombres de visiteurs"
                        ]}
                        colors={[
                            primary,
                            secondary,
                            primarylight,
                            warning
                        ]}
                        series={data?.assembly_stats ?? []}
                    />
                </Grid>
                {/* column */}
                <Welcome />
            </Grid>
        </Box>
    );
}


export default SousZoneDashboard;