import React from 'react';
import Welcome from 'src/_ui/layouts/full/shared/welcome/Welcome';
import { Box, Grid } from '@mui/material';
import useFetch from 'src/app/services/useFetch';
import { useAuth } from 'src/app/services/useAuth';
import { uniqueId } from 'lodash';
import { DiakoniaCard } from 'src/app/components/custom/ComponentUtils';
import { IconUser } from "@tabler/icons";


const AssembleeDashboard = () => {
    const { user } = useAuth();
    const { data } = useFetch(`/api/statistics/assemblee/${user.place['assembly_id']}`);

    return (
        <Box>
            <Grid container spacing={3}>
                {/* column */}
                <Grid item sm={12} lg={12}>
                    <Grid container spacing={3} mt={3}>
                        <DiakoniaCard
                            icon={<IconUser width={30} />}
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
                            icon={<IconUser width={30} />}
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
                            icon={<IconUser width={30} />}
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
                            icon={<IconUser width={30} />}
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
                    </Grid>
                </Grid>
                {/* column */}
                <Welcome />
            </Grid>
        </Box>
    );
}


export default AssembleeDashboard;