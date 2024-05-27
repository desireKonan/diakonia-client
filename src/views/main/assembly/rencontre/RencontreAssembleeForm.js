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
                details: {
                    adultCount: values['adult_count'],
                    childCount: values['child_count'],
                    guestCount: values['guest_count'],
                    visitorCount: values['visitor_count'],
                    titheAndGift: values['tithe_gift'],
                    attiekoiGift: values['attiekoi_gift']
                },
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
            adult_count: rencontre ? rencontre.details['adultCount'] : 0,
            child_count: rencontre ? rencontre.details['childCount'] : 0,
            guest_count: rencontre ? rencontre.details['guestCount'] : 0,
            visitor_count: rencontre ? rencontre.details['visitorCount'] : 0,
            tithe_gift: rencontre ? rencontre.details['titheAndGift'] : 0,
            attiekoi_gift: rencontre ? rencontre.details['attiekoiGift'] : 0,
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

                <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                        <CustomFormLabel>Nombre d'adultes (frères)</CustomFormLabel>
                        <CustomTextField
                            fullWidth 
                            id="adult_count"
                            name="adult_count"
                            type="number"
                            value={formik.values.adult_count}
                            onChange={formik.handleChange}
                            error={formik.touched.adult_count && Boolean(formik.errors.adult_count)}
                            helperText={formik.touched.adult_count && formik.errors.adult_count}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <CustomFormLabel>Nombre d'enfants (frères)</CustomFormLabel>
                        <CustomTextField 
                            fullWidth
                            id="child_count"
                            name="child_count"
                            type="number"
                            value={formik.values.child_count}
                            onChange={formik.handleChange}
                            error={formik.touched.child_count && Boolean(formik.errors.child_count)}
                            helperText={formik.touched.child_count && formik.errors.child_count}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <CustomFormLabel>Nombre d'invités</CustomFormLabel>
                        <CustomTextField 
                            fullWidth
                            id="guest_count"
                            name="guest_count"
                            type="number"
                            value={formik.values.guest_count}
                            onChange={formik.handleChange}
                            error={formik.touched.guest_count && Boolean(formik.errors.guest_count)}
                            helperText={formik.touched.guest_count && formik.errors.guest_count}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <CustomFormLabel>Nombre de visiteurs</CustomFormLabel>
                        <CustomTextField 
                            fullWidth
                            type="number"
                            id="visitor_count"
                            name="visitor_count"
                            value={formik.values.visitor_count}
                            onChange={formik.handleChange}
                            error={formik.touched.visitor_count && Boolean(formik.errors.visitor_count)}
                            helperText={formik.touched.visitor_count && formik.errors.visitor_count}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <CustomFormLabel>Total dîmes et offrandes</CustomFormLabel>
                        <CustomTextField 
                            fullWidth
                            id="tithe_gift"
                            name="tithe_gift"
                            type="number"
                            value={formik.values.tithe_gift}
                            onChange={formik.handleChange}
                            error={formik.touched.tithe_gift && Boolean(formik.errors.tithe_gift)}
                            helperText={formik.touched.tithe_gift && formik.errors.tithe_gift}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <CustomFormLabel>Total Don pour Attiékoi</CustomFormLabel>
                        <CustomTextField 
                            fullWidth
                            type="number"
                            id="attiekoi_gift"
                            name="attiekoi_gift"
                            value={formik.values.attiekoi_gift}
                            onChange={formik.handleChange}
                            error={formik.touched.attiekoi_gift && Boolean(formik.errors.attiekoi_gift)}
                            helperText={formik.touched.attiekoi_gift && formik.errors.attiekoi_gift}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
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
                    <Grid item xs={6} md={6}>
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