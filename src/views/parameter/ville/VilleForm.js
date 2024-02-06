import { Button, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { saveRegion } from "src/store/features/parameter/regionReducer";
import { RegionService } from 'src/services/region.service';
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import ParentCard from "src/components/shared/ParentCard";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";


const RegionForm = () => {
    const [label, setLabel] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(params.id) {
            RegionService.getRegion(params.id).then(region => {
                setLabel(region.label);
            });   
        }
    }, []);


    const submitRegion = (event) => {
        event.preventDefault();
        let region = {};
        if(params.id) {
            region.id = parseInt(params.id);
        } else {
            region.id = 0;
        }
        region.label = label;

        RegionService.postRegion(region)
            .then(response => dispatch(saveRegion(response)));

        navigate("/regions");
    }

    return (
        <PageContainer title="Formulaire de région" description="this is Custom Form page">
            <Breadcrumb title="Formulaire de région" subtitle="custom designed element"/>
            
            <ParentCard title="Formulaire de région">
                <form method="POST" onSubmit={submitRegion}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} lg={8}>
                            {
                                params.id ?? <input type="hidden" value={params.id} />
                            }
                            <CustomFormLabel htmlFor="label">Libellé</CustomFormLabel>
                            <CustomTextField
                                id="label"
                                placeholder="Enter text"
                                variant="outlined"
                                fullWidth
                                size="large"
                                value={label} 
                                onChange={(e) => setLabel(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={3}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" mt={2}>
                            <Stack spacing={1} direction="row">
                                <Button variant="contained" color="primary" type="submit"> Ajouter une région </Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </form>
            </ParentCard>
        </PageContainer>
    );
}


export default RegionForm;