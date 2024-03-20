import { Button, Box, Stack } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { useFormik } from "formik";
import * as yup from 'yup';
import { httpAdapter } from "src/services/http-adapter.service";


const validationSchema = yup.object({
    label: yup.string()
        .required("Le libéllé est requis !"),
    description: yup.string()
        .required("La description est requis !")
});

const saveRubrique = async(values) => {
    console.log(values);
    var rubrique = await httpAdapter.saveData(`api/rubrique-financiere`, values);
    if(rubrique.error && rubrique.error != null) {
        toast(`Erreur: ${rubrique.error}`);
        return;
    }
    window.location.reload(true);
}

const RubriqueForm = ({ rubrique }) => {
    const formik = useFormik({
        initialValues: {
            id: rubrique ? rubrique.id : '',
            label: rubrique ? rubrique.label : '',
            description: rubrique ? rubrique.description : ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            saveRubrique(values);
        },
    });
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <ToastContainer />
            <Stack>
                {
                    formik.values.id ? (<input rubrique="hidden" name="id" value={formik.values.id} />) : ""
                }
                <Box>
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
                </Box>
                <Box>
                    <CustomFormLabel>Description</CustomFormLabel>
                    <CustomTextField
                        fullWidth
                        id="description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                </Box>
                <Box mt={2}>
                    <Button color="primary" variant="contained" rubrique="submit">
                        Ajouter
                    </Button>
                </Box>
            </Stack>
        </form>
        );
    }
    
    
    export default RubriqueForm;