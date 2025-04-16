import { Button, Grid, MenuItem, Stack, TextField } from "@mui/material";
import CustomFormLabel from "src/_ui/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "src/_ui/components/forms/theme-elements/CustomSelect";
import CustomTextField from "src/_ui/components/forms/theme-elements/CustomTextField";
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from "src/app/services/useFetch";
import { httpAdapter } from "src/app/services/http-adapter.service";

const submitAssembly = async(values) => {
    var assemblee = await httpAdapter.saveData(`api/assemblee`, values);
    if(assemblee.errorMessage) {
        toast.error(`Erreur: ${assemblee.errorMessage}`);
        return;
    }
    window.location.reload(true);
}

const AssemblyForm = ({ assembly }) => {
    const formik = useFormik({
        initialValues: {
            id: assembly ? assembly.id : '',
            name: assembly ? assembly.name : '',
            sousZone: assembly ? assembly.sousZone : '',
        },
        onSubmit: (values) => {
            submitAssembly(values);
        },
    });
    const { data: subzones } = useFetch('/api/ville/subzones', []);
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <ToastContainer />
            {
                formik.values.id ? <TextField type="hidden" value={formik.values.id} /> : ""
            }
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} lg={7}>
                    <CustomFormLabel htmlFor="label">Libellé</CustomFormLabel>
                    <CustomTextField
                        labelId="name"
                        id="name" 
                        fullWidth
                        name="name"
                        placeholder="Entrez un libéllé"
                        variant="outlined"
                        size="large"
                        value={formik.values.name} 
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid>
                <Grid item xs={12} sm={12} lg={5}>
                    <CustomFormLabel htmlFor="Sous zone">Sous zone</CustomFormLabel>
                    <CustomSelect
                        labelId="sousZone"
                        id="sousZone" 
                        fullWidth
                        name="sousZone"
                        size="large"
                        value={formik.values.sousZone}
                        onChange={formik.handleChange}
                    >
                        {
                            subzones.map(subzone => 
                                <MenuItem selected={subzone} value={subzone}> { subzone } </MenuItem>    
                            )
                        }
                    </CustomSelect>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} lg={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" mt={2}>
                    <Stack spacing={1} direction="row">
                        <Button variant="contained" color={ assembly ? "warning" : "primary"} type="submit"> 
                            { assembly ? 'Modifier une assemblée' : 'Ajouter une assemblée' } 
                        </Button>
                    </Stack>
                </Stack>
            </Grid>
        </form>
    );
}


export default AssemblyForm;