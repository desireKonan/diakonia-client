import React from 'react';
import Welcome from 'src/layouts/full/shared/welcome/Welcome';
import { Link } from 'react-router-dom';
import { Box, CardContent, Grid, Typography } from '@mui/material';
import icon1 from 'src/assets/images/svgs/icon-connect.svg';
import icon2 from 'src/assets/images/svgs/icon-user-male.svg';
import icon3 from 'src/assets/images/svgs/icon-briefcase.svg';
import icon4 from 'src/assets/images/svgs/icon-mailbox.svg';
import icon5 from 'src/assets/images/svgs/icon-favorites.svg';
import useFetch from 'src/app/services/useFetch';
import { uniqueId } from 'lodash';


const AdminDashboard = () => {
    const { data } = useFetch(`/api/statistics/admin`);

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
                                            Utilisateurs
                                        </Typography>
                                        <Typography color={'primary.main'} variant="h4" fontWeight={600}>
                                            { data?.user_count }
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={4} lg={2} key={uniqueId()}>
                            <Link to={'#'}>
                                <Box bgcolor={'warning.light'} textAlign="center">
                                    <CardContent>
                                        <img src={icon2} alt={icon2} width="50" />
                                        <Typography
                                            color={'warning.main'}
                                            mt={1}
                                            variant="subtitle1"
                                            fontWeight={600}
                                        >
                                            Disciples
                                        </Typography>
                                        <Typography color={'warning.main'} variant="h4" fontWeight={600}>
                                            { data?.disciple_count }
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={4} lg={2} key={uniqueId()}>
                            <Link to={'#'}>
                                <Box bgcolor={'secondary.light'} textAlign="center">
                                    <CardContent>
                                        <img src={icon3} alt={icon3} width="50" />
                                        <Typography
                                            color={'secondary.main'}
                                            mt={1}
                                            variant="subtitle1"
                                            fontWeight={600}
                                        >
                                            Assemblées
                                        </Typography>
                                        <Typography color={'secondary.main'} variant="h4" fontWeight={600}>
                                            { data?.assembly_count }
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={4} lg={2} key={uniqueId()}>
                            <Link to={'#'}>
                                <Box bgcolor={'error.light'} textAlign="center">
                                    <CardContent>
                                        <img src={icon4} alt={icon4} width="50" />
                                        <Typography
                                            color={'error.main'}
                                            mt={1}
                                            variant="subtitle1"
                                            fontWeight={600}
                                        >
                                            Zones
                                        </Typography>
                                        <Typography color={'error.main'} variant="h4" fontWeight={600}>
                                            { data?.zone_count }
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={4} lg={2} key={uniqueId()}>
                            <Link to={'#'}>
                                <Box bgcolor={'success.light'} textAlign="center">
                                    <CardContent>
                                        <img src={icon5} alt={icon5} width="50" />
                                        <Typography
                                            color={'success.main'}
                                            mt={1}
                                            variant="subtitle1"
                                            fontWeight={600}
                                        >
                                            Sous-zones
                                        </Typography>
                                        <Typography color={'success.main'} variant="h4" fontWeight={600}>
                                            { data?.subzone_count }
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


export default AdminDashboard;