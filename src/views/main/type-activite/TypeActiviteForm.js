import { Button, Stack, Box } from "@mui/material";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { useFormik } from "formik";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup';


const validationSchema = yup.object({
    label: yup.string()
        .required("Le libéllé est requis !"),
    description: yup.string()
        .required("La description est requis !")
});

const saveTypeActivite = async(values) => {
    var type = await httpAdapter.saveData(`/api/type-activite`, values);
    if(type.error && type.error != null) {
        toast(`Erreur: ${type.error}`);
        return;
    }
    window.location.reload(true);
}

const TypeActiviteForm = ({ type }) => {
    const formik = useFormik({
        initialValues: {
            id: type ? type.id : '',
            label: type ? type.label : '',
            description: type ? type.description : ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            saveTypeActivite(values);
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
                    <Button color={ type ? "warning" : "primary"} variant="contained" type="submit">
                        { type ? 'Modifier': 'Ajouter' }
                    </Button>
                </Box>
            </Stack>
        </form>
    );
};


export default TypeActiviteForm;