import { Button, Grid, MenuItem, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import { saveAssembly } from "src/features/assemblyReducer";
import { AssemblyService } from "src/services/assembly.service";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import ParentCard from "src/components/shared/ParentCard";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";

const AssemblyForm = () => {
    const [label, setLabel] = useState("");
    const [subCenter, setSubCenter] = useState(0);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(params) {
            AssemblyService.getAssembly(params.id).then(region => {
                setLabel(region.label);
            });   
        }
    }, []);


    const submitAssembly = (event) => {
        event.preventDefault();
        let region = {};
        if(params.id) {
            region.id = parseInt(params.id);
        } else {
            region.id = 0;
        }
        region.label = label;

        AssemblyService.postAssembly(region)
            .then(response => dispatch(saveAssembly(response)));

        navigate("/assembly");
    }

    return (
        <PageContainer title="Formulaire de d'assemblée" description="this is Custom Form page">
            <Breadcrumb title="Formulaire de d'assemblée" subtitle="custom designed element"/>
            
            <ParentCard title="Formulaire de d'assemblée">
                <form method="POST" onSubmit={submitAssembly}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} lg={7}>
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
                        <Grid item xs={12} sm={12} lg={5}>
                            <CustomFormLabel htmlFor="demo-simple-select">Select Dropdown</CustomFormLabel>
                            <CustomSelect
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                fullWidth
                                size="small"
                            >
                                <MenuItem value={1}>One</MenuItem>
                                <MenuItem value={2}>Two</MenuItem>
                                <MenuItem value={3}>Three</MenuItem>
                            </CustomSelect>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={3}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" mt={2}>
                            <Stack spacing={1} direction="row">
                                <Button variant="contained" color="primary" type="submit"> Ajouter une assemblée </Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </form>
            </ParentCard>
        </PageContainer>
    );
}


export default AssemblyForm;