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
import { date, date2 } from 'src/app/services/utils';
import { useFormik } from 'formik';
import { httpAdapter } from 'src/app/services/http-adapter.service';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import CustomTextField from 'src/_ui/components/forms/theme-elements/CustomTextField';
import { uniqueId } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssembleeRapportJour = ({ assemblee }) => {
    const [assemblyReport, setAssemblyReport] = useState([]);

    const formik = useFormik({
        initialValues: {
            day: date2(new Date()),
        },
        onSubmit: (values) => {
            getAssemblyReport(values);
        },
    });

    const getAssemblyReport = async (values) => {
        var assemblyReport = await httpAdapter.saveData(`api/rapport/assemblee`, {
            label: assemblee,
            day: values['day']
        });
        if (assemblyReport.error && assemblyReport.error != null) {
            console.log(`Erreur: ${assemblyReport.error}`);
            toast(`${assemblyReport.error}`);
            return;
        }
        setAssemblyReport(assemblyReport);
    }


    const generateEffectiveSubzoneReport = async () => {
        console.log(date(formik.values.day));
        await httpAdapter.generateReport(`api/rapport/export/assemblee/jour`, {
            label: assemblee,
            day: formik.values.day
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
                                    (assemblyReport && assemblyReport.length !== 0) ? assemblyReport.map((assemblyR, index) => {
                                        if (index === assemblyReport.length - 1) {
                                            return (
                                                <>
                                                    <TableRow key={uniqueId()} style={{ backgroundColor: "#1abc9c" }}>
                                                        <TableCell colSpan={6}>
                                                            <Typography color="#ecf0f1" variant="subtitle2" fontWeight={500}>
                                                                Totaux
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow key={assemblyR.id} style={{ backgroundColor: "#3498db" }}>
                                                        <TableCell>
                                                            <Typography color="#ecf0f1" variant="subtitle2" fontWeight={400}>
                                                                {assemblyR.adult_count}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="#ecf0f1" variant="subtitle2" fontWeight={400}>
                                                                {assemblyR.child_count}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="#ecf0f1" variant="subtitle2" fontWeight={400}>
                                                                {assemblyR.guest_count}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="#ecf0f1" variant="subtitle2" fontWeight={400}>
                                                                {assemblyR.visitor_count}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="#ecf0f1" variant="subtitle2" fontWeight={400}>
                                                                {assemblyR.tithe_gift}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="#ecf0f1" variant="subtitle2" fontWeight={400}>
                                                                {assemblyR.attiekoi_gift}
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                </>
                                            );
                                        }
                                        return (
                                            <TableRow key={assemblyR.id}>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        {assemblyR.adult_count}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        {assemblyR.child_count}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        {assemblyR.guest_count}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        {assemblyR.visitor_count}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        {assemblyR.tithe_gift}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                        {assemblyR.attiekoi_gift}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }) : (
                                        <TableRow key={`${uniqueId()}`}>
                                            <TableCell colSpan={6}>
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
    );
}


export default AssembleeRapportJour;