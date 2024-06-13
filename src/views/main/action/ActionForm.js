import { Button, Stack, Box, MenuItem } from "@mui/material";
import CustomFormLabel from "src/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "src/components/forms/theme-elements/CustomTextField";
import { useFormik } from "formik";
import { httpAdapter } from "src/app/services/http-adapter.service";
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup';
import CustomSelect from "src/components/forms/theme-elements/CustomSelect";
import { MethodRoles } from "src/utils/utils";


const validationSchema = yup.object({
    label: yup.string()
        .required("Le libéllé est requis !"),
    url: yup.string()
        .required("L'url est requis !")
});

const saveAction = async (values) => {
    var action = await httpAdapter.saveData(`/api/action`, values);
    if (action.error && action.error != null) {
        toast(`Erreur: ${action.error}`);
        return;
    }
    window.location.reload(true);
}

const ActionForm = ({ action }) => {
    const formik = useFormik({
        initialValues: {
            id: action ? action.id : '',
            label: action ? action.label : '',
            url: action ? action.url : '',
            method: action ? action.method : ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            saveAction(values);
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
                    <CustomFormLabel>Url</CustomFormLabel>
                    <CustomTextField
                        fullWidth
                        id="url"
                        name="url"
                        value={formik.values.url}
                        onChange={formik.handleChange}
                        error={formik.touched.url && Boolean(formik.errors.url)}
                        helperText={formik.touched.url && formik.errors.url}
                    />
                </Box>
                <Box>
                    <CustomFormLabel> Methodes </CustomFormLabel>
                    <CustomSelect
                        labelId="method"
                        id="method"
                        fullWidth
                        name="method"
                        value={formik.values.method}
                        onChange={formik.handleChange}
                    >
                        {
                            Object.keys(MethodRoles).map(method => (
                                <MenuItem key={method} value={method}> { method } </MenuItem>
                            ))
                        }
                    </CustomSelect>
                </Box>
                <Box mt={2}>
                    <Button color={action ? "warning" : "primary"} variant="contained" type="submit">
                        {action ? 'Modifier' : 'Ajouter'}
                    </Button>
                </Box>
            </Stack>
        </form>
    );
};


export default ActionForm;