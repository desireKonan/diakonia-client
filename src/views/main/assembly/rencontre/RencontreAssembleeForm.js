import { useFormik } from 'formik';
import { Button, Box, Stack, MenuItem, Grid } from "@mui/material";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MeetingType, dateTime } from 'src/utils/utils';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { httpAdapter } from 'src/app/services/http-adapter.service';

const saveRencontre = async(values, assemblyId) => {
    var rencontre = await httpAdapter.saveData(`api/assemblee/rencontres`, {
        assemblyId: assemblyId, 
        meetings: [
            {
                id: values['id'],
                type: values['type'],
                start: values['start'],
                end: values['end']
            }
        ]
    });
    if(rencontre.error && rencontre.error != null) {
        toast(`Erreur: ${rencontre.error}`);
        return;
    }
    window.location.reload(true);
}

const RencontreAssembleeForm = ({ rencontre, assemblyId }) => {
    const formik = useFormik({
        initialValues: {
            id: rencontre ? rencontre.id : '',
            type: rencontre ? rencontre.type : '',
            start: rencontre ? dateTime(rencontre.start) : null,
            end: rencontre ? dateTime(rencontre.end) : null,
        },
        onSubmit: (values) => {
            saveRencontre(values, assemblyId);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <ToastContainer />
            <Stack>
                {
                    formik.values.id ? (<input type="hidden" name="id" value={formik.values.id} />) : ""
                }
                <Box>
                    <CustomFormLabel>Type de rencontre</CustomFormLabel>
                    <CustomSelect
                        labelId="type"
                        id="type" 
                        fullWidth
                        name="type"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                    >
                        {
                            Object.keys(MeetingType).map(person => (
                                 <MenuItem key={person} value={MeetingType[person]}> {MeetingType[person]} </MenuItem>
                            ))
                        }   
                    </CustomSelect>
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
    assemblyId: PropTypes.string
}

export default RencontreAssembleeForm;