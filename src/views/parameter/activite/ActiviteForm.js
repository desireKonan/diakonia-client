import { Button, Grid, Stack, MenuItem, Tab, Box, Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { addActivite } from "src/store/features/parameter/ActiviteSlice";
import { ActiviteService } from 'src/services/activite.service';
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import ParentCard from "src/components/shared/ParentCard";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { TypeActiviteService } from "src/services/type-activite.service";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";


const ActiviteForm = () => {
    const [formData, setFormData] = useState({
        label: "",
        description: "",
        details: {},
        typeId: ""
    });
    const [typesActivites, setTypeActivites] = useState([]);
    const [tabState, setTabState] = useState("1");
    const [details, setDetails] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(params.id) {
            ActiviteService.getActivite(params.id).then(typeActivite => {
                var labelRef = document.getElementById('label');
                labelRef.value = typeActivite.label;

                var descriptionRef = document.getElementById('description');
                descriptionRef.value = typeActivite.description;

                var typeActiviteRef = document.getElementById('activity-type');
                console.log(typeActivite.activityTypeId);
                typeActiviteRef.value = typeActivite.activityTypeId;

                TypeActiviteService.getTypeActivites().then(typeActivites => {
                    setTypeActivites(typeActivites);
                });
            });   
        }
    }, []);

    const handleInputChange = event => {
        event.preventDefault();
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
    }


    const handleTabChange = (event, newValue) => {
        setTabState(newValue);
    };


    const addDetails = (event) => {
        event.preventDefault();

        let detail = (
            <>
                <Grid item xs={12} sm={12} lg={6}>
                    <CustomFormLabel htmlFor="label">Titre du détails</CustomFormLabel>
                    <CustomTextField
                        id="titleDetails"
                        name="titleDetails[]"
                        placeholder="Entrer une titre de détails"
                        variant="outlined"
                        fullWidth
                        size="large"
                    />
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <CustomFormLabel htmlFor="label">Valeur du détails</CustomFormLabel>
                    <CustomTextField
                        id="detailValue"
                        name="detailValue[]"
                        placeholder="Entrer une valeur de détails"
                        variant="outlined"
                        fullWidth
                        size="large"
                    />
                </Grid>
            </>
        );
        console.log(detail);
        setDetails([...details, detail]);
    }

    
    const submitActivite = (event) => {
        event.preventDefault();
        let typeActivite = {};
        if(params.id) {
            typeActivite.id = params.id;
        }
        typeActivite.label = formData.label;
        typeActivite.description = formData.description;
        typeActivite.activityTypeId = formData.typeId;

        ActiviteService.postActivite(typeActivite)
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
                            </Grid>
                        </TabPanel>
                        <TabPanel value="2">
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={12} sm={12} lg={12}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                                        <Typography variant="h4" color="textSecondary">
                                            Détails de l'activité
                                        </Typography>
                                        <Button variant="contained" color="primary" onClick={addDetails}>
                                            Ajouter des détails
                                        </Button>
                                    </Stack>
                                </Grid>
                                { details ?? null }
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