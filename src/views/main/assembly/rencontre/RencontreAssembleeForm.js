import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Button, Box, Stack, MenuItem, Grid } from "@mui/material";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersonType, dateTime } from 'src/utils/utils';
import useFetch from 'src/app/services/useFetch';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-toastify/dist/ReactToastify.css';
import { httpAdapter } from 'src/app/services/http-adapter.service';
import { useState } from 'react';

const saveRencontre = async(values, meetingId) => {
    var rencontre = await httpAdapter.saveData(`api/assemblee/rencontres`, {
        meetingId: meetingId, 
        presentPersons: [
            {
                id: values['id'],
                fullname: values['fullname'],
                contacts: [values['contacts']],
                discipleId: values['discipleId'],
                type: values['type'],
                arrivingTime: values['arrivingTime'],
                departureTime: values['departureTime']
            }
        ]
    });
    if(rencontre.error && rencontre.error != null) {
        toast(`Erreur: ${rencontre.error}`);
        return;
    }
    window.location.reload(true);
}

const RencontreAssembleeForm = ({ rencontre, meetingId }) => {
    const [isGuest, setGuest] = useState(false);
    const formik = useFormik({
        initialValues: {
            id: rencontre ? rencontre.id : '',
            fullname: rencontre ? rencontre.fullname : '',
            type: rencontre ? rencontre.type : '',
            discipleId: rencontre ? rencontre.discipleId : '',
            contacts: rencontre ? rencontre.contacts : [],
            arrivingTime: rencontre ? dateTime(rencontre.arrivingTime) : null,
            departureTime: rencontre ? dateTime(rencontre.departureTime) : null,
        },
        onSubmit: (values) => {
            saveRencontre(values, meetingId);
        },
    });
    const { data: disciples } = useFetch('/api/disciple', []);

    return (
        <form onSubmit={formik.handleSubmit}>
                    <ToastContainer />
                    <Stack>
                        {
                          formik.values.id ? (<input type="hidden" name="id" value={formik.values.id} />) : ""
                        }
                        <Box>
                            <CustomFormLabel>Type</CustomFormLabel>
                            <CustomSelect
                                labelId="type"
                                id="type" 
                                fullWidth
                                name="type"
                                value={formik.values.type}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    if(PersonType.GUEST === e.target.value) {
                                        setGuest(true);
                                    } else {
                                        setGuest(false);
                                    }
                                }}
                            >
                                {
                                    Object.keys(PersonType).map(person => (
                                        <MenuItem key={person} value={PersonType[person]}> {PersonType[person]} </MenuItem>
                                    ))
                                }   
                            </CustomSelect>
                        </Box>
                        <Box>
                            <CustomFormLabel>Nom complet</CustomFormLabel>
                            {
                                isGuest ? (
                                    <CustomTextField 
                                        fullWidth
                                        id="fullname"
                                        name="fullname"
                                        value={formik.values.fullname}
                                        onChange={formik.handleChange}
                                        error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                                        helperText={formik.touched.fullname && formik.errors.fullname}
                                    />
                                ) : (
                                    <CustomSelect
                                        labelId="discipleId"
                                        id="discipleId" 
                                        fullWidth
                                        name="discipleId"
                                        value={formik.values.discipleId}
                                        onChange={e => {
                                            formik.handleChange(e);
                                            const disciple = disciples.find(disciple => disciple.id === e.target.value);
                                            formik.setFieldValue('fullname', `${disciple.firstName} ${disciple.lastName}`);
                                        }}
                                    >
                                        {
                                            disciples.map(disciple => (
                                                <MenuItem key={disciple.id} value={`${disciple.id}`}> {`${disciple.firstName} ${disciple.lastName}`} </MenuItem>
                                            ))
                                        }   
                                    </CustomSelect>
                                )
                            }
                            
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
                                    value={formik.values.arrivingTime}
                                    onChange={(newValue) => {
                                        var start = dateTime(newValue);
                                        console.log(start);
                                        formik.setFieldValue('arrivingTime', start);
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
                                    value={formik.values.departureTime}
                                    onChange={(newValue) => {
                                        var end = dateTime(newValue); 
                                        console.log(end);
                                        formik.setFieldValue('departureTime', end);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Box mt={2}>
                        <Button color={ rencontre ? "warning" : "primary"} variant="contained" type="submit">
                                { rencontre ? `Modifier` : `Ajouter` }
                            </Button>
                        </Box>
                    </Stack>
        </form>
    );
}

RencontreAssembleeForm.propTypes = {
    rencontre: PropTypes.object,
    meetingId: PropTypes.string
}

export default RencontreAssembleeForm;