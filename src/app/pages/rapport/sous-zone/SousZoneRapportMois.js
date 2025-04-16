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
    Button
} from '@mui/material';
import CustomFormLabel from 'src/_ui/components/forms/theme-elements/CustomFormLabel';
import { date2, month } from 'src/_ui/utils/utils';
import { useFormik } from 'formik';
import { httpAdapter } from 'src/app/services/http-adapter.service';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import CustomTextField from 'src/_ui/components/forms/theme-elements/CustomTextField';
import { uniqueId } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SousZoneRapportMois = ({ subzone }) => {
    const [subzoneReport, setSubzoneReport] = useState([]);

    const formik = useFormik({
        initialValues: {
            month: date2(new Date())
        },
        onSubmit: (values) => {
            getSubzoneReport(values);
        },
    });

    const getSubzoneReport = async (values) => {
        var subzoneReport = await httpAdapter.saveData(`api/rapport/sous-zone/mois`, {
            subzone: subzone,
            month: month(values['month'])
        });
        if (subzoneReport.error && subzoneReport.error != null) {
            console.log(`Erreur: ${subzoneReport.error}`);
            toast(`${subzoneReport.error}`);
            return;
        }
        setSubzoneReport(subzoneReport);
    }

    const generateEffectiveSubzoneReport = async () => {
        await httpAdapter.generateReport(`api/rapport/export/sous-zone/mois`, {
            subzone: subzone,
            month: month(formik.values.month)
        });
    }

    return (
        <>
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
                        <CustomFormLabel htmlFor="month">Mois recherché</CustomFormLabel>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                id="month"
                                name="month"
                                views={['month', "year"]}
                                renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                                    '& .MuiSvgIcon-root': {
                                        width: 18,
                                        height: 18,
                                    },
                                    '& .MuiFormHelperText-root': {
                                        display: 'none',
                                    },
                                }} />}
                                placeholder="Entrez le mois recherchée"
                                value={formik.values.month}
                                onChange={(newValue) => {
                                    var _month = date2(newValue);
                                    console.log(_month);
                                    formik.setFieldValue('month', _month);
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={3} lg={3}>
                        <Button variant="contained" color='primary' type="submit">
                            Rechercher
                        </Button>
                    </Grid>
                    <Grid item xs={3} lg={3}>
                        <Button variant="contained" color='success' onClick={generateEffectiveSubzoneReport}>
                            Générer un rapport format excel
                        </Button>
                    </Grid>
                </Stack>
            </form>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TableContainer sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' }, maxHeight: 440, }}>
                        <Table
                            sx={{
                                whiteSpace: "nowrap",
                                mt: 2
                            }}
                            stickyHeader
                            aria-label="sticky table"
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
                                    (subzoneReport && subzoneReport.length !== 0) ? subzoneReport.map((subzoneR, index) => (
                                        <TableRow key={subzoneR.id}>
                                            <TableCell style={(index === subzoneReport.length - 1) ? { backgroundColor: "#2ecc71" } : { backgroundColor: "#f39c12" }}>
                                                <Typography color="#f5f6fa" variant="subtitle2" fontWeight={(index === (subzoneReport.length - 1)) ? 700 : 500}>
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


export default SousZoneRapportMois;