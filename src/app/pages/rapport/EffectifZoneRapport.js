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
import CustomFormLabel from 'src/_ui/components/forms/theme-elements/CustomFormLabel';
import CustomSelect from 'src/_ui/components/forms/theme-elements/CustomSelect';
import useFetch from 'src/app/services/useFetch';
import { date2, MeetingType } from 'src/_ui/utils/utils';
import { useFormik } from 'formik';
import { httpAdapter } from 'src/app/services/http-adapter.service';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import CustomTextField from 'src/_ui/components/forms/theme-elements/CustomTextField';
import { uniqueId } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageContainer from 'src/_ui/components/container/PageContainer';
import Breadcrumb from 'src/_ui/layouts/full/shared/breadcrumb/Breadcrumb';
import ParentCard from 'src/_ui/components/shared/ParentCard';

const EffectiveZoneRapport = ({ zone }) => {
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
        var subzoneReport = await httpAdapter.saveData(`api/rapport/sous-zone`, {
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
        <PageContainer title={`Rapport d'effectifs de la zone : ${zone}`} description="Rapport d'effectifs de la zone">
            <Breadcrumb title={`Rapport d'effectifs de la zone : ${zone}`} subtitle="Rapport d'effectifs de la zone" />
            <ParentCard title={`Rapport d'effectifs de la zone : ${zone}`} action={null}>
                <Paper variant="outlined">
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
                            <Grid item xs={5} lg={5}>
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
                    </Grid>
                </Paper>
            </ParentCard>
        </PageContainer>
    );
}

export default EffectiveZoneRapport;