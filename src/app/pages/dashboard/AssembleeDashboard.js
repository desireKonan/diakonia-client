import React from 'react';
import Welcome from 'src/_ui/layouts/full/shared/welcome/Welcome';
import { Link } from 'react-router-dom';
import { Box, CardContent, Grid, Typography } from '@mui/material';
import icon1 from 'src/_ui/assets/images/svgs/icon-connect.svg';
import useFetch from 'src/app/services/useFetch';
import { useAuth } from 'src/app/services/useAuth';
import { uniqueId } from 'lodash';

const AssembleeDashboard = () => {
    const { user } = useAuth();
    const { data } = useFetch(`/api/statistics/assemblee/${user.place['assembly_id']}`);

    return (
        <Box>
            <Grid container spacing={3}>
                {/* column */}
                <Grid item sm={12} lg={12}>
                    <Grid container spacing={3} mt={3}>
                        <Grid item xs={12} sm={4} lg={2} key={uniqueId()}>
                            <Link to={'#'}>
                                <Box bgcolor={'primary.light'} textAlign="center">
                                    <CardContent>
                                        <img src={icon1} alt={icon1} width="50" />
                                        <Typography
                                            color={'primary.main'}
                                            mt={1}
                                            variant="subtitle1"
                                            fontWeight={600}
                                        >
                                            Membres
                                        </Typography>
                                        <Typography color={'primary.main'} variant="h4" fontWeight={600}>
                                            { data?.assembly_count }
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                {/* column */}
                <Welcome />
            </Grid>
        </Box>
    );
}


export default AssembleeDashboard;