import { Button, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { addTypeActivite } from "src/store/features/parameter/TypeActiviteSlice";
import { TypeActiviteService } from 'src/services/type-activite.service';
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import ParentCard from "src/components/shared/ParentCard";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";


const TypeActiviteForm = () => {
    const [formData, setFormData] = useState({
        label: "",
        description: ""
    });
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(params.id) {
            TypeActiviteService.getTypeActivite(params.id).then(typeActivite => {
                var labelRef = document.getElementById('label');
                labelRef.value = typeActivite.label;

                var descriptionRef = document.getElementById('description');
                descriptionRef.value = typeActivite.description;
            });   
        }
    }, [params, formData]);

    const handleInputChange = event => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
    }

    const submitTypeActivite = (event) => {
        event.preventDefault();
        let typeActivite = {};
        if(params.id) {
            typeActivite.id = params.id;
        }
        typeActivite.label = formData.label;
        typeActivite.description = formData.description;

        TypeActiviteService.postTypeActivite(typeActivite)
            .then(response => dispatch(addTypeActivite(response)));
    }

    return (
        <PageContainer title="Formulaire de type d'activité" description="Formulaire de type d'activité">
            <Breadcrumb title="Formulaire de type d'activité" subtitle="Formulaire de type d'activité"/>
            
            <ParentCard title="Formulaire de type d'activité">
                <form method="POST" onSubmit={submitTypeActivite}>
                    <Grid container spacing={3}>
                        {
                            params.id ? (
                                <Grid item xs={12} sm={12} lg={4}>
                                    <CustomFormLabel>Ancien Libéllé</CustomFormLabel>
                                    <CustomTextField
                                        id="label"
                                        variant="outlined"
                                        fullWidth
                                        size="large"
                                        disabled
                                    />
                                </Grid>   
                            ): null
                        }
                        <Grid item xs={12} sm={12} lg={8}>
                            <CustomFormLabel htmlFor="label">Libellé</CustomFormLabel>
                            <CustomTextField
                                name="label"
                                placeholder="Entrer un libéllé"
                                variant="outlined"
                                fullWidth
                                size="large"
                                value={formData.label}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        {
                            params.id ? (
                                <Grid item xs={12} sm={12} lg={4}>
                                    <CustomFormLabel>Ancienne Description</CustomFormLabel>
                                    <CustomTextField
                                        id="description"
                                        variant="outlined"
                                        fullWidth
                                        size="large"
                                        disabled
                                    />
                                </Grid>   
                            ): null
                        }
                        <Grid item xs={12} sm={12} lg={8}>
                            <CustomFormLabel htmlFor="label">Description</CustomFormLabel>
                            <CustomTextField
                                name="description"
                                placeholder="Entrer une description"
                                variant="outlined"
                                fullWidth
                                size="large"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" mt={2}>
                            <Stack spacing={1} direction="row">
                                <Button variant="contained" color={params.id ? "warning": "primary"} type="submit"> 
                                    { params.id ? 'Modifier': 'Ajouter' } un type d'activité 
                                </Button>
                                <Button variant="contained" color="secondary" onClick={(e) => navigate("/type-activites")}> 
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


export default TypeActiviteForm;