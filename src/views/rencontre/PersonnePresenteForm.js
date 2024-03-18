import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Button, Box, Stack, MenuItem, Grid } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import ParentCard from "src/components/shared/ParentCard";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import * as yup from 'yup';
import { PersonnePresenteService } from "src/services/personne-presente.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersonType, dateTime } from 'src/utils/utils';
import useFetch from 'src/services/useFetch';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-toastify/dist/ReactToastify.css';

const savePersonnePresente = async(values) => {
    var personne = await PersonnePresenteService.postPersonnePresente(values);
    console.log(personne);
    if(personne.error && personne.error != null) {
        toast(`Erreur: ${personne.error}`);
        return;
    }
    window.location.reload(true);
}

const PersonnePresenteForm = ({ personne, meetingId }) => {
    const formik = useFormik({
        initialValues: {
            id: personne ? personne.id : '',
            fullname: personne ? personne.fullname : '',
            discipleId: personne ? personne.discipleId : '',
            type: personne ? personne.type : '',
            contacts: personne ? personne.contacts : [],
            arrivingTime: personne ? dateTime(personne.arrivingTime) : '',
            departureTime: personne ? dateTime(personne.departureTime) : '',
        },
        onSubmit: (values) => {
            savePersonnePresente(values, meetingId);
        },
    });
    const { data: disciples } = useFetch('/api/disciple', []);

    console.log(disciples);

    return (
        <PageContainer title="Formulaire des personnes présentes" description="Formulaire des personnes présentes">
            <Breadcrumb title="Formulaire des personnes présentes" subtitle="Formulaire des personnes présentes"/>
            <ParentCard title="Formulaire des personnes présentes">
                <form onSubmit={formik.handleSubmit}>
                    <ToastContainer />
                    <Stack>
                        {
                          formik.values.id ? (<input type="hidden" name="id" value={formik.values.id} />) : ""
                        }
                        <Box>
                            <CustomFormLabel>Nom complet</CustomFormLabel>
                            <CustomSelect
                                labelId="fullname"
                                id="fullname" 
                                fullWidth
                                name="fullname"
                                value={formik.values.fullname}
                                onChange={formik.handleChange}
                            >
                                {
                                    disciples.map(disciple => (
                                        <MenuItem key={disciple.id} value={`${disciple.firstName} ${disciple.lastName}`}> {`${disciple.firstName} ${disciple.lastName}`} </MenuItem>
                                    ))
                                }   
                            </CustomSelect>
                        </Box>
                        <Box>
                            <CustomFormLabel>Type</CustomFormLabel>
                            <CustomSelect
                                labelId="type"
                                id="type" 
                                fullWidth
                                name="type"
                                value={formik.values.type}
                                onChange={formik.handleChange}
                            >
                                {
                                    Object.keys(PersonType).map(person => (
                                        <MenuItem key={person} value={PersonType[person]}> {PersonType[person]} </MenuItem>
                                    ))
                                }   
                            </CustomSelect>
                        </Box>
                        <Box>
                            <CustomFormLabel>Contacts</CustomFormLabel>
                            <CustomTextField 
                                fullWidth
                                id="contacts"
                                name="contacts"
                                value={formik.values.contacts}
                                onChange={formik.handleChange}
                                error={formik.touched.contacts && Boolean(formik.errors.contacts)}
                                helperText={formik.touched.contacts && formik.errors.contacts}
                            />
                        </Box>
                        
                        <Grid item xs={12} sm={12} lg={6}>
                            <CustomFormLabel htmlFor="start">Date de départ</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    id="start" 
                                    name="start"
                                    renderInput={(props) => <CustomTextField id="start" name="start" {...props} fullWidth size="large" sx={{
                                            '& .MuiSvgIcon-root': {
                                                width: 18,
                                                height: 18,
                                            },
                                            '& .MuiFormHelperText-root': {
                                                display: 'none',
                                            },
                                        }}
                                    />}
                                    placeholder="Entrez la date de depart"
                                    value={formik.values.start}
                                    onChange={(newValue) => {
                                        var start = dateTime(newValue);
                                        console.log(start);
                                        formik.setFieldValue('start', start);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                            <CustomFormLabel htmlFor="end">Date de fin</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    id="end" 
                                    name="end"
                                    renderInput={(props) => <CustomTextField id="end" name="end" {...props} fullWidth size="large" sx={{
                                            '& .MuiSvgIcon-root': {
                                                width: 18,
                                                height: 18,
                                            },
                                            '& .MuiFormHelperText-root': {
                                                display: 'none',
                                            },
                                        }}
                                    />}
                                    placeholder="Entrez la date de fin"
                                    value={formik.values.end}
                                    onChange={(newValue) => {
                                        var end = dateTime(newValue); 
                                        console.log(end);
                                        formik.setFieldValue('end', end);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Box mt={2}>
                            <Button color="primary" variant="contained" type="submit">
                                Ajouter
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </ParentCard>
        </PageContainer>
    );
}

PersonnePresenteForm.propTypes = {
    personne: PropTypes.object,
    meetingId: PropTypes.string
}

export default PersonnePresenteForm;