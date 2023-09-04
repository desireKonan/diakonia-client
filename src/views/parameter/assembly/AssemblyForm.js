import { Button, Grid, MenuItem, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import { saveAssembly } from "src/store/features/parameter/assemblyReducer";
import { AssemblyService } from "src/services/assembly.service";
import PageContainer from "src/components/container/PageContainer";
import Breadcrumb from "src/layouts/full/shared/breadcrumb/Breadcrumb";
import ParentCard from "src/components/shared/ParentCard";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { SubCenterService } from "src/services/subCenter.service";

const AssemblyForm = () => {
    const [name, setName] = useState("");
    const [subCenter, setSubCenter] = useState(0);
    const [subCenters, setSubCenters] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(params.id) {
            AssemblyService.getAssembly(params.id).then(assembly => {
                setName(assembly.name);
            });   
        }
    }, []);


    useEffect(() => {
        SubCenterService.getSubCenters().then(subCenters => {
            setSubCenters(subCenters);
        })
    }, []);

    const submitAssembly = (event) => {
        event.preventDefault();
        let assembly = {};
        if(params.id) {
            assembly.id = parseInt(params.id);
        } else {
            assembly.id = 0;
        }
        assembly.name = name;
        assembly.subCenterId = subCenter;

        AssemblyService.postAssembly(assembly)
            .then(response => dispatch(saveAssembly(response)));

        navigate("/assemblies");
    }

    return (
        <PageContainer title="Formulaire de d'assemblée" description="this is Custom Form page">
            <Breadcrumb title="Formulaire de d'assemblée" subtitle="custom designed element"/>
            
            <ParentCard title="Formulaire de d'assemblée">
                <form method="POST" onSubmit={submitAssembly}>
                    {
                        params.id ?? <TextField type="hidden" value={params.id} />
                    }
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} lg={7}>
                            <CustomFormLabel htmlFor="label">Libellé</CustomFormLabel>
                            <CustomTextField
                                id="label"
                                placeholder="Enter text"
                                variant="outlined"
                                fullWidth
                                size="large"
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={5}>
                            <CustomFormLabel htmlFor="demo-simple-select">Sous zone</CustomFormLabel>
                            <CustomSelect
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                fullWidth
                                size="large"
                                value={subCenter}
                                onChange={e => {setSubCenter(e.target.value)}}
                            >
                                {
                                    subCenters.filter(subCent => subCent.id === parseInt(params.id))?.map(subCenter => 
                                        <MenuItem selected={subCenter.id}>{subCenter.name}</MenuItem>    
                                    )
                                }
                                {
                                    
                                    (subCenters.length !== 0) ? subCenters.map((subCenter) => {
                                        return (
                                            <MenuItem key={subCenter.id} value={subCenter.id}>{subCenter.name}</MenuItem>
                                        )
                                    }) : 
                                    (<MenuItem value={0}>Aucune valeur</MenuItem>)
                                }
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