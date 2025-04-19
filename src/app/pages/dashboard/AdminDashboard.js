import React from 'react';
import Welcome from 'src/_ui/layouts/full/shared/welcome/Welcome';
import { Box, Grid } from '@mui/material';
import icon1 from 'src/_ui/assets/images/svgs/icon-connect.svg';
import icon2 from 'src/_ui/assets/images/svgs/icon-user-male.svg';
import icon3 from 'src/_ui/assets/images/svgs/icon-briefcase.svg';
import icon4 from 'src/_ui/assets/images/svgs/icon-mailbox.svg';
import icon5 from 'src/_ui/assets/images/svgs/icon-favorites.svg';
import useFetch from 'src/app/services/useFetch';
import { uniqueId } from 'lodash';
import { DiakoniaCard } from 'src/app/components/custom/ComponentUtils';


const AdminDashboard = () => {
    const { data } = useFetch(`/api/statistics/admin`);

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
                            title={`Utilisateurs`}
                            data={data?.user_count}
                        />
                        <DiakoniaCard
                            icon={icon2}
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
                            icon={icon3}
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
                            icon={icon4}
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
                            icon={icon5}
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
                    </Grid>
                </Grid>
                {/* column */}
                <Welcome />
            </Grid>
        </Box>
    );
}


export default AdminDashboard;