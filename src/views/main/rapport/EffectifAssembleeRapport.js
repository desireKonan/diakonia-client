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
    Paper
} from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import { date2, MeetingType } from 'src/utils/utils';
import { useFormik } from 'formik';
import { httpAdapter } from 'src/app/services/http-adapter.service';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import { uniqueId } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '@emotion/react';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import ParentCard from 'src/components/shared/ParentCard';
import { CustomDialog2, useDialogEvent } from 'src/components/custom/CustomDialog2';
import CustomDashboardCard from 'src/components/custom/CustomDashboardCard';


const EffectifAssembleeRapport = ({ assemblee }) => {
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primarylight = theme.palette.primary.light;
    const error = theme.palette.error.main;
    const errorlight = theme.palette.error.light;
    const warning = theme.palette.warning.main;
    const warninglight = theme.palette.warning.light;
    const secondary = theme.palette.success.main;
    const secondarylight = theme.palette.success.light;

    const { open, openDialog, closeDialog } = useDialogEvent();

    const [assemblyReport, setAssemblyReport] = useState([]);

    const formik = useFormik({
        initialValues: {
            type: MeetingType.CULT,
            day: new Date(),
        },
        onSubmit: (values) => {
            getAssemblyReport(values);
        },
    });

    const getAssemblyReport = async(values) => {
        var assemblyReport = await httpAdapter.saveData(`api/rapport/assemblee`, {
            label: assemblee,
            type: values['type'],
            day: values['day']
        });
        if(assemblyReport.error && assemblyReport.error != null) {
            console.log(`Erreur: ${assemblyReport.error}`);
            toast(`${assemblyReport.error}`);
            return;
        }
        console.log(assemblyReport);
        setAssemblyReport(assemblyReport);
    }

    const getTotalAssemblyReport = () => {
        let data = {
            label: assemblee,
            type: formik.values.type,
            day: formik.values.day
        }
        getAssemblyReport(data);

        openDialog();
    }

    return (
        <PageContainer title={`Rapport d'effectifs de l'assemblée : ${assemblee}`} description="Rapport d'effectifs de l'assemblée">
            <Breadcrumb title={`Rapport d'effectifs de l'assemblée : ${assemblee}`} subtitle="Rapport d'effectifs de l'assemblée" />
            <ParentCard title={`Rapport d'effectifs de l'assemblée : ${assemblee}`} action={null}>
                <Paper variant="outlined">
                    <CustomDialog2
                        label={`Rapport général`} 
                        title={`Rapport général`}
                        form={
                            assemblyReport['total_report'] ? (
                                <CustomDashboardCard
                                    subzone={assemblyReport['total_report']['subZone'] ?? 'Aucune sous-zone'}
                                    assemblyReports={[
                                        {
                                            bgcolor: primarylight,
                                            color: primary,
                                            title: "L'ancien effectif",
                                            element: assemblyReport['old_effective']
                                        },
                                        {
                                            bgcolor: primarylight,
                                            color: primary,
                                            title: "Le nouvel effectif",
                                            element: assemblyReport['new_effective']
                                        },
                                        {
                                            bgcolor: primarylight,
                                            color: primary,
                                            title: "Nombre d'adultes",
                                            element: assemblyReport['total_report']['adult_count']
                                        },
                                        {
                                            bgcolor: secondarylight,
                                            color: secondary,
                                            title: "Nombre d'enfants",
                                            element: assemblyReport['total_report']['child_count']
                                        },
                                        {
                                            bgcolor: warninglight,
                                            color: warning,
                                            title: "Nombre d'invités",
                                            element: assemblyReport['total_report']['guest_count']
                                        },
                                        {
                                            bgcolor: primarylight,
                                            color: primary,
                                            title: "Nombre de visiteurs",
                                            element: assemblyReport['total_report']['visitor_count']
                                        },
                                        {
                                            bgcolor: warninglight,
                                            color: warning,
                                            title: "Le nombre total de présences",
                                            element: assemblyReport['presence_total']
                                        },
                                        {
                                            bgcolor: errorlight,
                                            color: error,
                                            title: "Le taux de présences",
                                            element: `${assemblyReport['rate']}%`
                                        }
                                    ]}
                                ></CustomDashboardCard>
                                
                            ) : null
                        }
                        open={open}
                        closeDialog={closeDialog}
                        fullWidth={false}
                        maxWidth={`md`}
                    >
                       
                    </CustomDialog2>
                    <ToastContainer />
                    <form onSubmit={formik.handleSubmit}>
                        <Stack
                            container 
                            spacing={2}
                            margin={2}
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-end"
                        >
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

                    <Grid container margin={2}>
                        <Grid item xs={3} lg={3}>
                            <Button variant="contained" color='error' onClick={getTotalAssemblyReport}>
                                Voir le point général des rencontres 
                            </Button>
                        </Grid>  
                    </Grid>

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
                                                (assemblyReport && assemblyReport.length !== 0) ? assemblyReport.map((assemblyR) => (
                                                    <TableRow key={assemblyR.id}>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                { assemblyR.adult_count }
                                                            </Typography>
                                                        </TableCell>  
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                { assemblyR.child_count }
                                                            </Typography>
                                                        </TableCell>                  
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                { assemblyR.guest_count }
                                                            </Typography>
                                                        </TableCell>        
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                { assemblyR.visitor_count }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                { assemblyR.tithe_gift }
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                                { assemblyR.attiekoi_gift }
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
                    </Grid>
                </Paper>
            </ParentCard>
        </PageContainer>
    );
}

export default EffectifAssembleeRapport;