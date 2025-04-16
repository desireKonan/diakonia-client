import { Stack, Button, Grid, MenuItem, Box } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import PageContainer from "src/_ui/components/container/PageContainer";
import CustomFormLabel from "src/_ui/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/_ui/components/forms/theme-elements/CustomSelect";
import CustomTextField from "src/_ui/components/forms/theme-elements/CustomTextField";
import ParentCard from "src/_ui/components/shared/ParentCard";
import Breadcrumb from "src/_ui/layouts/full/shared/breadcrumb/Breadcrumb";
import useFetch from "src/app/services/useFetch";
import { LocationType, dateTime } from "src/_ui/utils/utils";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { httpAdapter } from "src/app/services/http-adapter.service";


const validationSchema = yup.object({
    label: yup.string()
        .required("Le libéllé est requis !")
});



const saveRencontre = async(values) => {
    var rencontre = await httpAdapter.saveData(`/api/rencontre`, values);
    if(rencontre.errorMessage) {
        toast.error(`Erreur: ${rencontre.errorMessage}`);
        return;
    }
    window.location.reload(true);
}


const RencontreForm = ({ rencontre }) => {
    const formik = useFormik({
        initialValues: {
            id: rencontre ? rencontre.id : '',
            label: rencontre ? rencontre.label : '',
            localization: rencontre ? rencontre.localization : '',
            meetingTypeId: rencontre ? rencontre.meetingTypeId : '',
            locationType: rencontre ? rencontre.type : '',
            start: rencontre ? dateTime(rencontre.start) : null,
            end: rencontre ? dateTime(rencontre.end) : null
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            saveRencontre(values);
        },
    });

    const { data: subzones } = useFetch("/api/ville/subzones", []);
    const { data: meetingTypes } = useFetch("/api/type-rencontre", []);

    return (
        <PageContainer title="Formulaire de rencontre" description="Formulaire de rencontres">
            <Breadcrumb title="Formulaire de rencontre" subtitle="Formulaire de rencontres"/>
            <ParentCard title="Formulaire de rencontres">
                <form onSubmit={formik.handleSubmit}>
                    {
                        formik.values.id ? (<input type="hidden" name="id" value={formik.values.id} />) : ""
                    }
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
                        <Grid item xs={4}>
                            <CustomFormLabel>Zone</CustomFormLabel>
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
                                labelId="localization"
                                id="localization" 
                                fullWidth
                                name="localization"
                                value={formik.values.localization}
                                onChange={formik.handleChange}
                            >
                                {
                                    subzones.map(subzone => {
                                        return (<MenuItem key={subzone} value={subzone}> {subzone} </MenuItem>)
                                    })
                                }   
                            </CustomSelect>
                        </Grid>
                        <Grid item xs={4}>
                            <CustomFormLabel>Type de rencontre</CustomFormLabel>
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
                                    renderInput={(props) => 
                                        <CustomTextField {...props}
                                            fullWidth 
                                            size="small" 
                                            sx={{
                                                '& .MuiSvgIcon-root': {
                                                    width: 18,
                                                    height: 18,
                                                },
                                                '& .MuiFormHelperText-root': {
                                                    display: 'none',
                                                },
                                            }}
                                        />
                                    }
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
                                    renderInput={(props) => <CustomTextField {...props} fullWidth size="small" sx={{
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
                    <Stack>
                        <Box mt={2}>
                            <Button color={ rencontre ? "warning" : "primary"} variant="contained" type="submit">
                                { rencontre ? 'Modifier' : 'Ajouter'} une rencontre
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </ParentCard>
        </PageContainer>
    );
}


export default RencontreForm;