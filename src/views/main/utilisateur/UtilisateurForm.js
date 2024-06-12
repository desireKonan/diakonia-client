import { Button, Stack, Box } from "@mui/material";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { useFormik } from "formik";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup';


const validationSchema = yup.object({
    username: yup.string()
        .required("Le libéllé est requis !"),
    description: yup.string()
        .required("La description est requis !"),
    code: yup.string()
        .required("Le code est requis !")
});

const saveUtilisateur = async(values) => {
    var utilisateur = await httpAdapter.saveData(`/api/user`, values);
    if(utilisateur.error && utilisateur.error != null) {
        toast(`Erreur: ${utilisateur.error}`);
        return;
    }
    window.location.reload(true);
}

const UtilisateurForm = ({ utilisateur }) => {
    const formik = useFormik({
        initialValues: {
            id: utilisateur ? utilisateur.id : '',
            label: utilisateur ? utilisateur.label : '',
            code: utilisateur ? utilisateur.code : '',
            description: utilisateur ? utilisateur.description : ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            saveUtilisateur(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <ToastContainer />
            <Stack>
                {
                    formik.values.id ? (<input type="hidden" name="id" value={formik.values.id} />) : ""
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
                    <CustomFormLabel>Code</CustomFormLabel>
                    <CustomTextField
                        fullWidth
                        id="code"
                        name="code"
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        error={formik.touched.code && Boolean(formik.errors.code)}
                        helperText={formik.touched.code && formik.errors.code}
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
                    <Button color={ utilisateur ? "warning" : "primary"} variant="contained" type="submit">
                        { utilisateur ? 'Modifier': 'Ajouter' }
                    </Button>
                </Box>
            </Stack>
        </form>
    );
};


export default UtilisateurForm;