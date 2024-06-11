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
    Stack,
    Button} from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import { date, date2, year } from 'src/utils/utils';
import { useFormik } from 'formik';
import { httpAdapter } from 'src/app/services/http-adapter.service';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import { uniqueId } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '@emotion/react';
import { CustomDialog2, useDialogEvent } from 'src/components/custom/CustomDialog2';
import CustomDashboardCard from 'src/components/custom/CustomDashboardCard';

const SousZoneRapportAnnee = ({ subzone }) => {
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

    const [subzoneReport, setSubzoneReport] = useState([]);

    const formik = useFormik({
        initialValues: {
            year: date2(new Date()),
        },
        onSubmit: (values) => {
            getSubzoneReport(values);
        },
    });

    const getSubzoneReport = async(values) => {
        console.log(values);
        var subzoneReport = await httpAdapter.saveData(`api/rapport/sous-zone/annee`, {
            subzone: subzone,
            year: year(values['year'])
        });
        if(subzoneReport.error && subzoneReport.error != null) {
            console.log(`Erreur: ${subzoneReport.error}`);
            toast(`${subzoneReport.error}`);
            return;
        }
        setSubzoneReport(subzoneReport);
    }

    const getTotalSubzoneReport = () => {
        let data = {
            subzone: subzone,
            year: year(formik.values.year)
        }
        getSubzoneReport(data);

        openDialog();
    }

    const generateEffectiveSubzoneReport = async() => {
        await httpAdapter.generateReport(`api/rapport/export/sous-zone/annee`, {
            subzone: subzone,
            year: year(formik.values.year) 
        });
    }

    return (
        <>
            <CustomDialog2
                label={`Ajouter une âme`}
                title={`Formulaire d'ajout d'une âme`}
                form={
                    subzoneReport['total_report'] ? (
                        <CustomDashboardCard
                            subzone={subzoneReport['total_report']['subZone'] ?? 'Aucune sous-zone'}
                            subzoneReports={[
                                {
                                    bgcolor: primarylight,
                                    color: primary,
                                    title: "L'ancien effectif",
                                    element: subzoneReport['old_effective']
                                },
                                {
                                    bgcolor: primarylight,
                                    color: primary,
                                    title: "Le nouvel effectif",
                                    element: subzoneReport['new_effective']
                                },
                                {
                                    bgcolor: primarylight,
                                    color: primary,
                                    title: "Nombre d'adultes",
                                    element: subzoneReport['total_report']['adult_count']
                                },
                                {
                                    bgcolor: secondarylight,
                                    color: secondary,
                                    title: "Nombre d'enfants",
                                    element: subzoneReport['total_report']['child_count']
                                },
                                {
                                    bgcolor: warninglight,
                                    color: warning,
                                    title: "Nombre d'invités",
                                    element: subzoneReport['total_report']['guest_count']
                                },
                                {
                                    bgcolor: primarylight,
                                    color: primary,
                                    title: "Nombre de visiteurs",
                                    element: subzoneReport['total_report']['visitor_count']
                                },
                                {
                                    bgcolor: warninglight,
                                    color: warning,
                                    title: "Le nombre total de présences",
                                    element: subzoneReport['presence_total']
                                },
                                {
                                    bgcolor: errorlight,
                                    color: error,
                                    title: "Le taux de présences",
                                    element: `${subzoneReport['rate']}%`
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
                        <CustomFormLabel htmlFor="year">Année recherché</CustomFormLabel>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                id="year"
                                name="year"
                                views={["year"]}
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
                                value={formik.values.year}
                                onChange={(newValue) => {
                                    var year = date2(newValue);
                                    console.log(year, newValue);
                                    formik.setFieldValue('year', year);
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
                    <Button variant="contained" color='error' onClick={getTotalSubzoneReport}>
                        Voir le point général des rencontres
                    </Button>
                </Grid>
                <Grid item xs={3} lg={3}>
                    <Button variant="contained" color='success' onClick={generateEffectiveSubzoneReport}>
                        Générer un rapport format excel
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
                                    (subzoneReport && subzoneReport.length !== 0) ? subzoneReport.map((subzoneR) => (
                                        <TableRow key={subzoneR.id}>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {subzoneR.label}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {subzoneR.adult_count}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {subzoneR.child_count}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {subzoneR.guest_count}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {subzoneR.visitor_count}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {subzoneR.tithe_gift}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                    {subzoneR.attiekoi_gift}
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
        </>
    )
}


export default SousZoneRapportAnnee;