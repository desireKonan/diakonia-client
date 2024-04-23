import { Button, Grid, Stack } from "@mui/material";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { useFormik } from "formik";
import * as yup from 'yup';
import { httpAdapter } from "src/app/services/http-adapter.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const validationSchema = yup.object({
    label: yup.string()
        .required("Le libéllé est requis !")
});

const submitVille = async(values) => {
    var ville = await httpAdapter.saveData(`api/ville`, values);
    if(ville.error && ville.error != null) {
        toast(`Erreur: ${ville.error}`);
        return;
    }
    window.location.reload(true);
}

const VilleForm = ({ ville }) => {
    const formik = useFormik({
        initialValues: {
            id: ville ? ville.id : '',
            name: ville ? ville.name : ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            submitVille(values);
        },
    });
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <ToastContainer />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} lg={8}>
                    {
                        ville ? (<input type="hidden" value={ville.id} />) : ""
                    }
                    <CustomFormLabel htmlFor="name">Nom (ville)</CustomFormLabel>
                    <CustomTextField
                        fullWidth
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} lg={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" mt={2}>
                    <Stack spacing={1} direction="row">
                        <Button variant="contained" color={ ville ? "warning" : "primary"} type="submit"> 
                            { ville ? 'Modifier' : 'Ajouter' } une région 
                        </Button>
                    </Stack>
                </Stack>
            </Grid>
        </form>
    );
}
    
export default VilleForm;