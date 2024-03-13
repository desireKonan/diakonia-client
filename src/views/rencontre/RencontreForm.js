import { Stack, Button, Grid, MenuItem, Box } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import PageContainer from "src/components/container/PageContainer";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import ParentCard from "src/components/shared/ParentCard";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import useFetch from "src/services/useFetch";
import { LocationType, date, dateTimeValue } from "src/utils/utils";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { RencontreService } from "src/services/rencontre.service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const validationSchema = yup.object({
    label: yup.string()
        .required("Le libéllé est requis !"),
    description: yup.string()
        .required("La description est requis !"),
    localization: yup.string()
        .required("La localisation est requis !"),
    meetingTypeId: yup.string()
        .required("La type de rencontre est requis !"),
    localizationType: yup.string()
        .required("La type de localisation est requis !")
});



const saveRencontre = async(values) => {
    var rencontre = await RencontreService.postRencontre(values);
    //console.log(rencontre);
    if(rencontre.error && rencontre.error != null) {
        toast(`Erreur: ${rencontre.error}`);
        return;
    }
    window.location.reload(true);
}


const RencontreForm = ({ rencontre }) => {
    const formik = useFormik({
        initialValues: {
            id: rencontre ? rencontre.id : '',
            label: rencontre ? rencontre.label : '',
            description: rencontre ? rencontre.description : '',
            localisation: rencontre ? rencontre.localisation : '',
            meetingTypeId: rencontre ? rencontre.meetingTypeId : '',
            locationType: rencontre ? rencontre.locationType : '',
            start: rencontre ? date(rencontre.start) : null,
            end: rencontre ? date(rencontre.end) : null
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            saveRencontre(values);
        },
    });

    const { data } = useFetch("/api/ville/subzones");
    const meetingTypes = useFetch("/api/type-rencontre").data;

    return (
        <PageContainer title="Formulaire de rencontre" description="Formulaire de rencontres">
            <Breadcrumb title="Formulaire de rencontre" subtitle="Formulaire de rencontres"/>
            <ParentCard title="Formulaire de rencontres">
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CustomFormLabel>Libéllé</CustomFormLabel>
                            <CustomTextField
                                fullWidth
                                id="label"
                                name="label"
                                value={formik.values.label}
                                onChange={formik.handleChange}
                                error={formik.touched.label && Boolean(formik.errors.label)}
                                helperText={formik.touched.label && formik.errors.label}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomFormLabel>Description</CustomFormLabel>
                            <CustomTextField
                                fullWidth
                                id="description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomFormLabel>Type de rencontre</CustomFormLabel>
                            <CustomSelect
                                labelId="locationType"
                                id="locationType" 
                                fullWidth
                                name="locationType"
                                value={formik.values.locationType}
                                onChange={formik.handleChange}
                            >
                                {
                                    Object.keys(LocationType).map(location => (
                                        <MenuItem key={location} value={LocationType[location]}> {LocationType[location]} </MenuItem>
                                    ))
                                }   
                            </CustomSelect>
                        </Grid>
                        <Grid item xs={4}>
                            <CustomFormLabel>Localisation</CustomFormLabel>
                            <CustomSelect
                                labelId="localisation"
                                id="localisation" 
                                fullWidth
                                name="localisation"
                                value={formik.values.localisation}
                                onChange={formik.handleChange}
                            >
                                {
                                    data.map(subzone => {
                                        return (<MenuItem key={subzone} value={subzone}> {subzone} </MenuItem>)
                                    })
                                }   
                            </CustomSelect>
                        </Grid>
                        <Grid item xs={4}>
                            <CustomFormLabel>Type de lieu</CustomFormLabel>
                            <CustomSelect
                                labelId="meetingTypeId"
                                id="meetingTypeId" 
                                fullWidth
                                name="meetingTypeId"
                                value={formik.values.meetingTypeId}
                                onChange={formik.handleChange}
                            >
                                {
                                    meetingTypes.map(type => 
                                        (<MenuItem key={type.id} value={type.id}> {type.label} </MenuItem>)
                                    )
                                }   
                            </CustomSelect>
                        </Grid>
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
                                        var start = date(newValue);
                                        console.log(start);
                                        formik.handleChange(start);
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
                                        var end = date(newValue); 
                                        formik.handleChange(end);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Stack>
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


export default RencontreForm;