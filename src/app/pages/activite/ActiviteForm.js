import { Button, Grid, Stack, MenuItem, Tab, Box } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { useState } from "react";
import CustomFormLabel from "src/_ui/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/_ui/components/forms/theme-elements/CustomTextField";
import CustomSelect from "src/_ui/components/forms/theme-elements/CustomSelect";
import { date } from "src/_ui/utils/utils";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AddButtonDetails from "src/app/components/custom/AddButtonDetails";
import useAddDetails from "src/app/components/hooks/useAddDetails";
import { IconTrash } from "@tabler/icons";
import { useFormik } from "formik";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { ToastContainer, toast } from 'react-toastify';
import useFetch from "src/app/services/useFetch";

const submitActivite = async(values) => {
    var ame = await httpAdapter.saveData(`api/activite`, {
        id: values['id'], 
        label: values['label'],
        description: values['description'],
        activityTypeId: values['typeId'],
        //activityDetails: values['details'],
        start: values['startDate'],
        end: values['endDate']
    });
    if(ame.errorMessage) {
        toast.error(`Erreur: ${ame.errorMessage}`);
        return;
    }
    window.location.reload(true);
}


const ActiviteForm = ({ activite }) => {
    const formik = useFormik({
        initialValues: {
            id: activite ? activite.id : '',
            label: activite ? activite.label : '',
            description: activite ? activite.description : '',
            //details: activite ? activite.details : '',
            typeId: activite ? activite.activityTypeId : '',
            startDate: activite ? date(activite.startDate) : null,
            endDate: activite ? date(activite.endDate) : null
        },
        onSubmit: (values) => {
            submitActivite(values);
        },
    });
    const { data: typesActivites } = useFetch('/api/type-activite', []);
    
    const [tabState, setTabState] = useState("1");
    const {
        details, 
        addDetails,
        removeDetails, 
    } = useAddDetails();
    
    const handleTabChange = (event, newValue) => {
        setTabState(newValue);
    };
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <ToastContainer />
            <TabContext value={tabState}>
                <Box sx={{ borderBottom: 1, borderColor: (theme) => theme.palette.divider }}>
                    <TabList onChange={handleTabChange} aria-label="lab API tabs example" variant="scrollable" scrollButtons="auto">
                        <Tab label="Informations sur l'activité" value="1" />
                        <Tab label="Informations sur les détails de l'application" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} lg={12}>
                            <CustomFormLabel htmlFor="label">Libellé</CustomFormLabel>
                            <CustomTextField
                                labelId="label"
                                id="label" 
                                fullWidth
                                name="label"
                                placeholder="Entrer un libéllé"
                                variant="outlined"
                                size="large"
                                value={formik.values.label}
                                onChange={formik.handleChange}
                                error={formik.touched.label && Boolean(formik.errors.label)}
                                helperText={formik.touched.label && formik.errors.label}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12}>
                            <CustomFormLabel htmlFor="label">Description</CustomFormLabel>
                            <CustomTextField
                                labelId="description"
                                id="description"
                                fullWidth
                                name="description"
                                placeholder="Entrer une description"
                                variant="outlined"
                                multiline
                                rows={4}
                                size="large"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12}>
                            <CustomFormLabel htmlFor="activityType">Types d'activités</CustomFormLabel>
                            <CustomSelect
                                labelId="typeId"
                                id="typeId"
                                fullWidth
                                name="typeId"
                                value={formik.values.typeId}
                                onChange={formik.handleChange}
                            >
                                {
                                    typesActivites.map(typesActivite => 
                                        (<MenuItem key={typesActivite.id} value={typesActivite.id}> {typesActivite.label} </MenuItem>)
                                    )
                                }
                            </CustomSelect>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                            <CustomFormLabel htmlFor="startDate">Date de départ</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="date"
                                    name="startDate"
                                    renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                                        '& .MuiSvgIcon-root': {
                                            width: 18,
                                            height: 18,
                                        },
                                        '& .MuiFormHelperText-root': {
                                            display: 'none',
                                        },
                                    }} />}
                                    placeholder="Entrez la date de depart"
                                    value={formik.values.startDate}
                                    onChange={(newValue) => {
                                        var start = date(newValue);
                                        formik.setFieldValue('startDate', start);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                            <CustomFormLabel htmlFor="startDate">Date de fin</CustomFormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    id="date"
                                    name="endDate"
                                    renderInput={(props) => <CustomTextField {...props} fullWidth size="large" sx={{
                                        '& .MuiSvgIcon-root': {
                                            width: 18,
                                            height: 18,
                                        },
                                        '& .MuiFormHelperText-root': {
                                            display: 'none',
                                        },
                                    }} />}
                                    placeholder="Entrez la date de fin"
                                    value={formik.values.endDate}
                                    onChange={(newValue) => {
                                        var end = date(newValue);
                                        formik.setFieldValue('endDate', end);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value="2">
                    <Grid container spacing={2} justifyContent="center">
                        <AddButtonDetails 
                            typography={`Détails de l'activité`} 
                            label={`Ajouter des détails`}
                            onClicked={(e) => addDetails()}
                        >
                        </AddButtonDetails>
                        <Grid container spacing={2} justifyContent="center">    
                            { 
                                formik.values.details ? Object.entries(formik.values.details).map(([key, value]) => {
                                    return <>
                                        <Grid key={`title-${key}`} item xs={12} sm={12} lg={5}>
                                            <CustomFormLabel htmlFor="label">Titre du détails</CustomFormLabel>
                                            <CustomTextField
                                                id="titleDetails"
                                                name="titleDetails[]"
                                                placeholder="Entrer une titre de détails"
                                                variant="outlined"
                                                value={key}
                                                fullWidth
                                                size="large"
                                            />
                                        </Grid>
                                        <Grid key={`value-${key}`} item xs={12} sm={12} lg={5}>
                                            <CustomFormLabel htmlFor="label">Valeur du détails</CustomFormLabel>
                                            <CustomTextField
                                                id="detailValue"
                                                name="detailValue[]"
                                                placeholder="Entrer une valeur de détails"
                                                variant="outlined"
                                                value={value}
                                                fullWidth
                                                size="large"
                                            />
                                        </Grid>
                                        <Grid key={`row-${key}`} item xs={12} sm={12} lg={2} justifyContent="center">
                                            <Button color="error" startIcon={<IconTrash width={18} />} onClick={() => removeDetails(key)}>
                                                Supprimer
                                            </Button>
                                        </Grid>
                                    </>;
                                }) : null
                            }
                            {
                                (details ?? null)
                            }
                        </Grid>
                    </Grid>
                </TabPanel>
            </TabContext>
                
            <Grid item xs={12} md={12} lg={4}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" mt={2}>
                    <Stack spacing={1} direction="row">
                        <Button variant="contained" color={activite ? "warning": "primary"} type="submit"> 
                            { activite ? 'Modifier': 'Ajouter' } une activité 
                        </Button>
                    </Stack>
                </Stack>
            </Grid>
        </form>
    );
};
            
            
export default ActiviteForm;