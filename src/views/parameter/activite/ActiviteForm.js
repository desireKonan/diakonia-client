import { Button, Grid, Stack, MenuItem, Tab, Box } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { addActivite } from "src/store/features/apps/ActiviteSlice";
import { ActiviteService } from 'src/services/activite.service';
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import ParentCard from "src/components/shared/ParentCard";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { TypeActiviteService } from "src/services/type-activite.service";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import { date, dateTimeValue } from "src/utils/utils";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AddButtonDetails from "src/components/custom/AddButtonDetails";
import useAddDetails from "src/custom-hooks/useAddDetails";
import { IconTrash } from "@tabler/icons";


const ActiviteForm = () => {
    const [formData, setFormData] = useState({
        label: "",
        description: "",
        details: {},
        typeId: "",
        startDate: null,
        endDate: null
    });
    const [typesActivites, setTypeActivites] = useState([]);
    const [tabState, setTabState] = useState("1");
    const {
        details, 
        addDetails,
        removeDetails, 
        detailsJson
    } = useAddDetails();
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(params.id) {
            ActiviteService.getActivite(params.id).then(activite => {
                setFormData({
                    label: activite.label,
                    description: activite.description,
                    typeId: activite.activityTypeId,
                    details: activite.details,
                    startDate: activite.startDate ? dateTimeValue(activite.startDate) : null,
                    endDate: activite.endDate ? dateTimeValue(activite.endDate) : null
                });
            });   
        }

        TypeActiviteService.getTypeActivites().then(typeActivites => {
            setTypeActivites(typeActivites);
        });
    }, []);

    const handleInputChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
    }

    const setStartDate = (event) => {
        setFormData({
            ...formData,
            startDate: event ? date(event): null
        });
    }

    
    const setEndDate = (event) => {
        setFormData({
            ...formData,
            endDate: event ? date(event): null
        });
    }

    const handleTabChange = (event, newValue) => {
        setTabState(newValue);
    };

    
    const submitActivite = (event) => {
        event.preventDefault();
        let activite = {};
        if(params.id) {
            activite.id = params.id;
        }
        activite.label = formData.label;
        activite.description = formData.description;
        activite.activityTypeId = formData.typeId;
        activite.activityDetails = detailsJson;
        activite.start = date(formData.startDate);
        activite.end = date(formData.endDate);

        ActiviteService.postActivite(activite)
            .then(response => dispatch(addActivite(response.data)));
    }


    return (
        <PageContainer title="Formulaire d'activité" description="Formulaire d'activité">
            <Breadcrumb title="Formulaire d'activité" subtitle="Formulaire d'activité"/>
            
            <ParentCard title="Formulaire d'activité">
                <form method="POST" onSubmit={submitActivite}>
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
                                        id="label"
                                        name="label"
                                        placeholder="Entrer un libéllé"
                                        variant="outlined"
                                        fullWidth
                                        size="large"
                                        value={formData.label}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} lg={12}>
                                    <CustomFormLabel htmlFor="label">Description</CustomFormLabel>
                                    <CustomTextField
                                        id="description"
                                        name="description"
                                        placeholder="Entrer une description"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        size="large"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} lg={12}>
                                    <CustomFormLabel htmlFor="activityType">Types d'activités</CustomFormLabel>
                                    <CustomSelect
                                        labelId="activity-type"
                                        id="activity-type" 
                                        fullWidth
                                        name="typeId"
                                        value={formData.typeId}
                                        onChange={handleInputChange}
                                    >
                                        {
                                            typesActivites ? (
                                                typesActivites.map(typesActivite => 
                                                    (<MenuItem key={typesActivite.id} value={typesActivite.id}> {typesActivite.label} </MenuItem>)
                                                )
                                            ) : null
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
                                            value={formData.startDate}
                                            onChange={(newValue) => {
                                                console.log(newValue);
                                                setStartDate(newValue);
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
                                            value={formData.endDate}
                                            onChange={(newValue) => {
                                                console.log(newValue);
                                                setEndDate(newValue);
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
                                        formData.details ? Object.entries(formData.details).map(([key, value]) => {
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
                                <Button variant="contained" color={params.id ? "warning": "primary"} type="submit"> 
                                    { params.id ? 'Modifier': 'Ajouter' } une activité 
                                </Button>
                                <Button variant="contained" color="secondary" onClick={(e) => navigate("/activites")}> 
                                    Retour
                                </Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </form>
            </ParentCard>
        </PageContainer>
    );
};


export default ActiviteForm;