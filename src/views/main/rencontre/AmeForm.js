import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Button, Box, Stack, MenuItem, Grid } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import ParentCard from "src/components/shared/ParentCard";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { date } from 'src/utils/utils';
import useFetch from 'src/app/services/useFetch';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import 'react-toastify/dist/ReactToastify.css';
import { httpAdapter } from 'src/app/services/http-adapter.service';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

const saveAme = async(values, meetingId) => {
    var ame = await httpAdapter.saveData(`api/rencontre/ames`, {
        meetingId: meetingId, 
        souls: [
            {
                id: values['id'],
                fullname: values['fullname'],
                contacts: [values['contacts']],
                place: values['place'],
                repentDate: values['repentDate'],
                baptizeDate: values['baptizeDate'],
                integrationDate: values['integrationDate'],
                evangelizeDate: values['evangelizeDate'],
            }
        ]
    });
    if(ame.errorMessage) {
        toast.error(`Erreur: ${ame.errorMessage}`);
        return;
    }
    window.location.reload(true);
}

const AmeForm = ({ ame, meetingId }) => {
    const formik = useFormik({
        initialValues: {
            id: ame ? ame.id : '',
            fullname: ame ? ame.fullname : '',
            place: ame ? ame.place : '',
            contacts: ame ? ame.contacts : [],
            repentDate: ame ? date(ame.repentDate) : null,
            baptizeDate: ame ? date(ame.baptizeDate) : null,
            integrationDate: ame ? date(ame.integrationDate) : null,
            evangelizeDate: ame ? date(ame.evangelizeDate) : null,
        },
        onSubmit: (values) => {
            saveAme(values, meetingId);
        },
    });
    const {data: subzones} = useFetch(`api/ville/subzones`, []);

    return (
        <PageContainer title="Formulaire des âmes" description="Formulaire des âmes">
            <Breadcrumb title="Formulaire des âmes" subtitle="Formulaire des âmes"/>
            <ParentCard title="Formulaire des âmes">
                <form onSubmit={formik.handleSubmit}>
                    <ToastContainer />
                    <Stack>
                        {
                          formik.values.id ? (<input type="hidden" name="id" value={formik.values.id} />) : ""
                        }
                        <Box>
                            <CustomFormLabel>Nom complet</CustomFormLabel>
                            <CustomTextField 
                                fullWidth
                                id="fullname"
                                name="fullname"
                                value={formik.values.fullname}
                                onChange={formik.handleChange}
                                error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                                helperText={formik.touched.fullname && formik.errors.fullname}
                            />
                        </Box>
                        <Box>
                            <CustomFormLabel>Lieu</CustomFormLabel>
                            <CustomSelect
                                labelId="place"
                                id="place" 
                                fullWidth
                                name="place"
                                value={formik.values.place}
                                onChange={formik.handleChange}
                            >
                                {
                                    subzones.map(subzone => (
                                        <MenuItem key={subzone} value={subzone}> {subzone} </MenuItem>
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
                            <CustomFormLabel htmlFor="start">Date d'évangélisation</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="evangelizeDate" 
                                    name="evangelizeDate"
                                    renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                                            '& .MuiSvgIcon-root': {
                                                width: 18,
                                                height: 18,
                                            },
                                            '& .MuiFormHelperText-root': {
                                                display: 'none',
                                            },
                                        }}
                                    />}
                                    placeholder="Entrez la date d'évangélisation"
                                    value={formik.values.evangelizeDate}
                                    onChange={(newValue) => {
                                        var start = date(newValue);
                                        console.log(start, newValue);
                                        formik.setFieldValue('evangelizeDate', start);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                            <CustomFormLabel htmlFor="start">Date de repentance</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="repentDate" 
                                    name="repentDate"
                                    renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                                            '& .MuiSvgIcon-root': {
                                                width: 18,
                                                height: 18,
                                            },
                                            '& .MuiFormHelperText-root': {
                                                display: 'none',
                                            },
                                        }}
                                    />}
                                    placeholder="Entrez la date de repentance"
                                    value={formik.values.repentDate}
                                    onChange={(newValue) => {
                                        var start = date(newValue);
                                        console.log(start);
                                        formik.setFieldValue('repentDate', start);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                            <CustomFormLabel htmlFor="end">Date de baptême</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="baptizeDate" 
                                    name="baptizeDate"
                                    renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                                            '& .MuiSvgIcon-root': {
                                                width: 18,
                                                height: 18,
                                            },
                                            '& .MuiFormHelperText-root': {
                                                display: 'none',
                                            },
                                        }}
                                    />}
                                    placeholder="Entrez la date d'intégration"
                                    value={formik.values.baptizeDate}
                                    onChange={(newValue) => {
                                        var end = date(newValue); 
                                        console.log(end);
                                        formik.setFieldValue('baptizeDate', end);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                            <CustomFormLabel htmlFor="end">Date d'intégration</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="integrationDate" 
                                    name="integrationDate"
                                    renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                                            '& .MuiSvgIcon-root': {
                                                width: 18,
                                                height: 18,
                                            },
                                            '& .MuiFormHelperText-root': {
                                                display: 'none',
                                            },
                                        }}
                                    />}
                                    placeholder="Entrez la date d'intégration"
                                    value={formik.values.integrationDate}
                                    onChange={(newValue) => {
                                        var end = date(newValue); 
                                        console.log(end);
                                        formik.setFieldValue('integrationDate', end);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Box mt={2}>
                            <Button color={ ame ? "warning" : "primary"} variant="contained" type="submit">
                                { ame ? `Modifier` : `Ajouter` }
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </ParentCard>
        </PageContainer>
    );
}

AmeForm.propTypes = {
    ame: PropTypes.object,
    meetingId: PropTypes.string
}

export default AmeForm;