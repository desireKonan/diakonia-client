import React from 'react';
import Welcome from 'src/_ui/layouts/full/shared/welcome/Welcome';
import { Box, Grid, useTheme } from '@mui/material';
import useFetch from 'src/app/services/useFetch';
import { uniqueId } from 'lodash';
import { DiakoniaCard } from 'src/app/components/custom/ComponentUtils';
import { IconUser, IconUserCircle, IconHome, IconDirections, IconDirection, IconReportMoney } from "@tabler/icons";
import PersonsOverview from 'src/app/components/custom/PersonsOverview';
import { numberFormat } from 'src/app/utils/number';


const AdminDashboard = () => {
    const { data } = useFetch(`/api/statistics/admin`);

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
                            title={`Utilisateurs`}
                            data={data?.user_count}
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
                            icon={<IconHome width={30} color='gray' />}
                            key={uniqueId()}
                            xs={12}
                            sm={4}
                            lg={2}
                            textAlign='center'
                            bgColor={`secondary.light`}
                            color={`secondary.main`}
                            link={'#'}
                            title={`Assemblées`}
                            data={data?.assembly_count}
                        />
                        <DiakoniaCard
                            icon={<IconDirections width={30} color='gray' />}
                            key={uniqueId()}
                            xs={12}
                            sm={4}
                            lg={2}
                            textAlign='center'
                            bgColor={`error.light`}
                            color={`error.main`}
                            link={'#'}
                            title={`Zones`}
                            data={data?.zone_count}
                        />
                        <DiakoniaCard
                            icon={<IconDirection width={30} color='gray' />}
                            key={uniqueId()}
                            xs={12}
                            sm={4}
                            lg={2}
                            textAlign='center'
                            bgColor={`success.light`}
                            color={`success.main`}
                            link={'#'}
                            title={`Sous-zones`}
                            data={data?.subzone_count}
                        />
                        <DiakoniaCard
                            icon={<IconReportMoney width={30} color='green' />}
                            key={uniqueId()}
                            xs={12}
                            sm={5}
                            lg={3}
                            textAlign='center'
                            bgColor={`success.light`}
                            color={`success.main`}
                            link={'#'}
                            title={`Dons`}
                            data={numberFormat(data?.tithe_gifts.tithe_gift + data?.tithe_gifts.attiekoi_gift)}
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
                        series={data?.subzone_stats ?? []}
                    />
                </Grid>
                {/* column */}
                <Welcome />
            </Grid>
        </Box>
    );
}


export default AdminDashboard;