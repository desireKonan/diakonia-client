import React, { useState } from 'react';
import { 
    Grid, 
    Typography, 
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    MenuItem,
    Stack,
    Button,
    Avatar,
    Box
} from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import useFetch from 'src/app/services/useFetch';
import { date2, MeetingType, titleDashboard } from 'src/utils/utils';
import { useFormik } from 'formik';
import { httpAdapter } from 'src/app/services/http-adapter.service';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import { uniqueId } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '@emotion/react';


const SubzoneReportTable = ({ subzone }) => {
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primarylight = theme.palette.primary.light;
    const error = theme.palette.error.main;
    const errorlight = theme.palette.error.light;
    const warning = theme.palette.warning.main;
    const warninglight = theme.palette.warning.light;
    const secondary = theme.palette.success.main;
    const secondarylight = theme.palette.success.light;

    
    const { data: subzones } = useFetch('/api/ville/subzones', []);

    const [subzoneReport, setSubzoneReport] = useState([]);

    const formik = useFormik({
        initialValues: {
            subzone: '',
            type: MeetingType.CULT,
            day: new Date(),
        },
        onSubmit: (values) => {
            getSubzoneReport(values);
        },
    });

    const getSubzoneReport = async(values) => {
        var subzoneReport = await httpAdapter.saveData(`api/subzone/statistics`, {
            subzone: values['subzone'],
            type: values['type'],
            day: values['day']
        });
        if(subzoneReport.error && subzoneReport.error != null) {
            console.log(`Erreur: ${subzoneReport.error}`);
            toast(`${subzoneReport.error}`);
            return;
        }
        console.log(subzoneReport);
        setSubzoneReport(subzoneReport);
    }

    return (
        <DashboardCard
            title={`Tableaux des rapports de la sous-zone ${subzone}`}
            subtitle={`Tableaux des rapports de la sous-zone ${subzone}`}
        >
            <form onSubmit={formik.handleSubmit}>
                <ToastContainer />
                <Stack 
                    direction={'row'} 
                    spacing={{
                        xs: 1,
                        sm: 2
                    }}
                    alignItems={`flex-end`}
                    alignContent={"center"}
                    justifyContent={"center"}
                >
                    <Grid item xs={3} lg={3}>
                        <CustomFormLabel htmlFor="Sous zone">Sous zone</CustomFormLabel>
                        <CustomSelect
                            labelId="subzone"
                            id="subzone" 
                            fullWidth
                            name="subzone"
                            size="large"
                            value={formik.values.subzone}
                            onChange={formik.handleChange}
                        >
                            {
                                subzones.map(subzone => 
                                    <MenuItem selected={subzone} value={subzone}> { subzone } </MenuItem>    
                                )
                            }
                        </CustomSelect>
                    </Grid>
                    <Grid item xs={3} lg={3}>
                        <CustomFormLabel htmlFor="Sous zone">Type de rencontres</CustomFormLabel>
                        <CustomSelect
                            labelId="meeting-type"
                            id="meeting-type" 
                            fullWidth
                            name="type"
                            size="large"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                        >
                            {
                                Object.keys(MeetingType).map(type => 
                                    <MenuItem selected={type} value={type}> { type } </MenuItem>    
                                )
                            }
                        </CustomSelect>
                    </Grid>
                    <Grid item xs={3} lg={3}>
                        <CustomFormLabel htmlFor="day">Date recherché</CustomFormLabel>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                id="day" 
                                name="day"
                                renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                                    '& .MuiSvgIcon-root': {
                                        width: 18,
                                        height: 18,
                                    },
                                    '& .MuiFormHelperText-root': {
                                        display: 'none',
                                    },
                                }} />}
                                placeholder="Entrez la date recherchée"
                                value={formik.values.day}
                                onChange={(newValue) => {
                                    var day = date2(newValue);
                                    console.log(day, newValue);
                                    formik.setFieldValue('day', day);
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={3} lg={3}>
                        <Button variant="contained" color='primary' type="submit">
                            Rechercher
                        </Button>
                    </Grid>  
                </Stack>
            </form>          
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                        <TableContainer>
                            <Table
                                aria-label="simple table"
                                sx={{
                                    whiteSpace: "nowrap",
                                    mt: 2
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Assemblée
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Nombre d'adultes
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Nombre d'enfants
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Nombre d'invités
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Nombre de visiteurs
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Total Don et offrandes
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Total Dons pour attiékoi
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        (subzoneReport['assembly_reports'] && subzoneReport['assembly_reports'].length !== 0) ? subzoneReport['assembly_reports'].map((subzoneR) => (
                                            <TableRow key={subzoneR.id}>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        { subzoneR.assembly }
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        { subzoneR.adult_count }
                                                    </Typography>
                                                </TableCell>  
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        { subzoneR.child_count }
                                                    </Typography>
                                                </TableCell>                  
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        { subzoneR.guest_count }
                                                    </Typography>
                                                </TableCell>        
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        { subzoneR.visitor_count }
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        { subzoneR.tithe_gift }
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        { subzoneR.attiekoi_gift }
                                                    </Typography>
                                                </TableCell>  
                                            </TableRow>
                                        )) : (
                                            <TableRow key={`${uniqueId()}`}>
                                                <TableCell rowSpan={6}>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        Le rapport recherché pour la sous-zone et à la date recherchée n'existe pas !
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                </Grid>
                <Grid item xs={12} sm={4}>
                    {
                        subzoneReport['total_report'] ? (
                            <DashboardCard title={`Rapport de sous-centre: ${subzone}`} subtitle={`Rapport bilan de sous-centre`}>
                                <>
                                    <Stack spacing={3} mt={5}>
                                            <Stack
                                                direction="row"
                                                spacing={3}
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{ bgcolor: primarylight, color: primary, width: 40, height: 40 }}
                                                    >  
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="h6" mb="4px">
                                                            L'ancien effectif
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="textSecondary">
                                                            {''}
                                                        </Typography>
                                                    </Box>
                                                </Stack>

                                                <Typography variant="subtitle2" color="textSecondary">
                                                    {subzoneReport['old_effective']}
                                                </Typography>
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                spacing={3}
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{ bgcolor: primarylight, color: primary, width: 40, height: 40 }}
                                                    >  
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="h6" mb="4px">
                                                            Le nouvel effectif
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="textSecondary">
                                                            {''}
                                                        </Typography>
                                                    </Box>
                                                </Stack>

                                                <Typography variant="subtitle2" color="textSecondary">
                                                    {subzoneReport['new_effective']}
                                                </Typography>
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                spacing={3}
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{ bgcolor: primarylight, color: primary, width: 40, height: 40 }}
                                                    >  
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="h6" mb="4px">
                                                            {titleDashboard("adult_count")}
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="textSecondary">
                                                            {''}
                                                        </Typography>
                                                    </Box>
                                                </Stack>

                                                <Typography variant="subtitle2" color="textSecondary">
                                                    {subzoneReport['total_report']['adult_count']}
                                                </Typography>
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                spacing={3}
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{ bgcolor: secondarylight, color: secondary, width: 40, height: 40 }}
                                                    >  
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="h6" mb="4px">
                                                            {titleDashboard("child_count")}
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="textSecondary">
                                                            {''}
                                                        </Typography>
                                                    </Box>
                                                </Stack>

                                                <Typography variant="subtitle2" color="textSecondary">
                                                    {subzoneReport['total_report']['child_count']}
                                                </Typography>
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                spacing={3}
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{ bgcolor: errorlight, color: error, width: 40, height: 40 }}
                                                    >  
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="h6" mb="4px">
                                                            {titleDashboard("guest_count")}
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="textSecondary">
                                                            {''}
                                                        </Typography>
                                                    </Box>
                                                </Stack>

                                                <Typography variant="subtitle2" color="textSecondary">
                                                    {subzoneReport['total_report']['guest_count']}
                                                </Typography>
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                spacing={3}
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{ bgcolor: warninglight, color: warning, width: 40, height: 40 }}
                                                    >  
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="h6" mb="4px">
                                                            {titleDashboard("visitor_count")}
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="textSecondary">
                                                            {''}
                                                        </Typography>
                                                    </Box>
                                                </Stack>

                                                <Typography variant="subtitle2" color="textSecondary">
                                                    {subzoneReport['total_report']['visitor_count']}
                                                </Typography>
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                spacing={3}
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{ bgcolor: warninglight, color: warning, width: 40, height: 40 }}
                                                    >  
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="h6" mb="4px">
                                                            Le nombre total de présences
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="textSecondary">
                                                            {''}
                                                        </Typography>
                                                    </Box>
                                                </Stack>

                                                <Typography variant="subtitle2" color="textSecondary">
                                                    {subzoneReport['presence_total']}
                                                </Typography>
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                spacing={3}
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{ bgcolor: warninglight, color: warning, width: 40, height: 40 }}
                                                    >  
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="h6" mb="4px">
                                                            Le taux de présences
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="textSecondary">
                                                            {''}
                                                        </Typography>
                                                    </Box>
                                                </Stack>

                                                <Typography variant="subtitle2" color="textSecondary">
                                                    {subzoneReport['rate']}%
                                                </Typography>
                                            </Stack>
                                    </Stack>
                                </>
                            </DashboardCard>
                        ) : null
                    }
                </Grid>
            </Grid>
        </DashboardCard>
    );
};

export default SubzoneReportTable;
